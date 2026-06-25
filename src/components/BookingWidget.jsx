import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { autocomplete, LEGACY_LOCATIONS } from '../data/locationDatabase';
import { MapPin, Calendar, Clock, Car, ChevronRight } from 'lucide-react';
import { getPlacePredictions, getPlaceDetails } from '../utils/googlePlaces';

const CATEGORY_MAP = {
  'One Way': 'all',
  'Airport Transfer': 'airport',
  'Hourly Booking': 'all',
};

const LocationInput = ({ value, onChange, exclude, placeholder, filterBy }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value ? value.name : '');
  const [dbResults, setDbResults] = useState([]);
  const [googleResults, setGoogleResults] = useState([]);
  const ref = useRef(null);
  const timer = useRef(null);
  const searchTimer = useRef(null);

  useEffect(() => {
    setQuery(value ? value.name : '');
  }, [value]);

  const showAll = value && query === value.name;

  // Search database
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    const doSearch = () => {
      const cats = filterBy === 'all' ? undefined : (Array.isArray(filterBy) ? filterBy : [filterBy]);
      let results;
      if (showAll || query.length < 1) {
        results = autocomplete('', { limit: 100, categories: cats });
        if (!results.length) {
          results = autocomplete('a', { limit: 100, categories: cats });
        }
      } else {
        results = autocomplete(query, { limit: 30, categories: cats });
      }
      setDbResults(results.filter((loc) => !exclude || loc.name !== exclude.name));
    };
    searchTimer.current = setTimeout(doSearch, 100);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [query, exclude, filterBy, showAll]);

  const fetchGoogle = useCallback(async (q) => {
    if (q.length < 3) { setGoogleResults([]); return; }
    const predictions = await getPlacePredictions(q);
    setGoogleResults(predictions);
  }, []);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => fetchGoogle(query), 400);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [query, fetchGoogle]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = async (item) => {
    setQuery(item.name);
    setOpen(false);
    setGoogleResults([]);
    if (item.google && item.placeId) {
      const details = await getPlaceDetails(item.placeId);
      if (details) onChange(details);
    } else {
      onChange(item);
    }
  };

  const hasOptions = dbResults.length > 0 || googleResults.length > 0;

  return (
    <div className="location-input" ref={ref}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        required
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (!e.target.value) onChange(null);
        }}
        onFocus={() => setOpen(true)}
      />
      {open && hasOptions && (
        <div className="location-dropdown">
          {dbResults.map((loc) => (
            <button key={loc.id || loc.name} type="button" className="location-option" onClick={() => select(loc)}>
              <MapPin size={14} />
              {loc.name}
            </button>
          ))}
          {googleResults.length > 0 && (
            <>
              {dbResults.length > 0 && <div className="location-divider" />}
              <div className="location-places-label">Google Maps suggestions</div>
              {googleResults.map((g) => (
                <button key={g.placeId} type="button" className="location-option" onClick={() => select(g)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                  </svg>
                  {g.name}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const BookingWidget = ({ onComplete, onPickupChange, onDestinationChange, externalPickup, externalDestination, routeDistanceKm, routeDurationSec }) => {
  const { createBooking } = usePlatform();
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('18:00');
  const [type, setType] = useState('One Way');
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (externalPickup) {
      setPickup(externalPickup);
      if (onPickupChange) onPickupChange(externalPickup);
    } else {
      setPickup(null);
      if (onPickupChange) onPickupChange(null);
    }
  }, [externalPickup]);

  useEffect(() => {
    if (externalDestination) {
      setDestination(externalDestination);
      if (onDestinationChange) onDestinationChange(externalDestination);
    } else {
      setDestination(null);
      if (onDestinationChange) onDestinationChange(null);
    }
  }, [externalDestination]);

  useEffect(() => {
    setPickup(null);
    setDestination(null);
    setErrors({});
  }, [type]);

  useEffect(() => {
    if (pickup && destination && routeDistanceKm) {
      let fare = 299;
      if (type === 'Airport Transfer') fare = 1499;
      else if (type === 'Outstation Travel') fare = Math.round(routeDistanceKm * 18 + 1500);
      else if (type === 'Hourly Booking') fare = 699;
      else if (type === 'Night Chauffeur') fare = Math.max(399, Math.round(399 + routeDistanceKm * 20));
      setEstimatedFare(fare);
    } else if (!pickup || !destination) {
      setEstimatedFare(0);
    }
  }, [pickup, destination, type, routeDistanceKm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!pickup) errs.pickup = 'Select a pickup location';
    if (!destination) errs.destination = 'Select a destination';
    setErrors(errs);
    if (!pickup || !destination) return;

    const pickupObj = { name: pickup.name, lat: pickup.lat, lng: pickup.lng };
    const destObj = { name: destination.name, lat: destination.lat, lng: destination.lng };
    createBooking(pickupObj, destObj, date, time, type);
    if (onComplete) onComplete();
  };

  const filterBy = CATEGORY_MAP[type] || 'all';

  return (
    <form className="hero-booking-widget" onSubmit={handleSubmit}>
      <h3 className="widget-title">
        <Car size={22} className="stat-card-icon" />
        Book Your Chauffeur
      </h3>

      <div className="ride-type-selector">
        <button type="button" className={`ride-type-btn ${type === 'One Way' ? 'active' : ''}`} onClick={() => setType('One Way')}>One Way</button>
        <button type="button" className={`ride-type-btn ${type === 'Airport Transfer' ? 'active' : ''}`} onClick={() => setType('Airport Transfer')}>Airport</button>
        <button type="button" className={`ride-type-btn ${type === 'Hourly Booking' ? 'active' : ''}`} onClick={() => setType('Hourly Booking')}>Hourly</button>
      </div>

      <div className="widget-inputs">
        <div className="input-group">
          <label>Pickup Location</label>
          <div className="input-icon-wrapper">
            <MapPin size={18} />
            <LocationInput
              value={pickup}
              onChange={(loc) => {
                setPickup(loc);
                setErrors((e) => ({ ...e, pickup: null }));
                if (onPickupChange) onPickupChange(loc);
              }}
              exclude={destination}
              placeholder="Type a pickup location"
              filterBy={filterBy}
            />
          </div>
          {errors.pickup && <span className="input-error">{errors.pickup}</span>}
        </div>

        <div className="input-group">
          <label>Destination Location</label>
          <div className="input-icon-wrapper">
            <MapPin size={18} style={{ color: '#888' }} />
            <LocationInput
              value={destination}
              onChange={(loc) => {
                setDestination(loc);
                setErrors((e) => ({ ...e, destination: null }));
                if (onDestinationChange) onDestinationChange(loc);
              }}
              exclude={pickup}
              placeholder="Type a destination"
              filterBy={filterBy}
            />
          </div>
          {errors.destination && <span className="input-error">{errors.destination}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="input-group">
            <label>Date</label>
            <div className="input-icon-wrapper">
              <Calendar size={16} />
              <input type="date" value={date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>
          <div className="input-group">
            <label>Time</label>
            <div className="input-icon-wrapper">
              <Clock size={16} />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
          </div>
        </div>
      </div>

      <div className="fare-estimate-box">
        <div className="fare-info">
          <p>Estimated Fare</p>
          <h4>{type}</h4>
        </div>
        <div className="fare-amount">₹{estimatedFare}</div>
      </div>

      <button type="submit" className="btn btn-yellow" style={{ width: '100%', padding: '18px' }}>
        Confirm Booking Request
        <ChevronRight size={18} />
      </button>
    </form>
  );
};
export default BookingWidget;
