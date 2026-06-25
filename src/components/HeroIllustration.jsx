// src/components/HeroIllustration.jsx
import React from 'react';

export const HeroIllustration = () => {
  return (
    <div className="hero-illustration-wrapper" style={{ width: '100%', position: 'relative', overflow: 'hidden', background: '#FFFFFF', borderRadius: '24px', border: '1px solid var(--color-border)', height: '480px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      
      {/* Self-contained CSS Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes micro-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }
        @keyframes translate-road {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -50; }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1.2deg); }
        }
        @keyframes drift-left {
          0% { transform: translateX(1100px); }
          100% { transform: translateX(-200px); }
        }
        @keyframes blink-green-light {
          0%, 100% { fill: rgba(76, 175, 80, 0.2); }
          50% { fill: #4CAF50; }
        }

        .spin-wheel {
          animation: spin 1.2s linear infinite;
        }
        .car-yellow-group {
          animation: micro-bounce 0.4s ease-in-out infinite;
        }
        .car-bg-group {
          animation: micro-bounce 0.5s ease-in-out infinite;
        }
        .anim-road-lines {
          animation: translate-road 0.8s linear infinite;
        }
        .anim-tree {
          animation: sway 5s ease-in-out infinite;
        }
        .anim-cloud-1 {
          animation: drift-left 55s linear infinite;
        }
        .anim-cloud-2 {
          animation: drift-left 80s linear infinite;
        }
        .anim-green-light {
          animation: blink-green-light 2.5s infinite;
        }
      `}</style>

      {/* Main SVG Vector Container */}
      <svg 
        viewBox="0 0 1000 450" 
        width="100%" 
        height="100%" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: '#FFFFFF' }}
      >
        
        {/* Sky Background & Drifting Clouds */}
        <g className="sky-elements">
          {/* Cloud 1 */}
          <path 
            className="anim-cloud-1" 
            d="M 50,60 C 50,50 60,45 70,45 C 75,45 80,48 83,52 C 87,48 95,48 98,52 C 105,52 110,58 110,65 C 110,72 105,75 98,75 L 50,75 Z" 
            stroke="#E5E5DF" 
            strokeWidth="1.5" 
            fill="none" 
          />
          {/* Cloud 2 */}
          <path 
            className="anim-cloud-2" 
            d="M 400,90 C 400,82 408,78 416,78 C 420,78 424,80 426,83 C 430,80 436,80 438,83 C 444,83 448,88 448,94 C 448,100 444,102 438,102 L 400,102 Z" 
            stroke="#E5E5DF" 
            strokeWidth="1.5" 
            fill="none" 
          />
        </g>

        {/* Minimal City Skyline Background (Thin outlines) */}
        <g className="city-skyline" stroke="#E5E5DF" strokeWidth="1.5">
          {/* Building 1 (Left grid block) */}
          <rect x="20" y="140" width="150" height="240" />
          <line x1="20" y1="180" x2="170" y2="180" />
          <line x1="20" y1="220" x2="170" y2="220" />
          <line x1="20" y1="260" x2="170" y2="260" />
          <line x1="20" y1="300" x2="170" y2="300" />
          <line x1="20" y1="340" x2="170" y2="340" />
          <line x1="50" y1="140" x2="50" y2="380" />
          <line x1="85" y1="140" x2="85" y2="380" />
          <line x1="120" y1="140" x2="120" y2="380" />

          {/* Building 2 */}
          <rect x="190" y="260" width="80" height="120" />
          <line x1="210" y1="260" x2="210" y2="380" />
          <line x1="230" y1="260" x2="230" y2="380" />
          <line x1="250" y1="260" x2="250" y2="380" />

          {/* Building 3 (Spire tower) */}
          <rect x="290" y="160" width="50" height="220" />
          <rect x="300" y="100" width="30" height="60" />
          <line x1="315" y1="100" x2="315" y2="50" />

          {/* Building 4 */}
          <rect x="360" y="220" width="60" height="160" />
          <circle cx="390" cy="250" r="12" />
          <circle cx="390" cy="290" r="12" />

          {/* Building 5 (Tall glass tower) */}
          <rect x="450" y="80" width="60" height="300" />
          <line x1="450" y1="120" x2="510" y2="120" />
          <line x1="450" y1="160" x2="510" y2="160" />
          <line x1="450" y1="200" x2="510" y2="200" />
          <line x1="450" y1="240" x2="510" y2="240" />
          <line x1="450" y1="280" x2="510" y2="280" />
          <line x1="450" y1="320" x2="510" y2="320" />

          {/* Building 6 (Horizontal louvers) */}
          <rect x="530" y="180" width="140" height="200" />
          <line x1="530" y1="200" x2="670" y2="200" />
          <line x1="530" y1="220" x2="670" y2="220" />
          <line x1="530" y1="240" x2="670" y2="240" />
          <line x1="530" y1="260" x2="670" y2="260" />
          <line x1="530" y1="280" x2="670" y2="280" />
          <line x1="530" y1="300" x2="670" y2="300" />
          <line x1="530" y1="320" x2="670" y2="320" />
          <line x1="530" y1="340" x2="670" y2="340" />

          {/* Building 7 (Tall right) */}
          <rect x="700" y="120" width="80" height="260" />
          <line x1="740" y1="120" x2="740" y2="380" />

          {/* Building 8 (Right corner block) */}
          <rect x="800" y="160" width="180" height="220" />
          <line x1="800" y1="200" x2="980" y2="200" />
          <line x1="800" y1="240" x2="980" y2="240" />
          <line x1="800" y1="280" x2="980" y2="280" />
          <line x1="800" y1="320" x2="980" y2="320" />
        </g>

        {/* City Infrastructure: Street Lamps & Traffic Lights */}
        <g className="city-furniture" stroke="#111111" strokeWidth="1.5">
          {/* Lamp 1 */}
          <path d="M 180,380 L 180,180 A 15,15 0 0,1 195,165 L 210,165" fill="none" />
          <ellipse cx="210" cy="167" rx="6" ry="2" />
          
          {/* Lamp 2 */}
          <path d="M 480,380 L 480,200 A 15,15 0 0,1 495,185 L 510,185" fill="none" />
          <ellipse cx="510" cy="187" rx="6" ry="2" />

          {/* Traffic Light */}
          <line x1="685" y1="380" x2="685" y2="220" />
          <rect x="680" y="220" width="10" height="30" rx="3" fill="#FFFFFF" />
          <circle cx="685" cy="226" r="2.5" fill="#C62828" />
          <circle cx="685" cy="235" r="2.5" fill="#FBC02D" />
          <circle className="anim-green-light" cx="685" cy="244" r="2.5" fill="#4CAF50" />
        </g>

        {/* Swaying Trees (Depth decoration) */}
        <g className="city-trees" stroke="#111111" strokeWidth="1.5">
          {/* Tree 1 */}
          <g className="anim-tree" style={{ transformOrigin: '80px 380px' }}>
            <line x1="80" y1="380" x2="80" y2="330" />
            <path d="M 80,330 C 65,330 55,320 55,305 C 55,290 65,280 80,280 C 95,280 105,290 105,305 C 105,320 95,330 80,330 Z" fill="#FFFFFF" />
          </g>
          {/* Tree 2 */}
          <g className="anim-tree" style={{ transformOrigin: '240px 380px' }}>
            <line x1="240" y1="380" x2="240" y2="340" />
            <path d="M 240,340 C 225,340 215,330 215,315 C 215,300 225,290 240,290 C 255,290 265,300 265,315 C 265,330 255,340 240,340 Z" fill="#FFFFFF" />
          </g>
          {/* Tree 3 */}
          <g className="anim-tree" style={{ transformOrigin: '630px 380px' }}>
            <line x1="630" y1="380" x2="630" y2="330" />
            <path d="M 630,330 C 615,330 605,320 605,305 C 605,290 615,280 630,280 C 645,280 655,290 655,305 C 655,320 645,330 630,330 Z" fill="#FFFFFF" />
          </g>
          {/* Tree 4 */}
          <g className="anim-tree" style={{ transformOrigin: '920px 380px' }}>
            <line x1="920" y1="380" x2="920" y2="335" />
            <path d="M 920,335 C 905,335 895,325 895,310 C 895,295 905,285 920,285 C 935,285 945,295 945,310 C 945,325 935,335 920,335 Z" fill="#FFFFFF" />
          </g>
        </g>

        {/* Road Bed & Animating Dash Lines */}
        <g className="road-group">
          {/* Main Solid Ground Line */}
          <line x1="0" y1="380" x2="1000" y2="380" stroke="#111111" strokeWidth="2" />
          
          {/* Continuous Translating Dash Line */}
          <line 
            className="anim-road-lines" 
            x1="0" 
            y1="405" 
            x2="1000" 
            y2="405" 
            stroke="#111111" 
            strokeWidth="2" 
            strokeDasharray="30, 20" 
          />

          {/* Pedestrian Crossing Stripes (Stripe-like details) */}
          <g stroke="#111111" strokeWidth="1.5">
            <line x1="680" y1="380" x2="680" y2="395" />
            <line x1="695" y1="380" x2="695" y2="395" />
            <line x1="710" y1="380" x2="710" y2="395" />
            <line x1="725" y1="380" x2="725" y2="395" />
            <line x1="740" y1="380" x2="740" y2="395" />
          </g>
        </g>

        {/* Surrounding Cars Layer (Thin black lines only) */}
        
        {/* Car 1: SUV on the Left */}
        <g className="car-bg-group" style={{ animationDelay: '-0.2s' }}>
          {/* Body */}
          <path 
            d="M 50,378 L 50,368 C 50,362 55,358 65,358 L 90,358 C 95,358 100,355 104,351 L 115,338 C 122,330 132,320 148,318 L 210,318 C 220,318 226,322 230,328 L 238,342 C 242,348 245,354 245,362 L 245,378 L 210,378 A 20,20 0 0,0 170,378 L 120,378 A 20,20 0 0,0 80,378 Z" 
            stroke="#111111" 
            strokeWidth="1.75" 
            fill="#FFFFFF" 
          />
          {/* Windows */}
          <path d="M 115,348 L 124,338 C 130,330 138,322 150,322 L 170,322 L 170,348 Z" stroke="#111111" strokeWidth="1.25" />
          <path d="M 176,322 L 205,322 C 212,322 216,325 218,330 L 225,342 C 228,346 228,348 228,348 Z" stroke="#111111" strokeWidth="1.25" />
          
          {/* Wheels (Rotating) */}
          {/* Front Wheel */}
          <g className="spin-wheel" style={{ transformOrigin: '100px 380px' }}>
            <circle cx="100" cy="380" r="20" stroke="#111111" strokeWidth="1.75" fill="#FFFFFF" />
            <circle cx="100" cy="380" r="16" stroke="#111111" strokeWidth="1.25" />
            <line x1="100" y1="364" x2="100" y2="396" stroke="#111111" strokeWidth="1" />
            <line x1="84" y1="380" x2="116" y2="380" stroke="#111111" strokeWidth="1" />
            <line x1="89" y1="369" x2="111" y2="391" stroke="#111111" strokeWidth="1" />
            <line x1="89" y1="391" x2="111" y2="369" stroke="#111111" strokeWidth="1" />
          </g>
          {/* Rear Wheel */}
          <g className="spin-wheel" style={{ transformOrigin: '190px 380px' }}>
            <circle cx="190" cy="380" r="20" stroke="#111111" strokeWidth="1.75" fill="#FFFFFF" />
            <circle cx="190" cy="380" r="16" stroke="#111111" strokeWidth="1.25" />
            <line x1="190" y1="364" x2="190" y2="396" stroke="#111111" strokeWidth="1" />
            <line x1="174" y1="380" x2="206" y2="380" stroke="#111111" strokeWidth="1" />
            <line x1="179" y1="369" x2="201" y2="391" stroke="#111111" strokeWidth="1" />
            <line x1="179" y1="391" x2="201" y2="369" stroke="#111111" strokeWidth="1" />
          </g>
        </g>

        {/* Car 2: Hatchback on the Right */}
        <g className="car-bg-group" style={{ animationDelay: '-0.1s' }}>
          {/* Body */}
          <path 
            d="M 740,378 L 740,370 C 740,364 745,360 755,360 L 775,360 C 780,360 783,358 786,354 L 795,342 C 802,332 812,326 828,324 L 850,324 C 862,324 870,328 876,336 L 892,358 C 896,364 898,370 898,378 L 885,378 A 18,18 0 0,0 849,378 L 803,378 A 18,18 0 0,0 767,378 Z" 
            stroke="#111111" 
            strokeWidth="1.75" 
            fill="#FFFFFF" 
          />
          {/* Windows */}
          <path d="M 795,345 C 802,336 812,328 828,328 L 848,328 L 848,348 Z" stroke="#111111" strokeWidth="1.25" />
          <path d="M 853,328 L 864,328 C 870,328 874,332 878,338 L 885,348 L 853,348 Z" stroke="#111111" strokeWidth="1.25" />

          {/* Wheels (Rotating) */}
          {/* Front Wheel */}
          <g className="spin-wheel" style={{ transformOrigin: '785px 380px' }}>
            <circle cx="785" cy="380" r="18" stroke="#111111" strokeWidth="1.75" fill="#FFFFFF" />
            <circle cx="785" cy="380" r="14" stroke="#111111" strokeWidth="1.25" />
            <line x1="785" y1="366" x2="785" y2="394" stroke="#111111" strokeWidth="1" />
            <line x1="771" y1="380" x2="799" y2="380" stroke="#111111" strokeWidth="1" />
            <line x1="775" y1="370" x2="795" y2="390" stroke="#111111" strokeWidth="1" />
            <line x1="775" y1="390" x2="795" y2="370" stroke="#111111" strokeWidth="1" />
          </g>
          {/* Rear Wheel */}
          <g className="spin-wheel" style={{ transformOrigin: '867px 380px' }}>
            <circle cx="867" cy="380" r="18" stroke="#111111" strokeWidth="1.75" fill="#FFFFFF" />
            <circle cx="867" cy="380" r="14" stroke="#111111" strokeWidth="1.25" />
            <line x1="867" y1="366" x2="867" y2="394" stroke="#111111" strokeWidth="1" />
            <line x1="853" y1="380" x2="881" y2="380" stroke="#111111" strokeWidth="1" />
            <line x1="857" y1="370" x2="877" y2="390" stroke="#111111" strokeWidth="1" />
            <line x1="857" y1="390" x2="877" y2="370" stroke="#111111" strokeWidth="1" />
          </g>
        </g>

        {/* Main Subject: Yellow Sedan (Brand Vehicle - Bold Yellow Outline #FFC107) */}
        <g className="car-yellow-group">
          {/* Sedan Silhouette Chassis */}
          <path 
            d="M 320,378 L 320,368 C 320,362 325,358 335,358 L 385,358 C 390,358 393,355 397,351 L 416,328 C 424,318 438,304 460,302 L 530,302 C 555,302 575,312 590,328 L 610,351 C 613,355 618,358 625,358 L 655,358 C 662,358 668,362 668,368 L 668,378 L 600,378 A 24,24 0 0,0 552,378 L 438,378 A 24,24 0 0,0 390,378 Z" 
            stroke="#FFC107" 
            strokeWidth="2.5" 
            fill="#FFFFFF" 
          />

          {/* Window Frames (Yellow) */}
          <path 
            d="M 416,350 L 430,332 C 438,322 450,308 470,306 L 510,306 L 510,350 Z" 
            stroke="#FFC107" 
            strokeWidth="1.5" 
          />
          <path 
            d="M 518,306 L 545,306 C 565,306 580,318 590,332 L 600,350 L 518,350 Z" 
            stroke="#FFC107" 
            strokeWidth="1.5" 
          />

          {/* Seams, Handles & Lights (Yellow details) */}
          <line x1="472" y1="306" x2="472" y2="378" stroke="#FFC107" strokeWidth="1.5" />
          <line x1="514" y1="306" x2="514" y2="378" stroke="#FFC107" strokeWidth="1.5" />
          <line x1="545" y1="306" x2="545" y2="378" stroke="#FFC107" strokeWidth="1.5" />
          
          <line x1="480" y1="358" x2="495" y2="358" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" />
          <line x1="552" y1="358" x2="567" y2="358" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" />
          
          <rect x="322" y="362" width="10" height="4" rx="1" fill="#FFC107" />
          <rect x="654" y="362" width="12" height="4" rx="1" fill="#FFC107" />

          {/* Yellow Rims & Wheels (Rotating) */}
          {/* Front Wheel */}
          <g className="spin-wheel" style={{ transformOrigin: '414px 380px' }}>
            <circle cx="414" cy="380" r="24" stroke="#FFC107" strokeWidth="2.5" fill="#FFFFFF" />
            <circle cx="414" cy="380" r="20" stroke="#FFC107" strokeWidth="1.5" />
            <circle cx="414" cy="380" r="6" stroke="#FFC107" strokeWidth="1.5" />
            {/* Detailed Spokes */}
            <line x1="414" y1="360" x2="414" y2="400" stroke="#FFC107" strokeWidth="1.25" />
            <line x1="394" y1="380" x2="434" y2="380" stroke="#FFC107" strokeWidth="1.25" />
            <line x1="400" y1="366" x2="428" y2="394" stroke="#FFC107" strokeWidth="1.25" />
            <line x1="400" y1="394" x2="428" y2="366" stroke="#FFC107" strokeWidth="1.25" />
          </g>

          {/* Rear Wheel */}
          <g className="spin-wheel" style={{ transformOrigin: '576px 380px' }}>
            <circle cx="576" cy="380" r="24" stroke="#FFC107" strokeWidth="2.5" fill="#FFFFFF" />
            <circle cx="576" cy="380" r="20" stroke="#FFC107" strokeWidth="1.5" />
            <circle cx="576" cy="380" r="6" stroke="#FFC107" strokeWidth="1.5" />
            {/* Detailed Spokes */}
            <line x1="576" y1="360" x2="576" y2="400" stroke="#FFC107" strokeWidth="1.25" />
            <line x1="556" y1="380" x2="596" y2="380" stroke="#FFC107" strokeWidth="1.25" />
            <line x1="562" y1="366" x2="590" y2="394" stroke="#FFC107" strokeWidth="1.25" />
            <line x1="562" y1="394" x2="590" y2="366" stroke="#FFC107" strokeWidth="1.25" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroIllustration;
