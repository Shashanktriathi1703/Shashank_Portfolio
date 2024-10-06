import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the component is in view
  });

  useEffect(() => {
    // Fetch data from API
    const getMyTimeline = async () => {
      const { data } = await axios.get(
        "https://shashank-portfolio-6o8s.onrender.com/api/v1/timeline/getall",
        { withCredentials: true }
      );
      setTimeline(data.timelines);
    };
    getMyTimeline();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 10 });
    }
  }, [controls, inView]);

  // New animation when the navbar is clicked
  const handleNavbarClick = () => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
      scale: 1.05, // Slightly scale up
    });
  };

  return (
    <>
      <div ref={ref}>
        <h1 className='overflow-x-hidden text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] mb-4 font-extrabold'>Timeline</h1>
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {timeline && timeline.map((item, index) => {
            return (
              <motion.li
                className="mb-10 ms-6"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ duration: 0.5 }}
                // whileHover={{ scale: 1.02 }} // Scale on hover
                whileTap={{ scale: 0.98 }} // Scale down on click
              >
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                  </svg>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {item.timeline.from} - {item.timeline.to ? item.timeline.to : "Present"}
                </time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">{item.description}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

export default Timeline;
