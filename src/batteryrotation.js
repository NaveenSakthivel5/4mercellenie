import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment , Stats, useAspect} from '@react-three/drei';


// The Model component handles the 3D model and its animation
const Model = () => {
  const [isVisible , setIsVisible] = useState(0);
  const ref = useRef();
  const obsref = useRef();
  const { nodes, materials } = useGLTF('/battery.glb');
  const [tilt, setTilt] = useState(true); // Track whether tilting is happening
  const tiltAmount = useRef(0);

  useEffect(()=> {
   const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
    {threshold: 0.1}
   );
   if (obsref.current) {
    observer.observe(obsref.current);
   }
   return () => {
    if (obsref.current) {
      observer.unobserve(obsref.current);
    }
   }
  },[]);

  // Get the bounding box of the battery-container
  const [containerHeight, setContainerHeight] = useState(0);

  useLayoutEffect(() => {
    const container = document.getElementById('battery-container');
    setContainerHeight(container.offsetHeight);
  }, []);

  useFrame(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    const container = document.getElementById('battery-container');
    const containerTop = container.offsetTop;
    const containerBottom = containerTop + containerHeight;

    // Calculate the scroll progress within the battery-container only
    const scrollProgress = Math.min(Math.max((scrollY - containerTop) / containerHeight, 0), 1);

    const speedFactor = 3; // Adjust this factor as needed
    const maxScrollProgress = 0.30; // Set a limit to stop movement after 75% of scroll

    // Limit scrollProgress to maxScrollProgress to stop movement at that point
    const limitedScrollProgress = Math.min(scrollProgress, maxScrollProgress);

    // Adjust the position to move from top-right to bottom-left quickly
    const newX = -1.5 * limitedScrollProgress * speedFactor; // Move leftward
    const newY = -2 * limitedScrollProgress * speedFactor; // Move downward
    const newZ = 0.5 * limitedScrollProgress * speedFactor; // Move downward

    // Increase rotation speed
    const newYRotation = (Math.PI / 2) * 0.70 * limitedScrollProgress * speedFactor;
    const newXRotation = -0.10 * limitedScrollProgress * speedFactor;
    const newZRotation = 0.10 * limitedScrollProgress * speedFactor;

     // Stop tilting if battery has started moving
    if (limitedScrollProgress > 0) {
      setTilt(false);
    }

    // Handle tilting effect if tilt is still enabled
    if (tilt) {
      const tiltSpeed = 0.01; // Speed of tilting
      tiltAmount.current += tiltSpeed;
      const tiltAngle = Math.sin(tiltAmount.current) * 0.1; // Tilt angle between -0.1 and 0.1 radians (~5.7 degrees)
      ref.current.rotation.set(0,0, tiltAngle); // Tilt left and right
    } else {
      // Regular scroll-based movement
      ref.current.position.set(newX, newY, newZ);
      ref.current.rotation.set(newXRotation, newYRotation, newZRotation);
    }
  });

  return (
    <group ref={ref} dispose={null}>
      <group position={[0.5, 1.5, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.8}>
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

const Battery = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const scrollPosition = window.scrollY || window.pageYOffset;
    setScrollY(scrollPosition);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getParallaxStyle = () => {
    const translateY = scrollY * 0.01; // Adjust the speed of the parallax effect
    return {
      transform: `translateY(${translateY}px)`,
      transition: 'transform 0.2s ease-out', // Smooth transition
    };
  };
  return (
    <div id="battery-container" className="battery-container" style={{ position: 'relative', height: '100vh' }}>
      {/* Canvas placed inside the battery-container and relative to it */}
      <Canvas
        camera={{ position: [0, 0, 3], fov: 80 }}
        shadows
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      >
        {/* <Stats /> */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1440}
          shadow-mapSize-height={1440}
        />
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

      <div className="content1" style={{ position: 'relative', zIndex: 1 }}>
        <p className="content__title battery-tech" data-splitting data-effect8>
          <span className="font-8 battery-num">/03 BATTERY</span>
        </p>
      </div>
      <div className="battery-flex" style={{ position: 'relative', zIndex: 1 }}>
        <div className="battery-heading" style={getParallaxStyle()}>
          <p className="battery-para">
            ADVANCED <br />
            BATTERY <br />
            TECHNOLOGY
          </p>
        </div>
        <div className="battery-heading1">
          <div className="flex-battery">
            <div className="moving-battery">
              <p className="battery-para1">
                Enjoy the ultimate ride with our electric <br /> bikes. With
                an extensive range and rapid <br /> charging, you can hit the
                road with <br />
                confidence. Choose Mercellenie's eco- <br />
                friendly bikes for an exciting and <br />
                sustainable journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="extensive-battery" style={{ position: 'relative', zIndex: 1 }}>
        <div className="battery-rotation"></div>
        <div className="battery-para2">
          <p className="batteryrot-heading">
            EXTENSIVE <br /> RANGE AND FAST <br /> CHARGING.
          </p>
          <div className="batteryrot-flex">
            <p className="batteryrot-para">
              Mercelleinie’s battery pack <br /> delivers
              <span style={{ color: "yellow" }}>
                {" "}
                2x the power of top
              </span>{" "}
              <br /> EV batteries for longer rides <br />
              and faster speeds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battery;
