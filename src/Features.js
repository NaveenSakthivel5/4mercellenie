import React, { useState, useEffect } from "react";
import "./Features.css";

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context("./assets/BikeImages", false, /\.(png|jpe?g|svg)$/)
);

const edgePoints = [
  { start: 0, end: 0 },   // First image
  { start: 1, end: 33 },  // Images 1-33 (first phase)
  { start: 34, end: 50 }, // Images 34-50 (second phase)
  { start: 51, end: 70 }, // Images 51-70 (third phase)
];

const BikeAnimation = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeEdgePoint, setActiveEdgePoint] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [lockScroll, setLockScroll] = useState(true); // Lock scroll initially

  const incrementSteps = 5; // Number of images to render per scroll

  const handleScroll = (e) => {
    e.preventDefault();

    const delta = e.deltaY;

    // Scroll down logic
    if (delta > 0 && activeEdgePoint < edgePoints.length - 1) {
      const { end } = edgePoints[activeEdgePoint + 1];

      // Increment image index towards the next edge point
      setCurrentImageIndex((prevIndex) => {
        const newIndex = prevIndex + incrementSteps;
        return newIndex <= end ? newIndex : end;
      });

      // Move to next edge point if current image exceeds the start of the next edge
      if (currentImageIndex >= edgePoints[activeEdgePoint + 1].start) {
        setActiveEdgePoint((prev) => prev + 1);
      }

      // Unlock scroll if last image is reached
      if (activeEdgePoint === edgePoints.length - 2 && currentImageIndex >= 70) {
        setLockScroll(false);
      }
    }
    // Scroll up logic
    else if (delta < 0 && activeEdgePoint > 0) {
      const { start } = edgePoints[activeEdgePoint - 1];

      // Decrement image index back towards the previous edge point
      setCurrentImageIndex((prevIndex) => {
        const newIndex = prevIndex - incrementSteps;
        return newIndex >= start ? newIndex : start;
      });

      // Move to previous edge point if current image falls below the end of the previous edge
      if (currentImageIndex <= edgePoints[activeEdgePoint - 1].end) {
        setActiveEdgePoint((prev) => prev - 1);
      }

      // Lock scroll again when going back into the mask-container section
      if (activeEdgePoint === edgePoints.length - 1 && currentImageIndex <= 70) {
        setLockScroll(true);
      }
    }
  };

  // Scroll listener
  useEffect(() => {
    const handleScrollEvent = (event) => {
      if (!scrolling) {
        setScrolling(true);
        handleScroll(event);
        setTimeout(() => setScrolling(false), 200);
      }
    };

    if (lockScroll) {
      window.addEventListener("wheel", handleScrollEvent, { passive: false });
    } else {
      window.removeEventListener("wheel", handleScrollEvent);
    }

    return () => {
      window.removeEventListener("wheel", handleScrollEvent);
    };
  }, [activeEdgePoint, currentImageIndex, scrolling, lockScroll]);

  return (
    <div className="bike-flex">
      <div className="bike-placing">
        <img
          src={images[currentImageIndex]}
          className="Bikefront-images"
          alt="Bike Animation"
        />
      </div>

      {/* Show bike-text-container based on current image index */}
      {currentImageIndex === 0 && (
        <div className="bike-text-container">
          <div className="bike-box">
            <div className="bike-icon"></div>
            <h5 className="bike-information">Regenerative Braking</h5>
            <p className="bike-details">
              Enhances Energy
              <br /> Efficiency.
            </p>
          </div>
        </div>
      )}
      {currentImageIndex === 33 && (
        <div className="bike-text-container">
          <div className="bike-box1">
            <div className="bike-icon"></div>
            <h5 className="bike-information">New Feature</h5>
            <p className="bike-details">
              Details about feature.
            </p>
          </div>
        </div>
      )}
      {currentImageIndex === 50 && (
        <div className="bike-text-container">
          <div className="bike-box2">
            <div className="bike-icon"></div>
            <h5 className="bike-information">Another Feature</h5>
            <p className="bike-details">
              More details here.
            </p>
          </div>
        </div>
      )}
      {currentImageIndex === 70 && (
        <div className="bike-text-container">
          <div className="bike-box3">
            <div className="bike-icon"></div>
            <h5 className="bike-information">Final Feature</h5>
            <p className="bike-details">
              Summary of features.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeAnimation;


// import React, { useState, useRef } from "react";
// import "./Features.css";
// // Function to dynamically import all images from a specific folder
// function importAll(r) {
//   return r.keys().map(r);
// }
// const images = importAll(
//   require.context("./assets/BikeImages", false, /\.(png|jpe?g|svg)$/)
// );
// // Updated edge points
// const edgePoints = [
//   { start: 0, end: 0 },   // Click for point 1
//   { start: 1, end: 33 },  // Click for point 2
//   { start: 34, end: 50 },  // Click for point 3
//   { start: 51, end: 70 },
// ];
// const BikeAnimation = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0); // Start with the 0th image
//   const [activeEdgePoint, setActiveEdgePoint] = useState(0); // Track active edge point
//   const imgRef = useRef(null); // Reference to the image element
//   const [transitioning, setTransitioning] = useState(false); // State to track if transitioning
//   const changeImage = (startIndex, endIndex, pointIndex) => {
//     if (transitioning) return; // Prevents clicking while transitioning
//     setTransitioning(true); // Start transition
//     setActiveEdgePoint(pointIndex); // Update active edge point
//     const step = startIndex < endIndex ? 1 : -1; // Determine the step for transition
//     const loopEnd = startIndex < endIndex ? endIndex + 1 : endIndex - 1; // Define the loop end
//     // Loop through each index from startIndex to endIndex
//     for (let index = startIndex; index !== loopEnd; index += step) {
//       setTimeout(() => {
//         setCurrentImageIndex(index); // Update the image index
//         imgRef.current.src = images[index]; // Update the image source directly
//       }, Math.abs(index - startIndex) * 50); // Adjust the speed of the transition
//     }
//     // Reset transitioning state after the last image
//     setTimeout(() => setTransitioning(false), Math.abs(endIndex - startIndex + 1) * 50);
//   };
//   return (
//     <>
//       <div className="bike-flex">
//         <div className="bike-placing">
//           <img
//             src={images[currentImageIndex]}
//             className="Bikefront-images"
//             alt="Bike Animation"
//             ref={imgRef} // Reference for GSAP
//           />
//         </div>
//         {/* Timeline with circles */}
//         <div className="timeline">
//           <div className="line" style={{ width: `${(activeEdgePoint / (edgePoints.length - 1)) * 100}%` }}></div>
//           {edgePoints.map((point, index) => (
//             <div
//               key={index}
//               className="edge-point"
//               onClick={() => changeImage(currentImageIndex, point.end, index)} // Update this line
//               style={{
//                 left: `${(index / (edgePoints.length - 1)) * 100}%`, // Positioning circles
//                 backgroundColor: index <= activeEdgePoint ? 'yellow' : 'white' // Change color based on active point
//               }}
//             />
//           ))}
//         </div>
//         {/* Show bike-text-container based on current image index */}
//         {currentImageIndex === 0 && (
//           <div className="bike-text-container">
//             <div className="bike-box">
//               <div className="bike-icon"></div>
//               <h5 className="bike-information">Regenerative Braking</h5>
//               <p className="bike-details">
//                 Enhances Energy
//                 <br /> Efficiency.
//               </p>
//             </div>
//           </div>
//         )}
//         {currentImageIndex === 33 && (
//           <div className="bike-text-container">
//             <div className="bike-box1">
//               <div className="bike-icon"></div>
//               <h5 className="bike-information">New Feature</h5>
//               <p className="bike-details">
//                 Details about feature.
//               </p>
//             </div>
//           </div>
//         )}
//         {currentImageIndex === 50 && (
//           <div className="bike-text-container">
//             <div className="bike-box2">
//               <div className="bike-icon"></div>
//               <h5 className="bike-information">Another Feature</h5>
//               <p className="bike-details">
//                 More details here.
//               </p>
//             </div>
//           </div>
//         )}
//         {currentImageIndex === 70 && (
//           <div className="bike-text-container">
//             <div className="bike-box3">
//               <div className="bike-icon"></div>
//               <h5 className="bike-information">Final Feature</h5>
//               <p className="bike-details">
//                 Summary of features.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
// export default BikeAnimation;
