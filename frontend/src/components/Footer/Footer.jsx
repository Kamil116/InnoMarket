// src/components/Footer.jsx
import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => (
  <div className="footer">
    <div className='footer_top'>
      <div className="footer-links">
        <Link to='/'>
        <a><p>Home</p></a>
        </Link>
        <Link to='/products'>
        <a><p>All products</p></a>
        </Link>
      </div>
    </div>
    <div className='footer_bot'>
      <div className="logo_footer">
        <div className='logo_circle_footer'>IM</div>
        <p>InnoMarket</p>
      </div>
      <p>2024 frontend project</p>
    </div>
  </div>
);

export default Footer;