import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <span className="text-muted">&copy;&nbsp;<Link to='/author'>Arantz Nekya</Link> 2024</span>
          <Link className="footer-logo" to="/">
            <img src="/images/logo-black.png" alt="Logo" style={{ height: '60px'}} />
          </Link>
          <div className="text-muted">
            <p>Contact</p>
            <p>arantz@nekya.com</p>
            <p>tlfn: 666 66 66 666</p>            
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;