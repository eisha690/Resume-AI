import React from 'react';

interface ZoomControllerProps {
  zoom: number;
  setZoom: (z: number) => void;
  fitToWidth: boolean;
  setFitToWidth: (v: boolean) => void;
  onFitToWidthToggle: () => void;
  style?: React.CSSProperties; // Allow style override
}

export default function ZoomController({ zoom, setZoom, fitToWidth, setFitToWidth, style, onFitToWidthToggle }: ZoomControllerProps) {
  // Clamp zoom between 0.5 and 2
  const minZoom = 0.5;
  const maxZoom = 2;
  const step = 0.05;

  const handleZoomIn = () => setZoom(Math.min(maxZoom, +(zoom + step).toFixed(2)));
  const handleZoomOut = () => setZoom(Math.max(minZoom, +(zoom - step).toFixed(2)));
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => setZoom(Number(e.target.value));

  return (
    <div
      className="flex flex-col items-center bg-white shadow-xl rounded-2xl p-3 gap-3 border border-gray-200 w-14 select-none"
      style={{ position: 'absolute', left: -70, top: '50%', transform: 'translateY(-50%)', zIndex: 20, ...style }}
    >
      {/* Fit-to-width/Reset button */}
      <button
        onClick={onFitToWidthToggle}
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${fitToWidth ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-300'} hover:bg-blue-200 transition mb-1`}
        title={fitToWidth ? 'Reset Zoom' : 'Fit to Width'}
      >
        {/* Double arrow icon */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8V4H8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 8V4H14" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 14V18H8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 14V18H14" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {/* + button */}
      <button
        onClick={handleZoomIn}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-200 border border-gray-300 transition text-xl font-bold mb-1"
        title="Zoom In"
        disabled={zoom >= maxZoom}
      >
        +
      </button>
      {/* Vertical slider */}
      <div className="relative flex flex-col items-center h-32 justify-center my-2">
        <input
          type="range"
          min={minZoom}
          max={maxZoom}
          step={step}
          value={zoom}
          onChange={handleSlider}
          className="absolute left-1/2 -translate-x-1/2 rotate-[-90deg] accent-blue-500 w-32 h-2 cursor-pointer"
          aria-label="Zoom slider"
        />
        {/* Slider track background for visual effect */}
        <div className="absolute left-1/2 -translate-x-1/2 w-32 h-2 bg-gray-200 rounded-full pointer-events-none" style={{ transform: 'rotate(-90deg)' }} />
      </div>
      {/* - button */}
      <button
        onClick={handleZoomOut}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-200 border border-gray-300 transition text-xl font-bold mt-1"
        title="Zoom Out"
        disabled={zoom <= minZoom}
      >
        –
      </button>
      {/* Zoom level display */}
      <div className="text-xs text-gray-500 mt-2 font-semibold">{Math.round(zoom * 100)}%</div>
    </div>
  );
} 