import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, BookOpen, Telescope, Atom, Star, Globe, Zap, Orbit, Home as Comet } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '../components/common/Button';
import { CelestialObject } from '../types';

interface EducationPageProps {
  celestialData: {
    planets: CelestialObject[];
    stars: CelestialObject[];
    galaxies?: CelestialObject[];
    asteroids?: CelestialObject[];
    comets?: CelestialObject[];
    nebulae?: CelestialObject[];
    blackholes?: CelestialObject[];
    deepSpaceObjects?: CelestialObject[];
  };
  onObjectClick: (object: CelestialObject) => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({ 
  celestialData, 
  onObjectClick 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'planet' | 'star' | 'galaxy' | 'blackhole' | 'asteroid' | 'comet' | 'nebula' | 'exoplanet'>('all');
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const allObjects = [
    ...celestialData.planets,
    ...celestialData.stars,
    ...(celestialData.galaxies || []),
    ...(celestialData.asteroids || []),
    ...(celestialData.comets || []),
    ...(celestialData.nebulae || []),
    ...(celestialData.blackholes || []),
    ...(celestialData.deepSpaceObjects || [])
  ];

  const filteredObjects = allObjects.filter(object => {
    const matchesSearch = object.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         object.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         object.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (object.subtype && object.subtype.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || object.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, searchRef.current, cardsRef.current], {
      opacity: 0,
      y: 40
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(searchRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(cardsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");

    // Animate cards with stagger
    const cards = cardsRef.current?.querySelectorAll('.education-card');
    if (cards) {
      gsap.fromTo(cards, 
        { opacity: 0, y: 60, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.7, 
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.5
        }
      );
    }
  }, [filteredObjects]);

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
      default: return <Telescope className="w-6 h-6" />;
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

  const getFilterIcon = (filter: string) => {
    switch (filter) {
      case 'planet': return <Globe className="w-4 h-4" />;
      case 'exoplanet': return <Globe className="w-4 h-4" />;
      case 'star': return <Star className="w-4 h-4" />;
      case 'galaxy': return <Zap className="w-4 h-4" />;
      case 'blackhole': return <Atom className="w-4 h-4" />;
      case 'asteroid': return <Orbit className="w-4 h-4" />;
      case 'comet': return <Comet className="w-4 h-4" />;
      case 'nebula': return <Atom className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getObjectCount = (type: string) => {
    if (type === 'all') return allObjects.length;
    return allObjects.filter(obj => obj.type === type).length;
  };

  const filterOptions = [
    { key: 'all', label: 'All Objects', count: getObjectCount('all') },
    { key: 'planet', label: 'Planets', count: getObjectCount('planet') },
    { key: 'exoplanet', label: 'Exoplanets', count: getObjectCount('exoplanet') },
    { key: 'star', label: 'Stars', count: getObjectCount('star') },
    { key: 'galaxy', label: 'Galaxies', count: getObjectCount('galaxy') },
    { key: 'nebula', label: 'Nebulae', count: getObjectCount('nebula') },
    { key: 'asteroid', label: 'Asteroids', count: getObjectCount('asteroid') },
    { key: 'comet', label: 'Comets', count: getObjectCount('comet') },
    { key: 'blackhole', label: 'Black Holes', count: getObjectCount('blackhole') }
  ].filter(option => option.count > 0);

  return (
    <div className="min-h-screen bg-cosmic-950 pt-20">
      {/* Enhanced background */}
      <div className="stars-bg" />
      
      <div className="relative z-10 content-container py-12">
        {/* Enhanced Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-cosmic-400 animate-float mr-4" />
            <h1 className="text-display font-orbitron text-white glitch">
              <span>Cosmic Education Center</span>
              <span>Cosmic Education Center</span>
              <span>Cosmic Education Center</span>
            </h1>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-cosmic-500 to-nebula-500 mx-auto rounded-full mb-8 animate-pulse-glow" />
          <p className="text-headline text-cosmic-200 max-w-4xl mx-auto leading-relaxed mb-6">
            Discover the Comprehensive Wonders of Our Universe
          </p>
          <p className="text-body text-cosmic-300 max-w-5xl mx-auto leading-relaxed">
            Explore an extensive collection of celestial objects from our solar system and beyond. 
            From planets and stars to galaxies, nebulae, asteroids, comets, and black holes - 
            discover detailed scientific information, fascinating facts, and accurate data about the cosmos.
          </p>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div ref={searchRef} className="mb-16">
          <div className="glass-effect rounded-2xl p-8 cosmic-glow">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Enhanced Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cosmic-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search celestial objects, types, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-cosmic-900/50 border border-cosmic-700 rounded-xl text-white placeholder-cosmic-400 focus:ring-2 focus:ring-cosmic-500 focus:border-transparent transition-all duration-300 text-body"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cosmic-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Enhanced Filter Buttons */}
              <div className="flex items-center space-x-3">
                <Filter className="text-cosmic-400 w-5 h-5" />
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => (
                    <Button
                      key={filter.key}
                      variant={selectedFilter === filter.key ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.key as any)}
                      className="flex items-center space-x-2 px-4 py-2"
                    >
                      {getFilterIcon(filter.key)}
                      <span>{filter.label}</span>
                      <span className="text-xs bg-cosmic-800 px-2 py-1 rounded-full">
                        {filter.count}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Results Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-cosmic-300 font-medium">
                Showing <span className="text-cosmic-100 font-bold">{filteredObjects.length}</span> cosmic object{filteredObjects.length !== 1 ? 's' : ''}
                {selectedFilter !== 'all' && (
                  <span className="text-cosmic-400"> in {filterOptions.find(f => f.key === selectedFilter)?.label}</span>
                )}
                {searchTerm && (
                  <span className="text-cosmic-400"> matching "{searchTerm}"</span>
                )}
              </p>
            </div>
            {(searchTerm || selectedFilter !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                }}
                className="text-cosmic-400 hover:text-white"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced Objects Grid */}
        <div ref={cardsRef}>
          {filteredObjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredObjects.map((object, index) => (
                <div
                  key={object.id}
                  className="education-card group card-hover glass-effect rounded-2xl p-6 cosmic-glow cursor-pointer"
                  onClick={() => onObjectClick(object)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Enhanced Object Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${getTypeColor(object.type)} rounded-xl flex items-center justify-center shadow-lg`}>
                        {getTypeIcon(object.type)}
                      </div>
                      <div>
                        <h3 className="text-title font-orbitron text-white group-hover:text-cosmic-300 transition-colors duration-300">
                          {object.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-caption text-cosmic-400 capitalize font-medium">
                            {object.subtype || object.type}
                          </span>
                          <div className="w-1 h-1 bg-cosmic-600 rounded-full" />
                          <span className="text-caption text-cosmic-500">
                            Click to explore
                          </span>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="w-8 h-8 rounded-full flex-shrink-0 shadow-lg border-2 border-white/20"
                      style={{ backgroundColor: object.color }}
                    />
                  </div>

                  {/* Enhanced Description */}
                  <p className="text-body text-cosmic-300 leading-relaxed mb-6 line-clamp-3">
                    {object.description}
                  </p>

                  {/* Enhanced Key Stats */}
                  <div className="space-y-3 mb-6">
                    {object.diameter && (
                      <div className="flex justify-between items-center text-caption">
                        <span className="text-cosmic-400 font-medium">Diameter:</span>
                        <span className="text-cosmic-200 font-semibold">{object.diameter}</span>
                      </div>
                    )}
                    {object.distanceFromSun && (
                      <div className="flex justify-between items-center text-caption">
                        <span className="text-cosmic-400 font-medium">Distance from Sun:</span>
                        <span className="text-cosmic-200 font-semibold">{object.distanceFromSun}</span>
                      </div>
                    )}
                    {object.distance && (
                      <div className="flex justify-between items-center text-caption">
                        <span className="text-cosmic-400 font-medium">Distance:</span>
                        <span className="text-cosmic-200 font-semibold">{object.distance}</span>
                      </div>
                    )}
                    {object.temperature && (
                      <div className="flex justify-between items-center text-caption">
                        <span className="text-cosmic-400 font-medium">Temperature:</span>
                        <span className="text-cosmic-200 font-semibold">{object.temperature}</span>
                      </div>
                    )}
                    {object.mass && (
                      <div className="flex justify-between items-center text-caption">
                        <span className="text-cosmic-400 font-medium">Mass:</span>
                        <span className="text-cosmic-200 font-semibold">{object.mass}</span>
                      </div>
                    )}
                    {object.age && (
                      <div className="flex justify-between items-center text-caption">
                        <span className="text-cosmic-400 font-medium">Age:</span>
                        <span className="text-cosmic-200 font-semibold">{object.age}</span>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-cosmic-500 group-hover:border-cosmic-500 group-hover:text-white transition-all duration-300 py-3"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Telescope className="w-4 h-4" />
                      <span>Explore Details</span>
                    </span>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            /* Enhanced No Results State */
            <div className="text-center py-20">
              <div className="glass-effect rounded-2xl p-12 cosmic-glow max-w-md mx-auto">
                <Telescope className="w-20 h-20 text-cosmic-600 mx-auto mb-6 animate-float" />
                <h3 className="text-title font-orbitron text-cosmic-300 mb-4">
                  No Objects Found
                </h3>
                <p className="text-body text-cosmic-400 mb-6">
                  We couldn't find any celestial objects matching your search criteria. 
                  Try adjusting your search terms or filters to discover more cosmic wonders.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedFilter('all');
                  }}
                  className="px-6 py-3"
                >
                  Reset Search
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Educational Tips Section */}
        {filteredObjects.length > 0 && (
          <div className="mt-20">
            <div className="glass-effect rounded-2xl p-8 cosmic-glow">
              <h3 className="text-title font-orbitron text-white mb-6 text-center">
                🌌 Exploration Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <Telescope className="w-8 h-8 text-cosmic-400 mx-auto mb-2" />
                  <p className="text-caption text-cosmic-300">
                    Click on any object card to view detailed scientific information and fascinating facts
                  </p>
                </div>
                <div>
                  <Search className="w-8 h-8 text-cosmic-400 mx-auto mb-2" />
                  <p className="text-caption text-cosmic-300">
                    Use the search bar to find specific objects or explore by keywords and descriptions
                  </p>
                </div>
                <div>
                  <Filter className="w-8 h-8 text-cosmic-400 mx-auto mb-2" />
                  <p className="text-caption text-cosmic-300">
                    Filter by object type to focus on specific categories of celestial objects
                  </p>
                </div>
                <div>
                  <Globe className="w-8 h-8 text-cosmic-400 mx-auto mb-2" />
                  <p className="text-caption text-cosmic-300">
                    Experience interactive 3D models and realistic animations on the home page
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};