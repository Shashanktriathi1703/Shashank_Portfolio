import React, { useRef, useEffect } from "react";
import { gsap } from "gsap"; // Import GSAP
import Hero from "./sub-components/Hero";
import Timeline from "./sub-components/Timeline";
import About from "./sub-components/About";
import Skills from "./sub-components/Skills";
import Portfolio from "./sub-components/Portfolio";
import MyApps from "./sub-components/MyApps";
import Contact from "./sub-components/Contact";

const Home = () => {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const portfolioRef = useRef(null);
  const myAppsRef = useRef(null);
  const contactRef = useRef(null);
  const navItemsRef = useRef([]);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handlePageChange = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Enhanced stagger animation for navbar items on load
    gsap.to(navItemsRef.current, {
      duration: 0.6,
      opacity: 1,
      stagger: 0.5,
      ease: "back.in(1.7)", // Easing for a more dynamic effect
    });
  }, []);

  return (
    <>
      <nav className="bg-white/20 dark:bg-gray-900/20 fixed w-full z-20 top-0 start-0 border-b border-gray-200/20 dark:border-gray-600/20 backdrop-blur-sm">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src=".\src\images\file.png" className="h-12" alt="Logo" />
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {["Hero", "Timeline", "About", "Skills", "Portfolio", "MyApps", "Contact"].map((item, index) => (
                <li
                  key={item}
                  ref={(el) => (navItemsRef.current[index] = el)} // Store refs for each item
                  onClick={() => item === "About" ? scrollToAbout() : handlePageChange(eval(`${item.toLowerCase()}Ref`))}
                  className="cursor-pointer hover:text-white/80 active:text-amber-500 transition-all duration-300 ease-in-out transform hover:scale-105" // Scale on hover
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className='px-5 mt-20 sm:mt-24 md:mt-28 lg:mt-32 xl:mt-36 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14'>
        <div ref={heroRef}><Hero /></div>
        <div ref={timelineRef}><Timeline /></div>
        <div ref={aboutRef}><About /></div>
        <div ref={skillsRef}><Skills /></div>
        <div ref={portfolioRef}><Portfolio /></div>
        <div ref={myAppsRef}><MyApps /></div>
        <div ref={contactRef}><Contact /></div>
      </main>
    </>
  );
};

export default Home;
