import React, { Component } from 'react';
import './style.css';

class Home extends Component {
  render() {
    return (
      <>
       <div className="position-relative vh-100">
        <img 
          src="/images/background-landing.jpeg" // Path to your image
          alt="Pottery Background"
          className="img-fluid position-absolute w-100 h-100" // Bootstrap classes
          style={{ objectFit: 'cover', zIndex: -1 }} // Make it cover and place it behind content
        />
        <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center">
          <div className="bg-light p-4 rounded" style={{ zIndex: 1 }}> {/* Added a background for better readability */}
            <h1 className="mb-4">Welcome to Our Pottery Store</h1>
            <p className="lead mb-4">
              Discover the beauty of handcrafted pottery. Each piece is uniquely made with love, 
              combining artistry and functionality. Our collection features a variety of 
              ceramics, from dinnerware to decorative items, perfect for adding a touch of elegance 
              to your home.
            </p>
            <a href="/shop" className="btn btn-primary btn-lg">Go to Shop</a>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default Home;