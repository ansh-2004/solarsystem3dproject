import React, { useState } from 'react';
import { PlanetConfig, SolarSystemConfig } from '../types';
import PlanetControls from './PlanetControls';
import { Save, Download, Database } from 'lucide-react';

interface ConfigurationPanelProps {
  planets: PlanetConfig[];
  onPlanetChange: (updatedPlanet: PlanetConfig) => void;
  onSaveConfig: (name: string) => void;
  onLoadConfig: (configId: string) => void;
  savedConfigs: SolarSystemConfig[];
  isLoading: boolean;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  planets,
  onPlanetChange,
  onSaveConfig,
  onLoadConfig,
  savedConfigs,
  isLoading
}) => {
  const [configName, setConfigName] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSave = () => {
    if (configName.trim()) {
      onSaveConfig(configName);
      setConfigName('');
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg overflow-y-auto max-h-[600px]">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <Database className="mr-2" size={20} />
        Configuration Panel
      </h2>

      {/* Save Configuration */}
      <div className="mb-6 bg-gray-800 p-3 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Save Configuration</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={configName}
            onChange={(e) => setConfigName(e.target.value)}
            placeholder="Configuration name"
            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            disabled={!configName.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
          >
            <Save size={16} className="mr-1" />
            Save
          </button>
        </div>
      </div>

      {/* Load Configuration */}
      <div className="mb-6 bg-gray-800 p-3 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Load Configuration</h3>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
          >
            <span>Select a configuration</span>
            <Download size={16} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
              {savedConfigs.length === 0 ? (
                <div className="px-4 py-2 text-gray-300">No saved configurations</div>
              ) : (
                savedConfigs.map((config) => (
                  <button
                    key={config.id}
                    onClick={() => {
                      if (config.id) {
                        onLoadConfig(config.id);
                        setIsDropdownOpen(false);
                      }
                    }}
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-600 focus:outline-none"
                  >
                    {config.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Planet Selection */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Select Planet</h3>
        <div className="grid grid-cols-4 gap-2">
          {planets.map((planet) => (
            <button
              key={planet.id}
              onClick={() => setSelectedPlanet(planet.id === selectedPlanet ? null : planet.id)}
              className={`p-2 rounded-md text-center ${
                planet.id === selectedPlanet
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              {planet.name}
            </button>
          ))}
        </div>
      </div>

      {/* Planet Controls */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Planet Properties</h3>
        {selectedPlanet ? (
          <PlanetControls
            planet={planets.find(p => p.id === selectedPlanet)!}
            onChange={onPlanetChange}
          />
        ) : (
          <div className="text-gray-400 text-center p-4 bg-gray-800 rounded-lg">
            Select a planet to modify its properties
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationPanel;