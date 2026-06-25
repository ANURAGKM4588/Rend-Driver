import React, { useEffect, useState } from 'react';

const haversineKm = (p1, p2) => {
  const R = 6371;
  const dLat = (p2.lat - p1.lat) * (Math.PI / 180);
  const dLng = (p2.lng - p1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(p1.lat * (Math.PI / 180)) *
      Math.cos(p2.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const refineDistance = (km) => {
  const roadFactor = 1.15 + Math.random() * 0.15;
  return Math.round(km * roadFactor);
};

const estimateDuration = (roadKm) => {
  const avgSpeed = 35 + Math.random() * 10;
  const mins = Math.round((roadKm / avgSpeed) * 60);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
};

const generateTraffic = () => {
  const conditions = [
    { label: 'Moderate traffic', color: '#FBC02D', delay: '8–12 min' },
    { label: 'Light traffic', color: '#4CAF50', delay: '2–4 min' },
    { label: 'Heavy traffic', color: '#C62828', delay: '18–25 min' },
  ];
  return conditions[Math.floor(Math.random() * conditions.length)];
};

const generateExtras = (from, to) => {
  const routes = [
    { from: 'Thiruvananthapuram City', to: 'Kochi (Ernakulam)', alerts: [{ type: 'construction', loc: 'NH-66 near Kollam', delay: '5 min' }] },
    { from: 'Kochi (Ernakulam)', to: 'Thiruvananthapuram City', alerts: [{ type: 'construction', loc: 'NH-66 near Kollam', delay: '5 min' }] },
    { from: 'Kochi (Ernakulam)', to: 'Munnar Town', alerts: [{ type: 'toll', loc: 'Cochin Bypass', cost: 240 }] },
    { from: 'Kochi (Ernakulam)', to: 'Alappuzha (Alleppey)', alerts: [] },
    { from: 'Trivandrum International Airport', to: 'Thiruvananthapuram City', alerts: [{ type: 'roadwork', loc: 'Kazhakootam', delay: '3 min' }] },
    { from: 'Kochi International Airport (CIAL)', to: 'Kochi (Ernakulam)', alerts: [] },
    { from: 'Calicut International Airport', to: 'Kozhikode (Calicut)', alerts: [{ type: 'construction', loc: 'Karippur Rd', delay: '4 min' }] },
    { from: 'Kozhikode (Calicut)', to: 'Wayanad (Kalpetta)', alerts: [{ type: 'toll', loc: 'Kozhikode–Wayanad Rd', cost: 160 }] },
    { from: 'Alappuzha (Alleppey)', to: 'Kollam (Quilon)', alerts: [] },
    { from: 'Thrissur (Trichur)', to: 'Kochi (Ernakulam)', alerts: [{ type: 'roadwork', loc: 'Thrissur–Kochi Hwy', delay: '6 min' }] },
  ];
  const match = routes.find(r => r.from === from.name && r.to === to.name);
  if (match) return match.alerts;
  const pool = [
    { type: 'construction', loc: 'NH-66', delay: '3 min' },
    { type: 'toll', loc: 'Kerala State Hwy', cost: 160 },
  ];
  return Math.random() > 0.5 ? [pool[Math.floor(Math.random() * pool.length)]] : [];
};

const alertIcon = (type) => {
  switch (type) {
    case 'construction': return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    );
    case 'toll': return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <line x1="6" y1="10" x2="6" y2="14" /><line x1="10" y1="10" x2="10" y2="14" />
        <line x1="14" y1="10" x2="14" y2="14" /><line x1="18" y1="10" x2="18" y2="14" />
      </svg>
    );
    case 'event': return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
    case 'roadwork': return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
    default: return null;
  }
};

const RouteMap = ({ pickup, destination }) => {
  const [phase, setPhase] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!pickup || !destination) return;
    setPhase(0); setData(null);
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 500);
    const t3 = setTimeout(() => {
      const km = haversineKm(pickup, destination);
      const roadKm = refineDistance(km);
      const dur = estimateDuration(roadKm);
      const traffic = generateTraffic();
      const alerts = generateExtras(pickup, destination);
      setData({ roadKm, dur, traffic, alerts });
      setPhase(3);
    }, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [pickup, destination]);

  if (!pickup || !destination) return null;

  return (
    <div className="gm-style-panel">

      {/* Header */}
      <div className={`gm-header ${phase >= 1 ? 'show' : ''}`}>
        <div className="gm-header-top">
          <div className="gm-time">
            <span className="gm-time-num">{new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}</span>
            <span className="gm-time-label">Depart now</span>
          </div>
          {data && (
            <div className="gm-summary">
              <span className="gm-summary-main">{data.dur}</span>
              <span className="gm-summary-sub">{data.roadKm} km</span>
            </div>
          )}
        </div>
      </div>

      {/* Route Timeline */}
      <div className={`gm-timeline ${phase >= 1 ? 'show' : ''}`}>
        <div className="gm-timeline-point">
          <div className="gm-dot gm-dot-green" />
          <div className="gm-timeline-content">
            <span className="gm-timeline-label">Pickup</span>
            <span className="gm-timeline-name">{pickup.name}</span>
          </div>
        </div>

        {data && (
          <div className={`gm-traffic-chip ${phase >= 3 ? 'show' : ''}`}>
            <span className="gm-traffic-dot" style={{ background: data.traffic.color }} />
            <span>{data.traffic.label}</span>
            <span className="gm-traffic-delay">+{data.traffic.delay}</span>
          </div>
        )}

        <div className="gm-timeline-line" />

        <div className={`gm-timeline-point ${phase >= 2 ? 'show' : ''}`}>
          <div className="gm-dot gm-dot-red" />
          <div className="gm-timeline-content">
            <span className="gm-timeline-label">Dropoff</span>
            <span className="gm-timeline-name">{destination.name}</span>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {data && data.alerts.length > 0 && (
        <div className={`gm-alerts ${phase >= 3 ? 'show' : ''}`}>
          {data.alerts.map((a, i) => (
            <div key={i} className="gm-alert-row">
              {alertIcon(a.type)}
              <span className="gm-alert-text">
                {a.type === 'toll' ? `${a.loc} · ₹${a.cost}` : `${a.type} on ${a.loc} · ${a.delay}`}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default RouteMap;
