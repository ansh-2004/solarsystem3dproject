import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { PlanetConfig } from '../types';
import * as THREE from 'three';

interface PlanetProps {
  config: PlanetConfig;
}

const Planet: React.FC<PlanetProps> = ({ config }) => {
  const { size, speed, orbitDistance, color, texture } = config;
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [textureLoaded, setTextureLoaded] = useState<THREE.Texture | null>(null);

  // Load texture if available
  React.useEffect(() => {
    if (texture) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        texture,
        (loadedTexture) => {
          setTextureLoaded(loadedTexture);
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', error);
        }
      );
    }
  }, [texture]);

  // Animation loop
  useFrame(({ clock }) => {
    if (orbitRef.current) {
      // Rotate around the sun
      orbitRef.current.rotation.y = clock.getElapsedTime() * speed * 0.2;
    }
    
    if (planetRef.current) {
      // Rotate the planet itself
      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitDistance, orbitDistance + 0.05, 64]} />
        <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
      </mesh>
      
      {/* Planet orbit group */}
      <group ref={orbitRef}>
        <mesh 
          ref={planetRef} 
          position={[orbitDistance, 0, 0]}
        >
          <sphereGeometry args={[size, 32, 32]} />
          {textureLoaded ? (
            <meshStandardMaterial map={textureLoaded} />
          ) : (
            <meshStandardMaterial color={color} />
          )}
        </mesh>
      </group>
    </group>
  );
};

const Sun: React.FC = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const [sunTexture, setSunTexture] = useState<THREE.Texture | null>(null);

  React.useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/venus.jpg',
      (loadedTexture) => {
        setSunTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error('Error loading sun texture:', error);
      }
    );
  }, []);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[3, 32, 32]} />
      {sunTexture ? (
        <meshBasicMaterial map={sunTexture} />
      ) : (
        <meshBasicMaterial color="#FDB813" />
      )}
      <pointLight intensity={1.5} distance={100} decay={2} />
    </mesh>
  );
};

interface SolarSystemProps {
  planets: PlanetConfig[];
}

const SolarSystem: React.FC<SolarSystemProps> = ({ planets }) => {
  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 30, 80], fov: 60 }}>
        <ambientLight intensity={1} />
        <Sun />
        {planets.map((planet) => (
          <Planet key={planet.id} config={planet} />
        ))}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};

export default SolarSystem;