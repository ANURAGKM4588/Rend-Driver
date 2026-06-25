// src/components/HeroIllustration.jsx
import React from 'react';

export const HeroIllustration = () => {
  const routePath = "M 140,340 C 200,340 260,280 340,280 C 420,280 460,200 540,180 C 620,160 680,100 780,100 C 830,100 860,120 880,140";

  return (
    <div className="hero-illustration-wrapper" style={{ width: '100%', position: 'relative', overflow: 'hidden', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      <style>{`
        @keyframes draw-route {
          from { stroke-dashoffset: 1200; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes dash-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -16; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes spin-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce-marker {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes bounce-marker-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes expand-ring {
          0% { r: 15; opacity: 0.4; stroke-width: 3; }
          100% { r: 45; opacity: 0; stroke-width: 0.5; }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0); opacity: 0.15; }
          50% { transform: translateY(-10px); opacity: 0.3; }
        }
        @keyframes float-particle-2 {
          0%, 100% { transform: translateY(0); opacity: 0.12; }
          50% { transform: translateY(-14px); opacity: 0.25; }
        }
        @keyframes float-particle-3 {
          0%, 100% { transform: translateY(0); opacity: 0.1; }
          50% { transform: translateY(-8px); opacity: 0.2; }
        }
        @keyframes fade-pulse {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.2; }
        }
        @keyframes scan-line {
          0% { transform: translateY(-200px); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(200px); opacity: 0; }
        }
        @keyframes loading-fill {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes waypoint-pulse {
          0%, 100% { r: 4; opacity: 0.4; }
          50% { r: 7; opacity: 0.8; }
        }

        .anim-route { animation: draw-route 2s ease-out forwards; }
        .anim-dash { animation: dash-flow 1.5s linear infinite; }
        .anim-glow { animation: glow-pulse 3s ease-in-out infinite; transform-origin: 500px 225px; }
        .anim-spin { animation: spin-ring 25s linear infinite; transform-origin: 500px 225px; }
        .anim-bounce { animation: bounce-marker 2s ease-in-out infinite; }
        .anim-bounce-delayed { animation: bounce-marker-delayed 2s ease-in-out 1s infinite; }
        .anim-expand { animation: expand-ring 2.5s ease-out infinite; }
        .anim-expand-delayed { animation: expand-ring 2.5s ease-out 1.25s infinite; }
        .anim-particle-1 { animation: float-particle 3s ease-in-out infinite; }
        .anim-particle-2 { animation: float-particle-2 4s ease-in-out infinite 0.5s; }
        .anim-particle-3 { animation: float-particle-3 3.5s ease-in-out infinite 1s; }
        .anim-particle-4 { animation: float-particle 4.5s ease-in-out infinite 1.5s; }
        .anim-particle-5 { animation: float-particle-2 3.8s ease-in-out infinite 2s; }
        .anim-fade { animation: fade-pulse 3s ease-in-out infinite; }
        .anim-scan { animation: scan-line 4s ease-in-out infinite; }
        .anim-waypoint { animation: waypoint-pulse 2s ease-in-out infinite; }
        .anim-waypoint-2 { animation: waypoint-pulse 2s ease-in-out 0.5s infinite; }
        .anim-waypoint-3 { animation: waypoint-pulse 2s ease-in-out 1s infinite; }

        .bar-dot {
          offset-path: path("M 300,430 L 700,430");
          offset-rotate: auto;
          animation: bar-sweep 4s ease-in-out infinite alternate;
        }
        @keyframes bar-sweep {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }

        .car-move {
          offset-path: path("${routePath}");
          offset-rotate: auto;
          offset-distance: 0%;
        }
      `}</style>

      <svg 
        viewBox="0 0 1000 450" 
        width="100%" 
        height="100%" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#111111" />
            <stop offset="50%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
          <linearGradient id="glowGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFC107" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#111111" stopOpacity="0.04" />
          </linearGradient>
          <radialGradient id="scanGrad">
            <stop offset="0%" stopColor="#FFC107" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFC107" stopOpacity="0" />
          </radialGradient>
          <filter id="blurLight">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Map grid */}
        <g stroke="#E5E5DF" strokeWidth="0.8" opacity="0.5">
          {Array.from({ length: 20 }, (_, i) => (
            <line key={`hg-${i}`} x1={i * 55} y1="0" x2={i * 55} y2="450" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`vg-${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} />
          ))}
        </g>

        {/* Scanning radar line */}
        <rect x="0" y="100" width="1000" height="2" fill="url(#scanGrad)" className="anim-scan" filter="url(#blurLight)" />

        {/* Radial glow */}
        <circle cx="500" cy="225" r="200" fill="url(#glowGrad)" className="anim-glow" filter="url(#blurLight)" />

        {/* Compass rings */}
        <circle cx="500" cy="225" r="170" stroke="#E5E5DF" strokeWidth="1" strokeDasharray="4,10" className="anim-spin" />
        <circle cx="500" cy="225" r="160" stroke="#F0F0ED" strokeWidth="0.5" />
        <circle cx="500" cy="225" r="185" stroke="#E5E5DF" strokeWidth="0.5" strokeDasharray="2,6" className="anim-spin" style={{ animationDirection: 'reverse', animationDuration: '35s' }} />

        {/* Cardinal direction labels */}
        <text x="500" y="48" textAnchor="middle" fill="#D5D5CF" fontSize="9" fontWeight="600" className="anim-fade">N</text>
        <text x="500" y="410" textAnchor="middle" fill="#D5D5CF" fontSize="9" fontWeight="600" className="anim-fade" style={{ animationDelay: '1.5s' }}>S</text>
        <text x="37" y="229" textAnchor="middle" fill="#D5D5CF" fontSize="9" fontWeight="600" className="anim-fade" style={{ animationDelay: '0.5s' }}>W</text>
        <text x="963" y="229" textAnchor="middle" fill="#D5D5CF" fontSize="9" fontWeight="600" className="anim-fade" style={{ animationDelay: '1s' }}>E</text>

        {/* Route path */}
        <path
          className="anim-route"
          d={routePath}
          stroke="url(#routeGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1200"
          fill="none"
        />

        {/* Route glow (blurred underneath) */}
        <path
          d={routePath}
          stroke="#FFC107"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.08"
          filter="url(#blurLight)"
          className="anim-route"
          strokeDasharray="1200"
        />

        {/* Animated dashed overlay */}
        <path
          className="anim-dash"
          d={routePath}
          stroke="#111111"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8,14"
          fill="none"
          opacity="0.25"
        />

        {/* Waypoint dots */}
        <circle cx="340" cy="280" r="4" fill="#E5E5DF" className="anim-waypoint" />
        <circle cx="540" cy="180" r="4" fill="#E5E5DF" className="anim-waypoint-2" />
        <circle cx="680" cy="130" r="3" fill="#E5E5DF" className="anim-waypoint-3" />

        {/* Pickup marker */}
        <g className="anim-bounce">
          <circle cx="140" cy="340" r="22" fill="#FAFAF8" stroke="#111111" strokeWidth="2" />
          <circle cx="140" cy="340" r="12" fill="#111111" />
          <circle cx="140" cy="340" className="anim-expand" fill="none" stroke="#111111" />
          <line x1="140" y1="340" x2="140" y2="368" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="140" cy="373" r="3" fill="#111111" />
        </g>

        {/* Drop marker */}
        <g className="anim-bounce-delayed">
          <circle cx="880" cy="140" r="22" fill="#FAFAF8" stroke="#FFC107" strokeWidth="2" />
          <rect x="872" y="129" width="16" height="16" rx="4" fill="#FFC107" />
          <path d="M 875,133 L 885,133 M 875,137 L 881,137" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="880" cy="140" className="anim-expand-delayed" fill="none" stroke="#FFC107" />
          <line x1="880" y1="140" x2="880" y2="112" stroke="#FFC107" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="880" cy="107" r="3" fill="#FFC107" />
        </g>

        {/* Radar rings around destination */}
        <g opacity="0.07" className="anim-fade">
          <circle cx="880" cy="140" r="40" stroke="#FFC107" strokeWidth="1" fill="none" />
          <circle cx="880" cy="140" r="65" stroke="#FFC107" strokeWidth="0.5" fill="none" strokeDasharray="4,8" />
          <circle cx="880" cy="140" r="90" stroke="#FFC107" strokeWidth="0.5" fill="none" strokeDasharray="3,10" />
        </g>

        {/* Car moves from pickup → drop on scroll */}
        <g className="car-move hero-car">
          <g>
            <path d="M -18,9 L -18,3 C -18,0 -15,-3 -10,-3 L -2,-3 C 1,-3 3,-5 5,-8 L 10,-15 C 13,-19 18,-21 24,-21 L 38,-21 C 44,-21 48,-19 50,-15 L 54,-8 C 56,-5 58,-3 60,-3 L 66,-3 C 70,-3 74,0 74,3 L 74,9 L 64,9 A 8,8 0 0,1 48,9 L 20,9 A 8,8 0 0,1 4,9 Z" stroke="#111111" strokeWidth="1.5" fill="#FAFAF8" />
            <path d="M 8,-6 L 12,-13 C 14,-17 18,-19 24,-19 L 30,-19 L 30,-6 Z" stroke="#111111" strokeWidth="1" fill="#FAFAF8" />
            <path d="M 34,-19 L 44,-19 C 48,-19 50,-17 52,-14 L 56,-6 L 34,-6 Z" stroke="#111111" strokeWidth="1" fill="#FAFAF8" />
            <path d="M -18,5 L 74,5" stroke="#FFC107" strokeWidth="2.5" />
            <rect x="72" y="-2" width="3" height="3" rx="1" fill="#FFC107" opacity="0.8" />
            <rect x="72" y="4" width="2" height="2" rx="1" fill="#C62828" opacity="0.6" />
          </g>
        </g>

        {/* Floating particles */}
        <g>
          <circle cx="90" cy="180" r="3" fill="#111111" className="anim-particle-1" />
          <circle cx="250" cy="120" r="2" fill="#111111" className="anim-particle-2" />
          <circle cx="400" cy="340" r="2.5" fill="#111111" className="anim-particle-3" />
          <circle cx="700" cy="320" r="2" fill="#111111" className="anim-particle-4" />
          <circle cx="920" cy="260" r="3" fill="#111111" className="anim-particle-5" />
          <circle cx="200" cy="250" r="2" fill="#FFC107" className="anim-particle-2" style={{ animationDelay: '0.8s' }} />
          <circle cx="650" cy="250" r="2.5" fill="#111111" className="anim-particle-3" style={{ animationDelay: '1.5s' }} />
          <circle cx="820" cy="40" r="2" fill="#111111" className="anim-particle-1" style={{ animationDelay: '0.3s' }} />
          <circle cx="480" cy="340" r="2" fill="#FFC107" className="anim-particle-4" style={{ animationDelay: '0.7s' }} />
          {/* Extra particles */}
          <circle cx="320" cy="100" r="1.5" fill="#111111" className="anim-particle-5" style={{ animationDelay: '1.2s' }} />
          <circle cx="760" cy="360" r="2" fill="#FFC107" className="anim-particle-1" style={{ animationDelay: '2s', opacity: 0.08 }} />
          <circle cx="150" cy="60" r="1.5" fill="#111111" className="anim-particle-3" style={{ animationDelay: '0.6s' }} />
        </g>

        {/* Bottom loading bar */}
        <g>
          <line x1="300" y1="430" x2="700" y2="430" stroke="#E5E5DF" strokeWidth="1" strokeLinecap="round" />
          <line x1="300" y1="430" x2="700" y2="430" stroke="#111111" strokeWidth="1" strokeLinecap="round" strokeDasharray="400" strokeDashoffset="400" className="anim-route" />
          {/* Moving dot on the bar */}
          <circle cx="300" cy="430" r="3" fill="#FFC107" className="bar-dot" />
        </g>
      </svg>
    </div>
  );
};

export default HeroIllustration;
