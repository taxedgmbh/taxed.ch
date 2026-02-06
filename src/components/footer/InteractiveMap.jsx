import React, { useState } from 'react';
import { MapPin, Map, Clock, Navigation } from 'lucide-react';

const InteractiveMap = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleMarkerClick = () => {
    setShowInfo(!showInfo);
  };

  const openDirections = () => {
    window.open('https://maps.google.com/maps?q=Biel+Bienne+Switzerland', '_blank');
  };

  const openStreetView = () => {
    window.open('https://www.google.com/maps/@47.1371,7.2471,3a,75y,0h,90t/data=!3m6!1e1!3m4!1s!2e0!7i16384!8i8192', '_blank');
  };

  return (
    <div className="relative group">
      {/* Map Container */}
      <div
        className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden relative cursor-grab border border-gray-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Map Background Pattern */}
        <div
          className="absolute inset-0 opacity-20 transition-transform duration-300"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            background: 'linear-gradient(45deg, #2d3748 25%, transparent 25%), linear-gradient(-45deg, #2d3748 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2d3748 75%), linear-gradient(-45deg, transparent 75%, #2d3748 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        ></div>

        {/* Grid Lines */}
        <div
          className="absolute inset-0 opacity-10 transition-transform duration-300"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        ></div>

        {/* Roads and Streets */}
        <div
          className="absolute inset-0 opacity-15 transition-transform duration-300"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 60px 60px, 40px 40px, 40px 40px'
          }}
        ></div>

        {/* Location Marker */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 cursor-pointer"
          style={{ transform: `translate(-50%, -50%) scale(${zoom})` }}
          onClick={handleMarkerClick}
        >
          <div className="relative">
            {/* Pulse Animation */}
            <div className="absolute inset-0 w-8 h-8 bg-steel-blue/30 rounded-full animate-ping"></div>
            <div className="absolute inset-0 w-8 h-8 bg-steel-blue/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>

            {/* Main Marker */}
            <div className="relative w-8 h-8 bg-gradient-to-br from-steel-blue to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
              <MapPin className="h-4 w-4 text-white" />
            </div>

            {/* Info Tooltip */}
            {showInfo && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white text-gray-900 rounded-lg shadow-xl p-3 min-w-48 z-10">
                <div className="text-sm font-semibold mb-1">Taxed GmbH</div>
                <div className="text-xs text-gray-600 mb-2">Biel/Bienne, Switzerland</div>
                <div className="text-xs text-gray-500 mb-3">Swiss Tax Consulting</div>
                <div className="flex space-x-2">
                  <button
                    onClick={openDirections}
                    className="text-xs bg-steel-blue text-white px-3 py-2 min-h-[44px] rounded hover:bg-blue-600 transition-colors"
                  >
                    Directions
                  </button>
                  <button
                    onClick={openStreetView}
                    className="text-xs bg-gray-200 text-gray-900 px-3 py-2 min-h-[44px] rounded hover:bg-gray-300 transition-colors"
                  >
                    Street View
                  </button>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              </div>
            )}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          <button
            onClick={handleZoomIn}
            className="w-11 h-11 min-w-[44px] min-h-[44px] bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors border border-gray-500"
            aria-label="Zoom in"
          >
            <span className="text-xl font-bold">+</span>
          </button>
          <button
            onClick={handleZoomOut}
            className="w-11 h-11 min-w-[44px] min-h-[44px] bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors border border-gray-500"
            aria-label="Zoom out"
          >
            <span className="text-xl font-bold">−</span>
          </button>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {Math.round(zoom * 100)}%
        </div>

        {/* Overlay with Location Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center space-x-2 text-white">
            <MapPin className="h-4 w-4 text-steel-blue" />
            <div>
              <div className="text-sm font-semibold">Biel/Bienne, Switzerland</div>
              <div className="text-xs text-gray-300">Our headquarters</div>
            </div>
          </div>
        </div>

        {/* Interactive Overlay */}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-center text-white">
            <Map className="h-8 w-8 mx-auto mb-2 text-steel-blue" />
            <div className="text-sm font-semibold">Interactive Map</div>
            <div className="text-xs text-gray-300 mb-3">Drag to move - Click marker for info</div>
            <div className="flex space-x-2 justify-center">
              <button
                onClick={openDirections}
                className="text-sm bg-steel-blue text-white px-4 py-2 min-h-[44px] rounded hover:bg-blue-600 transition-colors"
              >
                Get Directions
              </button>
              <button
                onClick={openStreetView}
                className="text-sm bg-gray-700 text-white px-4 py-2 min-h-[44px] rounded hover:bg-gray-600 transition-colors border border-gray-500"
              >
                Street View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="mt-3 flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <button
            onClick={openDirections}
            className="flex items-center space-x-1 hover:text-steel-blue transition-colors py-2 min-h-[44px]"
            aria-label="Get directions to our office"
          >
            <Navigation className="h-4 w-4" />
            <span>Directions</span>
          </button>
          <button
            onClick={openStreetView}
            className="flex items-center space-x-1 hover:text-steel-blue transition-colors py-2 min-h-[44px]"
            aria-label="View street view of our location"
          >
            <Clock className="h-4 w-4" />
            <span>Street View</span>
          </button>
        </div>
        <div className="text-steel-blue font-medium">Fully Interactive</div>
      </div>
    </div>
  );
};

export default InteractiveMap;
