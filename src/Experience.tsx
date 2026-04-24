import { useVideoTexture, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface ExperienceProps {
  videoSrc: string;
  lightIntensity: number;
}

const Experience = ({ videoSrc, lightIntensity }: ExperienceProps) => {
  const texture = useVideoTexture(videoSrc);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // 1. Smoothly bring the camera to a fixed professional distance
    const targetZ = 4.5;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);

    // 2. THE STABILITY FIX: We reduce the mouse influence from 0.5 to 0.08
    // This creates a subtle "expensive" feel rather than a dizzying lean
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 0.08, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 0.08, 0.05);
    
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5 * lightIntensity} />
      <pointLight position={[10, 10, 10]} intensity={lightIntensity} />
      
      <Center>
        <mesh ref={meshRef} scale={[3.5, 2, 1]}>
          <planeGeometry args={[1.77, 1]} /> {/* 16:9 Aspect Ratio */}
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </Center>
    </>
  );
};

export default Experience;