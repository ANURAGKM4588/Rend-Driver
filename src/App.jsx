// src/App.jsx
import React, { useEffect, useState } from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import LandingPage from './views/LandingPage';
import AdminDashboard from './views/AdminDashboard';
import DriverPanel from './views/DriverPanel';
import CustomerPanel from './views/CustomerPanel';
import { User, Shield, Car, UserCheck, ShieldAlert } from 'lucide-react';

function InnerApp() {
  const { role, changeRole } = usePlatform();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll and Cursor Handlers
  useEffect(() => {
    // Scroll progress handler
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };

    // Custom cursor handler
    const cursor = document.querySelector('.custom-cursor');
    const handleMouseMove = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };

    const handleMouseEnter = () => {
      document.body.classList.add('cursor-active');
    };

    const handleMouseLeave = () => {
      document.body.classList.remove('cursor-active');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Custom Cursor Circle */}
      <div className="custom-cursor"></div>

      {/* Toast Alert stack disabled per request */}

      {/* App Shell Navigation (hide on admin panel for immersive workspace feel) */}
      {role !== 'admin' && <Navbar />}

      {/* Dynamic View Render */}
      <main style={{ minHeight: role === 'admin' ? '100vh' : 'calc(100vh - 160px)' }}>
        {role === 'landing' && <LandingPage />}
        {role === 'customer' && <CustomerPanel />}
        {role === 'driver' && <DriverPanel />}
        {role === 'admin' && <AdminDashboard />}
      </main>

      {/* App Footer */}
      {role !== 'admin' && <Footer />}


    </>
  );
}

export default function App() {
  return (
    <PlatformProvider>
      <InnerApp />
    </PlatformProvider>
  );
}
