import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { CelestialObject } from '../../types';

interface CelestialBodyProps {
  object: CelestialObject;
  onClick: (object: CelestialObject) => void;
}

const Planet: React.FC<CelestialBodyProps> = ({ object, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the planet
      meshRef.current.rotation.y += 0.01;
      
      // Orbit around the sun (if it has an orbit radius)
      if (object.orbitRadius && object.orbitRadius > 0) {
        const time = state.clock.getElapsedTime();
        const orbitSpeed = (object.orbitSpeed || 0.5) / object.orbitRadius;
        meshRef.current.position.x = Math.cos(time * orbitSpeed) * object.orbitRadius;
        meshRef.current.position.z = Math.sin(time * orbitSpeed) * object.orbitRadius;
        
        // Update glow position
        if (glowRef.current) {
          glowRef.current.position.copy(meshRef.current.position);
        }
      }
    }
  });

  const planetTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    
    // Create a more detailed gradient texture
    const gradient = ctx.createRadialGradient(64, 48, 0, 64, 64, 64);
    gradient.addColorStop(0, object.color);
    gradient.addColorStop(0.7, object.color);
    gradient.addColorStop(1, '#000000');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    
    // Add some surface details
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const radius = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, [object.color]);

  return (
    <group>
      {/* Planet */}
      <mesh
        ref={meshRef}
        position={object.position}
        onClick={() => onClick(object)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[object.size, 32, 32]} />
        <meshStandardMaterial 
          map={planetTexture} 
          emissive={object.type === 'exoplanet' ? new THREE.Color(object.color) : new THREE.Color('#000000')}
          emissiveIntensity={object.type === 'exoplanet' ? 0.1 : 0}
        />
      </mesh>
      
      {/* Atmospheric glow for planets */}
      <mesh
        ref={glowRef}
        position={object.position}
      >
        <sphereGeometry args={[object.size * 1.1, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color(object.color)} 
          transparent 
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Planet name label */}
      <Text
        position={[object.position[0], object.position[1] + object.size + 0.4, object.position[2]]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {object.name}
      </Text>
      
      {/* Orbit line */}
      {object.orbitRadius && object.orbitRadius > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[object.orbitRadius - 0.01, object.orbitRadius + 0.01, 64]} />
          <meshBasicMaterial color={new THREE.Color("#444444")} transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
};

const Star: React.FC<CelestialBodyProps> = ({ object, onClick }) => {
  const starRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.005;
    }
    
    // Pulsing effect for stars
    if (glowRef.current && coronaRef.current) {
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.1 + 1;
      glowRef.current.scale.setScalar(pulse);
      coronaRef.current.scale.setScalar(pulse * 1.2);
    }
  });

  const getStarIntensity = () => {
    switch (object.subtype) {
      case 'Red dwarf': return 0.5;
      case 'Red supergiant': return 2.0;
      case 'Binary star system': return 1.5;
      default: return 1.0;
    }
  };

  return (
    <group>
      {/* Star core */}
      <mesh 
        ref={starRef} 
        position={object.position} 
        onClick={() => onClick(object)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[object.size, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color(object.color)} 
          emissive={new THREE.Color(object.color)}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Star glow */}
      <mesh ref={glowRef} position={object.position}>
        <sphereGeometry args={[object.size * 1.5, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color(object.color)} 
          transparent 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Star corona */}
      <mesh ref={coronaRef} position={object.position}>
        <sphereGeometry args={[object.size * 2, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color(object.color)} 
          transparent 
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Point light for illumination */}
      <pointLight 
        position={object.position} 
        intensity={getStarIntensity()} 
        distance={object.size * 50} 
        color={new THREE.Color(object.color)}
        decay={2}
      />
      
      {/* Star name */}
      <Text
        position={[object.position[0], object.position[1] + object.size + 0.6, object.position[2]]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {object.name}
      </Text>
    </group>
  );
};

const Galaxy: React.FC<CelestialBodyProps> = ({ object, onClick }) => {
  const galaxyRef = useRef<THREE.Mesh>(null);
  const spiralRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.001;
    }
    if (spiralRef.current) {
      spiralRef.current.rotation.z += 0.002;
    }
  });

  const galaxyTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Create spiral galaxy pattern
    const centerX = 128;
    const centerY = 128;
    
    // Background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 128);
    gradient.addColorStop(0, object.color);
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    // Add spiral arms
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    for (let arm = 0; arm < 2; arm++) {
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
        const radius = angle * 8;
        const x = centerX + Math.cos(angle + arm * Math.PI) * radius;
        const y = centerY + Math.sin(angle + arm * Math.PI) * radius;
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, [object.color]);

  return (
    <group>
      <mesh 
        ref={galaxyRef}
        position={object.position} 
        onClick={() => onClick(object)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[object.size, 64, 64]} />
        <meshBasicMaterial 
          map={galaxyTexture}
          transparent 
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Galaxy glow */}
      <mesh position={object.position}>
        <sphereGeometry args={[object.size * 1.2, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color(object.color)} 
          transparent 
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Galaxy name */}
      <Text
        position={[object.position[0], object.position[1] + object.size + 0.8, object.position[2]]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {object.name}
      </Text>
    </group>
  );
};

