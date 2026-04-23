import { useVideoTexture, Center, Float } from '@react-three/drei';
import { Suspense } from 'react';

interface ExperienceProps {
  selectedFurniture: string;
  lightIntensity: number; // Keep for future 3D additions
}

// Sub-component to handle video loading
function CinematicVideo({ name }: { name: string }) {
  // Construct path: /videos/sofa.mp4 or /videos/table.mp4
  const videoPath = `/videos/${name}.mp4`;
  
  const texture = useVideoTexture(videoPath, {
    muted: true,
    loop: true,
    start: true,
  });

  return (
    <mesh scale={[3.8, 2.1, 1]}>
      <planeGeometry />
      {/* meshBasicMaterial ensures the video looks exactly like the source file */}
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

export default function Experience({ selectedFurniture }: ExperienceProps) {
  return (
    <Suspense fallback={null}>
      {/* We use Float to give it a high-end "floating gallery" feel, 
        making the cinematic video drift slightly.
      */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Center>
          <CinematicVideo name={selectedFurniture} />
        </Center>
      </Float>

      {/* A subtle ambient light just in case you add 
        3D particles or secondary objects later 
      */}
      <ambientLight intensity={0.5} />
    </Suspense>
  );
}