import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import userContext from "../Context/UserContext";

import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "../FireBase/fireBase";

const Profile = () => {
  const [watchedAnime, setWatchedAnime] = useState([]);

  const { user } = useContext(userContext);

  useEffect(() => {
    const getWatchHistory = async () => {
      if (!user) {
        setWatchedAnime([]);
        return;
      }

      try {
        const watchHistoryRef = collection(
          db,
          "users",
          user.uid,
          "watchHistory",
        );

        const q = query(watchHistoryRef, orderBy("watchedAt", "desc"));

        const snapshot = await getDocs(q);

        const history = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWatchedAnime(history);
      } catch (error) {
        console.error("Error getting watch history:", error);
      }
    };

    getWatchHistory();
  }, [user]);

  console.log(user?.displayName);
  console.log("Watched Anime:", watchedAnime);

  return (
    <section className="px-4">
      {/* User Info */}
      <div className="border-[1px] border-gray-800 rounded-lg p-5 max-w-7xl mx-auto h-full mt-10">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-around w-full p-6 sm:p-12 lg:p-20 border-b-[7px] rounded-lg border-cyan-900 mb-4 gap-10 lg:gap-0">
          {/* User Image and Name */}
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

          {/* Most Watched Genres */}
          <div className="list-none text-white space-y-4 text-center lg:text-left w-full max-w-xs">
            <h2 className="text-white text-xl sm:text-2xl">
              Most Watched Genres
            </h2>

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

        {/* Watched Anime Slide */}
        <div>
          <div className="mb-5">
            <h1 className="text-white text-2xl sm:text-3xl font-bold">
              Watched Anime
            </h1>

            <div className="bg-red border-2 border-red-700 w-[5rem] mt-2 rounded-md"></div>
          </div>

          {/* Anime Slider */}
          <div className="h-[280px] flex justify-start items-center overflow-x-auto [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-thumb]:bg-gray-400 overflow-y-hidden gap-4 pb-2">
            {watchedAnime.length > 0 ? (
              watchedAnime.map((anime) => (
                <NavLink
                  key={anime.id}
                  to={`/details/${anime.animeId}`}
                  className="flex-shrink-0"
                >
                  <div className="w-44 sm:w-48">
                    <img
                      className="
                        h-[260px]
                        w-44
                        sm:w-48
                        rounded-2xl
                        object-cover
                        transition
                        duration-1000
                        hover:scale-110
                        hover:brightness-75
                      "
                      src={anime.poster}
                      alt={anime.name}
                    />

                    <h2 className="text-white font-bold mt-2 truncate">
                      {anime.name}
                    </h2>
                  </div>
                </NavLink>
              ))
            ) : (
              <p className="text-gray-400">
                You haven't watched any anime yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
