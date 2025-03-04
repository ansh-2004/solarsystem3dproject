import React from 'react';
import { PlanetConfig } from '../types';

interface PlanetControlsProps {
  planet: PlanetConfig;
  onChange: (updatedPlanet: PlanetConfig) => void;
}

const PlanetControls: React.FC<PlanetControlsProps> = ({ planet, onChange }) => {
  const handleChange = (property: keyof PlanetConfig, value: number) => {
    onChange({
      ...planet,
      [property]: value
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">{planet.name}</h3>
        <div 
          className="w-6 h-6 rounded-full" 
          style={{ backgroundColor: planet.color }}
        ></div>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Size: {planet.size.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={planet.size}
            onChange={(e) => handleChange('size', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Speed: {planet.speed.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.001"
            max="5"
            step="0.001"
            value={planet.speed}
            onChange={(e) => handleChange('speed', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Orbit Distance: {planet.orbitDistance.toFixed(1)}
          </label>
          <input
            type="range"
            min="5"
            max="100"
            step="0.5"
            value={planet.orbitDistance}
            onChange={(e) => handleChange('orbitDistance', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default PlanetControls;