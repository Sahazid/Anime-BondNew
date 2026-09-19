import React, { useState } from "react";
import AnimeInfo from "./AnimeInfo";
import { NavLink } from "react-router-dom";

const MainContent = ({ animeAll }) => {
  const [clickedImage, setClickedImage] = useState("");

  const handleClickedImage = (iD) => {
    setClickedImage(iD);
  };

  const animeItems = animeAll.map((anime) => {
    const poster = anime.poster;
    const name = anime.title.romaji;
    const iD = anime.anilist_id;

    return (
      <div
        className="
          relative
          overflow-hidden
          rounded-xl
          bg-gray-800
          shadow-lg
          transition
          duration-300
          hover:scale-105
          hover:-translate-y-2
          hover:shadow-2xl
        "
        key={iD || poster}
      >
        <NavLink to={`/details/${iD}`}>
          <div className="relative">
            <img
              onClick={() => handleClickedImage(iD)}
              className="
                w-full
                h-[20rem]
                object-cover
                transition
                duration-300
                hover:brightness-75
              "
              src={poster}
              alt={name}
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                w-full
                bg-black/70
                p-3
              "
            >
              <h2 className="text-lg font-bold text-white truncate">{name}</h2>
            </div>
          </div>
        </NavLink>
      </div>
    );
  });

  return (
    <>
      <div className="px-10 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Trending Anime</h1>

          <div className="mt-2 h-1 w-20 rounded-full bg-red-500"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {animeItems}
        </div>
      </div>

      {/* <AnimeInfo clickedImage={clickedImage} /> */}
    </>
  );
};

export default MainContent;
