import React, { useRef, useState, useEffect } from 'react';
import ClothRevealBike from "./assets/ClothRevealBike.mp4";
import BlendVideo from "./assets/Light alphs.mp4"; 

const ScrollControlledVideo = () => {
  const videoRef = useRef(null);
  const blendVideoRef = useRef(null);
  const [scrollStep, setScrollStep] = useState(0); 
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [blendVideoVisible, setBlendVideoVisible] = useState(true); 

  const handleScroll = (e) => {
    if (!scrollEnabled) return;

    e.preventDefault(); 

    const video = videoRef.current;

    if (scrollStep === 0) {
      setBlendVideoVisible(false);
      video.currentTime = 0;
      video.play();
      setScrollEnabled(false);
      setTimeout(() => {
        video.pause();
        video.currentTime = 1.7; 
        setScrollStep(1);
        setScrollEnabled(true);
      }, 1700);
    } else if (scrollStep === 1) {
      video.play();
      setScrollEnabled(false);
      setTimeout(() => {
        video.pause();
        setScrollStep(2);
        setScrollEnabled(true);
      }, 4000);
    }
  };

  useEffect(() => {
    const container = document.querySelector('.scroll-controlled-video');

    const preventScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
      document.body.style.overflow = '';
    };

    container.addEventListener('wheel', handleScroll, { passive: false });
    container.addEventListener('touchmove', handleScroll, { passive: false });
    preventScroll();

    return () => {
      enableScroll();
      container.removeEventListener('wheel', handleScroll);
      container.removeEventListener('touchmove', handleScroll);
    };
  }, [scrollStep, scrollEnabled]);

  return (
    <div className="scroll-controlled-video" style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <video
        ref={videoRef}
        src={ClothRevealBike}
        width="100%"
        muted
        style={{ position: 'sticky', top: 0 }}
      />
      <video
        ref={blendVideoRef}
        src={BlendVideo}
        width="100%"
        muted
        autoPlay
        loop
        style={{
          position: 'absolute',
          top: "12%",
          left: "0%",
          width: '100%',
          height: '100%',
          objectFit: 'cover', 
          mixBlendMode: 'lighten', 
          pointerEvents: 'none', 
          opacity: blendVideoVisible ? 1 : 0, 
          transition: 'opacity 0.5s ease',
        }}
      />
      <div style={{ position: 'absolute', top: '100%', width: '100%' }}>
        <p>Your scrollable content goes here...</p>
      </div>
    </div>
  );
};

export default ScrollControlledVideo;
