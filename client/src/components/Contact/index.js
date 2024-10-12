import React, { Component } from 'react';
import './style.css';

class Contact extends Component {
  render() {
    return (
      <>
        <div className="container mt-5">
          <h1 className="text-center mb-4">Contact Me</h1>
          <div className="row">
            <div className="col-md-6">
              <h3>Get in Touch</h3>
              <p>
                I’d love to hear from you! Please use the contact information on the side to reach me.
              </p>
            </div>
            <div className="col-md-6">
              <h3>Contact Information</h3>
              <p>
                <strong>Address:</strong> 123 Pottery Lane, Art Town, AnyWhere
              </p>
              <p>
                <strong>Phone:</strong> 666 66 66 666
              </p>
              <p>
                <strong>Email:</strong> arantz@nekya.com
              </p>
              <p>
                Follow me on social media:
                <br />
                <a href="#" className="me-2">Facebook</a>
                <a href="#" className="me-2">Instagram</a>
                <a href="#">Twitter</a>
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Contact;