// src/components/Navbar.jsx
import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { Car, User, Settings, LogIn } from 'lucide-react';

export const Navbar = () => {
  const { changeRole, role, setDriverViewMode, currentDriverId, drivers, setIsDriverLoggedIn } = usePlatform();

  const scrollToSection = (id) => {
    if (role !== 'landing') {
      changeRole('landing');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="nav-header">
      <div className="nav-container">
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); changeRole('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Car size={26} strokeWidth={2.5} />
          Rent<span>Driver</span>
        </a>

        <ul className="nav-menu">
          <li><a className="nav-link" onClick={() => scrollToSection('hero')}>Home</a></li>
          <li><a className="nav-link" onClick={() => scrollToSection('trust')}>Why Us</a></li>
          <li><a className="nav-link" onClick={() => scrollToSection('services')}>Services</a></li>
          <li><a className="nav-link" onClick={() => scrollToSection('pricing')}>Pricing</a></li>
          <li><a className="nav-link" onClick={() => scrollToSection('safety')}>Safety</a></li>
          <li><a className="nav-link" onClick={() => scrollToSection('faq')}>FAQ</a></li>
        </ul>

        <div className="nav-actions">
          {role === 'landing' ? (
            <>
              <button 
                onClick={() => changeRole('customer')} 
                className="btn btn-secondary" 
                style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.85rem' }}
              >
                <LogIn size={16} />
                Client Login
              </button>
              <button 
                onClick={() => {
                  setDriverViewMode('register');
                  setIsDriverLoggedIn(false);
                  changeRole('driver');
                }} 
                className="btn btn-primary" 
                style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.85rem' }}
              >
                Become Partner
              </button>
            </>
          ) : (
            <button 
              onClick={() => changeRole('landing')} 
              className="btn btn-secondary" 
              style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.85rem' }}
            >
              Exit Dashboard
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
