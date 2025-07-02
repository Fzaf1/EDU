import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowDown, Play, Telescope, BookOpen, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { UniverseScene } from '../components/three/UniverseScene';
import { Button } from '../components/common/Button';
import { CelestialObject } from '../types';

interface HomePageProps {
  celestialData: {
    planets: CelestialObject[];
    stars: CelestialObject[];
    deepSpaceObjects: CelestialObject[];
  };
  onObjectClick: (object: CelestialObject) => void;
  onNavigateToEducation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  celestialData, 
  onObjectClick, 
  onNavigateToEducation 
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], {
      opacity: 0,
      y: 60
    });

    // Enhanced animation sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.9")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.7");

    // Enhanced floating animation
    gsap.to(heroRef.current, {
      y: -15,
      duration: 5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Parallax effect for features section
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      
      if (featuresRef.current) {
        gsap.set(featuresRef.current, {
          transform: `translateY(${parallax}px)`
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced stars background */}
      <div className="stars-bg" />
      
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <UniverseScene 
          celestialData={celestialData} 
          onObjectClick={onObjectClick}
        />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="content-container text-center">
          <div ref={heroRef}>
            {/* Enhanced Main Title */}
            <div ref={titleRef} className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-cosmic-400 animate-float mr-4" />
                <h1 className="text-display font-orbitron text-white glitch">
                  <span>Cosmos Explorer</span>
                  <span>Cosmos Explorer</span>
                  <span>Cosmos Explorer</span>
                </h1>
                <Sparkles className="w-10 h-10 text-nebula-400 animate-float ml-4" />
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-cosmic-500 to-nebula-500 mx-auto rounded-full animate-pulse-glow" />
            </div>

            {/* Enhanced Subtitle */}
            <div ref={subtitleRef} className="mb-12">
              <p className="text-headline text-cosmic-200 max-w-4xl mx-auto leading-relaxed mb-6">
                Embark on an Interactive Journey Through the Universe
              </p>
              <p className="text-body text-cosmic-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Discover the wonders of space through stunning 3D visualizations, explore planets and stars, 
                and learn about cosmic phenomena that shape our universe. Experience astronomy like never before.
              </p>
              <div className="flex items-center justify-center space-x-4 text-cosmic-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cosmic-500 rounded-full animate-pulse" />
                  <span className="text-caption font-medium">Interactive 3D Models</span>
                </div>
                <div className="w-1 h-1 bg-cosmic-600 rounded-full" />
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-nebula-500 rounded-full animate-pulse" />
                  <span className="text-caption font-medium">Educational Content</span>
                </div>
                <div className="w-1 h-1 bg-cosmic-600 rounded-full" />
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cosmic-400 rounded-full animate-pulse" />
                  <span className="text-caption font-medium">Real-time Exploration</span>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                size="lg"
                onClick={onNavigateToEducation}
                className="flex items-center space-x-3 px-10 py-4 text-lg font-semibold min-w-[220px] cosmic-glow-hover"
              >
                <Play className="w-6 h-6" />
                <span>Begin Exploration</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToFeatures}
                className="flex items-center space-x-3 px-10 py-4 text-lg font-semibold min-w-[220px] glass-effect hover:bg-cosmic-800/30"
              >
                <ArrowDown className="w-6 h-6" />
                <span>Discover Features</span>
              </Button>
            </div>

            {/* Interactive Hint */}
            <div className="mt-12 animate-bounce">
              <p className="text-caption text-cosmic-400 flex items-center justify-center space-x-2">
                <Telescope className="w-4 h-4" />
                <span>Click on any celestial object above to explore</span>
                <Telescope className="w-4 h-4" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div id="features" className="relative z-10 bg-gradient-to-b from-transparent via-cosmic-950/90 to-cosmic-950 py-24">
        <div ref={featuresRef} className="content-container">
          <div className="text-center mb-20">
            <h2 className="text-headline font-orbitron text-white mb-6">
              Explore the Universe Like Never Before
            </h2>
            <p className="text-body text-cosmic-300 max-w-4xl mx-auto leading-relaxed">
              Our cutting-edge platform combines interactive 3D technology with comprehensive educational content 
              to create an immersive space exploration experience that brings the cosmos to your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Enhanced Feature Cards */}
            <div className="group card-hover glass-effect rounded-2xl p-8 cosmic-glow">
              <div className="w-16 h-16 bg-gradient-to-br from-cosmic-500 to-nebula-500 rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow">
                <Telescope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-title font-orbitron text-white mb-4 group-hover:text-cosmic-300 transition-colors">
                Interactive 3D Universe
              </h3>
              <p className="text-body text-cosmic-300 leading-relaxed mb-4">
                Navigate through space with realistic 3D models of planets, stars, and galaxies. 
                Experience orbital mechanics and cosmic scales in real-time.
              </p>
              <ul className="text-caption text-cosmic-400 space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cosmic-500 rounded-full" />
                  <span>Realistic planetary rotations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cosmic-500 rounded-full" />
                  <span>Smooth camera controls</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cosmic-500 rounded-full" />
                  <span>Dynamic lighting effects</span>
                </li>
              </ul>
            </div>

            <div className="group card-hover glass-effect rounded-2xl p-8 cosmic-glow">
              <div className="w-16 h-16 bg-gradient-to-br from-nebula-500 to-cosmic-600 rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-title font-orbitron text-white mb-4 group-hover:text-cosmic-300 transition-colors">
                Comprehensive Education
              </h3>
              <p className="text-body text-cosmic-300 leading-relaxed mb-4">
                Learn about celestial objects through detailed information, fascinating facts, 
                and scientific data presented in an engaging format.
              </p>
              <ul className="text-caption text-cosmic-400 space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-nebula-500 rounded-full" />
                  <span>Detailed object information</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-nebula-500 rounded-full" />
                  <span>Scientific facts & data</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-nebula-500 rounded-full" />
                  <span>Search & filter tools</span>
                </li>
              </ul>
            </div>

            <div className="group card-hover glass-effect rounded-2xl p-8 cosmic-glow md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-br from-cosmic-400 to-nebula-600 rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-title font-orbitron text-white mb-4 group-hover:text-cosmic-300 transition-colors">
                Immersive Experience
              </h3>
              <p className="text-body text-cosmic-300 leading-relaxed mb-4">
                Enjoy smooth animations, responsive design, and intuitive interactions 
                that make learning about space engaging and accessible.
              </p>
              <ul className="text-caption text-cosmic-400 space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cosmic-400 rounded-full" />
                  <span>Responsive across devices</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cosmic-400 rounded-full" />
                  <span>Smooth animations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cosmic-400 rounded-full" />
                  <span>Intuitive navigation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="glass-effect rounded-2xl p-8 cosmic-glow max-w-2xl mx-auto">
              <h3 className="text-title font-orbitron text-white mb-4">
                Ready to Explore the Cosmos?
              </h3>
              <p className="text-body text-cosmic-300 mb-6">
                Join thousands of space enthusiasts and students in discovering the wonders of our universe.
              </p>
              <Button
                size="lg"
                onClick={onNavigateToEducation}
                className="cosmic-glow-hover px-8 py-3"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};