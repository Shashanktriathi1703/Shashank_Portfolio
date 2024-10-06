import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const MyApps = () => {
  const [apps, setApps] = useState([]);
  const appsRef = useRef([]);

  useEffect(() => {
    // Fetch data from API
    const getMyApps = async () => {
      const { data } = await axios.get(
        "https://shashank-portfolio-6o8s.onrender.com/api/v1/softwareApplication/getall",
        { withCredentials: true }
      );
      setApps(data.softwareApplication);
    };
    getMyApps();
  }, []);

  useEffect(() => {
    // GSAP animation on scroll
    const handleScroll = () => {
      appsRef.current.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [apps]);

  return (
    <>
      <div className='w-full flex flex-col gap-8 sm:gap-12'>
        <div className="relative">
          <h1 className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold" style={{background: "hsl(222.2 84% 4.9%)"}}>
            MY<span className="text-amber-500 font-extrabold drop-shadow-[4px_2px_3px_rgba(1,32,100,1)] decoration-purple-500 text-shadow-green-500 text-tubeLight-effect2">APPS</span>
          </h1>
          <span className="absolute w-full h-1 top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8'>
          {
            apps && apps.map((item, index) => {
              return (
                <Card 
                  className="h-fit w-full p-7 flex flex-col justify-center items-center gap-3 shadow-md shadow-slate-500 opacity-0 translate-y-10 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-2 hover:border-amber-500" 
                  key={index}
                  ref={el => (appsRef.current[index] = el)} // Assign ref for GSAP
                >
                  <img src={item.svg && item.svg.url} alt={item.title} className='h-12 sm:h-24 w-auto rounded-md'/>
                  <p className='text-muted-foreground text-center text-nowrap'>{item.name}</p>
                </Card>
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default MyApps;
