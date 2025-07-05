import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/header.css';

export default function Header() {
  return (
    <header className="header-sticky">
      <div className="header-container">
        <div className="logo">
          <NavLink to="/">
            <img src="/assets/logo2.png" alt="Logo" className="logo-image" />
          </NavLink>
        </div>
        <nav className="header-nav">
          <NavLink to="/works" className={({ isActive }) => isActive ? 'active' : ''}>WORKS</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>ABOUT</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>CONTACT</NavLink>
        </nav>
      </div>
    </header>
  );
}
