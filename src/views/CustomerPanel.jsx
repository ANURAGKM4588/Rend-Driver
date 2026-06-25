// src/views/CustomerPanel.jsx
import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { BookingWidget } from '../components/BookingWidget';
import { Map } from '../components/Map';
import { Wallet, Star, ShieldAlert, Navigation, Phone, MapPin, ClipboardList, Plus } from 'lucide-react';

export const CustomerPanel = () => {
  const { 
    bookings, 
    currentUser, 
    setCurrentUser,
    drivers, 
    cancelBooking, 
    addFundsToWallet, 
    addToast,
    skipDriverMovement
  } = usePlatform();

  const [bookingExpanded, setBookingExpanded] = useState(false);

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authTab, setAuthTab] = useState('signin'); // 'signin' or 'signup'
  
  // Sign In form states
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Sign Up form states
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) return;
    
    setIsLoggedIn(true);
    addToast('Logged In Successfully', `Welcome back, ${currentUser.name}!`, 'success');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPhone || !signUpPassword) return;

    setCurrentUser({
      name: signUpName,
      email: signUpEmail,
      phone: signUpPhone,
      walletBalance: 2000, // Welcome signup bonus
      savedLocations: [
        { id: 'loc_1', name: 'Home', address: 'Plot 24, Sector 12, New Delhi, IN', lat: 28.5921, lng: 77.0461 },
        { id: 'loc_2', name: 'Office', address: 'Cyber City, Gurugram, HR', lat: 28.4952, lng: 77.0894 }
      ],
      membership: 'Standard'
    });

    setIsLoggedIn(true);
    addToast('Account Created', `Welcome to RentDriver, ${signUpName}!`, 'success');
  };

  const handleDemoBypass = () => {
    setIsLoggedIn(true);
    addToast('Demo Mode Active', `Logged in automatically as Anurag Sharma.`, 'success');
  };

  // Active customer booking: find the first booking which is NOT completed/cancelled
  const activeBooking = bookings.find(
    (b) => ['pending', 'accepted', 'arrived', 'in_progress'].includes(b.status)
  );

  const assignedDriver = activeBooking ? drivers.find((d) => d.id === activeBooking.driverId) : null;
  const pastBookings = bookings.filter((b) => ['completed', 'cancelled'].includes(b.status));

  const handleSos = () => {
    addToast(
      'EMERGENCY SOS ACTIVATED', 
      'Operations room notified. GPS signals dispatched to nearby patrols.', 
      'error'
    );
  };

  const getStepperIndex = (status) => {
    switch (status) {
      case 'pending': return 1;
      case 'accepted': return 2;
      case 'arrived': return 2;
      case 'in_progress': return 3;
      case 'completed': return 4;
      default: return 1;
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '40px 20px' }}>
        <div className="driver-stat-card" style={{ maxWidth: '420px', width: '100%', padding: '40px 32px', borderRadius: '24px', background: 'white', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-premium)' }}>
          
          {/* Brand header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--color-charcoal)' }}>
              Rent<span style={{ color: 'var(--color-yellow)' }}>Driver</span>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>
              Premium vetted chauffeurs on demand for your own vehicle.
            </p>
          </div>

          {/* Auth Tab Switcher */}
          <div style={{ display: 'flex', background: 'var(--color-bg-light)', padding: '6px', borderRadius: '14px', marginBottom: '24px', border: '1px solid var(--color-border)' }}>
            <button 
              onClick={() => setAuthTab('signin')}
              style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: authTab === 'signin' ? 'white' : 'transparent', fontWeight: 700, fontSize: '0.85rem', color: authTab === 'signin' ? 'var(--color-charcoal)' : 'var(--color-text-muted)', cursor: 'pointer', transition: 'all 0.2s', boxShadow: authTab === 'signin' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}
            >
              Sign In
            </button>
            <button 
              onClick={() => setAuthTab('signup')}
              style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: authTab === 'signup' ? 'white' : 'transparent', fontWeight: 700, fontSize: '0.85rem', color: authTab === 'signup' ? 'var(--color-charcoal)' : 'var(--color-text-muted)', cursor: 'pointer', transition: 'all 0.2s', boxShadow: authTab === 'signup' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}
            >
              Create Account
            </button>
          </div>

          {/* Render forms */}
          {authTab === 'signin' ? (
            <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@gmail.com"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '0.9rem', fontWeight: 700, marginTop: '8px' }}>
                Sign In to Dashboard
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Anurag Sharma"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@gmail.com"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  value={signUpPhone}
                  onChange={(e) => setSignUpPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '0.9rem', fontWeight: 700, marginTop: '8px' }}>
                Create Free Account
              </button>
            </form>
          )}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '24px 0 16px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Testing</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
          </div>

          {/* Demo Mode Button */}
          <button 
            onClick={handleDemoBypass}
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px dashed var(--color-yellow)', background: 'rgba(255, 193, 7, 0.05)', color: 'var(--color-charcoal)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            ⚡ Bypass to Demo Dashboard
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="customer-panel-container">
      
      {/* Active Booking Tracker */}
      {activeBooking && (
        <div style={{ marginBottom: '40px' }}>
          <div className="active-tracker-card">
            
            <div className="active-tracker-header">
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-yellow)' }}>Live Trip Tracker</span>
                <h3 style={{ marginTop: '4px' }}>
                  {activeBooking.status === 'pending' && 'Looking for Verified Drivers...'}
                  {activeBooking.status === 'accepted' && 'Driver Dispatched'}
                  {activeBooking.status === 'arrived' && 'Driver Arrived at your vehicle'}
                  {activeBooking.status === 'in_progress' && 'Trip In Progress'}
                </h3>
              </div>
              <span className={`status-badge ${activeBooking.status}`}>{activeBooking.status}</span>
            </div>

            {/* Stepper */}
            <div className="tracker-stepper">
              <div className={`tracker-step ${getStepperIndex(activeBooking.status) >= 1 ? 'completed' : ''}`}>
                <div className="tracker-step-dot">1</div>
                <span className="tracker-step-label">Booked</span>
              </div>
              <div className={`tracker-step ${getStepperIndex(activeBooking.status) >= 2 ? (activeBooking.status === 'arrived' ? 'completed' : 'active') : ''}`}>
                <div className="tracker-step-dot">2</div>
                <span className="tracker-step-label">En Route</span>
              </div>
              <div className={`tracker-step ${getStepperIndex(activeBooking.status) >= 3 ? 'active' : ''}`}>
                <div className="tracker-step-dot">3</div>
                <span className="tracker-step-label">On Trip</span>
              </div>
              <div className={`tracker-step ${getStepperIndex(activeBooking.status) >= 4 ? 'completed' : ''}`}>
                <div className="tracker-step-dot">4</div>
                <span className="tracker-step-label">Arrived</span>
              </div>
            </div>

            {/* Interactive GPS Map */}
            {activeBooking.status !== 'pending' && (
              <div className="dashboard-map-wrapper" style={{ height: '320px', marginBottom: '24px' }}>
                <Map activeBookingId={activeBooking.id} />
              </div>
            )}

            {/* Security OTP Share Card */}
            {(activeBooking.status === 'accepted' || activeBooking.status === 'arrived') && (
              <div className="otp-display-container">
                <div className="otp-display-label">Share OTP to start drive</div>
                <div className="otp-display-code">{activeBooking.otp}</div>
                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '6px' }}>Provide this PIN only when driver arrives at your car.</p>
              </div>
            )}

            {/* Assigned Driver Profile Card */}
            {assignedDriver && (
              <div className="assigned-driver-card">
                <img src={assignedDriver.avatar} alt={assignedDriver.name} className="assigned-driver-avatar" />
                <div className="assigned-driver-details">
                  <h4>{assignedDriver.name}</h4>
                  <div className="assigned-driver-meta">
                    <span>★ {assignedDriver.rating} Rating</span>
                    <span>• {assignedDriver.experience} Experience</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                    {assignedDriver.vehicleExpertise.slice(0, 2).map((exp, idx) => (
                      <span key={idx} style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 600 }}>{exp}</span>
                    ))}
                  </div>
                </div>
                <a href={`tel:${assignedDriver.phone}`} className="assigned-driver-phone" style={{ textDecoration: 'none' }}>
                  <Phone size={16} />
                  Call
                </a>
              </div>
            )}

            {/* SOS and Cancel Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => cancelBooking(activeBooking.id)} 
                  className="btn btn-secondary"
                  style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '0.85rem' }}
                >
                  Cancel Booking
                </button>
                
                {['accepted', 'in_progress'].includes(activeBooking.status) && (
                  <button 
                    onClick={() => skipDriverMovement(activeBooking.id)} 
                    className="btn btn-secondary"
                    style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '0.85rem', background: 'var(--color-yellow)', borderColor: 'var(--color-yellow)', color: 'var(--color-charcoal)' }}
                  >
                    ⚡ Fast Forward GPS
                  </button>
                )}
              </div>
              
              {activeBooking.status !== 'pending' && (
                <button onClick={handleSos} className="btn-sos">
                  <ShieldAlert size={18} />
                  Emergency SOS
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Main Account Area */}
      <div className="customer-grid">
        
        {/* Left Side: Booking / History */}
        <div>
          {!activeBooking && (
            <div style={{ background: 'white', padding: '32px', borderRadius: '24px', border: '1px solid var(--color-border)', marginBottom: '32px', boxShadow: 'var(--shadow-premium)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', letterSpacing: '-0.5px', margin: 0 }}>Hello, {currentUser.name}</h2>
                <button 
                  onClick={() => {
                    setIsLoggedIn(false);
                    addToast('Logged Out', 'You have been signed out.', 'info');
                  }}
                  style={{ background: 'transparent', border: 'none', color: '#B71C1C', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Sign Out
                </button>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '32px', lineHeight: 1.5 }}>
                Your car, driven by certified chauffeurs. Schedule a one-way trip, hourly booking, or outstation journey.
              </p>
              <BookingWidget />
            </div>
          )}

          {/* Saved Locations */}
          <div style={{ background: 'white', padding: '32px', borderRadius: '24px', border: '1px solid var(--color-border)', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Saved Addresses</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {currentUser.savedLocations.map((loc) => (
                <div key={loc.id} style={{ display: 'flex', alignItems: 'center', justifyStyle: 'space-between', gap: '16px', padding: '16px', background: 'var(--color-bg-light)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                  <MapPin size={20} style={{ color: 'var(--color-yellow)', flexShrink: 0 }} />
                  <div style={{ flexGrow: 1 }}>
                    <strong style={{ fontSize: '0.9rem' }}>{loc.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '2px' }}>{loc.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Bookings */}
          <div style={{ background: 'white', padding: '32px', borderRadius: '24px', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Previous Trips</h3>
            {pastBookings.length === 0 ? (
              <p style={{ color: '#888', fontSize: '0.85rem' }}>No past bookings found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {pastBookings.map((b) => (
                  <div key={b.id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 600 }}>Trip ID: {b.id} • {b.date}</span>
                      <span className={`status-badge ${b.status}`} style={{ padding: '2px 10px', fontSize: '0.65rem' }}>{b.status}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{b.pickup.name} → {b.destination.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.85rem' }}>
                      <span>Fare: <b>₹{b.fare}</b> ({b.type})</span>
                      {b.rating && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-yellow)', fontWeight: 700 }}>
                          <Star size={14} fill="currentColor" />
                          {b.rating}★
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Wallet & Referral */}
        <div className="customer-sidebar-cards">
          
          {/* Wallet */}
          <div className="customer-wallet-card">
            <h4>Digital Wallet</h4>
            <div className="customer-wallet-balance">₹{currentUser.walletBalance}</div>
            
            <div className="customer-wallet-actions">
              <button 
                className="wallet-add-btn" 
                onClick={() => addFundsToWallet(500)}
              >
                + ₹500
              </button>
              <button 
                className="wallet-add-btn primary" 
                onClick={() => addFundsToWallet(1000)}
              >
                + ₹1000
              </button>
            </div>
            
            <p style={{ color: '#888', fontSize: '0.75rem', marginTop: '16px', textAlign: 'center' }}>
              Funds automatically deducted on ride completions.
            </p>
          </div>

          {/* Referral Card */}
          <div style={{ background: 'white', padding: '32px', borderRadius: '24px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Invite Friends</h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '20px' }}>
              Share your referral code and get ₹500 bonus credits in your wallet when they book their first ride.
            </p>
            <div style={{ background: 'var(--color-bg-light)', padding: '12px', borderRadius: '12px', border: '1px dashed var(--color-border)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '2px', color: 'var(--color-charcoal)' }}>
              RD-ANURAG20
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
export default CustomerPanel;
