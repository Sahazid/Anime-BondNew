import React from "react";
import { NavLink } from "react-router-dom";

const AnimeSlider = ({ allAnime }) => {
  return (
    <section className="mt-10">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Related Anime
        </h2>

        <div className="mt-2 h-1 w-16 rounded-full bg-red-500"></div>
      </div>

      <div className="flex gap-5 overflow-x-auto [&&::-webkit-scrollbar]:h-3 [&&::-webkit-scrollbar-thumb]:bg-gray-700 pb-5">
        {allAnime?.map((anime) => {
          const id = anime.anilist_id;
          const poster = anime.poster;
          const name = anime.title?.romaji;

          return (
            <NavLink
              key={id}
              to={`/anime/${id}/episode/1`}
              className="w-[180px] min-w-[180px] flex-shrink-0"
            >
              <div className="overflow-hidden  rounded-xl bg-gray-800 shadow-lg">

                <img
                  src={poster}
                  alt={name}
                  className="
                    h-[260px]
                    w-full
                    object-cover
                    transition
                    duration-300
                    hover:scale-105
                    hover:brightness-75
                  "
                />

                <div className="p-3">
                  <h3 className="truncate font-semibold text-white">
                    {name}
                  </h3>
                </div>

              </div>
            </NavLink>
          );
        })}
      </div>

    </section>
  );
};

export default AnimeSlider;