// src/components/Map.jsx
import React, { useEffect, useRef, useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { loadGoogleMapsScript } from '../utils/googlePlaces';

// Custom ultra-light premium minimalist map styling for Google Maps
const googleMapStyles = [
  {
    "featureType": "all",
    "elementType": "geometry.fill",
    "stylers": [{ "weight": "2.00" }]
  },
  {
    "featureType": "all",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#9c9c9c" }]
  },
  {
    "featureType": "all",
    "elementType": "labels.text",
    "stylers": [{ "visibility": "on" }]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{ "color": "#f2f2f2" }]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      { "saturation": -100 },
      { "lightness": 45 }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [{ "color": "#eeeeee" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#7b7b7b" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [{ "visibility": "simplified" }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      { "color": "#dbe6eb" },
      { "visibility": "on" }
    ]
  }
];

// Factory to create a custom HTML overlay class for Google Maps markers
const createHTMLOverlayClass = (google) => {
  return class HTMLOverlay extends google.maps.OverlayView {
    constructor(position, content, map, type, onClick) {
      super();
      this.position = position;
      this.content = content;
      this.type = type; // 'driver' or 'pin'
      this.onClick = onClick;
      this.div = null;
      this.setMap(map);
    }

    onAdd() {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.cursor = 'pointer';
      div.className = 'custom-map-icon';
      div.innerHTML = this.content;

      if (this.onClick) {
        div.addEventListener('click', (e) => {
          e.stopPropagation();
          this.onClick();
        });
      }

      this.div = div;
      const panes = this.getPanes();
      panes.overlayMouseTarget.appendChild(div);
    }

    draw() {
      const overlayProjection = this.getProjection();
      if (!overlayProjection) return;

      const position = overlayProjection.fromLatLngToDivPixel(this.position);
      if (position && this.div) {
        if (this.type === 'driver') {
          // Centered: [18, 18] offset for 36x36 pin
          this.div.style.left = (position.x - 18) + 'px';
          this.div.style.top = (position.y - 18) + 'px';
        } else {
          // Bottom center: [18, 36] offset for 36x36 pin
          this.div.style.left = (position.x - 18) + 'px';
          this.div.style.top = (position.y - 36) + 'px';
        }
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

    setPosition(position) {
      this.position = position;
      this.draw();
    }
  };
};

export const Map = ({ activeBookingId, showAllDrivers = false }) => {
  const mapRef = useRef(null);
  
  // Leaflet refs
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const routeLineRef = useRef(null);

  // Google Maps refs
  const googleMapInstance = useRef(null);
  const googleMarkersRef = useRef({});
  const googlePolylineRef = useRef(null);
  const infoWindowInstance = useRef(null);

  // Platform state
  const { bookings, drivers } = usePlatform();
  const activeBooking = bookings.find((b) => b.id === activeBookingId);
  const activeDriver = activeBooking ? drivers.find((d) => d.id === activeBooking.driverId) : null;

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
        console.error('Google Maps load failed, falling back to Leaflet:', err);
        setUseGoogleMap(false);
      });
  }, [API_KEY]);

  // ----------------------------------------------------
  // Leaflet initialization & synchronization (Fallback)
  // ----------------------------------------------------
  useEffect(() => {
    if (useGoogleMap) return;
    if (!mapRef.current || mapInstance.current) return;

    // Default view: Kochi, Kerala
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([9.9312, 76.2673], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [useGoogleMap]);

  useEffect(() => {
    if (useGoogleMap) return;
    const map = mapInstance.current;
    if (!map) return;

    // Clear existing Leaflet layers
    Object.values(markersRef.current).forEach((marker) => map.removeLayer(marker));
    markersRef.current = {};

    if (routeLineRef.current) {
      map.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }

    const bounds = [];

    if (showAllDrivers) {
      drivers.forEach((driver) => {
        if (driver.status === 'offline') return;

        const driverHtml = `
          <div class="map-marker-pin driver" style="background: ${driver.status === 'busy' ? '#FFC107' : '#4CAF50'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
          </div>
        `;

        const icon = L.divIcon({
          html: driverHtml,
          className: 'custom-map-icon',
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        const marker = L.marker([driver.lat, driver.lng], { icon })
          .bindPopup(`<b>${driver.name}</b><br>Status: ${driver.status.toUpperCase()}<br>Rating: ${driver.rating} ★`)
          .addTo(map);

        markersRef.current[`driver_${driver.id}`] = marker;
        bounds.push([driver.lat, driver.lng]);
      });
    }

    if (activeBooking && (activeBooking.status === 'accepted' || activeBooking.status === 'arrived' || activeBooking.status === 'in_progress')) {
      const { pickup, destination } = activeBooking;

      if (pickup) {
        const pickupHtml = `<div class="map-marker-pin"></div>`;
        const pickupIcon = L.divIcon({
          html: pickupHtml,
          className: 'custom-map-icon',
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        });
        const marker = L.marker([pickup.lat, pickup.lng], { icon: pickupIcon })
          .bindPopup(`<b>Pickup Location</b><br>${pickup.name}`)
          .addTo(map);
        markersRef.current['pickup'] = marker;
        bounds.push([pickup.lat, pickup.lng]);
      }

      if (destination) {
        const destHtml = `<div class="map-marker-pin dest"></div>`;
        const destIcon = L.divIcon({
          html: destHtml,
          className: 'custom-map-icon',
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        });
        const marker = L.marker([destination.lat, destination.lng], { icon: destIcon })
          .bindPopup(`<b>Destination Location</b><br>${destination.name}`)
          .addTo(map);
        markersRef.current['destination'] = marker;
        bounds.push([destination.lat, destination.lng]);
      }

      if (activeDriver) {
        const driverHtml = `
          <div class="map-marker-pin driver">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
          </div>
        `;
        const driverIcon = L.divIcon({
          html: driverHtml,
          className: 'custom-map-icon',
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });
        const marker = L.marker([activeDriver.lat, activeDriver.lng], { icon: driverIcon })
          .bindPopup(`<b>Driver: ${activeDriver.name}</b><br>On the way`)
          .addTo(map);
        markersRef.current['driver'] = marker;
        bounds.push([activeDriver.lat, activeDriver.lng]);

        let routeCoords = [];
        if (activeBooking.status === 'accepted') {
          routeCoords = [[activeDriver.lat, activeDriver.lng], [pickup.lat, pickup.lng]];
        } else if (activeBooking.status === 'in_progress') {
          routeCoords = [[activeDriver.lat, activeDriver.lng], [destination.lat, destination.lng]];
        }

        if (routeCoords.length > 0) {
          routeLineRef.current = L.polyline(routeCoords, {
            color: '#111111',
            weight: 4,
            opacity: 0.8,
            dashArray: '8, 8',
          }).addTo(map);
        }
      }
    }

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [activeBookingId, showAllDrivers, drivers, activeBooking, activeDriver, useGoogleMap]);

  // ----------------------------------------------------
  // Google Maps initialization & synchronization
  // ----------------------------------------------------
  useEffect(() => {
    if (!useGoogleMap || !googleMapsReady || !mapRef.current || googleMapInstance.current) return;

    const defaultCenter = { lat: 9.9312, lng: 76.2673 };
    const map = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: googleMapStyles,
    });

    googleMapInstance.current = map;
    infoWindowInstance.current = new window.google.maps.InfoWindow();

    return () => {
      if (googleMapInstance.current) {
        googleMapInstance.current = null;
      }
      if (infoWindowInstance.current) {
        infoWindowInstance.current = null;
      }
    };
  }, [useGoogleMap, googleMapsReady]);

  useEffect(() => {
    const map = googleMapInstance.current;
    if (!map || !useGoogleMap) return;

    const google = window.google;
    const HTMLOverlay = createHTMLOverlayClass(google);
    const activeKeys = new Set();
    const bounds = new google.maps.LatLngBounds();

    const openPopup = (content, position) => {
      if (infoWindowInstance.current) {
        infoWindowInstance.current.setContent(content);
        infoWindowInstance.current.setPosition(position);
        infoWindowInstance.current.open(map);
      }
    };

    if (showAllDrivers) {
      drivers.forEach((driver) => {
        if (driver.status === 'offline') return;

        const key = `driver_${driver.id}`;
        activeKeys.add(key);

        const driverHtml = `
          <div class="map-marker-pin driver" style="background: ${driver.status === 'busy' ? '#FFC107' : '#4CAF50'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
          </div>
        `;

        const pos = { lat: driver.lat, lng: driver.lng };
        bounds.extend(pos);

        const popupText = `
          <div style="color: #111; font-family: sans-serif; font-size: 13px; line-height: 1.4; padding: 4px;">
            <strong>${driver.name}</strong><br>
            Status: ${driver.status.toUpperCase()}<br>
            Rating: ${driver.rating} ★
          </div>
        `;

        if (googleMarkersRef.current[key]) {
          googleMarkersRef.current[key].setPosition(pos);
        } else {
          googleMarkersRef.current[key] = new HTMLOverlay(pos, driverHtml, map, 'driver', () => openPopup(popupText, pos));
        }
      });
    }

    if (activeBooking && (activeBooking.status === 'accepted' || activeBooking.status === 'arrived' || activeBooking.status === 'in_progress')) {
      const { pickup, destination } = activeBooking;

      if (pickup) {
        const key = 'pickup';
        activeKeys.add(key);
        const pickupHtml = `<div class="map-marker-pin"></div>`;
        const pos = { lat: pickup.lat, lng: pickup.lng };
        bounds.extend(pos);

        const popupText = `
          <div style="color: #111; font-family: sans-serif; font-size: 13px; line-height: 1.4; padding: 4px;">
            <strong>Pickup Location</strong><br>
            ${pickup.name}
          </div>
        `;

        if (googleMarkersRef.current[key]) {
          googleMarkersRef.current[key].setPosition(pos);
        } else {
          googleMarkersRef.current[key] = new HTMLOverlay(pos, pickupHtml, map, 'pin', () => openPopup(popupText, pos));
        }
      }

      if (destination) {
        const key = 'destination';
        activeKeys.add(key);
        const destHtml = `<div class="map-marker-pin dest"></div>`;
        const pos = { lat: destination.lat, lng: destination.lng };
        bounds.extend(pos);

        const popupText = `
          <div style="color: #111; font-family: sans-serif; font-size: 13px; line-height: 1.4; padding: 4px;">
            <strong>Destination Location</strong><br>
            ${destination.name}
          </div>
        `;

        if (googleMarkersRef.current[key]) {
          googleMarkersRef.current[key].setPosition(pos);
        } else {
          googleMarkersRef.current[key] = new HTMLOverlay(pos, destHtml, map, 'pin', () => openPopup(popupText, pos));
        }
      }

      if (activeDriver) {
        const key = 'driver';
        activeKeys.add(key);
        const driverHtml = `
          <div class="map-marker-pin driver">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
          </div>
        `;
        const pos = { lat: activeDriver.lat, lng: activeDriver.lng };
        bounds.extend(pos);

        const popupText = `
          <div style="color: #111; font-family: sans-serif; font-size: 13px; line-height: 1.4; padding: 4px;">
            <strong>Driver: ${activeDriver.name}</strong><br>
            On the way
          </div>
        `;

        if (googleMarkersRef.current[key]) {
          googleMarkersRef.current[key].setPosition(pos);
        } else {
          googleMarkersRef.current[key] = new HTMLOverlay(pos, driverHtml, map, 'driver', () => openPopup(popupText, pos));
        }

        // Interpolate dashed route line
        let routeCoords = [];
        if (activeBooking.status === 'accepted') {
          routeCoords = [
            { lat: activeDriver.lat, lng: activeDriver.lng },
            { lat: pickup.lat, lng: pickup.lng }
          ];
        } else if (activeBooking.status === 'in_progress') {
          routeCoords = [
            { lat: activeDriver.lat, lng: activeDriver.lng },
            { lat: destination.lat, lng: destination.lng }
          ];
        }

        // Reset previous polyline
        if (googlePolylineRef.current) {
          googlePolylineRef.current.setMap(null);
          googlePolylineRef.current = null;
        }

        if (routeCoords.length > 0) {
          const lineSymbol = {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 3
          };
          googlePolylineRef.current = new google.maps.Polyline({
            path: routeCoords,
            strokeColor: '#111111',
            strokeOpacity: 0,
            strokeWeight: 4,
            icons: [{
              icon: lineSymbol,
              offset: '0',
              repeat: '15px'
            }],
            map: map
          });
        }
      }
    } else {
      // Clear route polyline if not active
      if (googlePolylineRef.current) {
        googlePolylineRef.current.setMap(null);
        googlePolylineRef.current = null;
      }
    }

    // Remove obsolete overlays
    Object.keys(googleMarkersRef.current).forEach((key) => {
      if (!activeKeys.has(key)) {
        googleMarkersRef.current[key].setMap(null);
        delete googleMarkersRef.current[key];
      }
    });

    // Fit Bounds
    if (activeKeys.size > 0) {
      map.fitBounds(bounds);
      
      // Enforce max initial zoom for bounds centering single marker
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() > 16) {
          map.setZoom(15);
        }
        google.maps.event.removeListener(listener);
      });
    }
  }, [activeBookingId, showAllDrivers, drivers, activeBooking, activeDriver, useGoogleMap]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Map Element */}
      <div ref={mapRef} className={useGoogleMap ? 'map-container' : 'leaflet-container'} />
      
      {/* Map Provider Active Status Badge */}
      <div className={`map-provider-badge ${useGoogleMap ? '' : 'fallback'}`}>
        {useGoogleMap ? 'Google Maps Active' : 'Demo Map (Leaflet)'}
      </div>
    </div>
  );
};

export default Map;
