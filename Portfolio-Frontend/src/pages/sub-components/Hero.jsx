import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  ExternalLinkIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  PictureInPictureIcon,
  Twitter,
  YoutubeIcon,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const Hero = () => {
  const [user, setUser] = useState({});
  const heroRef = useRef(null);

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/me/portfolio",
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);

  const animateHero = () => {
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1 }
    );
  };

  useEffect(() => {
    animateHero();
  }, []);

  return (
    <div className="w-full" ref={heroRef}>
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>

      <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4">
        👋Hey, I am{" "}
        <span className="drop-shadow-[4px_2px_3px_rgba(1,32,100,1)] decoration-purple-500 text-amber-500 font-bold">
          {user.fullName || "Loading..."}
        </span>
      </h1>

      <h1 className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
        sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]">
        <Typewriter
          words={[
            "FULLSTACK DEVELOPER",
            "FRONTEND DEVELOPER",
            "BACKEND DEVELOPER",
            "YOUTUBER",
            "FREELANCER",
          ]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 items-center mt-4 md:mt-8 lg:mt-10 shadow-sm shadow-blue-500">
        <Link to={"/"} target="_blank" className="transition-transform duration-300 transform hover:scale-110">
          <YoutubeIcon className="text-red-500 w-8 h-8 hover:bg-red-500 hover:text-white rounded-md shadow-md hover:shadow-red-300" />
        </Link>
        <Link to={user.instagramURL} target="_blank" className="transition-transform duration-300 transform hover:scale-110">
          <InstagramIcon className="text-pink-500 w-8 h-8 hover:bg-pink-500 hover:text-white rounded-md shadow-md hover:shadow-pink-300" />
        </Link>
        <Link to={user.pinterestURL} target="_blank" className="transition-transform duration-300 transform hover:scale-110">
          <PictureInPictureIcon className="text-red-700 w-8 h-8 hover:bg-red-700 hover:text-white rounded-md shadow-md hover:shadow-red-300" />
        </Link>
        <Link to={user.facebookURL} target="_blank" className="transition-transform duration-300 transform hover:scale-110">
          <FacebookIcon className="text-blue-800 w-8 h-8 hover:bg-blue-800 hover:text-white rounded-md shadow-md hover:shadow-blue-300" />
        </Link>
        <Link to={user.linkedinURL} target="_blank" className="transition-transform duration-300 transform hover:scale-110">
          <LinkedinIcon className="text-sky-600 w-8 h-8 hover:bg-sky-600 hover:text-white rounded-md shadow-md hover:shadow-sky-300" />
        </Link>
        <Link to={user.twitterURL} target="_blank" className="transition-transform duration-300 transform hover:scale-110">
          <Twitter className="text-sky-600 w-8 h-8 hover:bg-sky-600 hover:text-white rounded-md shadow-md hover:shadow-sky-300" />
        </Link>
      </div>


      <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
        <Link to={user.githubURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span><GithubIcon /></span>
            <span>GitHub</span>
          </Button>
        </Link>
        <Link to={user.resume && user.resume.url} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span><ExternalLinkIcon /></span>
            <span>Resume</span>
          </Button>
        </Link>
      </div>

      <motion.p
        className="mt-8 text-xl tracking-[2px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {user.aboutMe || "Loading bio..."}
      </motion.p>
    </div>
  );
};

export default Hero;
