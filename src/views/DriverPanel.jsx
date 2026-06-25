// src/views/DriverPanel.jsx
import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { Map } from '../components/Map';
import { Phone, Navigation, ShieldCheck, DollarSign, Wallet, FileText, UploadCloud, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DriverPanel = () => {
  const { 
    bookings, 
    drivers, 
    setDrivers, 
    toggleDriverStatus, 
    acceptBooking, 
    startRide, 
    completeRide,
    addToast,
    skipDriverMovement,
    registerDriver,
    driverViewMode,
    setDriverViewMode,
    currentDriverId,
    setCurrentDriverId,
    isDriverLoggedIn,
    setIsDriverLoggedIn
  } = usePlatform();

  // Selector & Form States
  const [otpVal, setOtpVal] = useState('');
  const [kycFileUploaded, setKycFileUploaded] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Partner Registration State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLicense, setRegLicense] = useState('');
  const [regExperience, setRegExperience] = useState('3 Years');
  const [regRate, setRegRate] = useState('');
  const [regExpertise, setRegExpertise] = useState('Sedan');

  // Partner Sign In State
  const [driverAuthTab, setDriverAuthTab] = useState(driverViewMode === 'register' ? 'signup' : 'signin');
  const [signInDriverId, setSignInDriverId] = useState('drv_1');
  const [signInPhone, setSignInPhone] = useState('+1 (555) 019-8822');

  // Sync auth tab mode when navbar redirection is triggered
  React.useEffect(() => {
    setDriverAuthTab(driverViewMode === 'register' ? 'signup' : 'signin');
  }, [driverViewMode]);

  const driver = drivers.find((d) => d.id === currentDriverId);

  const handleDriverSelectChange = (e) => {
    const val = e.target.value;
    setCurrentDriverId(val);
    setKycFileUploaded(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regPhone || !regLicense || !regRate) return;

    const newDrv = registerDriver({
      name: regName,
      phone: regPhone,
      licenseNumber: regLicense,
      experience: regExperience,
      hourlyRate: parseFloat(regRate),
      vehicleExpertise: [regExpertise]
    });

    if (newDrv) {
      setCurrentDriverId(newDrv.id);
      setIsDriverLoggedIn(true);
      
      // Clear form fields
      setRegName('');
      setRegPhone('');
      setRegLicense('');
      setRegRate('');
    }
  };

  const handleDriverSignInSubmit = (e) => {
    e.preventDefault();
    setCurrentDriverId(signInDriverId);
    setIsDriverLoggedIn(true);
    const signedInDrv = drivers.find(d => d.id === signInDriverId);
    addToast('Signed In', `Welcome back, ${signedInDrv ? signedInDrv.name : 'Partner'}!`, 'success');
  };

  const handleDriverBypass = () => {
    setCurrentDriverId('drv_1');
    setIsDriverLoggedIn(true);
    addToast('Demo Mode Active', 'Logged in as Alexander Mercer.', 'success');
  };

  const handleProfileSelectChange = (e) => {
    const selectedId = e.target.value;
    setSignInDriverId(selectedId);
    const selectedDrv = drivers.find(d => d.id === selectedId);
    if (selectedDrv) {
      setSignInPhone(selectedDrv.phone);
    }
  };

  // Find if there is a pending booking for active dispatch, or an active booking assigned to this driver
  const pendingBooking = bookings.find((b) => b.status === 'pending');
  const activeBooking = bookings.find((b) => b.driverId === currentDriverId && ['accepted', 'arrived', 'in_progress'].includes(b.status));

  const handleAccept = () => {
    if (pendingBooking && driver) {
      acceptBooking(pendingBooking.id, driver.id);
    }
  };

  const handleDecline = () => {
    addToast('Request Declined', 'Search parameters adjusted.', 'info');
  };

  const handleStartTrip = (e) => {
    e.preventDefault();
    if (!activeBooking) return;
    const success = startRide(activeBooking.id, otpVal);
    if (success) {
      setOtpVal('');
    }
  };

  const handleEndTrip = () => {
    if (!activeBooking) return;
    
    // Complete ride in context
    completeRide(activeBooking.id, 5, 'Perfect ride. Very professional customer.');
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleKycUpload = () => {
    setKycFileUploaded(true);
    setDrivers(prev => prev.map(d => d.id === currentDriverId ? { ...d, kycStatus: 'Pending Verification' } : d));
    addToast('KYC File Uploaded', 'Verification process takes 1-2 hours.', 'success');
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    
    const amt = parseFloat(withdrawAmount);
    if (driver.walletBalance < amt) {
      addToast('Withdrawal Failed', 'Insufficient balance.', 'error');
      return;
    }

    setDrivers(prev => prev.map(d => d.id === currentDriverId ? { ...d, walletBalance: d.walletBalance - amt } : d));
    addToast('Withdrawal Requested', `$${amt} is being processed to your bank account.`, 'success');
    setWithdrawAmount('');
  };

  // Handle onboarding / login / register layout render
  if (!isDriverLoggedIn) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '40px 20px' }}>
        <div className="driver-stat-card" style={{ maxWidth: '440px', width: '100%', padding: '40px 32px', borderRadius: '24px', background: 'white', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-premium)' }}>
          
          {/* Brand header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--color-charcoal)' }}>
              Rent<span style={{ color: 'var(--color-yellow)' }}>Driver</span> <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', background: 'var(--color-bg-light)', padding: '4px 10px', borderRadius: '8px', border: '1px solid var(--color-border)', verticalAlign: 'middle', marginLeft: '6px' }}>Partners</span>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>
              {driverAuthTab === 'signup' 
                ? 'Submit registration request to join our premium chauffeur network.' 
                : 'Sign in to your active driver partner console.'}
            </p>
          </div>

          {/* Render forms */}
          {driverAuthTab === 'signup' ? (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="E.g., Rajesh Kumar"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="E.g., +91 98765 54321"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Driving License</label>
                  <input 
                    type="text" 
                    placeholder="DL-XXXXXXXX"
                    value={regLicense}
                    onChange={(e) => setRegLicense(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="input-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Experience</label>
                  <select 
                    value={regExperience}
                    onChange={(e) => setRegExperience(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                  >
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                    <option value="3 Years">3 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Expected Rate (₹/hr)</label>
                  <input 
                    type="number" 
                    placeholder="300"
                    value={regRate}
                    onChange={(e) => setRegRate(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="input-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Expertise</label>
                  <select 
                    value={regExpertise}
                    onChange={(e) => setRegExpertise(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '0.9rem', fontWeight: 700, marginTop: '8px' }}>
                Submit Application to Join
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Already an approved partner?{' '}
                <button 
                  type="button" 
                  onClick={() => setDriverAuthTab('signin')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-yellow)', fontWeight: 700, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                >
                  Sign In here
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleDriverSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Select Driver Profile</label>
                <select 
                  value={signInDriverId}
                  onChange={handleProfileSelectChange}
                  required
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                >
                  {drivers.filter(d => d.id !== 'register' && !d.name.toLowerCase().includes('become')).map((d) => (
                    <option key={d.id} value={d.id}>{d.name} ({d.kycStatus === 'Verified' ? 'Approved' : 'Pending Approval'})</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Registered Phone Number</label>
                <input 
                  type="tel" 
                  value={signInPhone}
                  onChange={(e) => setSignInPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '0.9rem', fontWeight: 700, marginTop: '8px' }}>
                Sign In to Partner Portal
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Want to join our professional network?{' '}
                <button 
                  type="button" 
                  onClick={() => setDriverAuthTab('signup')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-yellow)', fontWeight: 700, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                >
                  Apply / Register Request
                </button>
              </div>
            </form>
          )}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '24px 0 16px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Testing</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
          </div>

          {/* Bypass Button */}
          <button 
            type="button"
            onClick={handleDriverBypass}
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px dashed var(--color-yellow)', background: 'rgba(255, 193, 7, 0.05)', color: 'var(--color-charcoal)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            ⚡ Bypass to Alexander Mercer (Demo)
          </button>

        </div>
      </div>
    );
  }

  if (!driver) return <div style={{ padding: '40px' }}>Driver profile loading...</div>;

  if (driver.kycStatus !== 'Verified') {
    return (
      <div className="driver-panel-container">
        {/* Simulator Selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-light)', padding: '12px 16px', borderRadius: '16px', marginBottom: '24px', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Simulate Partner:</span>
            <select 
              value={currentDriverId}
              onChange={handleDriverSelectChange}
              style={{ padding: '6px 12px', border: 'none', background: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}
            >
              {drivers.filter(d => d.id !== 'register' && !d.name.toLowerCase().includes('become')).map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.kycStatus === 'Verified' ? d.status.toUpperCase() : 'PENDING REVIEW'})</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => {
              setIsDriverLoggedIn(false);
              addToast('Signed Out', 'You have been logged out.', 'info');
            }}
            style={{ background: 'transparent', border: 'none', color: '#B71C1C', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign Out
          </button>
        </div>

        {/* Pending Screen */}
        <div className="driver-stat-card" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center', background: 'white', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-premium)' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 193, 7, 0.1)', color: 'var(--color-yellow)', borderRadius: '50%' }}>
            <Navigation className="map-pulse-dot" size={36} style={{ animation: 'pulse 2s infinite' }} />
          </div>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '8px', letterSpacing: '-0.5px' }}>Application Pending Review</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto 32px', lineHeight: 1.5 }}>
            Hello, <strong>{driver.name}</strong>. Your driver registration and background vetting application is currently being reviewed by the operations team.
          </p>

          {/* Stepper tracker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '360px', margin: '0 auto 40px', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-yellow)', color: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.75rem', flexShrink: 0, marginTop: '2px' }}>✓</div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Step 1: Application Received</h4>
                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '2px' }}>Basic details and license uploaded.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-yellow)', color: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.75rem', flexShrink: 0, marginTop: '2px' }}>✓</div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Step 2: Police Vetting & Check</h4>
                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '2px' }}>Background validation and records processed.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div className="map-pulse-dot" style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FFF9C4', border: '2px solid var(--color-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', position: 'relative' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-yellow)' }}></span>
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-yellow)' }}>Step 3: Admin Review & Activation</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Waiting for administrator approval.</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '10px', background: 'var(--color-bg-light)', padding: '16px 24px', borderRadius: '16px', border: '1px dashed var(--color-border)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Simulation Note:</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', margin: 0, fontWeight: 600 }}>
              💡 Switch to the <strong style={{ color: 'var(--color-yellow)' }}>Ops Admin</strong> panel in the switcher bar below, select the <strong>Chauffeur Vetting</strong> tab, and click <strong>Approve</strong>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="driver-panel-container">
      
      {/* Simulation Driver selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-light)', padding: '12px 16px', borderRadius: '16px', marginBottom: '24px', border: '1px solid var(--color-border)' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Simulate Partner:</span>
        <select 
          value={currentDriverId}
          onChange={handleDriverSelectChange}
          style={{ padding: '6px 12px', border: 'none', background: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}
        >
          {drivers.filter(d => d.id !== 'register' && !d.name.toLowerCase().includes('become')).map((d) => (
            <option key={d.id} value={d.id}>{d.name} ({d.kycStatus === 'Verified' ? d.status.toUpperCase() : 'PENDING REVIEW'})</option>
          ))}
        </select>
      </div>

      {/* Header */}
      <header className="driver-panel-header">
        <div className="driver-profile-info">
          <img src={driver.avatar} alt="Driver avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>{driver.name}</h3>
            <span style={{ fontSize: '0.75rem', color: '#888' }}>Driver Profile • {driver.experience} exp</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => {
              setIsDriverLoggedIn(false);
              addToast('Signed Out', 'You have been logged out of the Partner Portal.', 'info');
            }}
            style={{ background: 'transparent', border: 'none', color: '#C62828', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign Out
          </button>

          <div className="driver-status-toggle">
            <span className="toggle-label" style={{ color: driver.status === 'online' ? '#4CAF50' : '#888' }}>
              {driver.status === 'offline' ? 'Offline' : driver.status === 'busy' ? 'Busy' : 'Online'}
            </span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={driver.status === 'online' || driver.status === 'busy'} 
                onChange={() => toggleDriverStatus(driver.id)}
                disabled={driver.status === 'busy'}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </header>

      {/* Pulsing Ride Request Alert */}
      {driver.status === 'online' && pendingBooking && (
        <div className="ride-request-overlay">
          <div className="request-header">
            <div className="request-pulse-ring">
              <Navigation size={32} />
            </div>
            <h2>New Ride Request</h2>
            <p style={{ color: '#888', marginTop: '6px' }}>Accept in 15 seconds to lock booking.</p>
          </div>

          <div className="request-card">
            <div className="request-route-line">
              <div className="request-route-stop">
                <div className="request-stop-dot"></div>
                <div className="request-stop-info">
                  <h4>Pickup Address</h4>
                  <p>{pendingBooking.pickup.name}</p>
                </div>
              </div>

              <div className="request-route-stop" style={{ marginTop: '20px' }}>
                <div className="request-stop-dot dest"></div>
                <div className="request-stop-info">
                  <h4>Destination</h4>
                  <p>{pendingBooking.destination.name}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <span style={{ fontStyle: 'uppercase', color: '#888', fontSize: '0.75rem' }}>Ride Type</span>
                <p style={{ fontWeight: 700 }}>{pendingBooking.type}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontStyle: 'uppercase', color: '#888', fontSize: '0.75rem' }}>Your payout</span>
                <p style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-yellow)' }}>₹{Math.round(pendingBooking.fare * 0.8)}</p>
              </div>
            </div>
          </div>

          <div className="request-actions">
            <button className="btn-decline" onClick={handleDecline}>Decline</button>
            <button className="btn-accept" onClick={handleAccept}>Accept Booking</button>
          </div>
        </div>
      )}

      {/* Active Trip Navigation Console */}
      {activeBooking && (
        <div className="driver-terminal-card">
          <div className="terminal-status-header">
            <div>
              <span style={{ fontSize: '0.7rem', color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>Active Ride Terminal</span>
              <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>
                {activeBooking.status === 'accepted' && 'Heading to Pickup'}
                {activeBooking.status === 'arrived' && 'Arrived at Pickup'}
                {activeBooking.status === 'in_progress' && 'Heading to Destination'}
              </h3>
            </div>
            <span className={`status-badge ${activeBooking.status}`}>{activeBooking.status}</span>
          </div>

          <div className="dashboard-map-wrapper" style={{ height: '240px', marginBottom: '20px' }}>
            <Map activeBookingId={activeBooking.id} />
          </div>

          {['accepted', 'in_progress'].includes(activeBooking.status) && (
            <button 
              type="button"
              onClick={() => skipDriverMovement(activeBooking.id)}
              className="btn btn-secondary"
              style={{ width: '100%', marginBottom: '16px', background: 'var(--color-yellow)', borderColor: 'var(--color-yellow)', color: 'var(--color-charcoal)', fontWeight: 'bold' }}
            >
              ⚡ Fast Forward GPS (Skip Navigation)
            </button>
          )}

          {/* OTP Verification when driver reaches customer */}
          {activeBooking.status === 'arrived' && (
            <form onSubmit={handleStartTrip} className="terminal-otp-entry">
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Verify client security OTP code to start ride:
              </p>
              <div style={{ fontSize: '0.75rem', color: '#B71C1C', margin: '6px 0', fontWeight: 700 }}>
                Hint: Client OTP is <span style={{ textDecoration: 'underline' }}>{activeBooking.otp}</span> (or enter 4321)
              </div>
              <input 
                type="text" 
                maxLength="4" 
                placeholder="0000"
                value={otpVal}
                onChange={(e) => setOtpVal(e.target.value)}
                className="terminal-otp-input"
                required
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button 
                  type="button" 
                  onClick={() => setOtpVal(activeBooking.otp)}
                  className="btn btn-secondary"
                  style={{ flexGrow: 1, padding: '12px', fontSize: '0.8rem', borderRadius: '12px' }}
                >
                  Auto-fill OTP
                </button>
                <button type="submit" className="btn btn-primary" style={{ flexGrow: 1, padding: '12px', fontSize: '0.8rem', borderRadius: '12px' }}>
                  Start Trip
                </button>
              </div>
            </form>
          )}

          {/* End Ride Button during in progress */}
          {activeBooking.status === 'in_progress' && (
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Driving customer in their vehicle to destination...
              </p>
              <button onClick={handleEndTrip} className="btn btn-primary" style={{ width: '100%', padding: '16px', background: '#2E7D32', borderColor: '#2E7D32' }}>
                Complete Ride & Process Payment
              </button>
            </div>
          )}

          {/* Trip Coordinates Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px', padding: '16px', background: 'var(--color-bg-light)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Phone size={14} style={{ marginTop: '2px' }} />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#888' }}>Contact Client</span>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>+1 (555) 012-9988</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Normal Dashboard View */}
      {!activeBooking && (
        <>
          {/* Earnings Row */}
          <div className="driver-earnings-grid">
            <div className="driver-stat-card">
              <div className="driver-stat-label">Daily Earnings</div>
              <div className="driver-stat-val">₹{driver.dailyEarnings}</div>
            </div>
            <div className="driver-stat-card">
              <div className="driver-stat-label">Weekly Earnings</div>
              <div className="driver-stat-val">₹{driver.weeklyEarnings}</div>
            </div>
          </div>

          <div className="driver-stat-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <div className="driver-stat-label">Wallet Balance</div>
              <div className="driver-stat-val">₹{driver.walletBalance}</div>
            </div>
            <Wallet size={28} style={{ color: 'var(--color-yellow)' }} />
          </div>

          {/* Payout Request */}
          <div className="driver-stat-card" style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Withdraw Funds</h4>
            <form onSubmit={handleWithdrawSubmit} style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="number" 
                placeholder="Amount (₹)" 
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                required
                style={{ flexGrow: 1, padding: '10px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '10px', outline: 'none' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '0.8rem' }}>
                Request
              </button>
            </form>
          </div>

          {/* KYC Vetting Section */}
          <div className="driver-stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '0.9rem' }}>KYC Verification status</h4>
              <span className={`status-badge ${driver.kycStatus === 'Verified' ? 'completed' : 'pending'}`}>
                {driver.kycStatus}
              </span>
            </div>

            {driver.kycStatus !== 'Verified' ? (
              <div className="kyc-dropzone" onClick={handleKycUpload}>
                {!kycFileUploaded ? (
                  <>
                    <UploadCloud size={32} />
                    <p>
                      <strong>Click to upload</strong> or drag driving license image.
                    </p>
                  </>
                ) : (
                  <>
                    <CheckCircle size={32} style={{ color: '#4CAF50' }} />
                    <p style={{ color: '#4CAF50', fontWeight: 600 }}>File uploaded. Pending Approval.</p>
                  </>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px', color: '#2E7D32', fontSize: '0.85rem', fontWeight: 600, background: '#E8F5E9', padding: '12px', borderRadius: '12px' }}>
                <ShieldCheck size={18} />
                Documents verified. You are authorized to operate.
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
};
export default DriverPanel;
