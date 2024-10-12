import React, { Component } from 'react';
import './style.css';

class About extends Component {
  render() {
    return (
      <>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <h1>About Me</h1>
              <div className="mb-4" /> 
              <p>
                Welcome to our pottery store! We specialize in handcrafted pottery made with love and care. 
                Each piece is uniquely designed, reflecting the beauty and tradition of pottery-making. 
                Our mission is to bring joy to your home with beautiful and functional ceramics that serve 
                both artistic and practical purposes. From dinnerware to decorative items, our collection 
                is crafted to enhance your living space and bring a touch of elegance to your life.
              </p>
              <p>
                We are passionate about pottery and strive to provide our customers with high-quality products 
                that celebrate the art of ceramics. Thank you for supporting local artisans and choosing 
                our pottery to be part of your home.
              </p>
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img 
                src="/images/headshot.jpg" 
                alt="Nelida"
                style={{
                  width: '300px', 
                  height: '450px',
                  objectFit: 'cover', 
                }}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default About;