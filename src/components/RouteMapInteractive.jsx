import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { loadGoogleMapsScript } from '../utils/googlePlaces';

// Custom minimalist styling for Google Maps
const googleMapStyles = [
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

const pickupIconHtml = `
  <div style="
    width: 32px; height: 32px;
    background: #1a73e8;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </div>
`;

const destIconHtml = `
  <div style="
    width: 32px; height: 32px;
    background: #EA4335;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </div>
`;

// Factory to create HTML overlay for Google Maps markers
const createHTMLOverlayClass = (google) => {
  return class HTMLOverlay extends google.maps.OverlayView {
    constructor(position, content, map) {
      super();
      this.position = position;
      this.content = content;
      this.div = null;
      this.setMap(map);
    }

    onAdd() {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.innerHTML = this.content;
      this.div = div;
      const panes = this.getPanes();
      panes.overlayMouseTarget.appendChild(div);
    }

    draw() {
      const overlayProjection = this.getProjection();
      if (!overlayProjection) return;

      const position = overlayProjection.fromLatLngToDivPixel(this.position);
      if (position && this.div) {
        // Centered anchor: [16, 16] offset for 32x32 pin
        this.div.style.left = (position.x - 16) + 'px';
        this.div.style.top = (position.y - 16) + 'px';
      }
    }

    onRemove() {
      if (this.div) {
        if (this.div.parentNode) {
          this.div.parentNode.removeChild(this.div);
        }
        this.div = null;
      }
    }
  };
};

const RouteMapInteractive = ({ pickup, destination, onLocationSelect }) => {
  const mapRef = useRef(null);

  // Leaflet refs
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const polylineRef = useRef(null);

  // Google Maps refs
  const googleMapInstance = useRef(null);
  const googleMarkersRef = useRef([]);
  const googlePolylineRef = useRef(null);

  // Stale-closure guard: always keep the latest callback
  const onLocationSelectRef = useRef(onLocationSelect);
  useEffect(() => {
    onLocationSelectRef.current = onLocationSelect;
  }, [onLocationSelect]);

  // Environment & Loading State
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [googleMapsReady, setGoogleMapsReady] = useState(false);
  const [useGoogleMap, setUseGoogleMap] = useState(false);

  useEffect(() => {
    if (!API_KEY) {
      setUseGoogleMap(false);
      return;
    }
    loadGoogleMapsScript()
      .then((places) => {
        if (places && window.google && window.google.maps) {
          setUseGoogleMap(true);
          setGoogleMapsReady(true);
        } else {
          setUseGoogleMap(false);
        }
      })
      .catch((err) => {
        console.error('Google Maps load failed on landing page, falling back to Leaflet:', err);
        setUseGoogleMap(false);
      });
  }, [API_KEY]);

  // ----------------------------------------------------
  // Leaflet Mode
  // ----------------------------------------------------
  useEffect(() => {
    if (useGoogleMap || !mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = L.map(mapRef.current, {
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

    map.on('click', (e) => {
      if (onLocationSelectRef.current) {
        onLocationSelectRef.current(e.latlng.lat, e.latlng.lng);
      }
    });

    const markers = [];
    const points = [];

    if (pickup) {
      const icon = L.divIcon({ className: '', html: pickupIconHtml, iconSize: [32, 32], iconAnchor: [16, 16] });
      const m = L.marker([pickup.lat, pickup.lng], { icon }).addTo(map);
      m.bindTooltip(`<div style="font-family: sans-serif; font-size: 12px; font-weight: 600; color: #333; padding: 2px 4px;">Pickup: ${pickup.name}</div>`, { direction: 'top', offset: [0, -10] });
      markers.push(m);
      points.push([pickup.lat, pickup.lng]);
    }

    if (destination) {
      const icon = L.divIcon({ className: '', html: destIconHtml, iconSize: [32, 32], iconAnchor: [16, 16] });
      const m = L.marker([destination.lat, destination.lng], { icon }).addTo(map);
      m.bindTooltip(`<div style="font-family: sans-serif; font-size: 12px; font-weight: 600; color: #333; padding: 2px 4px;">Drop: ${destination.name}</div>`, { direction: 'top', offset: [0, -10] });
      markers.push(m);
      points.push([destination.lat, destination.lng]);
    }

    markersRef.current = markers;

    if (points.length === 2) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [80, 80], maxZoom: 14 });

      const polyline = L.polyline(points, {
        color: '#1a73e8',
        weight: 4,
        opacity: 0.8,
        dashArray: '12, 8',
      }).addTo(map);
      polylineRef.current = polyline;
    } else if (points.length === 1) {
      map.setView(points[0], 12);
    } else {
      map.setView([11.38, 75.78], 10);
    }

    mapInstance.current = map;

    return () => {
      markers.forEach((m) => m.remove());
      if (polylineRef.current) polylineRef.current.remove();
      map.remove();
      mapInstance.current = null;
    };
  }, [useGoogleMap, pickup, destination]);

  // ----------------------------------------------------
  // Google Maps Mode
  // ----------------------------------------------------
  useEffect(() => {
    if (!useGoogleMap || !googleMapsReady || !mapRef.current) return;

    const google = window.google;
    const HTMLOverlay = createHTMLOverlayClass(google);

    const map = new google.maps.Map(mapRef.current, {
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: googleMapStyles,
      backgroundColor: 'transparent',
    });

    googleMapInstance.current = map;

    map.addListener('click', (e) => {
      if (onLocationSelectRef.current) {
        onLocationSelectRef.current(e.latLng.lat(), e.latLng.lng());
      }
    });

    const markers = [];
    const bounds = new google.maps.LatLngBounds();

    if (pickup) {
      const pos = { lat: pickup.lat, lng: pickup.lng };
      const marker = new HTMLOverlay(pos, pickupIconHtml, map);
      markers.push(marker);
      bounds.extend(pos);
    }

    if (destination) {
      const pos = { lat: destination.lat, lng: destination.lng };
      const marker = new HTMLOverlay(pos, destIconHtml, map);
      markers.push(marker);
      bounds.extend(pos);
    }

    googleMarkersRef.current = markers;

    if (pickup && destination) {
      map.fitBounds(bounds, { top: 80, bottom: 80, left: 80, right: 80 });

      const lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 3
      };

      const polyline = new google.maps.Polyline({
        path: [
          { lat: pickup.lat, lng: pickup.lng },
          { lat: destination.lat, lng: destination.lng }
        ],
        strokeColor: '#1a73e8',
        strokeOpacity: 0,
        strokeWeight: 4,
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '20px'
        }],
        map: map
      });

      googlePolylineRef.current = polyline;
    } else if (pickup) {
      map.setCenter({ lat: pickup.lat, lng: pickup.lng });
      map.setZoom(12);
    } else if (destination) {
      map.setCenter({ lat: destination.lat, lng: destination.lng });
      map.setZoom(12);
    } else {
      map.setCenter({ lat: 11.38, lng: 75.78 });
      map.setZoom(10);
    }

    return () => {
      markers.forEach((m) => m.setMap(null));
      if (googlePolylineRef.current) {
        googlePolylineRef.current.setMap(null);
        googlePolylineRef.current = null;
      }
      googleMapInstance.current = null;
    };
  }, [useGoogleMap, googleMapsReady, pickup, destination]);

  return (
    <div className="route-map-wrapper">
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      {/* Map Provider Active Status Badge */}
      <div className={`map-provider-badge ${useGoogleMap ? '' : 'fallback'}`}>
        {useGoogleMap ? 'Google Maps Active' : 'Demo Map (Leaflet)'}
      </div>
    </div>
  );
};

export default RouteMapInteractive;
