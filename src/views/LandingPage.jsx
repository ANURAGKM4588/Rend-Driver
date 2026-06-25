// src/views/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { BookingWidget } from '../components/BookingWidget';
import { HeroIllustration } from '../components/HeroIllustration';
import { PRICING_PLANS, FAQS, SERVICES } from '../mockData';
import { getRouteDirections } from '../utils/googlePlaces';
import { ShieldCheck, UserCheck, Star, Users, MapPin, PhoneCall, ChevronRight, Apple, Play, Compass, ArrowRight, Route, Clock, AlertTriangle, Navigation } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LandingPage = () => {
  const { changeRole, setDriverViewMode, currentDriverId, drivers, setIsDriverLoggedIn } = usePlatform();
  const [activeFaq, setActiveFaq] = useState(null);
  const [mapPickup, setMapPickup] = useState(null);
  const [mapDest, setMapDest] = useState(null);
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    if (!mapPickup || !mapDest) {
      setRouteData(null);
      return;
    }
    getRouteDirections(mapPickup, mapDest).then((data) => {
      if (data) setRouteData(data);
    });
  }, [mapPickup, mapDest]);

  const hourNow = new Date().getHours();
  const timeTraffic = hourNow >= 8 && hourNow <= 10 ? 'Heavy' : hourNow >= 17 && hourNow <= 20 ? 'Heavy' : hourNow >= 11 && hourNow <= 16 ? 'Moderate' : 'Light';
  const trafficStatus = routeData?.hasTraffic ? 'Live' : timeTraffic;
  const trafficColor = trafficStatus === 'Live' ? '#1a73e8' : trafficStatus === 'Heavy' ? '#EA4335' : trafficStatus === 'Moderate' ? '#FBBC04' : '#34A853';

  // GSAP animations with React StrictMode double-render cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-hero', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );

      gsap.fromTo('.reveal-card', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.trust-grid',
            start: 'top 80%'
          }
        }
      );
    });

    return () => ctx.revert(); // clean up GSAP animations on unmount
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Main Hero Section */}
      <section id="hero" className="hero-container">
        <div className="hero-content">
          <div className="hero-badge reveal-hero">
            <ShieldCheck size={16} />
            Police Verified & Insured Drivers
          </div>
          <h1 className="reveal-hero">Book a Professional Driver Anytime.</h1>
          <p className="reveal-hero">
            Verified drivers delivered to your doorstep whenever you need them. Use your own car with absolute peace of mind.
          </p>
          <div className="hero-buttons reveal-hero">
            <button onClick={() => changeRole('customer')} className="btn btn-primary">
              Book Driver Now
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => {
                setDriverViewMode('register');
                setIsDriverLoggedIn(false);
                changeRole('driver');
              }}
              className="btn btn-secondary"
            >
              Become a Driver
            </button>
          </div>
        </div>

        {/* Right side: Premium City Skyline Illustration */}
        <div className="reveal-hero" style={{ width: '100%' }}>
          <HeroIllustration />
        </div>
      </section>

      {/* ---- Route Info + Booking Section ---- */}
      <section id="route-section" className="route-section">
        <div className="route-info-panel">
          <div className="route-info-header">
            <Route size={20} />
            <span>Trip Overview</span>
          </div>
          <div className="route-info-route">
            <div className="route-info-point">
              <span className="route-dot pickup" />
              <span>{mapPickup?.name || 'Pickup location'}</span>
            </div>
            <div className="route-info-line" />
            <div className="route-info-point">
              <span className="route-dot dest" />
              <span>{mapDest?.name || 'Destination'}</span>
            </div>
          </div>
          <div className="route-info-stats">
            <div className="route-stat wide">
              <Navigation size={20} />
              <div>
                <span className="route-stat-label">Distance</span>
                <span className="route-stat-value large">{routeData ? routeData.distanceText : '--'}</span>
              </div>
            </div>
            <div className="route-stat wide">
              <Clock size={20} />
              <div>
                <span className="route-stat-label">Total Duration</span>
                <span className="route-stat-value large">{routeData ? routeData.durationText : '--'}</span>
              </div>
            </div>
            <div className="route-stat wide">
              <MapPin size={20} />
              <div>
                <span className="route-stat-label">Est. Arrival</span>
                <span className="route-stat-value large">
                  {routeData?.durationSec
                    ? new Date(Date.now() + routeData.durationSec * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                    : '--'}
                </span>
              </div>
            </div>
            <div className="route-stat">
              <AlertTriangle size={18} />
              <div>
                <span className="route-stat-label">Traffic</span>
                <span className="route-stat-value" style={{ color: routeData ? trafficColor : '#ccc' }}>{routeData ? trafficStatus : '--'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="route-booking-panel">
          <BookingWidget
            onComplete={() => changeRole('customer')}
            onPickupChange={(loc) => setMapPickup(loc)}
            onDestinationChange={(loc) => setMapDest(loc)}
            externalPickup={mapPickup}
            externalDestination={mapDest}
            routeDistanceKm={routeData?.distanceKm}
            routeDurationSec={routeData?.durationSec}
          />
        </div>
      </section>

      {/* Driver Trust Section */}
      <section id="trust" className="trust-section">
        <div className="section-header">
          <span className="section-subtitle">Absolute Trust</span>
          <h2 className="section-title">Safety first, drive second.</h2>
        </div>
        <div className="trust-grid">
          <div className="trust-card reveal-card">
            <div className="trust-icon-box">
              <ShieldCheck size={28} />
            </div>
            <h3>Police Verified Drivers</h3>
            <p>Every chauffeur undergoes comprehensive police verification and digital fingerprint scanning before activation.</p>
          </div>

          <div className="trust-card reveal-card">
            <div className="trust-icon-box">
              <UserCheck size={28} />
            </div>
            <h3>Background Checked</h3>
            <p>We review criminal records, drug screening history, driving history and license validity across multiple databases.</p>
          </div>

          <div className="trust-card reveal-card">
            <div className="trust-icon-box">
              <Star size={28} />
            </div>
            <h3>Professional Chauffeurs</h3>
            <p>Drivers complete intensive defensive driving courses, customer hospitality grooming, and tech usage workshops.</p>
          </div>

          <div className="trust-card reveal-card">
            <div className="trust-icon-box">
              <Users size={28} />
            </div>
            <h3>OTP Ride Start</h3>
            <p>Your vehicle only moves when you provide the unique 4-digit security PIN generated in your app.</p>
          </div>

          <div className="trust-card reveal-card">
            <div className="trust-icon-box">
              <MapPin size={28} />
            </div>
            <h3>Live GPS Tracking</h3>
            <p>Track your car location, current speeds, and travel routes in real-time on our interactive maps.</p>
          </div>

          <div className="trust-card reveal-card">
            <div className="trust-icon-box">
              <PhoneCall size={28} />
            </div>
            <h3>24x7 Operations Room</h3>
            <p>Our dedicated operations support center monitors every active ride and answers emergencies instantly.</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="steps-section">
        <div className="steps-container">
          <div className="section-header" style={{ marginBottom: '30px' }}>
            <span className="section-subtitle">How it works</span>
            <h2 className="section-title">Chauffeur in four steps.</h2>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">01</span>
              <div className="step-content">
                <Compass className="step-icon" size={24} />
                <h3>Book Driver</h3>
                <p>Enter pickup location, destination, vehicle category, date and time using our booking widget.</p>
              </div>
            </div>

            <div className="step-card">
              <span className="step-number">02</span>
              <div className="step-content">
                <MapPin className="step-icon" size={24} />
                <h3>Driver Arrives</h3>
                <p>A background checked partner arrives at your address and prepares your vehicle for travel.</p>
              </div>
            </div>

            <div className="step-card">
              <span className="step-number">03</span>
              <div className="step-content">
                <ShieldCheck className="step-icon" size={24} />
                <h3>Drive Comfortably</h3>
                <p>Share the secure OTP with the driver, lean back in the comfort of your backseat, and enjoy the ride.</p>
              </div>
            </div>

            <div className="step-card">
              <span className="step-number">04</span>
              <div className="step-content">
                <Star className="step-icon" size={24} />
                <h3>Complete Ride</h3>
                <p>Complete payment automatically via saved wallet cards, rate the driver's performance, and download invoices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="services-section">
        <div className="steps-container">
          <div className="section-header">
            <span className="section-subtitle">Tailored Services</span>
            <h2 className="section-title">A driver for every scenario.</h2>
          </div>
          <div className="services-grid">
            {SERVICES.map((srv) => (
              <div key={srv.id} className="service-card">
                <ShieldCheck size={20} />
                <span>{srv.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" className="pricing-section">
        <div className="steps-container">
          <div className="section-header">
            <span className="section-subtitle">Transparent Pricing</span>
            <h2 className="section-title">No hidden fees, no surges.</h2>
          </div>
          <div className="pricing-grid">
            {PRICING_PLANS.map((plan, idx) => (
              <div key={plan.id} className={`pricing-card ${idx === 0 ? 'premium' : ''}`}>
                {idx === 0 && <span className="pricing-badge">Popular</span>}
                <h3 className="pricing-title">{plan.title}</h3>
                <p className="pricing-desc">{plan.description}</p>
                <div className="pricing-rate">
                  <span className="pricing-amount">{plan.price}</span>
                  <span className="pricing-unit">/ {plan.unit}</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((f, i) => (
                    <li key={i}>
                      <ShieldCheck size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => changeRole('customer')} className={`btn ${idx === 0 ? 'btn-primary' : 'btn-secondary'}`}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="safety-section">
        <div className="safety-wrapper">
          <div className="safety-info">
            <span className="section-subtitle" style={{ alignSelf: 'flex-start' }}>Insurance & SOS</span>
            <h2>Your Safety, Double Assured.</h2>
            <p>
              We cover your vehicle during active bookings with secondary comprehensive protection policies and provide dynamic instant tools.
            </p>
            <div className="safety-features">
              <div className="safety-item">
                <div className="safety-item-icon">
                  <ShieldCheck size={20} />
                </div>
                <h4>Emergency SOS Button</h4>
                <p>One-tap call triggers alerts to closest emergency centers, operations room, and emergency contacts.</p>
              </div>

              <div className="safety-item">
                <div className="safety-item-icon">
                  <MapPin size={20} />
                </div>
                <h4>Trip Route Sharing</h4>
                <p>Instantly share dynamic map links with family members, allowing them to track your coordinate journey.</p>
              </div>
            </div>
          </div>

          <div className="safety-badge-panel">
            <h3>₹50 Lakh Insurance Cover</h3>
            <p>
              Every active trip is insured against damages, public liability, and medical coverage options, protecting both your premium car and passengers.
            </p>
            <div className="insurance-details">
              <div className="insurance-row">
                <span className="insurance-label">Vehicle Damages</span>
                <span className="insurance-val">Up to ₹15 Lakhs</span>
              </div>
              <div className="insurance-row">
                <span className="insurance-label">Public Liability</span>
                <span className="insurance-val">Up to ₹30 Lakhs</span>
              </div>
              <div className="insurance-row">
                <span className="insurance-label">Medical Expense</span>
                <span className="insurance-val">Up to ₹5 Lakhs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="section-header">
            <span className="section-subtitle">Testimonials</span>
            <h2 className="section-title">Trusted by luxury car owners.</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "RentDriver has solved all my weekend commuting issues. Handing over my Mercedes keys to a vetted professional driver is smooth."
              </p>
              <div className="testimonial-user">
                <img className="testimonial-avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Marcus" />
                <div className="testimonial-user-info">
                  <h5>Marcus Vance</h5>
                  <p>Tech Founder, Mercedes S-Class Owner</p>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "We use RentDriver for senior citizen family assistance. Driver Elena Rostova arrived early and took care of my parents' medical visit."
              </p>
              <div className="testimonial-user">
                <img className="testimonial-avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Sarah" />
                <div className="testimonial-user-info">
                  <h5>Sarah Jenkins</h5>
                  <p>VP Operations, Tesla Model Y Owner</p>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "Outstation roadtrips to Napa Valley are no longer exhausting. The highway drivers are extremely professional and safe navigators."
              </p>
              <div className="testimonial-user">
                <img className="testimonial-avatar" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="David" />
                <div className="testimonial-user-info">
                  <h5>David Kim</h5>
                  <p>Design Director, BMW X5 Owner</p>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="faq-section">
        <div className="steps-container">
          <div className="section-header">
            <span className="section-subtitle">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-container">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-header">
                  <h3>{faq.q}</h3>
                  <div className="faq-toggle">
                    <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>+</span>
                  </div>
                </div>
                <div className="faq-body">
                  <div className="faq-content">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="download-section">
        <div className="download-wrapper">
          <div className="download-content">
            <h2>Your personal driver, just a tap away.</h2>
            <p>
              Download our mobile application on iOS and Android platforms to manage bookings, track driver routes, and manage corporate profiles easily.
            </p>
            <div className="download-buttons">
              <a href="#" onClick={(e) => e.preventDefault()} className="app-store-btn">
                <Apple size={24} />
                <div className="app-store-text">
                  <span>Download on the</span>
                  <span>App Store</span>
                </div>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="app-store-btn">
                <Play size={24} />
                <div className="app-store-text">
                  <span>Get it on</span>
                  <span>Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <div className="download-mockup">
            <div className="phone-mockup-frame">
              <div className="phone-screen">
                <div className="phone-header">
                  <span>9:41</span>
                  <span>5G</span>
                </div>
                <div className="phone-content">
                  <div className="phone-logo">
                    <Compass size={32} style={{ color: '#FFC107' }} />
                    Rent<span>Driver</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>Drivers Vetted. Trips Secured.</p>
                  <div style={{ width: '120px', height: '120px', border: '1px solid #ddd', borderRadius: '16px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.65rem', color: '#999', fontWeight: 700 }}>QR CODE SCAN</span>
                  </div>
                </div>
                <div className="phone-footer">
                  <span>Swipe up to open platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
export default LandingPage;
