export interface CelestialObject {
  id: string;
  name: string;
  type: 'planet' | 'star' | 'galaxy' | 'blackhole' | 'asteroid' | 'comet' | 'nebula' | 'exoplanet';
  subtype?: string;
  description: string;
  color: string;
  position: [number, number, number];
  size: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  hasTail?: boolean;
  
  // Physical properties
  diameter?: string;
  mass?: string;
  temperature?: string;
  age?: string;
  distance?: string;
  luminosity?: string;
  
  // Orbital properties
  distanceFromSun?: string;
  distanceFromStar?: string;
  orbitalPeriod?: string;
  rotationPeriod?: string;
  lastPerihelion?: string;
  nextPerihelion?: string;
  
  // Planetary properties
  moons?: number;
  
  // Stellar properties
  stars?: string;
  
  // Composition and structure
  composition?: string;
  
  // Educational content
  interestingFacts: string[];
}

export interface AppState {
  currentPage: 'home' | 'education' | 'login' | 'register';
  selectedObject: CelestialObject | null;
  isModalOpen: boolean;
  user: User | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  page: AppState['currentPage'];
  icon: string;
}