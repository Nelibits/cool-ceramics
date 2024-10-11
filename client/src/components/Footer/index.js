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
          <div>
            Information about whatever blablabla
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;