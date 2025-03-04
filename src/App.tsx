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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <header className="bg-gray-800 p-5 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Rocket className="text-blue-400" />
            <span>Solar System </span>
          </h1>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-400 flex items-center space-x-1"
          >
            <Github size={22} />
            <span>GitHub</span>
          </a>
        </div>
      </header>

      {!firebaseConfigured && (
        <div className="container mx-auto mt-6 p-4 bg-yellow-600 text-black rounded-lg flex items-center space-x-3">
          <AlertCircle className="text-yellow-900" />
          <div>
            <h3 className="font-bold">Firebase Configuration Required</h3>
            <p>Update <code>src/firebase/config.ts</code> with your Firebase project details.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="container mx-auto mt-6 p-4 bg-red-600 text-white rounded-lg flex items-center space-x-3">
          <AlertCircle />
          <span>{error}</span>
        </div>
      )}

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
              <SolarSystem planets={planets} />
            </div>
          </div>
          <div>
            <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
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
        </div>
      </main>

      <footer className="bg-gray-800 p-6 mt-8 text-center text-gray-300 border-t border-gray-700">
       
      </footer>
    </div>
  );

}

export default App;