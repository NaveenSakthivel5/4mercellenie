import React, { useState, useEffect, useRef } from 'react';
import './gear.css';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context('./assets/GearImages', false, /\.(png|jpe?g|svg)$/)
);

function Gear() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGearSticky, setIsGearSticky] = useState(false);
  const gearContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const gearContainer = gearContainerRef.current;
      const gearContainerTop = gearContainer.offsetTop;
      const gearContainerHeight = gearContainer.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const totalImages = images.length;

      // Calculate the scrollable height for the gear images to change
      const scrollableHeight = gearContainerHeight - windowHeight;
      const startScroll = gearContainerTop;
      const endScroll = gearContainerTop + scrollableHeight;

      if (scrollPosition >= startScroll && scrollPosition <= endScroll) {
        // Calculate the current image index based on the scroll position
        const progress = (scrollPosition - startScroll) / scrollableHeight;
        const imageIndex = Math.floor(progress * totalImages);
        setCurrentImageIndex(Math.min(Math.max(imageIndex, 0), totalImages - 1));

        // Check if we've reached the last image
        if (imageIndex >= totalImages - 1) {
          setIsGearSticky(true); // Make gear sticky at the last image
        } else {
          setIsGearSticky(false); // Reset sticky state
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentImage = images[currentImageIndex]?.default || images[currentImageIndex];

  return (
    <>
         <div className="gear-container" ref={gearContainerRef}>
              <div className="content">
                  <h2 className="content__title"  data-splitting data-effect10 style={{ color: 'white' }}>
                      <span className="font-medium font-1">THE</span>
                      <span className="font-7">ULTIMATE RIDING</span>
                      <span className="font-4">EXPERIENCE</span>
                  </h2>
              </div>
              <div className="gear-heading">
                  <div className="gear-power">
                  <div className="gear2">
                      {currentImage ? (
                          <img src={currentImage} className="gear-pic" alt={`gear ${currentImageIndex}`} />
                      ) : (
                          <p>Loading Image...</p>
                      )}
                  </div>
                  </div>
              </div>
              <div className="gear-text">
                  <p className="gear-para">
                      DISCOVER TRUE FREEDOM WITH MERCELLEINE <br /> SUPERBIKES OFFERING UNPARALLELED RANGE.
                  </p>
              </div>
              <div className="gear-setting">
                  <p className="gear-watt">
                      POWER <br />
                      <span className="font-watt">
                          90 <span className="kilowatt-space">KW</span>
                      </span>
                  </p>
                  <p className="gear-torque">
                      TORQUE <br />
                      <span className="font-watt">
                          150 <span className="kilowatt-space">NM</span>
                      </span>
                  </p>
              </div>
          </div></>
  );
}

export default Gear;
