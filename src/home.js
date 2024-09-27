// import React from 'react'
// import { Link } from 'react-router-dom';


// function Home() {
//   return (
   
//     <div>
//       <h1>Home Page</h1>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/about">About Page</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact Page</Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   )
// }

// export default Home

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

//Packages
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

// Component
import Battery from "./batteryrotation";
import GearScroll from "./GearScroll";
import Features from "./Features";
import Cursor from "./cursor";
import "./home.css";
import "./Features.css";
import "./text.css";

//Assets
import Mercelline from "./assets/MERCELLINE.png";
import Gloves from "./assets/Gloves.png";
import Bikedoom from "./assets/Bikedoom.png";
import BikeFrontView from "./assets/BikeFrontView.png";
import Display from "./assets/display.gif";
import Gps from "./assets/map.gif";
import Bluetooth from "./assets/Bluetooth.gif";
import Location from "./assets/Compass.gif";
import MeasurementUnit from "./assets/Stability.gif";
import Dot from "./assets/Dot.png";
import Top from "./assets/Top.png";
import LinkedIn from "./assets/LinkedIn.png";
import Youtube from "./assets/youtube.png";
import Instagram from "./assets/Instagram.png";
import Facebook from "./assets/Facebook.png";
import HomeBikeVideo from "./assets/Visual 8 (1).mp4";
import BikeHeadLight from "./assets/footer.webm";
import ClothRevealBike from "./assets/ClothRevealBike.mp4";
import BlendVideo from "./assets/Light alphs.mp4";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  // const containersRef = useRef(null);
  const maskRef = useRef(null);

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / windowHeight) * 100;
      setScroll(scrolled);
    };

    const updateScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Bike Video Animation
  const videoBikeRef = useRef(null);
  const blendVideoRef = useRef(null);
  const [scrollStep, setScrollStep] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [blendVideoVisible, setBlendVideoVisible] = useState(true);
  const [isAtHome, setIsAtHome] = useState(false); // Track if we're in the home section

  const handleScroll = (e) => {
    if (!scrollEnabled) return;

    e.preventDefault(); // Prevent default behavior for controlled scroll steps

    const video = videoBikeRef.current;

    // Play video during the first two scrolls
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
      }, 2000); // Play video for 1.7 seconds
    } else if (scrollStep === 1) {
      video.play();
      setScrollEnabled(false);
      setTimeout(() => {
        video.pause();
        setScrollStep(2);
        setScrollEnabled(true);
      }, 4000); // Play for 4 more seconds
    } else if (scrollStep === 2) {
      // Transition to the next section
      document.body.style.overflow = "";
      setScrollEnabled(false);
      setIsAtHome(true); // Mark that we're now at home
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

      // Set video to the end scene
      video.pause();
      video.currentTime = video.duration;
      blendVideoRef.current.style.opacity = 0;
    }
  };

  const handlePreventScroll = (e) => {
    if (scrollStep < 2 || isAtHome) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const container = document.querySelector(".scroll-controlled-video");

    document.body.style.overflow = "hidden";

    container.addEventListener("wheel", handleScroll, { passive: false });
    container.addEventListener("touchmove", handleScroll, { passive: false });

    window.addEventListener("scroll", handlePreventScroll, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleScroll);
      container.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("scroll", handlePreventScroll);
    };
  }, [scrollStep, isAtHome]);

  // Reset state when navigating back
  const handleNavigateBack = () => {
    setIsAtHome(false);
    // Optionally reset scrollStep if you want to replay video from the beginning
    // setScrollStep(0);
  };
  // Line Animation

  useEffect(() => {
    const lines = gsap.utils.toArray(".line"); // Select all lines

    gsap.to(lines, {
      x: 0, // Move back to the original position from the left
      opacity: 1, // Fade in to full opacity
      duration: 1, // Duration of the animation
      stagger: 0.2, // Stagger the animation between lines for sequential effect
      ease: "power2.out", // Smoothing the animation
      scrollTrigger: {
        trigger: ".section-para", // The whole paragraph acts as the scroll trigger
        start: "top 80%", // Starts when the top of the paragraph hits 80% of the viewport
        end: "bottom 40%", // Ends when the bottom of the paragraph reaches 40%
        scrub: true, // Scrub the animation based on scroll position
      },
    });
  }, []);

  // Parallax

  const lenis = useLenis(({ scroll }) => {
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed");
      const yPos = -(scroll * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // For scrolling to Top

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // About Page Animation

  useEffect(() => {
    // Animation for images coming from the left into their positions
    gsap.fromTo(
      ".section2-container img ",
      {
        x: -300, // Start 300px to the left
        opacity: 0, // Hidden at start
      },
      {
        x: 0, // Move to original position
        opacity: "1", // Fade in
        stagger: 0.3, // Delay between animations for each image
        duration: 0.5, // Animation duration
        ease: "power3.out", // Easing for a smooth effect
        scrollTrigger: {
          trigger: ".section2-container",
          start: "top 75%", // Animation starts when the section is 75% from the top of the viewport
          toggleActions: "play none none reverse", // Reverses when you scroll back up
        },
      }
    );
  }, []);

  //Text Animation

  useEffect(() => {
    Splitting();
    const fx4Titles = [
      ...document.querySelectorAll(
        ".content__title1[data-splitting][data-effect4]"
      ),
    ];
    fx4Titles.forEach((title) => {
      const words = title.querySelectorAll(".word");

      for (const word of words) {
        const chars = word.querySelectorAll(".char");

        gsap.fromTo(
          chars,
          {
            "will-change": "opacity, transform",
            x: (position, _, arr) => 150 * (position - arr.length / 2),
          },
          {
            ease: "power1.inOut",
            x: 2,
            stagger: {
              grid: "auto",
              from: "center",
            },
            scrollTrigger: {
              trigger: word,
              start: "center bottom+=50%",
              end: "top top+=15%",
              scrub: true,
            },
          }
        );
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    Splitting();
    const fx8Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect8]"
      ),
    ];
    const lettersAndSymbols = [
      "a",
      "b",
      "i",
      "j",
      "k",
      "l",
      "x",
      "y",
      "z",
      "!",
      "@",
      "#",
      "$",
      "+",
      "=",
    ];
    fx8Titles.forEach((title) => {
      const chars = title.querySelectorAll(".char");

      chars.forEach((char, position) => {
        let initialHTML = char.innerHTML;

        gsap.fromTo(
          char,
          {
            opacity: 0,
          },
          {
            duration: 0.1,
            innerHTML: () =>
              lettersAndSymbols[
                Math.floor(Math.random() * lettersAndSymbols.length)
              ],
            repeat: 1,
            repeatRefresh: true,
            opacity: 1,
            repeatDelay: 0.01,
            delay: (position + 1) * 0.1,
            onComplete: () =>
              gsap.set(char, { innerHTML: initialHTML, delay: 0.01 }),
            scrollTrigger: {
              trigger: title,
              start: "top bottom",
              end: "bottom center",
              toggleActions: "play resume resume reset",
              onEnter: () => gsap.set(char, { opacity: 0 }),
            },
          }
        );
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    Splitting();
    const fx10Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect10]"
      ),
    ];
    fx10Titles.forEach((title) => {
      const chars = title.querySelectorAll(".char");

      gsap.fromTo(
        chars,
        {
          "will-change": "opacity",
          opacity: 0,
          filter: "blur(20px)",
        },
        {
          duration: 0.25,
          ease: "power1.inOut",
          opacity: 1,
          filter: "blur(0px)",
          stagger: { each: 0.05, from: "random" },
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "center center",
            toggleActions: "play resume resume reset",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    Splitting();
    const fx10Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect10]"
      ),
    ];
    fx10Titles.forEach((title) => {
      const chars = title.querySelectorAll(".char");

      gsap.fromTo(
        chars,
        {
          "will-change": "opacity",
          opacity: 0,
          filter: "blur(20px)",
        },
        {
          duration: 0.25,
          ease: "power1.inOut",
          opacity: 1,
          filter: "blur(0px)",
          stagger: { each: 0.05, from: "random" },
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "center center",
            toggleActions: "play resume resume reset",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const wrapElements = (elems, wrapType, wrapClass) => {
    elems.forEach((char) => {
      const wrapEl = document.createElement(wrapType);
      wrapEl.classList = wrapClass;
      char.parentNode.appendChild(wrapEl);
      wrapEl.appendChild(char);
    });
  };

  useEffect(() => {
    Splitting();
    const fx11Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect11]"
      ),
    ];
    fx11Titles.forEach((title) => {
      const chars = title.querySelectorAll(".char");
      wrapElements(chars, "span", "char-wrap");

      gsap.fromTo(
        chars,
        {
          "will-change": "transform",
          transformOrigin: "0% 50%",
          xPercent: 105,
        },
        {
          duration: 1,
          ease: "expo",
          xPercent: 0,
          stagger: 0.042,
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "top top+=10%",
            toggleActions: "play resume resume reset",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    Splitting();
    const fx27Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect27]"
      ),
    ];
    fx27Titles.forEach((title) => {
      const words = [...title.querySelectorAll(".word")];
      words.forEach((word) => gsap.set(word.parentNode, { perspective: 1000 }));
      gsap.fromTo(
        words,
        {
          "will-change": "opacity, transform",
          z: () => gsap.utils.random(500, 950),
          opacity: 0,
          xPercent: (pos) => gsap.utils.random(-100, 100),
          yPercent: (pos) => gsap.utils.random(-10, 10),
          rotationX: () => gsap.utils.random(-90, 90),
        },
        {
          ease: "expo",
          opacity: 1,
          rotationX: 0,
          rotationY: 0,
          xPercent: 0,
          yPercent: 0,
          z: 0,
          scrollTrigger: {
            trigger: title,
            start: "center center",
            end: "+=200%",
            scrub: true,
            pin: title.parentNode,
          },
          stagger: {
            each: 0.006,
            from: "random",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    Splitting();
    const fx29Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect29]"
      ),
    ];
    fx29Titles.forEach((title) => {
      const words = [...title.querySelectorAll(".word")];
      words.forEach((word, pos) => {
        const chars = word.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          {
            "will-change": "transform",
            transformOrigin: `${pos % 2 ? 0 : 100}% ${pos % 2 ? 100 : 0}%`,
            scale: 0,
          },
          {
            ease: "power4",
            scale: 1,
            stagger: {
              each: 0.03,
              from: pos % 2 ? "end" : "start",
            },
            scrollTrigger: {
              trigger: word,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Teaser Animation

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Track if the video is muted
  const [showPlayCursor, setShowPlayCursor] = useState(false);

  useEffect(() => {
    // GSAP scroll animation for scaling video
    gsap.fromTo(
      videoRef.current,
      { scale: 0.8 }, // Initial scale
      {
        scale: 1.5, // Zoom in on scroll
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true, // Smooth scroll effect
          onEnter: () => setShowPlayCursor(true), // Show play text when the video comes closer
          onLeaveBack: () => setShowPlayCursor(false), // Hide play text when scrolling back up
        },
      }
    );

    // GSAP blur effect for other sections
    gsap.fromTo(
      ".other-container", // Target all other sections with this class
      { filter: "blur(0px)" }, // Initial state without blur
      {
        filter: "blur(10px)", // Max blur
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, []);

  // Handle click to unmute and fullscreen the video
  const handleVideoClick = () => {
    if (isMuted) {
      videoRef.current.muted = false; // Unmute the video
      setIsMuted(false);
    }
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen(); // Make video fullscreen
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen(); // Safari
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen(); // Firefox
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen(); // IE/Edge
    }
  };

  // Feature Bike Animation
  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(
    require.context("./assets/BikeImages", false, /\.(png|jpe?g|svg)$/)
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Start with the 0th image
  const [activeEdgePoint, setActiveEdgePoint] = useState(0); // Track active edge point
  const [transitioning, setTransitioning] = useState(false); // State to track if transitioning
  const [scrolling, setScrolling] = useState(false); // To manage scroll events
  const [lockScroll, setLockScroll] = useState(true); // Lock scroll initially
  const imgRef = useRef(null); // Reference to the image element

  const edgePoints = [
    { start: 0, end: 0 }, // First image
    { start: 1, end: 33 }, // Images 1-33 (first phase)
    { start: 34, end: 50 }, // Images 34-50 (second phase)
    { start: 51, end: 70 }, // Images 51-70 (third phase)
  ];

  // Smooth image rendering function
  const changeImage = (startIndex, endIndex) => {
    if (transitioning) return; // Prevent transition overlap
    setTransitioning(true); // Start transition
    const step = startIndex < endIndex ? 1 : -1; // Determine the step for transition
    const loopEnd = startIndex < endIndex ? endIndex + 1 : endIndex - 1; // Define the loop end

    // Loop through each index from startIndex to endIndex
    for (let index = startIndex; index !== loopEnd; index += step) {
      setTimeout(() => {
        setCurrentImageIndex(index);

        // Check if imgRef is available before setting the src property
        if (imgRef.current) {
          imgRef.current.src = images[index]; // Update the image source directly
        }
      }, Math.abs(index - startIndex) * 70); // Adjust the speed of the transition
    }

    // Reset transitioning state after the last image
    setTimeout(
      () => setTransitioning(false),
      Math.abs(endIndex - startIndex + 1) * 50
    );
  };

  // Scroll handler to manage scroll between edge points
  const handleScrolls = (e) => {
    e.preventDefault();
    const delta = e.deltaY;

    if (!transitioning && lockScroll) {
      if (delta > 0 && activeEdgePoint < edgePoints.length - 1) {
        // Scroll down logic
        const { end } = edgePoints[activeEdgePoint + 1];
        changeImage(currentImageIndex, end);
        setActiveEdgePoint((prev) => prev + 1);

        if (
          activeEdgePoint === edgePoints.length - 2 &&
          currentImageIndex >= 70
        ) {
          setLockScroll(false); // Unlock scroll after the final phase
        }
      } else if (delta < 0 && activeEdgePoint > 0) {
        // Scroll up logic
        const { start } = edgePoints[activeEdgePoint - 1];
        changeImage(currentImageIndex, start);
        setActiveEdgePoint((prev) => prev - 1);
      }
    }
  };

  // Attach scroll event
  useEffect(() => {
    const handleScrollEvent = (event) => {
      if (!scrolling) {
        setScrolling(true);
        handleScrolls(event);
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
  }, [
    activeEdgePoint,
    currentImageIndex,
    transitioning,
    scrolling,
    lockScroll,
  ]);

  // Gear Animation

  const powerRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      powerRef.current,
      { scale: 0.5 },
      {
        scale: 1,
        scrollTrigger: {
          trigger: powerRef.current,
          start: "top center", // Start scaling when the image is at the bottom of the viewport
          end: "+=400", // End scaling when the image reaches the top
          scrub: true, // Smooth scrub effect
        },
      }
    );
  }, []);
  useEffect(() => {
    const gearSettingRef = document.querySelector(".gear-setting");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          powerRef.current.classList.add("gs-reveal--anim");
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(gearSettingRef);
  }, []);
  const wattRef = useRef(null);
  const torqueRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      wattRef.current,
      { xPercent: 0, opacity: 0 },
      {
        xPercent: -100,
        opacity: 1,
        scrollTrigger: {
          trigger: wattRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      torqueRef.current,
      { xPercent: 0, opacity: 0 },
      {
        xPercent: 100,
        opacity: 1,
        scrollTrigger: {
          trigger: torqueRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      {/* Bike Section */}
      <div className="scrollbar-container">
        <div className="scrollbar-progress" style={{ width: `${scroll}%` }} />
      </div>
      <Cursor />
      {/* <div onWheel={handleVideoStart}>
          <VideoScroll onVideoEnd={handleVideoEnd} />
        </div> */}
      <div className="mask-container">
        <div
          className="scroll-controlled-video"
          style={{
            objectFit: "cover",
            // overflow: "hidden",
            // position: "relative",
          }}
        >
          <video
            ref={videoBikeRef}
            src={ClothRevealBike}
            width="100%"
            muted
            style={{ position: "", top: 0, }}
          />
          <video
            ref={blendVideoRef}
            src={BlendVideo}
            width="100%"
            muted
            autoPlay
            loop
            className="blend-video"
            style={{
              opacity: blendVideoVisible ? 1 : 0
            }}
          />
        </div>
      </div>

      {/* Section after the video completes */}
      {/* <div className="mask-container">
          <div className="mask-images">
            <img src={FullBike} alt="bike" className="mask-images" />
          </div>
        </div> */}
      {/* section-1 */}
      {/* <ReactLenis root> */}
      <div className="home-container" onScroll={handleNavigateBack}>
        <div class="content content--full">
          <span className="home-para1" style={{ color: "white" }}>
            EXPERIENCE THE
          </span>{" "}
          <h2 class="content__title1" data-splitting data-effect4>
            <br />
            <span className=" font-larger">INDIA'SFASTEST</span> <br />
            <span className="ride-para font-upper font-sub font-7">
              {" "}
              EVRIDE
            </span>
          </h2>
        </div>
        <div class="content">
          <p class="content__title home-intro" data-splitting data-effect8>
            <span class="font-8 home-intro">
              {" "}
              WELCOME TO MERCELLEINIE - REDEFINING <br />
              THE FUTURE OF ELECTRIC SUPERBIKES{" "}
            </span>
          </p>
        </div>
        <div ref={containerRef} className="image-div">
          <video
            ref={videoRef}
            className="HomeBike-video"
            muted={isMuted} // Control mute state
            loop
            autoPlay
            playsInline
            onMouseEnter={() => setIsHovered(true)} // Show play text on hover
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleVideoClick} // Click to unmute and fullscreen
          >
            <source src={HomeBikeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Show 'Play' text as cursor when the video comes closer */}
          {showPlayCursor && isHovered && (
            <div className="play-text-cursor">Play</div>
          )}
        </div>
      </div>
      {/* section-2 */}
      <div className="section-container ">
        <div className="background-container">
          <div className="section1-container">
            <div className="section1-flex">
              <div className="col-6 about-col content">
                <p
                  className="about-01 content__title"
                  data-splitting
                  data-effect8
                >
                  <span class="font-8 font-abouteffect">/01 ABOUT</span>
                </p>
              </div>
              <div className="col-6">
                <p className="section-para">
                  {/* <span
                      className="line"
                      style={{
                        display: "block",
                        transform: "translateX(-100px)",
                        opacity: 0,
                      }}
                    > */}
                  DISCOVER THE FREEDOM WITH
                  {/* </span>{" "} */}
                  <br />
                  {/* <span
                      className="line"
                      style={{
                        display: "block",
                        transform: "translateX(-100px)",
                        opacity: 0,
                      }}
                    > */}
                  MERCELLEINIE SUPERBIKES,
                  {/* </span>{" "} */}
                  <br />
                  {/* <span
                      className="line"
                      style={{
                        display: "block",
                        transform: "translateX(-100px)",
                        opacity: 0,
                      }}
                    > */}
                  OFFERING UNPARALLELED
                  {/* </span>{" "} */}
                  <br />
                  {/* <span
                      className="line"
                      style={{
                        display: "block",
                        transform: "translateX(-100px)",
                        opacity: 0,
                      }}
                    > */}
                  RANGE AND TOP SPEEDS FOR AN
                  {/* </span>{" "} */}
                  <br />
                  {/* <span
                      className="line"
                      style={{
                        display: "block",
                        transform: "translateX(-100px)",
                        opacity: 0,
                      }}
                    > */}
                  ELECTRIFYING, UNCOMPROMISED
                  {/* </span>{" "} */}
                  <br />
                  {/* <span
                      className="line"
                      style={{
                        display: "block",
                        transform: "translateX(-100px)",
                        opacity: 0,
                      }}
                    > */}
                  JOURNEY.
                  {/* </span> */}
                </p>
              </div>
            </div>
          </div>
          <div className="section2-container">
            <div className="col-3 col-3">
              <img src={Mercelline} alt="Logo" className="Mercelline-image" />
            </div>
            <div className="col-3 col-2">
              <div>
                <img src={BikeFrontView} alt="Logo" className="Image2-image" />
                <p className="section2-para">
                  SOFTWARE AND CONNECTIVITY <br />
                  LIGHTWEIGHT MATERIALS <br />
                  ADVANCED BATTERY TECHNOLOGY
                </p>
              </div>
            </div>
            <div className="col-3 col-1">
              <img src={Bikedoom} alt="Logo" className="Image1-image" />
            </div>
            <div className="col-3 col-4">
              <img src={Gloves} alt="Logo" className="Gloves-image" />
            </div>
          </div>
          <div className="dot">
            <img src={Dot} className="dot-icon" />
          </div>
        </div>
      </div>
      {/* Gear */}
      {/* <div className="gear-container">
          <div class="content">
            <h2
              class="content__title"
              data-splitting
              data-effect10
              style={{ color: "white" }}
            >
              <span class="font-medium font-1">THE</span>
              <span class="font-7">ULTIMATE RIDING</span>
              <span class="font-4">EXPERIENCE</span>
            </h2>
          </div>
          <div className="gear-heading ">
            <div className="gear-power">
              <div className="gear2">
                <img src={Gear} className="gear-pic" />
              </div>
            </div>
          </div>
          <div className="gear-text ">
            <p className="gear-para">
              DISCOVER TRUE FREEDOM WITH MERCELLEINE <br /> SUPERBIKES OFFERING
              UNPARALLELED RANGE.
            </p>
          </div>
          <div className="gear-setting">
            <p className="gear-watt">
              POWER <br />
              <span className="font-watt">
                {" "}
                90 <span className="kilowatt-space">KW</span>{" "}
              </span>
            </p>
            <p className="gear-torque">
              TORQUE <br />
              <span className="font-watt">
                150 <span className="kilowatt-space">NM</span>
              </span>
            </p>
          </div>
        </div> */}
      {/* <div>
        <Gear />
      </div> */}
      <div className="gear-container">
        <div className="feature-heading">
          <p className="feature-para">
            THE <br />
            ULTIMATE RIDING <br />
            EXPERIENCE
          </p>
        </div>
        <div
          ref={powerRef}
          className={`power-image ${
            scroll >= 60 ? "gs-reveal gs-reveal--anim" : "gs-reveal"
          }`}
          alt="Zoomable Power Image"
        >
        </div>
        <GearScroll />
        <div className="gear-setting">
          <p ref={wattRef} className="gear-watt">
            POWER <br />
            <span className="font-watt">
              90 <span className="kilowatt-space">KW</span>
            </span>
          </p>
          <p ref={torqueRef} className="gear-torque">
            TORQUE <br />
            <span className="font-watt">
              150 <span className="kilowatt-space">NM</span>
            </span>
          </p>
        </div>
      </div>
      {/* section-3 */}
      <div className="section3-container">
        <div className="para-position">
          {/* <div className="para-tech">
              <p className="para-num">/02 TECHNOLOGY</p>
            </div> */}
          <div class=" para-tech content1">
            <p class="content__title" data-splitting data-effect8>
              <span class="font-8 para-num"> /02 TECHNOLOGY</span>
            </p>
          </div>
          <div class="content">
            <h2
              class="content__title section3-para"
              data-splitting
              data-effect11
            >
              <span class="font-3 font-height font-align">
                UNMATCHED <br />
                ELECTRIC <br />
                PERFORMANCE
              </span>
            </h2>
          </div>
          <p className="section3-shortpara">
            Feel the power surge with our advanced technology, <br />
            delivering thrilling acceleration.We push EV performance <br />
            boundaries to ensure you experience the best drive.
          </p>
        </div>
      </div>
      {/* Battery */}
      <div>
        <Battery />
      </div>
      {/* Features */}
      <div className="feature-heading">
        <div className="content">
          {/* <p className="vision">/04 FEATURES</p> */}
          <div class="content1">
            <p class="content__title" data-splitting data-effect8>
              <span class="font-8 vision">/04 FEATURES</span>
            </p>
          </div>
          <h2 className="content__title" data-splitting data-effect27>
            <span className="font-upper font-19 font-medium">
              AN EVOLUTIONARY VISION <br />
              FOR REVOLUTIONARY <br />
              PRODUCTS
            </span>
          </h2>
        </div>
        {/* Bike Mention */}
      </div>
      <div className="bikefeature-container" style={{ height: "100vh" }}>
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
                <p className="bike-details">Details about feature.</p>
              </div>
            </div>
          )}
          {currentImageIndex === 50 && (
            <div className="bike-text-container">
              <div className="bike-box2">
                <div className="bike-icon"></div>
                <h5 className="bike-information">Another Feature</h5>
                <p className="bike-details">More details here.</p>
              </div>
            </div>
          )}
          {currentImageIndex === 70 && (
            <div className="bike-text-container">
              <div className="bike-box3">
                <div className="bike-icon"></div>
                <h5 className="bike-information">Final Feature</h5>
                <p className="bike-details">Summary of features.</p>
              </div>
            </div>
          )}
        </div>
        {/* <Features maskRef={maskRef} /> */}
      </div>
      {/* Command your Ride */}
      <div className="command-container">
        <div class="content1 command-dash">
          <p class="content__title" data-splitting data-effect8>
            <span class="font-8 dash-para">/05 DASHBOARD</span>
          </p>
        </div>
        <div className="command-flex">
          <div className="command-arrangement">
            <p className="command-heading">
              COMMAND <br /> YOUR RIDE
            </p>
            <p className="command-para">
              CUTTING-EDGE <br />
              DASHBOARD TECHNOLOGY
            </p>
          </div>
          <div style={{ flex: 7 }}></div>
        </div>
        <div className="row">
          <div className="column1">
            <div className="sub-column text">
              <div className="text-flex">
                <p className="inch-para">
                  5 INCH TFT <br />
                  DISPLAY
                </p>
                <p className="para-command">
                  A vibrant screen providing real-time <br />
                  information and controls.
                </p>
              </div>
            </div>
            <div className="sub-column image">
              <img src={Display} className="art" alt="Display 1" />
            </div>
          </div>
          <div className="column2">
            <div className="sub-column text">
              <div className="text-flex">
                <p className="inch-para">
                  INTEGRATED GPS RECEIVER <br />
                  AND BLUETOOTH
                </p>
                <p className="para-command">
                  Enables navigation and <br />
                  communication.
                </p>
              </div>
            </div>
            <div className="sub-column image">
              <img src={Gps} className="art1" alt="Display 2" />
            </div>
          </div>
        </div>
        <div className="row-layout">
          <div className="column-one">
            <div className="content-wrapper">
              <p className="header-text">
                NFC & BLUETOOTH <br />
                256 BIT ENCRYPTION
              </p>
              <p className="description-text">
                Ensures encryption for seamless, <br />
                protected integration.
              </p>
              <div className="sub-column image">
                <img
                  src={Bluetooth}
                  className="image-display"
                  alt="Display 1"
                />
              </div>
            </div>
          </div>
          <div className="column-two">
            <div className="content-wrapper">
              <p className="header-text">
                GPS FOR REAL
                <br />
                TIME TRACKING
              </p>
              <p className="description-text">
                Provides location based services, <br />
                ensuring you're always connected to <br />
                your route.
              </p>
              <div className="sub-column image">
                <img src={Location} className="image-display" alt="Display 2" />
              </div>
            </div>
          </div>
          <div className="column-three">
            <div className="content-wrapper">
              <p className="header-text">
                9-AXIS INTERTIAL <br />
                MEASUREMENT UNIT
              </p>
              <p className="description-text">
                Tracks orientation and motion for <br />
                enhanced stability.
              </p>
              <div className="sub-column image">
                <img
                  src={MeasurementUnit}
                  className="image-display"
                  alt="Display 3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Final Section*/}
      <div className="content">
        <h2 className="content__title" data-splitting data-effect29>
          <span className="font-lower">GET READY TO</span>
          <span className="font-upper">EXPERIENCE THE </span>
          <span className="font-upper">FUTURE OF RIDING!</span>
        </h2>
      </div>
      <div className="bike-container">
        <div className="bike-background">
          <div className="content-wrapper1">
            <div className="bike-back">
              <div className="top">
                <img
                  src={Top}
                  className="top-image"
                  onClick={scrollToTop}
                  alt="Back to top"
                />
                <p className="back-top">BACK TO TOP</p>
              </div>
              <div>
                <p className="policy">
                  <span className="copyrights">2024 MERCELLINIE</span> PRIVACY
                  POLICY
                </p>
              </div>
            </div>

            <div className="bike-position">
              <video className="Bikefront-image" autoPlay loop muted>
                <source src={BikeHeadLight} type="video/webm" />
              </video>
            </div>

            <div className="wings">
              <div className="wings-rights">
                <div className="icon-flex">
                  <a
                    href="https://www.linkedin.com/in/mercellenie-automotive-9a1910309/"
                    target="_blank"
                    className="link link--helike"
                  >
                    <img src={LinkedIn} className="icon1" alt="Icon 1" />
                  </a>
                  <a
                    href="https://www.youtube.com/@Mercellenie"
                    target="_blank"
                    className="link link--helike"
                  >
                    <img src={Youtube} className="icon2" alt="Icon 2" />
                  </a>
                  <a
                    href="https://www.instagram.com/mercellenie/"
                    target="_blank"
                    className="link link--helike"
                  >
                    <img src={Instagram} className="icon4" alt="Icon 4" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61565197859780"
                    target="_blank"
                    className="link link--helike"
                  >
                    <img src={Facebook} className="icon5" alt="Icon 5" />
                  </a>
                </div>
                <p className="wings-work">
                  MADE BY{" "}
                  <a
                    href="https://wings.design/"
                    target="_blank"
                    className="wings-site"
                  >
                    WINGS
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </ReactLenis> */}
    </>
  );
}

export default Home;
