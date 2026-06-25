// src/components/Footer.jsx
import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { Car, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const Footer = () => {
  const { changeRole, setDriverViewMode, setIsDriverLoggedIn } = usePlatform();

  return (
    <footer style={{ background: '#111111', color: '#FFFFFF', padding: '80px 8% 40px 8%', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px', marginBottom: '60px' }}>
        
        {/* Brand Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div 
            onClick={() => {
              changeRole('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px', cursor: 'pointer' }}
            title="Access Admin Panel"
          >
            <Car size={26} style={{ color: '#FFC107' }} />
            Rent<span style={{ color: '#FFC107' }}>Driver</span>
          </div>
          <p style={{ color: '#888880', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '280px' }}>
            Premium on-demand driver platform connecting car owners with background-screened professional chauffeurs.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#B3B3B0', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={14} style={{ color: '#FFC107' }} /> +91 98765 43210</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={14} style={{ color: '#FFC107' }} /> support@rentdriver.in</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={14} style={{ color: '#FFC107' }} /> MG Road, Kochi, Kerala 682016</div>
          </div>
        </div>

        {/* Customer Links */}
        <div>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px', color: '#FFC107' }}>Customer Portal</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <li><a href="#" onClick={(e) => { e.preventDefault(); changeRole('customer'); }} style={{ color: '#B3B3B0', textDecoration: 'none', transition: 'color 0.2s' }}>Book a Chauffeur</a></li>
            <li><a href="#" style={{ color: '#B3B3B0', textDecoration: 'none', transition: 'color 0.2s' }}>Pricing Matrix</a></li>
            <li><a href="#" style={{ color: '#B3B3B0', textDecoration: 'none', transition: 'color 0.2s' }}>Safety Policies</a></li>
            <li><a href="#" style={{ color: '#B3B3B0', textDecoration: 'none', transition: 'color 0.2s' }}>Corporate Accounts</a></li>
            <li><a href="#" style={{ color: '#B3B3B0', textDecoration: 'none', transition: 'color 0.2s' }}>FAQ & Help Center</a></li>
          </ul>
        </div>

        {/* Driver Links */}
        <div>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px', color: '#FFC107' }}>Driver Partners</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setDriverViewMode('register'); setIsDriverLoggedIn(false); changeRole('driver'); }} style={{ color: '#B3B3B0', textDecoration: 'none', transition: 'color 0.2s' }}>Become a Partner</a></li>
            <li><a href="#" style={{ color: '#B3B3B0', textDecoration: 'none', transition: 'color 0.2s' }}>Payout Structure</a></li>
            <li><a href="#" style={{ color: '#B3B3B0', textDecoration: 'none', transition: 'color 0.2s' }}>KYC Guidelines</a></li>
            <li><a href="#" style={{ color: '#B3B3B0', textDecoration: 'none', transition: 'color 0.2s' }}>Insurance Claims</a></li>
            <li><a href="#" style={{ color: '#B3B3B0', textDecoration: 'none', transition: 'color 0.2s' }}>Driver Support Center</a></li>
          </ul>
        </div>

        {/* Newsletter / CTA */}
        <div>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px', color: '#FFC107' }}>Stay Connected</h4>
          <p style={{ color: '#888880', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '20px' }}>
            Join our mailing list to receive premium discounts and updates on new operations.
          </p>
          <div style={{ display: 'flex', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#222' }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{ border: 'none', background: 'transparent', padding: '14px 16px', color: 'white', flexGrow: 1, outline: 'none', fontSize: '0.85rem' }} 
            />
            <button style={{ background: '#FFC107', border: 'none', color: '#111', padding: '0 16px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Under footer */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '32px', fontSize: '0.8rem', color: '#666' }}>
        <div>&copy; {new Date().getFullYear()} RentDriver Technologies Inc. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '10px' }}>
          <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Sitemap</a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
