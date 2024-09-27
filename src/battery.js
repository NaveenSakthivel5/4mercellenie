import React, { useRef } from 'react'; 
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

const Battery = () => {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100vh', zIndex: '1' }}>
      <Canvas
        camera={{ position: [-1, 5, 3], fov: 50 }}
        shadows
        style={{ width: '100%', height: '100%' }}
      >
        {/* Ambient Light */}
        <ambientLight intensity={0.5} />
        {/* Directional Light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1440}
          shadow-mapSize-height={1440}
        />
        {/* Spot Light */}
        <spotLight
          position={[-5, 5, 5]}
          intensity={0.8}
          angle={0.3}
          penumbra={1}
          castShadow
        />
        <Environment preset='city' />
        <Model />
      </Canvas>
     </div>
  );
};

const Model = () => {
  const ref = useRef();
  const { nodes, materials } = useGLTF('/battery 1 (1).glb');

  useFrame(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / totalHeight;

    // Adjust these multipliers to increase or decrease the scroll speed effect
    const speedMultiplier = 2; // Increase for faster movement
    const rotationMultiplier = 2; // Increase for faster rotation

    // Calculate new positions and rotations
    const startX = -20; // Starting X position (right side)
    const endX = -1.5; // Ending X position (left side)
    const startY = -10; // Starting Y position (top side)
    const endY = -1.5; // Ending Y position (bottom side)

    // Linear interpolation for position
    const newX = startX + (endX - startX) * scrollProgress * speedMultiplier;
    const newY = startY - (startY - endY) * scrollProgress * speedMultiplier;

    // Rotation calculations
    const newYRotation = (Math.PI / 2) * 0.70 * scrollProgress * rotationMultiplier;
    const newXRotation = -0.30 * scrollProgress * rotationMultiplier;
    const newZRotation = 0.10 * scrollProgress * rotationMultiplier;

    // Apply transformations
    ref.current.position.set(newX, newY); // Set new position
    ref.current.rotation.y = newYRotation;
    ref.current.rotation.x = newXRotation;
    ref.current.rotation.z = newZRotation;
  });

  return (
    <group ref={ref} dispose={null}>
      <group position={[0, 1.8, 0]} rotation={[Math.PI / 2, -0.8, Math.PI / 1]} scale={0.8}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes?.Cube016?.geometry}
          material={materials['Material.008']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes?.Cube016_1?.geometry}
          material={materials['Material.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes?.Cube016_2?.geometry}
          material={materials['Material.009']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes?.Cube016_3?.geometry}
          material={materials['Material.010']}
        />
      </group>
    </group>
  );
};

// Preload the new GLTF model
useGLTF.preload('/battery 1 (1).glb');

export default Battery;
