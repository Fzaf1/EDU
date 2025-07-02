import React from 'react';
import { Modal } from '../common/Modal';
import { CelestialObject } from '../../types';
import { Globe, Thermometer, Clock, Ruler, Users, Atom, Lightbulb, Star, Moon, Zap, Info, Orbit, Home as Comet, Eye } from 'lucide-react';

interface CelestialObjectModalProps {
  object: CelestialObject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CelestialObjectModal: React.FC<CelestialObjectModalProps> = ({
  object,
  isOpen,
  onClose
}) => {
  if (!object) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'planet': return <Globe className="w-6 h-6" />;
      case 'exoplanet': return <Globe className="w-6 h-6" />;
      case 'star': return <Star className="w-6 h-6" />;
      case 'galaxy': return <Zap className="w-6 h-6" />;
      case 'blackhole': return <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-800 to-black border-2 border-white" />;
      case 'asteroid': return <Orbit className="w-6 h-6" />;
      case 'comet': return <Comet className="w-6 h-6" />;
      case 'nebula': return <Atom className="w-6 h-6" />;
      default: return <Globe className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'planet': return 'from-blue-500 to-cyan-600';
      case 'exoplanet': return 'from-purple-500 to-blue-600';
      case 'star': return 'from-yellow-400 to-orange-500';
      case 'galaxy': return 'from-purple-500 to-pink-600';
      case 'blackhole': return 'from-gray-700 to-black';
      case 'asteroid': return 'from-gray-500 to-gray-700';
      case 'comet': return 'from-cyan-400 to-blue-500';
      case 'nebula': return 'from-pink-500 to-purple-600';
      default: return 'from-cosmic-500 to-cosmic-600';
    }
  };

  const InfoItem: React.FC<{ 
    icon: React.ReactNode; 
    label: string; 
    value: string;
    description?: string;
  }> = ({ icon, label, value, description }) => (
    <div className="group glass-effect rounded-xl p-4 cosmic-glow hover:scale-105 transition-all duration-300">
      <div className="flex items-start space-x-3">
        <div className="text-cosmic-400 mt-1 group-hover:text-cosmic-300 transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-caption text-cosmic-400 font-medium mb-1">{label}</p>
          <p className="text-body text-white font-semibold mb-1">{value}</p>
          {description && (
            <p className="text-xs text-cosmic-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={object.name}
      size="xl"
    >
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="flex items-start space-x-6">
          <div className={`w-20 h-20 bg-gradient-to-br ${getTypeColor(object.type)} rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow`}>
            {getTypeIcon(object.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <span className={`px-4 py-2 bg-gradient-to-r ${getTypeColor(object.type)} text-white text-caption font-semibold rounded-full capitalize shadow-lg`}>
                {object.subtype || object.type}
              </span>
              <div 
                className="w-6 h-6 rounded-full shadow-lg border-2 border-white/30"
                style={{ backgroundColor: object.color }}
              />
            </div>
            <p className="text-body text-cosmic-200 leading-relaxed">
              {object.description}
            </p>
          </div>
        </div>

        {/* Enhanced Information Grid */}
        <div>
          <h3 className="text-title font-orbitron text-cosmic-200 mb-6 flex items-center space-x-2">
            <Info className="w-6 h-6" />
            <span>Physical Properties & Characteristics</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {object.diameter && (
              <InfoItem 
                icon={<Ruler />} 
                label="Diameter" 
                value={object.diameter}
                description="The distance across the object at its widest point"
              />
            )}
            
            {object.mass && (
              <InfoItem 
                icon={<Atom />} 
                label="Mass" 
                value={object.mass}
                description="Total amount of matter in the object"
              />
            )}
            
            {object.distanceFromSun && (
              <InfoItem 
                icon={<Globe />} 
                label="Distance from Sun" 
                value={object.distanceFromSun}
                description="Average distance from our solar system's center"
              />
            )}
            
            {object.distanceFromStar && (
              <InfoItem 
                icon={<Globe />} 
                label="Distance from Star" 
                value={object.distanceFromStar}
                description="Average distance from its host star"
              />
            )}
            
            {object.distance && (
              <InfoItem 
                icon={<Ruler />} 
                label="Distance from Earth" 
                value={object.distance}
                description="Approximate distance from our planet"
              />
            )}
            
            {object.orbitalPeriod && (
              <InfoItem 
                icon={<Clock />} 
                label="Orbital Period" 
                value={object.orbitalPeriod}
                description="Time to complete one orbit around its star"
              />
            )}
            
            {object.rotationPeriod && (
              <InfoItem 
                icon={<Clock />} 
                label="Rotation Period" 
                value={object.rotationPeriod}
                description="Time to complete one full rotation"
              />
            )}
            
            {object.temperature && (
              <InfoItem 
                icon={<Thermometer />} 
                label="Temperature" 
                value={object.temperature}
                description="Surface or atmospheric temperature"
              />
            )}
            
            {object.age && (
              <InfoItem 
                icon={<Clock />} 
                label="Age" 
                value={object.age}
                description="Estimated age of the object"
              />
            )}
            
            {object.luminosity && (
              <InfoItem 
                icon={<Star />} 
                label="Luminosity" 
                value={object.luminosity}
                description="Total energy output compared to the Sun"
              />
            )}
            
            {object.moons !== undefined && (
              <InfoItem 
                icon={<Moon />} 
                label="Natural Satellites" 
                value={object.moons.toString()}
                description="Number of confirmed moons orbiting this object"
              />
            )}
            
            {object.stars && (
              <InfoItem 
                icon={<Star />} 
                label="Number of Stars" 
                value={object.stars}
                description="Estimated stellar population"
              />
            )}

            {object.lastPerihelion && (
              <InfoItem 
                icon={<Clock />} 
                label="Last Perihelion" 
                value={object.lastPerihelion}
                description="Most recent closest approach to the Sun"
              />
            )}

            {object.nextPerihelion && (
              <InfoItem 
                icon={<Clock />} 
                label="Next Perihelion" 
                value={object.nextPerihelion}
                description="Next predicted closest approach to the Sun"
              />
            )}
          </div>
        </div>

        {/* Enhanced Composition Section */}
        {object.composition && (
          <div>
            <h3 className="text-title font-orbitron text-cosmic-200 mb-4 flex items-center space-x-2">
              <Atom className="w-6 h-6" />
              <span>Composition & Structure</span>
            </h3>
            <div className="glass-effect rounded-xl p-6 cosmic-glow">
              <p className="text-body text-cosmic-300 leading-relaxed">{object.composition}</p>
            </div>
          </div>
        )}

        {/* Enhanced Interesting Facts */}
        <div>
          <h3 className="text-title font-orbitron text-cosmic-200 mb-6 flex items-center space-x-2">
            <Lightbulb className="w-6 h-6" />
            <span>Fascinating Facts & Discoveries</span>
          </h3>
          <div className="space-y-4">
            {object.interestingFacts.map((fact, index) => (
              <div 
                key={index}
                className="group glass-effect rounded-xl p-6 cosmic-glow hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cosmic-500 to-nebula-500 rounded-full flex items-center justify-center text-white text-caption font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <p className="text-body text-cosmic-200 leading-relaxed flex-1">{fact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced 3D Model Preview */}
        <div>
          <h3 className="text-title font-orbitron text-cosmic-200 mb-4 flex items-center space-x-2">
            <Eye className="w-6 h-6" />
            <span>3D Visualization & Exploration</span>
          </h3>
          <div className="glass-effect rounded-xl p-8 cosmic-glow text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-2xl animate-float" 
                 style={{ backgroundColor: object.color }}>
              {getTypeIcon(object.type)}
            </div>
            <h4 className="text-body font-semibold text-white mb-2">Interactive 3D Model</h4>
            <p className="text-caption text-cosmic-400 mb-4">
              Experience this celestial object in our interactive 3D universe on the home page
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-cosmic-500">
              <div className="flex flex-col items-center space-y-1">
                <Ruler className="w-4 h-4" />
                <span>Realistic scale</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Orbit className="w-4 h-4" />
                <span>Orbital mechanics</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Eye className="w-4 h-4" />
                <span>Interactive controls</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Star className="w-4 h-4" />
                <span>Dynamic lighting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Note */}
        <div className="glass-effect rounded-xl p-6 cosmic-glow bg-gradient-to-r from-cosmic-900/30 to-nebula-900/30">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-6 h-6 text-cosmic-400 mt-1" />
            <div>
              <h4 className="text-body font-semibold text-cosmic-200 mb-2">Scientific Accuracy</h4>
              <p className="text-caption text-cosmic-400 leading-relaxed">
                This information is based on current scientific understanding and observations from NASA, ESA, 
                and other reputable space agencies. Space exploration continues to reveal new discoveries 
                about our universe every day, expanding our knowledge of these cosmic wonders!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};