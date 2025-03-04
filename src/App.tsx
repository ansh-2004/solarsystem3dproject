import { useState, useEffect } from 'react';
import SolarSystem from './components/SolarSystem';
import ConfigurationPanel from './components/ConfigurationPanel';
import { defaultPlanets } from './data/defaultPlanets';
import { PlanetConfig, SolarSystemConfig } from './types';
import { saveConfiguration, getConfigurations, getConfigurationById } from './services/configService';
import { AlertCircle, Github, Rocket } from 'lucide-react';

function App() {
  const [planets, setPlanets] = useState<PlanetConfig[]>(defaultPlanets);
  const [savedConfigs, setSavedConfigs] = useState<SolarSystemConfig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firebaseConfigured, setFirebaseConfigured] = useState(true);

  // Check if Firebase is properly configured
  useEffect(() => {
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    if (!apiKey || apiKey.includes('YOUR_')) {
      setFirebaseConfigured(false);
    }
  }, []);

  // Load saved configurations
  useEffect(() => {
    if (firebaseConfigured) {
      loadConfigurations();
    }
  }, [firebaseConfigured]);

  const loadConfigurations = async () => {
    try {
      setIsLoading(true);
      const configs = await getConfigurations();
      setSavedConfigs(configs);
      setError(null);
    } catch (err) {
      setError('Failed to load configurations');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanetChange = (updatedPlanet: PlanetConfig) => {
    setPlanets(planets.map(planet => 
      planet.id === updatedPlanet.id ? updatedPlanet : planet
    ));
  };

  const handleSaveConfig = async (name: string) => {
    if (!firebaseConfigured) {
      setError('Firebase is not properly configured');
      return;
    }
    
    try {
      setIsLoading(true);
      const config: SolarSystemConfig = {
        name,
        planets: [...planets]
      };
      
      await saveConfiguration(config);
      await loadConfigurations();
      setError(null);
    } catch (err) {
      setError('Failed to save configuration');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadConfig = async (configId: string) => {
    try {
      setIsLoading(true);
      const config = await getConfigurationById(configId);
      
      if (config && config.planets) {
        setPlanets(config.planets);
        setError(null);
      }
    } catch (err) {
      setError('Failed to load configuration');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Rocket className="mr-2" />
            Interactive 3D Solar System
          </h1>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white flex items-center"
          >
            <Github className="mr-1" size={20} />
            <span>GitHub</span>
          </a>
        </div>
      </header>

      {!firebaseConfigured && (
        <div className="container mx-auto mt-4 p-4 bg-yellow-800 text-yellow-100 rounded-lg flex items-start">
          <AlertCircle className="mr-2 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold">Firebase Configuration Required</h3>
            <p>
              Please update the Firebase configuration in <code>src/firebase/config.ts</code> with your Firebase project details.
              You'll need to create a Firebase project and enable Firestore.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="container mx-auto mt-4 p-4 bg-red-800 text-red-100 rounded-lg flex items-center">
          <AlertCircle className="mr-2" />
          <span>{error}</span>
        </div>
      )}

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SolarSystem planets={planets} />
          </div>
          <div>
            <ConfigurationPanel
              planets={planets}
              onPlanetChange={handlePlanetChange}
              onSaveConfig={handleSaveConfig}
              onLoadConfig={handleLoadConfig}
              savedConfigs={savedConfigs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center text-gray-400">
          <p>Interactive 3D Solar System - Built with React, Three.js, and Firebase</p>
        </div>
      </footer>
    </div>
  );
}

export default App;