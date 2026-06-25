let scriptLoaded = false;
let scriptLoading = false;
const callbacks = [];

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (!API_KEY) {
      resolve(null);
      return;
    }
    if (window.google && window.google.maps) {
      resolve(window.google.maps.places);
      return;
    }
    if (scriptLoading) {
      callbacks.push(resolve);
      return;
    }
    scriptLoading = true;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      scriptLoaded = true;
      scriptLoading = false;
      resolve(window.google.maps.places);
      callbacks.forEach((cb) => cb(window.google.maps.places));
    };
    script.onerror = () => {
      scriptLoading = false;
      reject(new Error('Failed to load Google Maps script'));
    };
    document.head.appendChild(script);
  });
};

let placesInstance = null;

export const getPlacesService = async () => {
  const places = await loadGoogleMapsScript();
  if (!places) return null;
  if (!placesInstance) {
    const el = document.createElement('div');
    placesInstance = new places.PlacesService(el);
  }
  return { autocomplete: new places.AutocompleteService(), places: placesInstance };
};

export const getPlacePredictions = async (input) => {
  try {
    const svc = await getPlacesService();
    if (!svc) return [];
    return new Promise((resolve) => {
      svc.autocomplete.getPlacePredictions(
        { input, types: ['geocode', 'establishment'], componentRestrictions: { country: 'IN' } },
        (predictions, status) => {
          if (status === 'OK' && predictions) {
            resolve(predictions.map((p) => ({
              name: p.description,
              placeId: p.place_id,
              google: true,
            })));
          } else {
            resolve([]);
          }
        }
      );
    });
  } catch {
    return [];
  }
};

export const getPlaceDetails = async (placeId) => {
  try {
    const svc = await getPlacesService();
    if (!svc) return null;
    return new Promise((resolve) => {
      svc.places.getDetails({ placeId, fields: ['geometry', 'name', 'formatted_address'] }, (place, status) => {
        if (status === 'OK' && place.geometry) {
          resolve({
            name: place.formatted_address || place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        } else {
          resolve(null);
        }
      });
    });
  } catch {
    return null;
  }
};

export const getRouteDirections = async (origin, destination) => {
  // Try Google Maps Directions API (REST, no JS SDK needed)
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (API_KEY) {
    try {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&departure_time=now&traffic_model=best_guess&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === 'OK' && data.routes?.[0]?.legs?.[0]) {
        const leg = data.routes[0].legs[0];
        // Use duration_in_traffic if available (requires Premium Plan or enabled billing)
        const dur = leg.duration_in_traffic || leg.duration;
        return {
          distanceKm: leg.distance.value / 1000,
          distanceText: leg.distance.text,
          durationSec: dur.value,
          durationText: dur.text,
          hasTraffic: !!leg.duration_in_traffic,
        };
      }
    } catch {
      // Google Maps API failed, fall through to OSRM
    }
  }

  // Fallback: OSRM (free, no API key needed)
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.code === 'Ok' && data.routes?.[0]) {
      const route = data.routes[0];
      const distKm = route.distance / 1000;
      const durSec = route.duration;
      const durHours = Math.floor(durSec / 3600);
      const durMinutes = Math.round((durSec % 3600) / 60);
      return {
        distanceKm: distKm,
        distanceText: `${distKm.toFixed(1)} km`,
        durationSec: durSec,
        durationText: durHours > 0 ? `${durHours}h ${durMinutes}m` : `${durMinutes}m`,
      };
    }
  } catch {
    // OSRM failed
  }

  return null;
};
