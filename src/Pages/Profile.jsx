import React, { useEffect, useState } from "react";
import { useContext } from "react";
import userContext from "../Context/UserContext";

const Profile = () => {
  const [watchedAnime, setWatchedAnime] = useState(null);
  useEffect(() => {
    const getDatas = async () => {
      const animePromises = fetch(
        "https://aniwixi.xyz/wp-json/aniwixi/v1/anime",
      ).then((res) => res.json());

      const animeResults = await animePromises;

      setWatchedAnime(animeResults.data);
    };
    getDatas();
  }, []);

  const { user, setUser } = useContext(userContext);
  console.log(user?.displayName);
  return (
    <section className="px-4">
      {" "}
      {/* Added horizontal padding so the container doesn't touch screen edges on mobile */}
      {/* User Info */}
      <div className="border-[1px] border-gray-800 rounded-lg p-5 max-w-7xl mx-auto h-full mt-10">
        {/* Changed static p-20 to responsive p-6 sm:p-12 lg:p-20, and forced flex-col on mobile switching to flex-row (lg:flex) */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-around w-full p-6 sm:p-12 lg:p-20 border-b-[7px] rounded-lg border-cyan-900 mb-4 gap-10 lg:gap-0">
          {/* Aligned items correctly centered on mobile, column stacked on large screens */}
          <div className="space-y-4 sm:space-y-8 flex flex-col items-center">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover"
            />

            <h1 className="text-2xl sm:text-3xl text-white text-center">
              {user?.displayName}
            </h1>
          </div>

          {/* Changed hardcoded w-[20rem] to max-w-xs and centered text elements on mobile */}
          <div className="list-none text-white space-y-4 text-center lg:text-left w-full max-w-xs">
            <h2 className="text-white text-xl sm:text-2xl">
              Most Watched Genres
            </h2>
            {/* Cleaned up flex rules to wrap tags nicely from small screens upwards */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 text-[1rem] font-bold">
              <li className="p-3 bg-cyan-700 rounded-md text-center">Action</li>
              <li className="p-3 bg-cyan-700 rounded-md text-center">Isakai</li>
              <li className="p-3 bg-cyan-700 rounded-md text-center">
                OverPower
              </li>
            </div>
            <div className="text-[1.3em]">Year : 2026</div>
          </div>
        </div>

        {/* Slide Anime View */}
        <div>
          <div className="mb-5">
            <h1 className="text-white text-2xl sm:text-3xl font-bold">
              Watched Anime
            </h1>
            <div className="bg-red border-2 border-red-700 w-[5rem] mt-2 rounded-md"></div>
          </div>

          <div className="h-[280px] flex justify-start items-center overflow-x-auto [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-thumb]:bg-gray-400 overflow-y-hidden gap-4 pb-2">
            {watchedAnime?.map((anim, index) => {
              const postterr = anim?.poster;

              return (
                <img
                  key={index}
                  className="h-[260px] w-44 sm:w-48 flex-shrink-0 rounded-2xl
                    object-cover
                    transition
                    duration-1000
                    hover:scale-110
                    hover:brightness-75"
                  src={postterr}
                  alt=""
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