const Asteroid: React.FC<CelestialBodyProps> = ({ object, onClick }) => {
  const asteroidRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (asteroidRef.current) {
      // Irregular rotation
      asteroidRef.current.rotation.x += 0.02;
      asteroidRef.current.rotation.y += 0.015;
      asteroidRef.current.rotation.z += 0.01;
      
      // Orbit if has orbit radius
      if (object.orbitRadius && object.orbitRadius > 0) {
        const time = state.clock.getElapsedTime();
        const orbitSpeed = (object.orbitSpeed || 0.3) / object.orbitRadius;
        asteroidRef.current.position.x = Math.cos(time * orbitSpeed) * object.orbitRadius;
        asteroidRef.current.position.z = Math.sin(time * orbitSpeed) * object.orbitRadius;
      }
    }
  });

  return (
    <group>
      <mesh 
        ref={asteroidRef}
        position={object.position} 
        onClick={() => onClick(object)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Irregular shape for asteroids */}
        <dodecahedronGeometry args={[object.size, 1]} />
        <meshStandardMaterial 
          color={new THREE.Color(object.color)}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      <Text
        position={[object.position[0], object.position[1] + object.size + 0.3, object.position[2]]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {object.name}
      </Text>
      
      {/* Orbit line for asteroids */}
      {object.orbitRadius && object.orbitRadius > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[object.orbitRadius - 0.005, object.orbitRadius + 0.005, 64]} />
          <meshBasicMaterial color={new THREE.Color("#666666")} transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  );
};

const Comet: React.FC<CelestialBodyProps> = ({ object, onClick }) => {
  const cometRef = useRef<THREE.Mesh>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (cometRef.current && tailRef.current) {
      // Comet rotation
      cometRef.current.rotation.x += 0.03;
      cometRef.current.rotation.y += 0.02;
      
      // Orbit if has orbit radius
      if (object.orbitRadius && object.orbitRadius > 0) {
        const time = state.clock.getElapsedTime();
        const orbitSpeed = (object.orbitSpeed || 0.1) / object.orbitRadius;
        const x = Math.cos(time * orbitSpeed) * object.orbitRadius;
        const z = Math.sin(time * orbitSpeed) * object.orbitRadius;
        
        cometRef.current.position.x = x;
        cometRef.current.position.z = z;
        
        // Tail points away from sun (0,0,0)
        const tailDirection = new THREE.Vector3(-x, 0, -z).normalize();
        tailRef.current.position.set(x, object.position[1], z);
        tailRef.current.lookAt(
          x + tailDirection.x * 2,
          object.position[1],
          z + tailDirection.z * 2
        );
      }
    }
  });

  return (
    <group>
      {/* Comet nucleus */}
      <mesh 
        ref={cometRef}
        position={object.position} 
        onClick={() => onClick(object)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[object.size, 16, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color(object.color)}
          emissive={new THREE.Color(object.color)}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Comet tail */}
      {object.hasTail && (
        <mesh ref={tailRef} position={object.position}>
          <coneGeometry args={[object.size * 0.5, object.size * 8, 8]} />
          <meshBasicMaterial 
            color={new THREE.Color(object.color)}
            transparent 
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
      
      {/* Coma (gas cloud around nucleus) */}
      <mesh position={object.position}>
        <sphereGeometry args={[object.size * 3, 16, 16]} />
        <meshBasicMaterial 
          color={new THREE.Color(object.color)}
          transparent 
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <Text
        position={[object.position[0], object.position[1] + object.size + 0.4, object.position[2]]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {object.name}
      </Text>
      
      {/* Orbit line */}
      {object.orbitRadius && object.orbitRadius > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[object.orbitRadius - 0.01, object.orbitRadius + 0.01, 64]} />
          <meshBasicMaterial color={new THREE.Color("#888888")} transparent opacity={0.1} />
        </mesh>
      )}
    </group>
  );
};

