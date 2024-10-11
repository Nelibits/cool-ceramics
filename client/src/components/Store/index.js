import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Store = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantity, setQuantity] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3); // Display 3 products per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        console.log("Response data:", response.data); 
        setProducts(response.data);
        setFilteredProducts(response.data);

        const initialQuantity = {};
        response.data.forEach(product => {
          initialQuantity[product._id] = 0;
        });
        setQuantity(initialQuantity);

        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Increase quantity
  const increaseQuantity = (id) => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [id]: prevQuantity[id] + 1
    }));
  };

  // Decrease quantity, ensure it doesn't go below 1
  const decreaseQuantity = (id) => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [id]: prevQuantity[id] > 1 ? prevQuantity[id] - 1 : 1
    }));
  };

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex(item => item._id === product._id);

    if (itemIndex > -1) {
      updatedCart[itemIndex].quantity += quantity[product._id];
    } else {
      updatedCart.push({ ...product, quantity: quantity[product._id] });
    }

    setCart(updatedCart);
  };

  // Filter products based on the selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
    setCurrentPage(1); // Reset to first page on category change
  };

  // Get current products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Arantz Nekya</h1>

      <div className="mb-4 text-center">
        <h5>Filter by Category:</h5>
        <div className="btn-group btn-group-lg" role="group" aria-label="Category Filter">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
              style={{ minWidth: '120px', margin: '0 5px', borderRadius: '30px' }}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="row">
        {currentProducts.map(product => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Category:</strong> {product.category}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                <div className="input-group mb-3">
                  <button className="btn btn-outline-secondary" onClick={() => decreaseQuantity(product._id)}>-</button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={quantity[product._id]}
                    readOnly
                  />
                  <button className="btn btn-outline-secondary" onClick={() => increaseQuantity(product._id)}>+</button>
                </div>

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => addToCart(product)}
                  disabled={quantity[product._id] === 0} 
                >
                  <i className="bi bi-cart"></i> Add to Cart
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Store;