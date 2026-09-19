import React, { use, useEffect, useState } from "react";
import LogoPng from './heroImage/Logo.png'
import LogoBgRemoved from './heroImage/LogoBgRemoved.png'

import MainContent from "./MainContent";

const Hero = ({ animePromise }) => {
  const animeData = use(animePromise);
  const animeAll = animeData.data;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!animeAll || animeAll.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animeAll.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [animeAll]);

  const currentAnime = animeAll[currentIndex];
  // console.log(currentAnime)

  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden">

        {/* Background Banner */}
        <img
          className="absolute inset-0 w-full h-full object-cover blur-lg transition-opacity-50 duration-700 ease-in-out"
          src={currentAnime?.poster}
          alt=""
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10 min-h-screen text-white flex flex-col lg:flex-row justify-center items-center lg:justify-between px-5 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-16 lg:py-10 gap-12 lg:gap-10">

          {/* Left Content */}
          <div className="flex flex-col gap-5 sm:gap-6 w-full lg:w-1/2 text-center lg:text-left">

             <div className="flex justify-center lg:justify-start items-center">
               <img className="w-[15rem] " src={LogoBgRemoved} alt="Logo" />
             </div>
            <h1 className="text-7xl font-bold">Start Watching Free </h1>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-cyan-400 filter drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
              NEW SEASON SIMULCASTS • STREAMING NOW
            </h1>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {currentAnime?.title?.english ||
                currentAnime?.title?.romaji ||
                "Start Watching Free"}
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed">
              Discover amazing anime, explore new stories, and start watching
              your favorite series for free.
            </p>

          </div>

          {/* Poster */}
          <div className="w-full  lg:w-1/2 flex justify-center lg:justify-end">

            <img
              className="w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[26rem] lg:max-w-[30rem] h-auto lg:h-[25rem] object-cover rounded-lg shadow-2xl transition-all duration-700"
              src={currentAnime?.poster}
              alt={currentAnime?.title?.english || ""}
            />

          </div>

        </div>
      </div>

      <MainContent animeAll={animeAll} />
    </>
  );
};

export default Hero;