const Nebula: React.FC<CelestialBodyProps> = ({ object, onClick }) => {
  const nebulaRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += 0.0005;
      nebulaRef.current.rotation.z += 0.0003;
    }
  });

  return (
    <group>
      <mesh 
        ref={nebulaRef}
        position={object.position} 
        onClick={() => onClick(object)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[object.size, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color(object.color)}
          transparent 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Multiple layers for nebula effect */}
      <mesh position={object.position}>
        <sphereGeometry args={[object.size * 0.8, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color(object.color)}
          transparent 
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh position={object.position}>
        <sphereGeometry args={[object.size * 1.2, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color(object.color)}
          transparent 
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <Text
        position={[object.position[0], object.position[1] + object.size + 1, object.position[2]]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {object.name}
      </Text>
    </group>
  );
};

const BlackHole: React.FC<CelestialBodyProps> = ({ object, onClick }) => {
  const blackHoleRef = useRef<THREE.Mesh>(null);
  const accretionDiskRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group>
      {/* Event horizon */}
      <mesh 
        ref={blackHoleRef}
        position={object.position} 
        onClick={() => onClick(object)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[object.size, 32, 32]} />
        <meshBasicMaterial color={new THREE.Color("#000000")} />
      </mesh>
      
      {/* Accretion disk */}
      <mesh 
        ref={accretionDiskRef}
        position={object.position}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[object.size * 1.5, object.size * 3, 64]} />
        <meshBasicMaterial 
          color={new THREE.Color("#FF4500")}
          transparent 
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Gravitational lensing effect */}
      <mesh position={object.position}>
        <sphereGeometry args={[object.size * 4, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color("#ffffff")}
          transparent 
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <Text
        position={[object.position[0], object.position[1] + object.size + 1, object.position[2]]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {object.name}
      </Text>
    </group>
  );
};

// Cosmic dust particles
const CosmicDust: React.FC = () => {
  const dustRef = useRef<THREE.Points>(null);
  
  const dustGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);
  
  useFrame((state) => {
    if (dustRef.current) {
      dustRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <points ref={dustRef} geometry={dustGeometry}>
      <pointsMaterial 
        color={new THREE.Color("#888888")} 
        size={0.02} 
        transparent 
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

interface UniverseSceneProps {
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

export const UniverseScene: React.FC<UniverseSceneProps> = ({ 
  celestialData, 
  onObjectClick 
}) => {
  return (
    <div className="w-full h-screen">
      <Canvas 
        camera={{ position: [0, 8, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000011']} />
        
        {/* Enhanced lighting */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={0.3} />
        
        {/* Enhanced stars background */}
        <Stars 
          radius={200} 
          depth={100} 
          count={8000} 
          factor={6} 
          saturation={0} 
          fade={true}
        />
        
        {/* Cosmic dust */}
        <CosmicDust />
        
        {/* Stars */}
        {celestialData.stars?.map((star) => (
          <Star key={star.id} object={star} onClick={onObjectClick} />
        ))}
        
        {/* Planets */}
        {celestialData.planets?.map((planet) => (
          <Planet key={planet.id} object={planet} onClick={onObjectClick} />
        ))}
        
        {/* Galaxies */}
        {celestialData.galaxies?.map((galaxy) => (
          <Galaxy key={galaxy.id} object={galaxy} onClick={onObjectClick} />
        ))}
        
        {/* Asteroids */}
        {celestialData.asteroids?.map((asteroid) => (
          <Asteroid key={asteroid.id} object={asteroid} onClick={onObjectClick} />
        ))}
        
        {/* Comets */}
        {celestialData.comets?.map((comet) => (
          <Comet key={comet.id} object={comet} onClick={onObjectClick} />
        ))}
        
        {/* Nebulae */}
        {celestialData.nebulae?.map((nebula) => (
          <Nebula key={nebula.id} object={nebula} onClick={onObjectClick} />
        ))}
        
        {/* Black holes */}
        {celestialData.blackholes?.map((blackhole) => (
          <BlackHole key={blackhole.id} object={blackhole} onClick={onObjectClick} />
        ))}
        
        {/* Legacy deep space objects */}
        {celestialData.deepSpaceObjects?.map((object) => {
          if (object.type === 'galaxy') {
            return <Galaxy key={object.id} object={object} onClick={onObjectClick} />;
          } else if (object.type === 'blackhole') {
            return <BlackHole key={object.id} object={object} onClick={onObjectClick} />;
          }
          return null;
        })}
        
        {/* Enhanced controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={100}
          minDistance={1}
          zoomSpeed={0.8}
          rotateSpeed={0.5}
          panSpeed={0.8}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};