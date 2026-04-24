import { useVideoTexture, Center, Float } from '@react-three/drei';
import { Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ExperienceProps {
  videoSrc: string; // Using the direct path passed from App.tsx
  lightIntensity: number;
}

// Sub-component to handle video loading and display
function CinematicVideo({ src, intensity }: { src: string; intensity: number }) {
  const texture = useVideoTexture(src, {
    muted: true,
    loop: true,
    start: true,
  });

  return (
    <mesh scale={[3.8, 2.1, 1]}>
      <planeGeometry />
      {/* Using MeshBasicMaterial with color multiplication 
          allows the 'intensity' slider to dim the video itself.
      */}
      <meshBasicMaterial 
        map={texture} 
        toneMapped={false} 
        transparent 
        color={new THREE.Color(intensity, intensity, intensity)} 
      />
    </mesh>
  );
}

export default function Experience({ videoSrc, lightIntensity }: ExperienceProps) {
  // Logic for camera smoothing or "Zoom" effects
  useFrame((state) => {
    // Standardizing camera distance; you can toggle this targetZ based on a 'zoom' prop later
    const targetZ = 4.5; 
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    // Subtle parallax: camera moves slightly with the mouse
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 0.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 0.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Suspense fallback={<mesh><boxGeometry args={[1, 1, 1]} /><meshBasicMaterial color="#111" /></mesh>}>
      <Float 
        speed={1.5} 
        rotationIntensity={0.1} 
        floatIntensity={0.4}
        floatingRange={[-0.1, 0.1]}
      >
        <Center>
          <CinematicVideo src={videoSrc} intensity={lightIntensity} />
        </Center>
      </Float>

      {/* Ambient light for future 3D elements (particles, overlays) */}
      <ambientLight intensity={0.5} />
    </Suspense>
  );
}