import React from 'react';
import './Footer.css';
import { assets } from '../../assets/frontend_assets/assets';

function Footer() {
  return (
    <footer className="footer" id="footer">
      {/* Left Section */}
      <div className="footer-section footer-left">
        <img src={assets.logo} alt="Company Logo" className="footer-logo" />
        <p className="footer-description">
          We provide the best services to make your life easier. Quality, trust, and customer satisfaction are our top priorities.
        </p>
      </div>

      {/* Center Section */}
      <div className="footer-section footer-center">
        <h4>Company</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/delivery">Delivery</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="footer-section footer-right">
        <h4>Contact Us</h4>
        <ul>
          <li>📞 +91 73293 8923</li>
          <li>📧 <a href="mailto:tomato@gmail.com">tomato@gmail.com</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
