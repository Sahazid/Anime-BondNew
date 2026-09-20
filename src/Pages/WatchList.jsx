import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import userContext from "../Context/UserContext";
import { db } from "../FireBase/fireBase";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const { user } = useContext(userContext);

  useEffect(() => {
    const getWatchlist = async () => {
      if (!user) {
        setWatchlist([]);
        return;
      }

      try {
        const watchlistRef = collection(db, "users", user.uid, "watchlist");

        const q = query(watchlistRef, orderBy("addedAt", "desc"));

        const snapshot = await getDocs(q);

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

  const removeFromWatchlist = async (animeId) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "watchlist", animeId));

      setWatchlist((previousList) =>
        previousList.filter((anime) => anime.id !== animeId),
      );
    } catch (error) {
      console.error("Error removing anime:", error);
    }
  };

  return (
    <section className="px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-white text-3xl sm:text-4xl font-bold">
            My Watchlist
          </h1>

          <div className="bg-red-700 w-20 h-1 mt-3 rounded-md"></div>
        </div>

        {!user ? (
          <div className="text-center py-20">
            <h2 className="text-white text-2xl font-bold">
              Please login first
            </h2>

            <p className="text-gray-400 mt-3">Login to see your watchlist.</p>

            <NavLink
              to="/login"
              className="inline-block mt-6 bg-cyan-700 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg"
            >
              Login
            </NavLink>
          </div>
        ) : watchlist.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-white text-2xl font-bold">
              Your watchlist is empty
            </h2>

            <p className="text-gray-400 mt-3">
              Add some anime to your watchlist.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {watchlist.map((anime) => (
              <div key={anime.id} className="group">
                <NavLink to={`/details/${anime.animeId}`}>
                  <img
                    src={anime.poster}
                    alt={anime.name}
                    className="w-full h-[260px] sm:h-[300px] object-cover rounded-xl transition duration-300 group-hover:scale-105 group-hover:brightness-75"
                  />

                  <h2 className="text-white font-bold mt-3 truncate">
                    {anime.name}
                  </h2>
                </NavLink>

                <button
                  onClick={() => removeFromWatchlist(anime.id)}
                  className="w-full mt-2 bg-red-700 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Watchlist;
