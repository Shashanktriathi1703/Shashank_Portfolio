/* eslint-disable react/jsx-key */
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const projectRefs = useRef([]);

  useEffect(() => {
    // Fetch data from API
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);

  const handleAnimation = () => {
    gsap.fromTo(
      projectRefs.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
    );
  };

  useEffect(() => {
    if (projects.length > 0) {
      handleAnimation();
    }
  }, [projects]);

  return (
    <>
      <div>
        <div className="relative mb-12">
          <h1 className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold" style={{ background: "hsl(222.2 84% 4.9%)" }}>
            MY<span className="text-amber-500 font-extrabold drop-shadow-[4px_2px_3px_rgba(1,32,100,1)] decoration-purple-500 text-shadow-green-500 text-tubeLight-effect2">PORTFOLIO</span>
          </h1>
          <span className="absolute w-full h-1 top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
          <h1 className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold" style={{ background: "hsl(222.2 84% 4.9%)" }}>
            MY<span className="text-amber-500 font-extrabold drop-shadow-[4px_2px_3px_rgba(1,32,100,1)] decoration-purple-500 text-shadow-green-500 text-tubeLight-effect2">PROJECTS</span>
          </h1>
          <span className="absolute w-full h-1 top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {viewAll
            ? projects &&
              projects.map((element, index) => (
                <Link to={`/project/${element._id}`} key={element._id} ref={el => (projectRefs.current[index] = el)}>
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                    className='w-full h-[300px] rounded-lg ring-4 ring-slate-900 shadow-md shadow-slate-400 transition-transform duration-300 hover:scale-105'
                  />
                </Link>
              ))
            : projects &&
              projects.slice(0, 6).map((element, index) => (
                <Link to={`/project/${element._id}`} key={element._id} ref={el => (projectRefs.current[index] = el)}>
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                    className='h-[300px] w-full rounded-lg ring-4 ring-slate-900 shadow-md shadow-slate-400 transition-transform duration-300 hover:scale-105'
                  />
                </Link>
              ))}
        </div>
        {projects && projects.length > 6 && (
          <div className="w-full text-center my-9">
            <Button className="w-52" onClick={() => {
              setViewAll(!viewAll);
              handleAnimation(); // Trigger animation on button click
            }}>
              {viewAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Portfolio;
