export interface PlanetConfig {
  id: string;
  name: string;
  size: number;
  speed: number;
  orbitDistance: number;
  color: string;
  texture?: string;
}

export interface SolarSystemConfig {
  id?: string;
  name: string;
  planets: PlanetConfig[];
  createdAt?: Date;
}