import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mapStyle = [
  { featureType: 'all', elementType: 'geometry.fill', stylers: [{ weight: '2.00' }] },
  { featureType: 'all', elementType: 'geometry.stroke', stylers: [{ color: '#c9c9c9' }] },
  { featureType: 'landscape', elementType: 'geometry.fill', stylers: [{ color: '#f5f5f5' }] },
  { featureType: 'landscape.man_made', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }] },
  { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }, { saturation: -100 }, { lightness: 45 }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#7b7b7b' }] },
  { featureType: 'road.highway', elementType: 'all', stylers: [{ visibility: 'simplified' }] },
  { featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'all', stylers: [{ color: '#d4e4ed' }, { visibility: 'on' }] },
  { featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
];

const heroPins = [
  { name: 'Kozhikode', lat: 11.2588, lng: 75.7804, label: 'Calicut' },
  { name: 'Vadakara', lat: 11.5950, lng: 75.5800, label: 'Vadakara' },
  { name: 'Kozhikode Railway Station', lat: 11.2570, lng: 75.7800, label: 'Railway' },
  { name: 'Kozhikode Beach', lat: 11.2540, lng: 75.7720, label: 'Beach' },
  { name: 'Calicut Airport', lat: 11.1368, lng: 75.9553, label: 'Airport' },
  { name: 'Kappad Beach', lat: 11.3820, lng: 75.7300, label: 'Kappad' },
  { name: 'Koyilandy', lat: 11.4380, lng: 75.6950, label: 'Koyilandy' },
  { name: 'Ramanattukara', lat: 11.1820, lng: 75.8400, label: 'Ramanattukara' },
];

export const HeroMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [11.38, 75.78],
      zoom: 11,
      zoomControl: false,
      attributionControl: false,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    const customIcon = L.divIcon({
      className: 'hero-map-pin',
      html: `
        <div style="
          width: 28px; height: 28px;
          background: #1a73e8;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        ">
          <div style="
            width: 8px; height: 8px;
            background: white;
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const highlightIcon = L.divIcon({
      className: 'hero-map-pin-highlight',
      html: `
        <div style="
          width: 36px; height: 36px;
          background: #FFC107;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 3px 12px rgba(255,193,7,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse-marker 2s ease-in-out infinite;
        ">
          <div style="
            width: 10px; height: 10px;
            background: white;
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-marker {
        0%, 100% { transform: scale(1); box-shadow: 0 3px 12px rgba(255,193,7,0.5); }
        50% { transform: scale(1.15); box-shadow: 0 4px 20px rgba(255,193,7,0.7); }
      }
      .hero-map-pin:hover > div,
      .hero-map-pin-highlight:hover > div {
        transform: scale(1.2);
        z-index: 1000 !important;
      }
    `;
    document.head.appendChild(style);

    heroPins.forEach((pin, i) => {
      const icon = pin.name === 'Kozhikode' || pin.name === 'Vadakara' ? highlightIcon : customIcon;
      const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);

      const tooltipContent = `
        <div style="
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 13px; font-weight: 600; color: #333;
          padding: 4px 2px;
          white-space: nowrap;
        ">${pin.label}</div>
      `;
      marker.bindTooltip(tooltipContent, {
        direction: 'top',
        offset: [0, -8],
        className: 'hero-map-tooltip',
      });

      markersRef.current.push(marker);
    });

    mapInstance.current = map;

    return () => {
      style.remove();
      map.remove();
      mapInstance.current = null;
      markersRef.current = [];
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '480px',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid var(--color-border, #e0e0e0)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}
    />
  );
};

export default HeroMap;
