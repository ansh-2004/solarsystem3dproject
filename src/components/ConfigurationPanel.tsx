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
    <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700 p-6 rounded-2xl shadow-2xl max-h-[600px] overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-5 flex items-center">
        <Database className="mr-3 text-blue-400" size={24} />
        Configuration Panel
      </h2>

      {/* Save Configuration */}
      <div className="mb-6 bg-gray-800/80 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Save Configuration</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            value={configName}
            onChange={(e) => setConfigName(e.target.value)}
            placeholder="Enter configuration name"
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            disabled={!configName.trim() || isLoading}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:opacity-80 transition-all flex items-center shadow-md disabled:opacity-50"
          >
            <Save size={18} className="mr-2" />
            Save
          </button>
        </div>
      </div>

      {/* Load Configuration */}
      <div className="mb-6 bg-gray-800/80 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Load Configuration</h3>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
          >
            <span>Select a configuration</span>
            <Download size={18} />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-auto">
              {savedConfigs.length === 0 ? (
                <div className="px-4 py-3 text-gray-300">No saved configurations</div>
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
                    className="w-full text-left px-4 py-3 text-white hover:bg-gray-600 transition-all"
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
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Select Planet</h3>
        <div className="grid grid-cols-4 gap-3">
          {planets.map((planet) => (
            <button
              key={planet.id}
              onClick={() => setSelectedPlanet(planet.id === selectedPlanet ? null : planet.id)}
              className={`p-3 rounded-lg text-center text-sm font-medium transition-all shadow-md ${
                planet.id === selectedPlanet
                  ? 'bg-blue-600 text-white border border-blue-400'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
              }`}
            >
              {planet.name}
            </button>
          ))}
        </div>
      </div>

      {/* Planet Controls */}
      <div className="bg-gray-800/80 p-5 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Planet Properties</h3>
        {selectedPlanet ? (
          <PlanetControls
            planet={planets.find((p) => p.id === selectedPlanet)!}
            onChange={onPlanetChange}
          />
        ) : (
          <div className="text-gray-400 text-center p-5 bg-gray-700 rounded-lg border border-gray-600">
            Select a planet to modify its properties
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationPanel;