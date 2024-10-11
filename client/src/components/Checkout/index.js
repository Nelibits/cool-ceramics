import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, setCart }) => {
  const navigate = useNavigate();
  
  // Increase quantity in the cart
  const increaseCartQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrease quantity in the cart, ensuring it doesn't go below 1
  const decreaseCartQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
  };

  // Calculate the total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

   // Handle payment
   const handlePayment = () => {
    // Clear the cart
    setCart([]);
    // Navigate to the thank you page
    navigate('/thank-you');
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          <div className="row">
            {cart.map(item => (
              <div className="col-md-12 mb-4" key={item._id}>
                <div className="card">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px' }}
                    />
                    <div className="flex-grow-1">
                      <h5>{item.name}</h5>
                      <p><strong>Price:</strong> ${item.price}</p>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="input-group">
                        {item.quantity === 1 ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => removeFromCart(item._id)}
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => decreaseCartQuantity(item._id)}
                          >
                            -
                          </button>
                        )}
                        <input
                          type="text"
                          className="form-control text-center"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => increaseCartQuantity(item._id)}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-right mb-0 ms-3"><strong>Total:</strong> ${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Amount Section */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="text-right">Total Amount: ${calculateTotal()}</h4>
            <button className="btn btn-success btn-lg" onClick={handlePayment}>Pay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;