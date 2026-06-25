// src/views/AdminDashboard.jsx
import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { Map } from '../components/Map';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { LayoutDashboard, Users, Car, CreditCard, ShieldAlert, Settings, Sparkles, TrendingUp, DollarSign, MapPin } from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    bookings, 
    drivers, 
    currentUser, 
    acceptBooking, 
    toggleDriverStatus, 
    processPayout,
    addToast,
    approveDriver,
    rejectDriver,
    addDriverManually,
    changeRole
  } = usePlatform();

  const [activeTab, setActiveTab] = useState('overview'); // overview, drivers, bookings, payouts, tickets
  const [selectedDriverForPayout, setSelectedDriverForPayout] = useState('');
  const [payoutAmount, setPayoutAmount] = useState('');

  // Manual Driver Form State
  const [manName, setManName] = useState('');
  const [manPhone, setManPhone] = useState('');
  const [manLicense, setManLicense] = useState('');
  const [manRate, setManRate] = useState('');
  const [manExpertise, setManExpertise] = useState('Sedan');

  const handleAddManualDriver = (e) => {
    e.preventDefault();
    if (!manName || !manPhone || !manLicense || !manRate) return;
    
    addDriverManually({
      name: manName,
      phone: manPhone,
      licenseNumber: manLicense,
      hourlyRate: manRate,
      vehicleExpertise: [manExpertise]
    });

    // Reset
    setManName('');
    setManPhone('');
    setManLicense('');
    setManRate('');
  };

  // Computations
  const activeBookingsCount = bookings.filter((b) => ['accepted', 'arrived', 'in_progress'].includes(b.status)).length;
  const onlineDriversCount = drivers.filter((d) => d.status === 'online').length;
  const busyDriversCount = drivers.filter((d) => d.status === 'busy').length;
  const offlineDriversCount = drivers.filter((d) => d.status === 'offline').length;
  
  const completedBookings = bookings.filter((b) => b.status === 'completed');
  const totalRevenue = completedBookings.reduce((sum, b) => sum + b.fare, 0);
  const platformCommission = Math.round(totalRevenue * 0.2); // 20% commission

  const handleManualDispatch = (bookingId, driverId) => {
    if (!driverId) return;
    acceptBooking(bookingId, driverId);
    addToast('Chauffeur Dispatched', 'Manual dispatch process initialized.', 'success');
  };

  const handlePayoutSubmit = (e) => {
    e.preventDefault();
    if (!selectedDriverForPayout || !payoutAmount) return;
    processPayout(selectedDriverForPayout, parseFloat(payoutAmount));
    setPayoutAmount('');
  };

  return (
    <div className="dashboard-container">
      
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div>
          <div className="sidebar-brand">
            <Car size={26} />
            Rent<span>Driver Ops</span>
          </div>

          <nav className="sidebar-menu">
            <button 
              className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <LayoutDashboard size={18} />
              Operations Center
            </button>
            
            <button 
              className={`sidebar-item ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <TrendingUp size={18} />
              Booking Control
            </button>

            <button 
              className={`sidebar-item ${activeTab === 'drivers' ? 'active' : ''}`}
              onClick={() => setActiveTab('drivers')}
            >
              <Users size={18} />
              Chauffeur Vetting
            </button>

            <button 
              className={`sidebar-item ${activeTab === 'payouts' ? 'active' : ''}`}
              onClick={() => setActiveTab('payouts')}
            >
              <CreditCard size={18} />
              Financial Ledger
            </button>

            <button 
              className={`sidebar-item ${activeTab === 'tickets' ? 'active' : ''}`}
              onClick={() => setActiveTab('tickets')}
            >
              <ShieldAlert size={18} />
              Emergency Support
            </button>
          </nav>
        </div>

        <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Admin" className="sidebar-avatar" />
            <div className="sidebar-user-details">
              <h5>Alexandra Mercer</h5>
              <p>Operations Lead</p>
            </div>
          </div>
          <button 
            onClick={() => changeRole('landing')}
            className="btn btn-secondary"
            style={{ width: '100%', padding: '10px', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#888', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            Exit Ops Desk
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="dashboard-main">
        
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-title-area">
            <h2>Operations Management</h2>
            <p>Real-time analytics and booking controllers.</p>
          </div>
          
          <div className="dashboard-actions">
            <div className="status-badge online">
              <div className="map-pulse-dot"></div>
              SYSTEM ACTIVE
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Live Trips</span>
              <TrendingUp className="stat-card-icon" size={16} />
            </div>
            <div className="stat-card-value">
              <AnimatedCounter value={activeBookingsCount} />
            </div>
            <div className="stat-card-footer positive">
              <span>{busyDriversCount} active on trip</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Chauffeurs Online</span>
              <Users className="stat-card-icon" size={16} />
            </div>
            <div className="stat-card-value">
              <AnimatedCounter value={onlineDriversCount} />
            </div>
            <div className="stat-card-footer neutral">
              <span>{offlineDriversCount} offline at home</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Total Revenue</span>
              <DollarSign className="stat-card-icon" size={16} />
            </div>
            <div className="stat-card-value">
              <AnimatedCounter value={totalRevenue} prefix="₹" />
            </div>
            <div className="stat-card-footer positive">
              <span>20% Platform split active</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Platform Earnings</span>
              <DollarSign className="stat-card-icon" size={16} />
            </div>
            <div className="stat-card-value">
              <AnimatedCounter value={platformCommission} prefix="₹" />
            </div>
            <div className="stat-card-footer positive">
              <span>Payouts auto-calculated</span>
            </div>
          </div>
        </section>

        {/* Tab Content A: Overview (Default) */}
        {activeTab === 'overview' && (
          <div className="dashboard-split-grid">
            {/* Live GPS Tracker */}
            <div className="dashboard-card">
              <div className="dashboard-card-title">
                <span>Live Partner Tracking</span>
                <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>Kochi Grid</span>
              </div>
              <div className="dashboard-map-wrapper">
                <div className="map-control-overlay">
                  <div className="map-pulse-dot"></div>
                  GPS FEED ACTIVE
                </div>
                <Map showAllDrivers={true} />
              </div>
            </div>

            {/* Quick Activity Logs */}
            <div className="dashboard-card">
              <h3 className="dashboard-card-title">Activity Stream</h3>
              <div className="mini-log-list">
                <div className="mini-log-item">
                  <div className="mini-log-icon">
                    <Sparkles size={16} />
                  </div>
                  <div className="mini-log-details">
                    <div className="mini-log-title">Platform Online Check</div>
                    <div className="mini-log-desc">Database synchronized with AWS/Firebase notification systems.</div>
                  </div>
                  <div className="mini-log-time">Just Now</div>
                </div>

                {bookings.slice(0, 3).map((b) => (
                  <div key={b.id} className="mini-log-item">
                    <div className="mini-log-icon">
                      <TrendingUp size={16} />
                    </div>
                    <div className="mini-log-details">
                      <div className="mini-log-title">Booking {b.id} Updated</div>
                      <div className="mini-log-desc">
                        Trip to {b.destination.name} is currently <b className={`status-badge ${b.status}`} style={{ padding: '2px 8px', fontSize: '0.65rem' }}>{b.status}</b>
                      </div>
                    </div>
                    <div className="mini-log-time">5m ago</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content B: Bookings */}
        {activeTab === 'bookings' && (
          <div className="dashboard-card">
            <h3 className="dashboard-card-title">All Customer Bookings</h3>
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Pickup</th>
                    <th>Destination</th>
                    <th>Fare</th>
                    <th>Driver Assigned</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => {
                    const assignedDrv = drivers.find((d) => d.id === b.driverId);
                    const pendingDrivers = drivers.filter((d) => d.status === 'online');
                    
                    return (
                      <tr key={b.id}>
                        <td><strong>{b.id}</strong></td>
                        <td>{b.pickup.name}</td>
                        <td>{b.destination.name}</td>
                        <td><strong>₹{b.fare}</strong></td>
                        <td>
                          {assignedDrv ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <img src={assignedDrv.avatar} alt="Driver" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                              {assignedDrv.name}
                            </span>
                          ) : (
                            <span style={{ color: '#C62828', fontWeight: 700 }}>None</span>
                          )}
                        </td>
                        <td>
                          <span className={`status-badge ${b.status}`}>{b.status}</span>
                        </td>
                        <td>
                          {b.status === 'pending' && (
                            <select 
                              defaultValue=""
                              onChange={(e) => handleManualDispatch(b.id, e.target.value)}
                              style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }}
                            >
                              <option value="" disabled>Dispatch Driver</option>
                              {pendingDrivers.map((drv) => (
                                <option key={drv.id} value={drv.id}>{drv.name} ({drv.rating}★)</option>
                              ))}
                            </select>
                          )}
                          {b.status !== 'pending' && (
                            <span style={{ color: '#888', fontSize: '0.8rem' }}>No Action Required</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content C: Drivers */}
        {activeTab === 'drivers' && (
          <div className="dashboard-split-grid" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Card 1: Pending Applications */}
              {drivers.filter(d => d.kycStatus !== 'Verified').length > 0 ? (
                <div className="dashboard-card">
                  <h3 className="dashboard-card-title" style={{ color: '#E65100', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="map-pulse-dot" style={{ background: '#FF9800' }}></span>
                    Pending Driver Applications ({drivers.filter(d => d.kycStatus !== 'Verified').length})
                  </h3>
                  <div className="premium-table-wrapper">
                    <table className="premium-table">
                      <thead>
                        <tr>
                          <th>Applicant</th>
                          <th>Phone</th>
                          <th>License</th>
                          <th>Rate</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drivers.filter(d => d.kycStatus !== 'Verified').map((drv) => (
                          <tr key={drv.id}>
                            <td>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src={drv.avatar} alt="Driver" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                  <strong>{drv.name}</strong>
                                  <div style={{ fontSize: '0.75rem', color: '#888' }}>{drv.experience} exp</div>
                                </div>
                              </span>
                            </td>
                            <td>{drv.phone}</td>
                            <td><strong>{drv.licenseNumber}</strong></td>
                            <td><strong>₹{drv.hourlyRate}/hr</strong></td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button 
                                  onClick={() => rejectDriver(drv.id)} 
                                  className="btn btn-secondary"
                                  style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px', color: '#C62828', borderColor: '#FFCDD2' }}
                                >
                                  Reject
                                </button>
                                <button 
                                  onClick={() => approveDriver(drv.id)} 
                                  className="btn btn-primary"
                                  style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px', background: '#2E7D32', borderColor: '#2E7D32' }}
                                >
                                  Approve
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="dashboard-card" style={{ padding: '32px', textAlign: 'center', color: '#666', border: '1px dashed var(--color-border)', borderRadius: '24px' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>No pending applications currently.</p>
                  <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>New partner registration requests will appear here.</p>
                </div>
              )}

              {/* Card 2: Verified Chauffeurs Roster */}
              <div className="dashboard-card">
                <h3 className="dashboard-card-title">Verified Chauffeurs ({drivers.filter(d => d.kycStatus === 'Verified').length})</h3>
                <div className="premium-table-wrapper">
                  <table className="premium-table">
                    <thead>
                      <tr>
                        <th>Chauffeur</th>
                        <th>Hourly Rate</th>
                        <th>Rating</th>
                        <th>Trips</th>
                        <th>Status</th>
                        <th>Toggle Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {drivers.filter(d => d.kycStatus === 'Verified').map((drv) => (
                        <tr key={drv.id}>
                          <td>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img src={drv.avatar} alt="Driver" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                              <div>
                                <strong>{drv.name}</strong>
                                <div style={{ fontSize: '0.75rem', color: '#888' }}>{drv.licenseNumber}</div>
                              </div>
                            </span>
                          </td>
                          <td><strong>₹{drv.hourlyRate}/hr</strong></td>
                          <td><strong>{drv.rating} ★</strong></td>
                          <td>{drv.tripsCount} trips</td>
                          <td>
                            <span className={`status-badge ${drv.status}`}>{drv.status}</span>
                          </td>
                          <td>
                            <button 
                              onClick={() => toggleDriverStatus(drv.id)} 
                              className="btn btn-secondary"
                              style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px' }}
                            >
                              Toggle Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Card 3: Add Driver Manually Form */}
            <div className="dashboard-card" style={{ height: 'fit-content' }}>
              <h3 className="dashboard-card-title">Add Driver Manually</h3>
              <form onSubmit={handleAddManualDriver} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="input-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name"
                    value={manName}
                    onChange={(e) => setManName(e.target.value)}
                    required
                    style={{ padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>
                
                <div className="input-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    value={manPhone}
                    onChange={(e) => setManPhone(e.target.value)}
                    required
                    style={{ padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="input-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Driving License Number</label>
                  <input 
                    type="text" 
                    placeholder="DL-XXXXXXXX"
                    value={manLicense}
                    onChange={(e) => setManLicense(e.target.value)}
                    required
                    style={{ padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="input-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Hourly Rate (₹/hr)</label>
                  <input 
                    type="number" 
                    placeholder="300"
                    value={manRate}
                    onChange={(e) => setManRate(e.target.value)}
                    required
                    style={{ padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="input-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px', display: 'block' }}>Vehicle Expertise</label>
                  <select 
                    value={manExpertise}
                    onChange={(e) => setManExpertise(e.target.value)}
                    required
                    style={{ padding: '12px 16px', background: 'var(--color-bg-light)', border: '1px solid var(--color-border)', borderRadius: '12px', outline: 'none', fontSize: '0.9rem' }}
                  >
                    <option value="Sedan">Sedan (Daily Commute)</option>
                    <option value="SUV">SUV (Spacious & Tough)</option>
                    <option value="Luxury">Luxury (Premium Sedans/SUVs)</option>
                    <option value="Hatchback">Hatchback (City Compact)</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  Register Chauffeur
                </button>
              </form>
            </div>

          </div>
        )}

        {/* Tab Content D: Payouts */}
        {activeTab === 'payouts' && (
          <div className="dashboard-split-grid" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
            <div className="dashboard-card">
              <h3 className="dashboard-card-title">Driver Earnings Summary</h3>
              <div className="premium-table-wrapper">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Chauffeur</th>
                      <th>Wallet Balance</th>
                      <th>Weekly Earnings</th>
                      <th>Daily Earnings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.map((drv) => (
                      <tr key={drv.id}>
                        <td><strong>{drv.name}</strong></td>
                        <td><strong>₹{drv.walletBalance}</strong></td>
                        <td style={{ color: '#2E7D32', fontWeight: 600 }}>₹{drv.weeklyEarnings}</td>
                        <td>₹{drv.dailyEarnings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="dashboard-card-title">Process Financial Payout</h3>
              <form onSubmit={handlePayoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="input-group">
                  <label>Select Driver</label>
                  <select 
                    value={selectedDriverForPayout}
                    onChange={(e) => setSelectedDriverForPayout(e.target.value)}
                    required
                    style={{ padding: '16px', background: 'var(--color-bg-light)', border: '1px solid transparent', borderRadius: '12px', outline: 'none' }}
                  >
                    <option value="" disabled>Choose partner</option>
                    {drivers.filter(d => d.id !== 'register' && !d.name.toLowerCase().includes('become')).map((drv) => (
                      <option key={drv.id} value={drv.id}>{drv.name} (Wallet: ₹{drv.walletBalance})</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Payout Amount (₹)</label>
                  <input 
                    type="number" 
                    placeholder="Enter amount"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    required
                    style={{ padding: '16px', background: 'var(--color-bg-light)', border: '1px solid transparent', borderRadius: '12px', outline: 'none' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Approve & Pay Out
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab Content E: Emergency Tickets */}
        {activeTab === 'tickets' && (
          <div className="dashboard-card">
            <h3 className="dashboard-card-title">Emergency Signals & Support Tickets</h3>
            <div className="mini-log-list">
              <div className="mini-log-item" style={{ borderLeft: '4px solid #C62828', background: '#FFFEB2' }}>
                <div className="mini-log-icon" style={{ background: '#FFCDD2', color: '#B71C1C' }}>
                  <ShieldAlert size={16} />
                </div>
                <div className="mini-log-details">
                  <div className="mini-log-title" style={{ color: '#B71C1C' }}>Active SOS Trigger ( b9282 )</div>
                  <div className="mini-log-desc">Passenger reported safe. Highway traffic delay. Dispatching supervisor support.</div>
                </div>
                <button className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem' }} onClick={() => addToast('SOS Solved', 'Ticket resolved. Driver verified safe.', 'success')}>
                  Mark Resolved
                </button>
              </div>

              <div className="mini-log-item">
                <div className="mini-log-icon">
                  <ShieldAlert size={16} />
                </div>
                <div className="mini-log-details">
                  <div className="mini-log-title">KYC Renewal Issue</div>
                  <div className="mini-log-desc">Elena Rostova uploaded license. Operations team verification pending.</div>
                </div>
                <button className="btn btn-secondary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem' }} onClick={() => addToast('KYC Approved', 'License verified successfully.', 'success')}>
                  Approve License
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
export default AdminDashboard;
