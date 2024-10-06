import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const About = () => {
  const [user, setUser] = useState(null);
  const aboutRef = useRef(null); // Reference for the about section
  const imageRef = useRef(null); // Reference for the image
  const textRefs = useRef([]); // Reference for text paragraphs

  useEffect(() => {
    // Fetch data from API
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/me/portfolio",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    getMyProfile();
  }, []);

  const animateElements = () => {
    gsap.fromTo(aboutRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1 }
    );

    gsap.fromTo(imageRef.current, 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.5 }
    );

    textRefs.current.forEach((textRef, index) => {
      gsap.fromTo(textRef, 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 0.5, delay: index * 0.2 }
      );
    });
  };

  const handleScroll = () => {
    const rect = aboutRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animateElements();
      window.removeEventListener('scroll', handleScroll); // Remove listener after animation
    }
  };

  const handleNavbarClick = () => {
    animateElements();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex flex-col overflow-x-hidden" ref={aboutRef}>
      <div className="relative">
        <h1 className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold" style={{ background: "hsl(222.2 84% 4.9%)" }}>
          ABOUT <span className="text-amber-500 font-extrabold drop-shadow-[4px_2px_3px rgba(1,32,100,1)] decoration-purple-500 text-shadow-green-500 text-tubeLight-effect2">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              ref={imageRef}
              src={user?.avatar?.url}
              alt={user?.fullName}
              className="bg-white p-2 sm:p-4 h-[300px] sm:h-[340px] md:h-[350px] lg:h-[520px] max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            {["My name is Shashank Tripathi, and I completed my Bachelor of Computer Applications from Allenhouse Business School in Kanpur. I have gained valuable experience as an Open-Source Contributor in GSSOC'24, where I worked on various web development projects. Additionally, I completed an 8-week Web Development training program at Internshala, covering a wide range of web technologies.",
              "Apart from my formal education and internships, I have also worked on independent projects including Highfly Music Player, Music Extractor, and PGlife Responsive Website. My skills include proficiency in C++, C, Python, OOPs, HTML/CSS, JavaScript, SQL, React.js, Express.js, MongoDB, Next.js, and Node.js.",
              "My dedication and perseverance in timely delivery of work are integral to me. I maintain the courage to face challenges and continually strive for improvement."
            ].map((text, index) => (
              <p key={index} ref={el => textRefs.current[index] = el} className="opacity-0">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
