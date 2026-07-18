import React from 'react';
import { MapPin, Clock, Navigation } from 'lucide-react';

const MAPS_URL = 'https://maps.google.com/maps?q=Biel+Bienne+Switzerland';
const STREET_VIEW_URL =
  'https://www.google.com/maps/@47.1371,7.2471,3a,75y,0h,90t/data=!3m6!1e1!3m4!1s!2e0!7i16384!8i8192';

/**
 * Static map of Biel/Bienne (OpenStreetMap tiles, committed local asset).
 * Clicking the map or "Directions" opens Google Maps.
 */
const InteractiveMap = () => (
  <div>
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Taxed GmbH location in Google Maps"
      className="block relative w-full h-48 rounded-xl overflow-hidden border border-gray-700 group"
    >
      <img
        src="/images/map-biel-bienne.jpg"
        alt="Map of Biel/Bienne, Switzerland, where Taxed GmbH is located"
        width="840"
        height="384"
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Location marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
        <div className="w-10 h-10 bg-steel-blue rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div className="w-2 h-2 bg-steel-blue rotate-45 mx-auto -mt-1" />
      </div>

      {/* Label */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gray-900/90 to-transparent px-4 pt-8 pb-3 pointer-events-none">
        <p className="text-white font-semibold text-sm leading-tight">Biel/Bienne, Switzerland</p>
        <p className="text-gray-300 text-xs">Our headquarters — tap to open in Google Maps</p>
      </div>

      {/* Required OpenStreetMap attribution */}
      <span className="absolute top-1.5 right-2 text-[10px] text-gray-700 bg-white/70 px-1 rounded pointer-events-none">
        © OpenStreetMap
      </span>
    </a>

    {/* Actions */}
    <div className="flex items-center gap-4 mt-3 text-base text-gray-400">
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get directions to our office"
        className="flex items-center space-x-2 hover:text-steel-blue transition-colors py-2 min-h-[44px]"
      >
        <Navigation className="h-5 w-5" />
        <span>Directions</span>
      </a>
      <a
        href={STREET_VIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View street view of our location"
        className="flex items-center space-x-2 hover:text-steel-blue transition-colors py-2 min-h-[44px]"
      >
        <Clock className="h-5 w-5" />
        <span>Street View</span>
      </a>
    </div>
  </div>
);

export default InteractiveMap;
