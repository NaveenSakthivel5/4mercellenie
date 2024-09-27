import './About.css';
import Lenis from '@studio-freight/lenis';
// import Footer from './Footer';
import { useEffect, useRef } from 'react';
import Notebook from './assets/Notebook.png';
import Leaf from './assets/Leaf.svg';
import Speedometer from './assets/Speedometer.svg';
import Globe from './assets/Globe.svg';
import Cycle from './assets/Cycle.svg';
import Demand from './assets/Demand.svg';
import EBike2 from './assets/EBike2.png';
import Icon1 from "./assets/LinkedIn.svg";
import Icon2 from "./assets/X.svg";
import Icon3 from "./assets/Instagram.svg";
import Icon4 from "./assets/Facebook.svg";
import Icon5 from "./assets/Youtube.svg";
import BottomBG from "./assets/Group34.png"
import 'splitting/dist/splitting.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';

gsap.registerPlugin(ScrollTrigger);



function About() {
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Clean up when the component unmounts
    };
  }, []);


  // Function to handle scroll-triggered animations
  const handleScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          // Remove the class when the element leaves the viewport, so it can animate again when re-entered
          entry.target.classList.remove('animate');
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    elements.forEach((el) => observer.observe(el));
  };

  // Apply the scroll animation handling on component mount
  useEffect(() => {
    handleScrollAnimations();
  }, []);

  const electrifyingRef = useRef(null);
  const thrillRef = useRef(null);
  const ridingRef = useRef(null);
  const transformingRef = useRef(null);
  const backgroundImageRef = useRef(null);

  useEffect(() => {
    // Use matchMedia to target screen sizes
    const mm = gsap.matchMedia();

    // Parallax animations for screen sizes above 425px
    mm.add("(min-width: 426px)", () => {
      // Parallax effect for image
      gsap.to(backgroundImageRef.current, {
        yPercent: 20,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: backgroundImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax effect for text: Electrifying
      gsap.to(electrifyingRef.current, {
        y: 50,
        ease: "power4.out",
        scrollTrigger: {
          trigger: electrifyingRef.current,
          start: "top 90%",
          end: "bottom 50%",
          scrub: true,
        },
      });

      // Parallax effect for text: The Thrill
      gsap.to(thrillRef.current, {
        y: 50,
        ease: "power4.out",
        scrollTrigger: {
          trigger: thrillRef.current,
          start: "top 90%",
          end: "bottom 50%",
          scrub: true,
        },
      });

      // Parallax effect for text: OF Riding
      gsap.to(ridingRef.current, {
        y: 50,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ridingRef.current,
          start: "top 90%",
          end: "bottom 50%",
          scrub: true,
        },
      });

      // Parallax effect for text: Transforming Mobility
      gsap.to(transformingRef.current, {
        y: 50,
        ease: "power4.out",
        scrollTrigger: {
          trigger: transformingRef.current,
          start: "top 90%",
          end: "bottom 50%",
          scrub: true,
        },
      });
    });

    // Clean up GSAP when the component is unmounted
    return () => mm.revert();
  }, []);
  useEffect(() => {
    Splitting();
    const fx8Titles = [
      ...document.querySelectorAll(
        ".content__title-about1[data-splitting][data-effect8]"
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
    const fx4Titles = [
      ...document.querySelectorAll(
        ".content__title-about2[data-splitting][data-effect4]"
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
  
  

  return (
    <div className="about">
      <div className="container-2">
        <div className="top-background">
        <div className='section-1 '>
        <div
          className="about-image"
          ref={backgroundImageRef}
        ></div>
          <span
          className="electrifying"
          ref={electrifyingRef}
        >
          Electrifying
        </span>
        <span className="the-thrill" ref={thrillRef}>
          THE Thrill
        </span>
        <span className="of-riding" ref={ridingRef}>
          OF Riding
        </span>
        <span className="transforming" ref={transformingRef}>
          Transforming Mobility, One<br />Exhilarating Ride at a<br />Time
        </span>
          </div>  
        </div>
        <div className="group-18">
          <div className="rectangle-1550"></div>
          <div className="rectangle-1549"></div>
          <div className="rectangle-1548"></div>
        </div>
        <div className="group-49">
          <p className="container-who content__title-about1" data-splitting data-effect8>
            <span>/01 WHO WE ARE</span>
          </p>
        </div>

        <div className="innovators animate-on-scroll content__title-about2" data-splitting data-effect4>
          <span>Innovators<br />inMotion</span>
        </div>

        <span className="at-mercellenie">
          At Mercellenie Automotive, we epitomize excellence in electric
          mobility. We craft premium electric bikes that set new
          benchmarks for performance and environmental responsibility.
          we deliver exceptional quality and innovation in electric mobility,
          setting new global standards with premium aesthetics,
          unmatched performance, extensive range, and fast charging.
        </span>

        <div className="group-48">
        <p className="container-who content__title-about1" data-splitting data-effect8>
            <span>/02 OUR APPROACH</span>
          </p>
        </div>

        <span className="we-believe">
          We believe in delivering electric vehicles that are not just eco-friendly but also luxurious and high-performing. We focus on creating a driving experience that is unmatched, where the power of electric meets the luxury of high-end cars. Our team is dedicated to pushing the boundaries of technology to build the best electric vehicles.
        </span>
        <div className="power-style-efficiency">
          <span className="power">POWER</span>
          <span className="separator-left"></span>
          <span className="style">STYLE</span>
          <span className="separator-right"></span>
          <span className="efficiency">EFFICIENCY</span>
        </div>


        <div className="passion-meets-innovation">
          <div className="screenshot-image">
            {/* <img src="./src/pages/assets/Notebook.png" alt="Sketching e-bike design" /> */}
            <img src={Notebook} alt="Sketching e-bike design" />
          </div>
          <div className="innovation-text">
            <h1>PASSION<br />MEETS<br />INNOVATION</h1>

            <p>
              Discover the new Roetz Life e-bike in our Fair Factory in Amsterdam. The sneak peek includes a closer look at the 3D-printed e-bike model and a test ride on one of our latest prototypes.
            </p>
          </div>
        </div>

        <div className="why-choose-us">
          <div className="why-text">
            <p className="section-number content__title-about1" data-splitting data-effect8>
              <span>/03 WHY CHOOSE US</span>
            </p>
            <h2>INNOVATIVE ELECTRIC BIKES FOR A BETTER TOMORROW!</h2>
          </div>
          <div className="why-icons">
            <div className="icon-item animate-on-scroll">
              <div className="icon-frame">
                {/* <img className="vector" src="./src/pages/assets/Leaf.svg" alt="Icon" /> */}
                <img src={Leaf} className='about-vector' alt="Icon" />
              </div>
              <div className="icon-text ">
                <h3>SUSTAINABLE FUTURE</h3>
                <p>Creating eco-friendly bikes for a better tomorrow.</p>
              </div>
            </div>
            <div className="icon-item animate-on-scroll">
              <div className="icon-frame">
                {/* <img className="vector" src="./src/pages/assets/Speedometer.svg" alt="Icon" /> */}
                <img src={Speedometer} className='about-vector' alt="Icon" />
              </div>
              <div className="icon-text">
                <h3>HIGH PERFORMANCE</h3>
                <p>Experience superior speed and efficiency.</p>
              </div>
            </div>
            <div className="icon-item animate-on-scroll">
              <div className="icon-frame">
                {/* <img className="vector" src="./src/pages/assets/Globe.svg" alt="Icon" /> */}
                <img src={Globe} className='about-vector' alt="Icon" />
              </div>
              <div className="icon-text">
                <h3>GLOBAL IMPACT</h3>
                <p>Proudly serving customers worldwide, from India.</p>
              </div>
            </div>
            <div className="icon-item animate-on-scroll">
              <div className="icon-frame">
                {/* <img className="vector" src="./src/pages/assets/Cycle.svg" alt="Icon" /> */}
                <img src={Cycle} className='about-vector' alt="Icon" />
              </div>
              <div className="icon-text">
                <h3>PIONEERING INNOVATION</h3>
                <p>Leading advancements in electric bike technology.</p>
              </div>
            </div>
            <div className="icon-item animate-on-scroll">
              <div className="icon-frame">
                {/* <img className="vector" src="./src/pages/assets/Demand.svg" alt="Icon" /> */}
                <img src={Demand} className='about-vector' alt="Icon" />
              </div>
              <div className="icon-text ">
                <h3>GROWING DEMAND</h3>
                <p>Positioned to capture the expanding market for electric bikes with our innovative and high-performing products.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="image-text-container">
          {/* <img src="./src/pages/assets/Mercelline.png" alt="Mercelline" className="mercelline-image" /> */}
          <img src={EBike2} className='mercelline-image' alt="mercelline-image" />
          <div className="overlay-text">
            <p>
              “EMBRACE THE THRILL GUILT-FREE WITH THE ELECTRIC SUPERBIKE. <br />
              EXPERIENCE <span className="highlight">POWERFUL SPEED AND ECO-FRIENDLY</span> DESIGN. CONQUER THE ROAD AND REDUCE YOUR CARBON FOOTPRINT WITH MERCELLENIE”
            </p>
          </div>
        </div>



        <div class="milestones-section">
          <div class="section-title">
            <p class="milestone-number  content__title-about1" data-splitting data-effect8>
              <span>/04 MileStones</span>
            </p>
            <h2>A Journey of Innovation and Perseverance</h2>
          </div>
          <div class="milestones">
            <div class="milestone">
              <div class="year">/2024</div>
              <div class="milestone-text">
                <h3>Ready for Launch</h3>
                <p className='animate-on-scroll'>By February 2024, our pre-production bike passed rigorous testing. Teaser shoots wrapped up by May, and now Mercelleinie is ready to launch. From sketches to a superbike, our journey has been driven by innovation and perseverance. Every setback taught us resilience, and today, Mercelleinie stands ready to revolutionize electric mobility.</p>
              </div>
            </div>
            <div class="milestone">
              <div class="year">/2023</div>
              <div class="milestone-text">
                <h3>Major Developments</h3>
                <p className='animate-on-scroll'>In 2023, Mercelleinie focused on a pre-production superbike with a custom high-capacity battery and new chassis. After over 63 design iterations, we created a compact, high-energy battery pack. Despite setbacks like overheating, we refined the design, leading to successful tests and the start of our teaser video production.</p>
              </div>
            </div>
            <div class="milestone">
              <div class="year">/2022</div>
              <div class="milestone-text">
                <h3>Overcoming Challenges</h3>
                <p className='animate-on-scroll'>In 2022, I developed a new motor with a vendor and improved the prototype by removing the bulky CVT system. Reuniting with my former teammate, Sanjidth, we focused on a direct drive motor, reducing weight and enhancing performance. This year was crucial for overcoming obstacles and refining the design.</p>
              </div>
            </div>
            <div class="milestone">
              <div class="year">/2021</div>
              <div class="milestone-text">
                <h3>Gaining Momentum</h3>
                <p className='animate-on-scroll'>During the 2021 lockdown, I pitched my electric motorcycle concept to my father. He supported me, allowing me to build my first prototype. Despite challenges with battery tech and components, this phase laid the groundwork for future success.</p>
              </div>
            </div>
            <div class="milestone milestone-special">
              <div class="year milestone-special-year">/2018 - 2020</div>
              <div class="milestone-text">
                <h3>Building Foundations</h3>
                <p className='animate-on-scroll'>In college, I joined the Baja team, learning vehicle dynamics and manufacturing while leading our team in competitions. The 2020 lockdown reignited my passion, inspiring me to focus on electric bikes.</p>
              </div>
            </div>


            <div class="milestone">
              <div class="year">/2017</div>
              <div class="milestone-text">
                <h3>The Spark of Inspiration</h3>
                <p>By February 2024, our pre-production bike passed rigorous testing. Teaser shoots wrapped up by May, and now Mercelleinie is ready to launch. From sketches to a superbike, our journey has been driven by innovation and perseverance. Every setback taught us resilience, and today, Mercelleinie stands ready to revolutionize electric mobility.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='footer-vector'>
          <div className="download-icons">
            <div className="download-1">
              <a
                href="https://www.linkedin.com/in/mercellenie-automotive-9a1910309/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Icon1} className="icon1" alt="Icon 1" />
              </a>
            </div>
            <div className="download-2">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={Icon2} className="icon2" alt="Icon 2" />
              </a>
            </div>
            <div className="download-3">
              <a href="https://www.instagram.com/mercellenie/" target="_blank" rel="noopener noreferrer">
                <img src={Icon3} className="icon3" alt="Icon 3" />
              </a>
            </div>
            <div className="download-4">
              <a
                href="https://www.facebook.com/profile.php?id=61565197859780"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Icon4} className="icon4" alt="Icon 4" />
              </a>
            </div>
            <div className="download">
              <a href="https://www.youtube.com/@Mercellenie" target="_blank" rel="noopener noreferrer">
                <img src={Icon5} className="icon5" alt="Icon 5" />
              </a>
            </div>
          </div>

          <div className="footer">
            <span className="mercellinie">©2024 MERCELLINIE</span>
            <span className="privacy-policy">PRIVACY POLICY</span>
            <a href="https://wings.design/" target="_blank" rel="noopener noreferrer" className="made-by-wings">
                Made by wings
              </a>
          </div>

          {/* <img src={BottomBG} className="bottombg" alt="Icon 5" /> */}

        </div>


      </div>
    </div>
  )
}

export default About