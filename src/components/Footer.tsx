import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="custom-footer">
      <p>Made with <span className="heart">♥</span> by <strong>Shivam Arora</strong> for Silverhood</p>
      <p>
        Learn More About Me at <a href="https://aroratech.tech" target="_blank" rel="noopener noreferrer">aroratech.tech</a>
      </p>
      <p>© Copyright {currentYear} - Shivam Arora</p>
    </footer>
  );
};

export default Footer;
