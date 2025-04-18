import React from 'react';

const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`hamburger-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default HamburgerMenu;
