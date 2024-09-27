import React, { useState, useEffect, useRef } from 'react';
import './GearScroll.css';
import { easeQuadInOut } from 'd3-ease'; // Import the easing function

// Import all images
import image1 from './assets/GearImages/Gear_00001.png';
import image2 from './assets/GearImages/Gear_00002.png';
import image3 from './assets/GearImages/Gear_00003.png';
import image4 from './assets/GearImages/Gear_00004.png';
import image5 from './assets/GearImages/Gear_00005.png';
import image6 from './assets/GearImages/Gear_00006.png';
import image7 from './assets/GearImages/Gear_00007.png';
import image8 from './assets/GearImages/Gear_00008.png';
import image9 from './assets/GearImages/Gear_00009.png';
import image10 from './assets/GearImages/Gear_00010.png';
import image11 from './assets/GearImages/Gear_00011.png';
import image12 from './assets/GearImages/Gear_00012.png';
import image13 from './assets/GearImages/Gear_00013.png';
import image14 from './assets/GearImages/Gear_00014.png';
import image15 from './assets/GearImages/Gear_00015.png';
import image16 from './assets/GearImages/Gear_00016.png';
import image17 from './assets/GearImages/Gear_00017.png';
import image18 from './assets/GearImages/Gear_00018.png';
import image19 from './assets/GearImages/Gear_00019.png';
import image20 from './assets/GearImages/Gear_00020.png';
import image21 from './assets/GearImages/Gear_00021.png';
import image22 from './assets/GearImages/Gear_00022.png';
import image23 from './assets/GearImages/Gear_00023.png';
import image24 from './assets/GearImages/Gear_00024.png';
import image25 from './assets/GearImages/Gear_00025.png';
import image26 from './assets/GearImages/Gear_00026.png';
import image27 from './assets/GearImages/Gear_00027.png';
import image28 from './assets/GearImages/Gear_00028.png';
import image29 from './assets/GearImages/Gear_00029.png';
import image30 from './assets/GearImages/Gear_00030.png';
import image31 from './assets/GearImages/Gear_00031.png';
import image32 from './assets/GearImages/Gear_00032.png';
import image33 from './assets/GearImages/Gear_00033.png';
import image34 from './assets/GearImages/Gear_00034.png';
import image35 from './assets/GearImages/Gear_00035.png';
import image36 from './assets/GearImages/Gear_00036.png';
import image37 from './assets/GearImages/Gear_00037.png';
import image38 from './assets/GearImages/Gear_00038.png';
import image39 from './assets/GearImages/Gear_00039.png';
import image40 from './assets/GearImages/Gear_00040.png';
import image41 from './assets/GearImages/Gear_00041.png';
import image42 from './assets/GearImages/Gear_00042.png';
import image43 from './assets/GearImages/Gear_00043.png';
import image44 from './assets/GearImages/Gear_00044.png';
import image45 from './assets/GearImages/Gear_00045.png';
import image46 from './assets/GearImages/Gear_00046.png';
import image47 from './assets/GearImages/Gear_00047.png';
import image48 from './assets/GearImages/Gear_00048.png';
import image49 from './assets/GearImages/Gear_00049.png';
import image50 from './assets/GearImages/Gear_00050.png';
import image51 from './assets/GearImages/Gear_00051.png';
import image52 from './assets/GearImages/Gear_00052.png';
import image53 from './assets/GearImages/Gear_00053.png';
import image54 from './assets/GearImages/Gear_00054.png';
import image55 from './assets/GearImages/Gear_00055.png';
import image56 from './assets/GearImages/Gear_00056.png';
import image57 from './assets/GearImages/Gear_00057.png';
import image58 from './assets/GearImages/Gear_00058.png';
import image59 from './assets/GearImages/Gear_00059.png';
import image60 from './assets/GearImages/Gear_00060.png';
import image61 from './assets/GearImages/Gear_00061.png';
import image62 from './assets/GearImages/Gear_00062.png';
import image63 from './assets/GearImages/Gear_00063.png';
import image64 from './assets/GearImages/Gear_00064.png';
import image65 from './assets/GearImages/Gear_00065.png';
import image66 from './assets/GearImages/Gear_00066.png';
import image67 from './assets/GearImages/Gear_00067.png';
import image68 from './assets/GearImages/Gear_00068.png';
import image69 from './assets/GearImages/Gear_00069.png';
import image70 from './assets/GearImages/Gear_00070.png';
import image71 from './assets/GearImages/Gear_00071.png';
import image72 from './assets/GearImages/Gear_00072.png';

// Store all images in an array
const images = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
  image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
  image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
  image31, image32, image33, image34, image35, image36, image37, image38, image39, image40,
  image41, image42, image43, image44, image45, image46, image47, image48, image49, image50,
  image51, image52, image53, image54, image55, image56, image57, image58, image59, image60,
  image61, image62, image63, image64, image65, image66, image67, image68, image69, image70,
  image71, image72
];

const TOTAL_IMAGES = images.length;

const GearScroll = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const gearRef = useRef(null);
  const previousImageIndex = useRef(0);
  const [lastTime, setLastTime] = useState(Date.now());
  const scrollSpeedFactor = 3; // Control speed here (lower value slows the transition)

  useEffect(() => {
    const handleScroll = () => {
      if (!gearRef.current) return;

      const scrollTop = window.scrollY;
      const gearTop = gearRef.current.offsetTop;
      const gearHeight = gearRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate scroll percentage relative to the gear component's position
      const newScrollPercentage = Math.min(
        1,
        Math.max(0, (scrollTop - gearTop + viewportHeight) / (gearHeight + viewportHeight))
      );
      setScrollPercentage(newScrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let animationFrame;
    const smoothScroll = () => {
      const now = Date.now();
      const deltaTime = now - lastTime;
      setLastTime(now);

      // Calculate target image index based on the scroll percentage
      const targetImageIndex = Math.min(
        TOTAL_IMAGES - 1,
        Math.max(0, Math.floor(scrollPercentage * (TOTAL_IMAGES - 1)))
      );

      const diff = targetImageIndex - previousImageIndex.current;
      const step = diff * scrollSpeedFactor;
      previousImageIndex.current += step * deltaTime / 500; // Scale step with deltaTime

      // Snap to the exact index when the difference is very small
      if (Math.abs(diff) < 0.01) {
        previousImageIndex.current = targetImageIndex;
      }

      // Set the current image based on the updated index
      setCurrentImage(images[Math.floor(previousImageIndex.current)]);
      const easingValue = easeQuadInOut(Math.abs(previousImageIndex.current % 5));      setCurrentImage(images[Math.floor(previousImageIndex.current)]);

      animationFrame = requestAnimationFrame(smoothScroll);
    };

    animationFrame = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [scrollPercentage, lastTime]);

  return (
    <div ref={gearRef} className="gear-scroll-wrapper">
      <img
        src={currentImage}
        alt="Scrolling gear"
        className="gear-image"
      />
    </div>
  );
};

export default GearScroll;