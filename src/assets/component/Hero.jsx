import React, { use, useState } from "react";

import animePoster from "../component/heroImage/ichigo-kurosaki-5120x2880-27177.jpg";
import MainContent from "./MainContent";

const Hero = ({ animePromise }) => {
  const animeData = use(animePromise);
  const animeAll = animeData.data;
//  console.log(animeAll)

  
  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden">
  {/* Background Image */}
  <img
    className="absolute inset-0 w-full h-full object-cover"
    src={animePoster}
    alt=""
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>

  {/* Content */}
  <div className="relative z-10 min-h-screen text-white flex flex-col lg:flex-row justify-center lg:justify-between items-center px-5 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-16 lg:py-10 gap-12 lg:gap-10">

    {/* Left Content */}
    <div className="flex flex-col gap-5 sm:gap-6 w-full lg:w-1/2 text-center lg:text-left">

      <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-cyan-400 filter drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
        NEW SEASON SIMULCASTS • STREAMING NOW
      </h1>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        Start Watching Free <br className="hidden sm:block" />
        Browse Catalog
      </h1>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed">
        A dynamic video loop showcasing iconic scenes—high-octane
        battle sequences, breathtaking scenery from slice-of-life anime,
        and emotional character close-ups with a subtle dark gradient
        overlay for text legibility.
      </p>

    </div>

    {/* Right Image */}
    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
      <img
        className="w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[26rem] lg:max-w-[30rem] h-auto lg:h-[25rem] object-cover rounded-lg shadow-2xl"
        src={animePoster}
        alt=""
      />
    </div>

  </div>
</div>
     

            <MainContent animeAll={animeAll} ></MainContent>
    </>
  );
};

export default Hero;














// const [clickedImage, setClickedImage] = useState(null);

//   const handleClickedImage = (iD) => {
//     setClickedImage(iD);
//     console.log(iD);
//   };

//   console.log(animeAll);

