import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Beginning from './assets/beginning.mp4';
import Middle from './assets/middle.mp4';
import './BlendVideo.css'

gsap.registerPlugin(ScrollTrigger);

const VideoPlayer = () => {
  const [videoSrc, setVideoSrc] = useState(Beginning);
  const videoRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMiddleVideoReady, setIsMiddleVideoReady] = useState(false);
  const [isScrollingDisabled, setIsScrollingDisabled] = useState(false); // To control scroll

  useEffect(() => {
    // Preload the middle video
    const preloadVideo = document.createElement('video');
    preloadVideo.src = Middle;
    preloadVideo.preload = 'auto';
    preloadVideo.oncanplaythrough = () => {
      setIsMiddleVideoReady(true); // Ensure the video is fully loaded
    };

    return () => {
      preloadVideo.src = ''; // Clear the source to free memory
    };
  }, []);

  const handleUserInteraction = () => {
    setUserInteracted(true);

    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleUserInteraction);
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    return () => {
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: videoRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        if (self.progress > 0.5 && videoSrc === Beginning && isMiddleVideoReady) {
          setVideoSrc(Middle);
        } else if (self.progress <= 0.5 && videoSrc === Middle) {
          setVideoSrc(Beginning);
        }
      }
    });

    return () => scrollTrigger.kill();
  }, [videoSrc, isMiddleVideoReady]);

  useEffect(() => {
    // Disable scroll while video is playing
    const disableScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    if (isScrollingDisabled) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', disableScroll, { passive: false });
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', disableScroll, { passive: false });
    }

    return () => window.removeEventListener('scroll', disableScroll, { passive: false });
  }, [isScrollingDisabled]);

  useEffect(() => {
    // Control video playback and loop behavior based on the active video
    if (videoRef.current && userInteracted) {
      if (videoSrc === Beginning) {
        videoRef.current.loop = true;
      } else {
        videoRef.current.loop = false;
      }
      videoRef.current.play();

      // Disable scroll until video finishes
      if (videoSrc === Middle) {
        setIsScrollingDisabled(true);
        videoRef.current.onended = () => {
          setIsScrollingDisabled(false); // Re-enable scroll when video ends
        };
      }
    }
  }, [videoSrc, userInteracted]);

  return (
    <div>
      <video
        src={Beginning}
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          position: 'absolute',
          top: '',
          left: '',
          zIndex: videoSrc === Beginning ? 1 : -1,
          transition: ' ease',
          opacity: videoSrc === Beginning ? 1 : 0,
        }}
      >
        Your browser does not support the video tag.
      </video>

      <video
        src={Middle}
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          position: 'absolute',
          top: '',
          left: '',
          zIndex: videoSrc === Middle ? 1 : -1,
          transition: ' ease',
          opacity: videoSrc === Middle ? 1 : 0,
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
