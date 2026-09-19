import React, { useEffect, useState, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import AnimeSlider from "./AnimeSlider";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../FireBase/fireBase";
import userContext from "../Context/UserContext";

const Streaming = () => {
  const { id, episodeNumber } = useParams();

  const { user } = useContext(userContext);

  const [episodeData, setEpisodeData] = useState(null);
  const [animeData, setAnimeData] = useState(null);
  const [allAnime, setAllAnime] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const animeResponse = await fetch(
        `https://aniwixi.xyz/wp-json/aniwixi/v1/anilist/${id}`,
      );

      const animeResult = await animeResponse.json();
      setAnimeData(animeResult);

      const episodeResponse = await fetch(
        `https://aniwixi.xyz/wp-json/aniwixi/v1/anilist/${id}/ep/${episodeNumber}`,
      );

      const episodeResult = await episodeResponse.json();
      setEpisodeData(episodeResult);

      const animePromise = fetch(
        "https://aniwixi.xyz/wp-json/aniwixi/v1/anime",
      ).then((res) => res.json());

      const animeResultAll = await animePromise;

      setAllAnime(animeResultAll.data);
    };

    getData();
  }, [id, episodeNumber]);

  const saveToWatchHistory = async () => {
    if (!user || !animeData?.data?.info) return;

    try {
      await setDoc(
        doc(db, "users", user.uid, "watchHistory", id),
        {
          animeId: id,
          name: animeData.data.info.title.romaji,
          poster: animeData.data.info.poster,
          watchedAt: serverTimestamp(),
        },
        { merge: true },
      );

      console.log("Anime saved to watch history");
    } catch (error) {
      console.error("Error saving watch history:", error);
    }
  };

  useEffect(() => {
    saveToWatchHistory();
  }, [animeData, user]);

  const episodeLists = () => {
    return (
      <div className="flex flex-col gap-2 ">
        {animeData?.data?.episodes?.map((episode, index) => (
          <NavLink
            key={episode.episode_no || index}
            to={`/anime/${id}/episode/${episode.episode_no}`}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-sky-600 text-white"
                  : "bg-cyan-800/80 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <span className="font-medium">Episode {episode.episode_no}</span>

            <span>▶</span>
          </NavLink>
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black/50 text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src={animeData?.data?.info?.banner}
          alt=""
          className="h-full w-full blur-lg"
        />

        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Episode {episodeNumber}
          </h1>

          {animeData?.data?.info?.title?.romaji && (
            <p className="mt-1 text-sm text-gray-400 sm:text-base">
              {animeData.data.info.title.romaji}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          {/* Video */}
          <div className="order-1">
            <div className="overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10">
              {episodeData?.data?.player_data?.embed_url ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={
                      episodeData.data.player_data.embed_url +
                      "?autoplay=1&mute=1"
                    }
                    className="h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                    allowFullScreen
                    title={`Episode ${episodeNumber}`}
                  />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center">
                  <p className="text-gray-400">Loading video...</p>
                </div>
              )}
            </div>
          </div>

          {/* Episode List */}
          <div className="order-2 overflow-hidden rounded-xl bg-gray/60 shadow-xl ring-1 ring-white/10 backdrop-blur-md">
            <div className="border-b border-white/10 px-4 py-4">
              <h2 className="text-lg font-bold">Episodes</h2>

              <p className="text-sm text-gray-400">
                {animeData?.data?.episodes?.length || 0} episodes
              </p>
            </div>

            <div className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 p-3">
              {episodeLists()}
            </div>
          </div>
        </div>

        <AnimeSlider allAnime={allAnime} />
      </div>
    </div>
  );
};

export default Streaming;
