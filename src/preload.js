import React, { useEffect, useState } from 'react';

const Preloader = ({ onLoad }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Once the assets are fully loaded, trigger the onLoad callback
    const handleLoad = () => {
      setLoading(false);
      onLoad();
    };

    // Wait for all assets (images, videos, etc.) to finish loading
    const handleAssetsLoaded = () => {
      const images = document.querySelectorAll('img');
      let loadedImagesCount = 0;

      images.forEach((img) => {
        img.onload = () => {
          loadedImagesCount++;
          if (loadedImagesCount === images.length) {
            handleLoad();
          }
        };
      });

      const videos = document.querySelectorAll('video');
      let loadedVideosCount = 0;

      videos.forEach((video) => {
        video.oncanplaythrough = () => {
          loadedVideosCount++;
          if (loadedVideosCount === videos.length) {
            handleLoad();
          }
        };
      });

      // Example for loading a 3D model (modify as needed for your loader)
      const modelLoaded = new Event('modelLoaded');
      window.addEventListener('modelLoaded', () => {
        handleLoad();
      });
    };

    handleAssetsLoaded();
  }, [onLoad]);

  return (
    loading && (
      <div id="preloader">
        <div className="spinner"></div>
      </div>
    )
  );
};

export default Preloader;
