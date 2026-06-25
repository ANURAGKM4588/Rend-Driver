// src/context/PlatformContext.jsx
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { MOCK_DRIVERS, MOCK_LOCATIONS } from '../mockData';

const PlatformContext = createContext(null);

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};

export const PlatformProvider = ({ children }) => {
  // Roles: 'landing' (landing page), 'customer' (customer dashboard), 'driver' (driver app), 'admin' (operations control)
  const [role, setRole] = useState('landing');
  
  // Auth state simulation
  const [currentUser, setCurrentUser] = useState({
    name: 'Anurag Sharma',
    email: 'anurag@gmail.com',
    phone: '+91 98765 43210',
    walletBalance: 8500,
    savedLocations: [
      { id: 'loc_1', name: 'Home', address: 'Panampilly Nagar, Kochi, Kerala', lat: 9.9600, lng: 76.2700 },
      { id: 'loc_2', name: 'Office', address: 'MG Road, Kochi, Kerala', lat: 9.9710, lng: 76.2830 },
      { id: 'loc_3', name: 'CIAL Airport', address: 'Kochi International Airport, Kerala', lat: 10.1556, lng: 76.3914 }
    ],
    membership: 'Standard' // Standard, Premium, Elite
  });

  // Drivers state initialized from MOCK_DRIVERS
  const [drivers, setDrivers] = useState(MOCK_DRIVERS);
  
  // Driver View Mode: 'panel' (active driver terminal) or 'register' (partner application form)
  const [driverViewMode, setDriverViewMode] = useState('panel');

  // Currently simulated driver partner ID (shared across views)
  const [currentDriverId, setCurrentDriverId] = useState('drv_1');

  // Driver Login state (for approved driver partner portal login / registration)
  const [isDriverLoggedIn, setIsDriverLoggedIn] = useState(false);
  
  // Bookings list
  const [bookings, setBookings] = useState([
    {
      id: 'bk_9281',
      pickup: { name: 'Home (Panampilly Nagar)', address: 'Panampilly Nagar, Kochi, Kerala', lat: 9.9600, lng: 76.2700 },
      destination: { name: 'Office (MG Road)', address: 'MG Road, Kochi, Kerala', lat: 9.9710, lng: 76.2830 },
      date: '2026-06-25',
      time: '09:00 AM',
      type: 'One Way',
      fare: 899,
      status: 'completed',
      driverId: 'drv_1',
      rating: 5,
      timestamp: Date.now() - 1000 * 60 * 60 * 4, // 4 hours ago
      otp: '7829'
    },
    {
      id: 'bk_9282',
      pickup: { name: 'Office (MG Road)', address: 'MG Road, Kochi, Kerala', lat: 9.9710, lng: 76.2830 },
      destination: { name: 'CIAL Airport', address: 'Kochi International Airport, Kerala', lat: 10.1556, lng: 76.3914 },
      date: '2026-06-25',
      time: '02:30 PM',
      type: 'Airport Transfer',
      fare: 1499,
      status: 'completed',
      driverId: 'drv_2',
      rating: 4.8,
      timestamp: Date.now() - 1000 * 60 * 60 * 1, // 1 hour ago
      otp: '4289'
    }
  ]);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);
  
  // Simulation Timer references
  const trackingIntervals = useRef({});

  // Helper to add toast notifications (suppressed per user request)
  const addToast = (title, message, type = 'info') => {
    console.log(`[Notification Suppressed]: ${title} - ${message}`);
  };

  // Helper to remove a toast manually
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Switch role helper
  const changeRole = (newRole) => {
    setRole(newRole);
    addToast('Role Changed', `Switched to ${newRole.charAt(0).toUpperCase() + newRole.slice(1)} view`, 'success');
  };

  // Driver online/offline toggle
  const toggleDriverStatus = (driverId) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((d) => {
        if (d.id === driverId) {
          const nextStatus = d.status === 'online' ? 'offline' : 'online';
          addToast(
            nextStatus === 'online' ? 'Driver Online' : 'Driver Offline',
            `${d.name} is now ${nextStatus}`,
            nextStatus === 'online' ? 'success' : 'info'
          );
          return { ...d, status: nextStatus };
        }
        return d;
      })
    );
  };

  // Estimate Fare Helper
  const calculateFare = (pickup, destination, type) => {
    if (!pickup || !destination) return 0;
    
    // Simplistic distance-based calculation
    const R = 6371; // Radius of earth in km
    const dLat = (destination.lat - pickup.lat) * (Math.PI / 180);
    const dLng = (destination.lng - pickup.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(pickup.lat * (Math.PI / 180)) *
        Math.cos(destination.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c; // distance in km

    let base = 299;
    let ratePerKm = 15;

    if (type === 'Airport Transfer') {
      return 1499; // Fixed airport rate in INR
    } else if (type === 'Outstation Travel') {
      return Math.round(distanceKm * 18 + 1500);
    } else if (type === 'Hourly Booking') {
      return 699; // 3 hours min
    } else if (type === 'Night Chauffeur') {
      base = 399;
      ratePerKm = 20;
    }

    return Math.max(299, Math.round(base + distanceKm * ratePerKm));
  };

  // Create booking
  const createBooking = (pickup, destination, date, time, type) => {
    const fare = calculateFare(pickup, destination, type);
    
    // Generate a 4-digit OTP code
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    const newBooking = {
      id: `bk_${Math.floor(1000 + Math.random() * 9000)}`,
      pickup,
      destination,
      date: date || new Date().toISOString().split('T')[0],
      time: time || 'As Soon As Possible',
      type,
      fare,
      status: 'pending', // pending, accepted, arrived, in_progress, completed, cancelled
      driverId: null,
      rating: null,
      timestamp: Date.now(),
      otp
    };

    setBookings((prev) => [newBooking, ...prev]);
    addToast('Booking Created', 'Searching for nearby drivers...', 'success');
    
    // Auto-match system simulation (Admin Panel or Driver Panel can also manually accept, 
    // but we can make it so driver panel shows a prompt)
    return newBooking;
  };

  // Driver Accept Booking
  const acceptBooking = (bookingId, driverId) => {
    const driver = drivers.find((d) => d.id === driverId);
    if (!driver) return;

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          addToast('Driver Confirmed', `${driver.name} is on the way to your car.`, 'success');
          
          // Set driver busy
          setDrivers((prevDrivers) =>
            prevDrivers.map((d) => (d.id === driverId ? { ...d, status: 'busy' } : d))
          );
          
          // Trigger Driver Live Simulation towards Pickup
          simulateDriverMovement(bookingId, driverId, 'pickup');
          
          return { ...b, status: 'accepted', driverId };
        }
        return b;
      })
    );
  };

  // Driver Arrives at Customer Location (reaches pickup)
  const driverArrived = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const driver = drivers.find((d) => d.id === b.driverId);
          addToast('Driver Arrived', `${driver ? driver.name : 'Driver'} has arrived at your location. Please share the OTP.`, 'success');
          
          // Stop pickup movement interval
          if (trackingIntervals.current[bookingId]) {
            clearInterval(trackingIntervals.current[bookingId]);
            delete trackingIntervals.current[bookingId];
          }

          return { ...b, status: 'arrived' };
        }
        return b;
      })
    );
  };

  // Start Ride (Verify OTP)
  const startRide = (bookingId, otpCode) => {
    let verified = false;
    let targetBooking = null;

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          if (b.otp === otpCode || otpCode === '4321') { // Fallback bypass OTP for ease of testing
            verified = true;
            targetBooking = b;
            addToast('Ride Started', 'Heading to destination. Drive safe!', 'success');
            
            // Trigger Driver Live Simulation towards Destination
            simulateDriverMovement(bookingId, b.driverId, 'destination');
            
            return { ...b, status: 'in_progress' };
          } else {
            addToast('Invalid OTP', 'The OTP code you entered is incorrect.', 'error');
            return b;
          }
        }
        return b;
      })
    );

    return verified;
  };

  // Complete Ride
  const completeRide = (bookingId, rating = 5, comment = 'Smooth ride') => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const driverId = b.driverId;
          const driver = drivers.find((d) => d.id === driverId);
          
          // Charge customer wallet, pay driver wallet
          setCurrentUser((prevUser) => ({
            ...prevUser,
            walletBalance: Math.max(0, prevUser.walletBalance - b.fare)
          }));

          setDrivers((prevDrivers) =>
            prevDrivers.map((d) => {
              if (d.id === driverId) {
                // Add payout (80% of fare goes to driver, 20% commission)
                const payout = Math.round(b.fare * 0.8);
                const ratingCount = d.tripsCount;
                const newRating = parseFloat(((d.rating * ratingCount + rating) / (ratingCount + 1)).toFixed(2));
                
                return {
                  ...d,
                  status: 'online', // Available again
                  walletBalance: d.walletBalance + payout,
                  dailyEarnings: d.dailyEarnings + payout,
                  weeklyEarnings: d.weeklyEarnings + payout,
                  tripsCount: d.tripsCount + 1,
                  rating: newRating,
                  reviews: [{ id: Math.random().toString(), user: currentUser.name, rating, comment }, ...d.reviews]
                };
              }
              return d;
            })
          );

          addToast('Ride Completed', `Transaction processed. Charge: ₹${b.fare}. Rating: ${rating}★`, 'success');
          
          // Stop tracking interval
          if (trackingIntervals.current[bookingId]) {
            clearInterval(trackingIntervals.current[bookingId]);
            delete trackingIntervals.current[bookingId];
          }

          return { ...b, status: 'completed', rating };
        }
        return b;
      })
    );
  };

  // Cancel Booking
  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          if (b.driverId) {
            // Free the driver
            setDrivers((prevDrivers) =>
              prevDrivers.map((d) => (d.id === b.driverId ? { ...d, status: 'online' } : d))
            );
          }

          addToast('Ride Cancelled', 'Your booking has been cancelled successfully.', 'info');
          
          // Clean up interval
          if (trackingIntervals.current[bookingId]) {
            clearInterval(trackingIntervals.current[bookingId]);
            delete trackingIntervals.current[bookingId];
          }

          return { ...b, status: 'cancelled' };
        }
        return b;
      })
    );
  };

  // Simulate Driver Movement towards Pickup or Destination
  const simulateDriverMovement = (bookingId, driverId, phase = 'pickup') => {
    // If there is already an interval, clear it
    if (trackingIntervals.current[bookingId]) {
      clearInterval(trackingIntervals.current[bookingId]);
    }

    let step = 0;
    const totalSteps = 15; // 15 steps to complete the movement simulation

    const interval = setInterval(() => {
      // Find current booking and driver
      setBookings((currentBookings) => {
        const bk = currentBookings.find((b) => b.id === bookingId);
        if (!bk || bk.status === 'cancelled' || bk.status === 'completed') {
          clearInterval(interval);
          return currentBookings;
        }

        const startLat = phase === 'pickup' ? drivers.find((d) => d.id === driverId).lat : bk.pickup.lat;
        const startLng = phase === 'pickup' ? drivers.find((d) => d.id === driverId).lng : bk.pickup.lng;
        
        const targetLat = phase === 'pickup' ? bk.pickup.lat : bk.destination.lat;
        const targetLng = phase === 'pickup' ? bk.pickup.lng : bk.destination.lng;

        step += 1;
        const ratio = step / totalSteps;
        
        const currentLat = startLat + (targetLat - startLat) * ratio;
        const currentLng = startLng + (targetLng - startLng) * ratio;

        // Update driver coordinates in state
        setDrivers((prevDrivers) =>
          prevDrivers.map((d) => {
            if (d.id === driverId) {
              return { ...d, lat: currentLat, lng: currentLng };
            }
            return d;
          })
        );

        if (step >= totalSteps) {
          clearInterval(interval);
          delete trackingIntervals.current[bookingId];
          
          // Advance the state machine
          if (phase === 'pickup') {
            // Driver arrived at pickup
            setTimeout(() => {
              driverArrived(bookingId);
            }, 1000);
          } else {
            // Driver arrived at destination (completing)
            // Wait for driver to manually complete or simulate completion
            // We let it stay 'in_progress' until driver clicks "End Ride" or simulate auto-arrived
            addToast('Destination Reached', 'You have arrived at your destination.', 'success');
          }
        }

        return currentBookings;
      });

    }, 1500); // Step every 1.5s

    trackingIntervals.current[bookingId] = interval;
  };

  // Immediate Skip Driver Movement for faster testing
  const skipDriverMovement = (bookingId) => {
    if (trackingIntervals.current[bookingId]) {
      clearInterval(trackingIntervals.current[bookingId]);
      delete trackingIntervals.current[bookingId];
    }

    setBookings((currentBookings) => {
      const bk = currentBookings.find((b) => b.id === bookingId);
      if (!bk || bk.status === 'cancelled' || bk.status === 'completed') return currentBookings;

      const driverId = bk.driverId;
      const targetPhase = bk.status === 'accepted' ? 'pickup' : 'destination';
      const targetLat = targetPhase === 'pickup' ? bk.pickup.lat : bk.destination.lat;
      const targetLng = targetPhase === 'pickup' ? bk.pickup.lng : bk.destination.lng;

      // Update driver coordinates to target instantly
      setDrivers((prevDrivers) =>
        prevDrivers.map((d) => (d.id === driverId ? { ...d, lat: targetLat, lng: targetLng } : d))
      );

      if (targetPhase === 'pickup') {
        setTimeout(() => {
          driverArrived(bookingId);
        }, 100);
      } else {
        addToast('Destination Reached', 'You have arrived at your destination.', 'success');
      }

      return currentBookings;
    });
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      Object.values(trackingIntervals.current).forEach((interval) => clearInterval(interval));
    };
  }, []);

  // Admin Payout / Payout requests
  const processPayout = (driverId, amount) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((d) => {
        if (d.id === driverId) {
          if (d.walletBalance < amount) {
            addToast('Payout Failed', 'Insufficient wallet balance.', 'error');
            return d;
          }
          addToast('Payout Successful', `₹${amount} transferred to ${d.name}'s bank account.`, 'success');
          return { ...d, walletBalance: d.walletBalance - amount };
        }
        return d;
      })
    );
  };

  // Customer Wallet Deposit
  const addFundsToWallet = (amount) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      walletBalance: prevUser.walletBalance + amount
    }));
    addToast('Funds Added', `₹${amount} successfully added to your wallet.`, 'success');
  };

  // Register Driver
  const registerDriver = (details) => {
    const newDriver = {
      id: `drv_${Math.floor(1000 + Math.random() * 9000)}`,
      name: details.name,
      avatar: details.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      tripsCount: 0,
      experience: details.experience || '1 Year',
      status: 'offline', // Starts offline / pending
      lat: 9.9312 + (Math.random() - 0.5) * 0.02,
      lng: 76.2673 + (Math.random() - 0.5) * 0.02,
      phone: details.phone,
      licenseNumber: details.licenseNumber,
      kycStatus: 'Pending Approval', // Needs admin approval
      vehicleExpertise: details.vehicleExpertise || ['Sedan'],
      hourlyRate: parseFloat(details.hourlyRate) || 299,
      weeklyEarnings: 0,
      dailyEarnings: 0,
      walletBalance: 0,
      reviews: []
    };
    setDrivers((prev) => [...prev, newDriver]);
    addToast('Application Submitted', 'Your driver registration request is pending admin approval.', 'success');
    return newDriver;
  };

  // Approve Driver Application
  const approveDriver = (driverId) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === driverId ? { ...d, kycStatus: 'Verified', status: 'online' } : d
      )
    );
    addToast('Driver Approved', 'Partner account is now active and online.', 'success');
  };

  // Reject / Remove Driver Application
  const rejectDriver = (driverId) => {
    setDrivers((prev) => prev.filter((d) => d.id !== driverId));
    addToast('Driver Application Rejected', 'Application removed from operations log.', 'info');
  };

  // Add Driver Manually
  const addDriverManually = (details) => {
    const newDriver = {
      id: `drv_${Math.floor(1000 + Math.random() * 9000)}`,
      name: details.name,
      avatar: details.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      tripsCount: 0,
      experience: details.experience || '3 Years',
      status: 'online', // immediately online
      lat: 9.9312 + (Math.random() - 0.5) * 0.02,
      lng: 76.2673 + (Math.random() - 0.5) * 0.02,
      phone: details.phone,
      licenseNumber: details.licenseNumber,
      kycStatus: 'Verified', // pre-verified
      vehicleExpertise: details.vehicleExpertise || ['Sedan', 'SUV'],
      hourlyRate: parseFloat(details.hourlyRate) || 299,
      weeklyEarnings: 0,
      dailyEarnings: 0,
      walletBalance: 0,
      reviews: []
    };
    setDrivers((prev) => [...prev, newDriver]);
    addToast('Driver Added', `${details.name} added manually and is online.`, 'success');
    return newDriver;
  };

  return (
    <PlatformContext.Provider
      value={{
        role,
        changeRole,
        currentUser,
        setCurrentUser,
        drivers,
        setDrivers,
        bookings,
        setBookings,
        toasts,
        addToast,
        removeToast,
        toggleDriverStatus,
        createBooking,
        acceptBooking,
        driverArrived,
        startRide,
        completeRide,
        cancelBooking,
        processPayout,
        addFundsToWallet,
        skipDriverMovement,
        registerDriver,
        approveDriver,
        rejectDriver,
        addDriverManually,
        driverViewMode,
        setDriverViewMode,
        currentDriverId,
        setCurrentDriverId,
        isDriverLoggedIn,
        setIsDriverLoggedIn
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};
export default PlatformContext;

