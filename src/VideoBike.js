import React, { useState, useEffect, useRef } from 'react'; 
import ClothAnimationStart from './assets/ClothAnimationStart.mp4';
import ClothAnimationMiddle from './assets/ClothRevealAnimation.mp4';
import SmokeEffect from './assets/smoke alpha.mp4'; // Import the smoke effect video

function VideoComponent() {
  const [currentVideo, setCurrentVideo] = useState(ClothAnimationStart); // Start with the first video
  const [firstVideoCompleted, setFirstVideoCompleted] = useState(false); // Track if the first video is finished
  const [scrollTriggered, setScrollTriggered] = useState(false); // Track if the user has scrolled forward
  const [prevScrollY, setPrevScrollY] = useState(0); // Track previous scroll position
  const videoRef = useRef(null);
  const smokeRef = useRef(null); // Reference for the smoke video

  // Play the video when triggered by interaction (scroll)
  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.load(); // Reload the video to ensure correct playback
      videoElement.play().catch((error) => {
        console.log("Video playback failed due to: ", error);
      });
    }
  }, [currentVideo]);

  // This function is called when the first video ends
  const handleVideoEnd = () => {
    setFirstVideoCompleted(true); // Mark the first video as completed
  };

  // Handle the scroll event to switch between the videos
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (scrollY > prevScrollY && scrollY > 1 && firstVideoCompleted && !scrollTriggered) {
        // Scrolling down and first video completed
        setScrollTriggered(true); // Switch to the second video
        if (smokeRef.current) {
          smokeRef.current.play(); // Play the smoke effect when switching to the second video
        }
      } else if (scrollY < prevScrollY && scrollY < 100 && scrollTriggered) {
        // Scrolling back up and switch back to the first video
        setScrollTriggered(false);
        setFirstVideoCompleted(false); // Reset the first video state
        setCurrentVideo(ClothAnimationStart); // Switch back to the first video
        if (smokeRef.current) {
          smokeRef.current.pause(); // Pause the smoke effect when going back to the first video
        }
      }

      setPrevScrollY(scrollY); // Update the previous scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up the event listener
    };
  }, [firstVideoCompleted, scrollTriggered, prevScrollY]);

  // Switch to the second video when the user scrolls after the first video ends
  useEffect(() => {
    if (scrollTriggered && firstVideoCompleted) {
      setCurrentVideo(ClothAnimationMiddle); // Change to the second video when scrolling after the first ends
    }
  }, [scrollTriggered, firstVideoCompleted]);

  return (
    <div style={{ height: '125vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      {/* Main video element for both videos */}
      <video
        ref={videoRef}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        muted
        controls={false}
        onEnded={handleVideoEnd} // Handle when the first video ends
      >
        <source src={currentVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Smoke effect video */}
      {scrollTriggered && (
        <video
          ref={smokeRef}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none', 
            opacity: 0.5 // Only apply opacity to the smoke effect video
          }}
          muted
          loop
        >
          <source src={SmokeEffect} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

export default VideoComponent;
