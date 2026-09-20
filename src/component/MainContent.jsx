import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import userContext from "../Context/UserContext";
import { db } from "../FireBase/fireBase";

const MainContent = ({ animeAll }) => {
  const [clickedImage, setClickedImage] = useState("");
  const [watchlist, setWatchlist] = useState([]);

  const { user } = useContext(userContext);

  const handleClickedImage = (iD) => {
    setClickedImage(iD);
  };

  // Get user's watchlist
  useEffect(() => {
    const getWatchlist = async () => {
      if (!user) {
        setWatchlist([]);
        return;
      }

      try {
        const watchlistRef = collection(db, "users", user.uid, "watchlist");

        const snapshot = await getDocs(watchlistRef);

        const animeList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWatchlist(animeList);
      } catch (error) {
        console.error("Error getting watchlist:", error);
      }
    };

    getWatchlist();
  }, [user]);

  // Add / Remove anime from watchlist
  const handleWatchlist = async (e, anime) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please login first to use the watchlist.");
      return;
    }

    const animeId = String(anime.anilist_id);

    const alreadyAdded = watchlist.some((item) => item.id === animeId);

    try {
      const watchlistRef = doc(db, "users", user.uid, "watchlist", animeId);

      if (alreadyAdded) {
        // Remove from watchlist
        await deleteDoc(watchlistRef);

        setWatchlist((previousList) =>
          previousList.filter((item) => item.id !== animeId),
        );

        console.log("Removed from watchlist");
      } else {
        // Add to watchlist
        const animeData = {
          animeId: animeId,
          name: anime.title.romaji,
          poster: anime.poster,
          addedAt: serverTimestamp(),
        };

        await setDoc(watchlistRef, animeData);

        setWatchlist((previousList) => [
          ...previousList,
          {
            id: animeId,
            ...animeData,
          },
        ]);

        console.log("Added to watchlist");
      }
    } catch (error) {
      console.error("Watchlist error:", error);
    }
  };

  const animeItems = animeAll.map((anime) => {
    const poster = anime.poster;
    const name = anime.title.romaji;
    const iD = String(anime.anilist_id);

    const alreadyAdded = watchlist.some((item) => item.id === iD);

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

        {/* Watchlist Button */}
        <button
          onClick={(e) => handleWatchlist(e, anime)}
          className={`absolute cursor-pointer top-3 right-3 z-10 px-3 py-2 rounded-lg text-sm font-bold transition ${
            alreadyAdded
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-cyan-600 hover:bg-cyan-700 text-white"
          }`}
        >
          {alreadyAdded ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
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
    </>
  );
};

export default MainContent;
