import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = ({ cart, isAdminConnected, onAdminDisconnect }) => {
  // Calculate total items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/images/logo-white.png" alt="Logo" style={{ height: '60px' }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/about" className="nav-link">About</NavLink>
              <NavLink to="/contact" className="nav-link">Contact</NavLink>
              <NavLink to="/store" className="nav-link">Store</NavLink>
              {isAdminConnected && (
                 <NavLink to="/manage" className="nav-link">Manage</NavLink>
              )}
            </ul>
            {isAdminConnected && (
                <button className="btn btn-outline-light position-relative ms-auto" onClick={onAdminDisconnect}>
                  Disconnect Admin
                </button>
              )}
            <Link to="/checkout" className="btn btn-outline-light position-relative ms-auto" style={{ padding: '0.3rem 0.7rem' }}>
              <i className="bi bi-cart" style={{ fontSize: '1.5rem', color: 'white' }}></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;