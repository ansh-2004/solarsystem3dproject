import { PlanetConfig } from '../types';

export const defaultPlanets: PlanetConfig[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    size: 0.4,
    speed: 4.1,
    orbitDistance: 5,
    color: '#A9A9A9',
    texture: 'https://res.cloudinary.com/dqxnq7md1/image/upload/v1741087236/IKAURS%203D%20PROJECT/dumow3bfxp6w0n818ypl.jpg'
  },
  {
    id: 'venus',
    name: 'Venus',
    size: 0.9,
    speed: 1.6,
    orbitDistance: 7.2,
    color: '#E6E6FA',
    texture: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/venus.jpg'
  },
  {
    id: 'earth',
    name: 'Earth',
    size: 1,
    speed: 1,
    orbitDistance: 10,
    color: '#1E90FF',
    texture: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth.jpg'
  },
  {
    id: 'mars',
    name: 'Mars',
    size: 0.5,
    speed: 0.5,
    orbitDistance: 15,
    color: '#FF4500',
    texture: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars.jpg'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    size: 2.5,
    speed: 0.08,
    orbitDistance: 25,
    color: '#F4A460',
    texture: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/jupiter.jpg'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    size: 2.2,
    speed: 0.03,
    orbitDistance: 40,
    color: '#FFD700',
    texture: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/saturn.jpg'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    size: 1.8,
    speed: 0.01,
    orbitDistance: 60,
    color: '#00FFFF',
    texture: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/uranus.jpg'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    size: 1.8,
    speed: 0.006,
    orbitDistance: 80,
    color: '#4169E1',
    texture: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/neptune.jpg'
  }
];