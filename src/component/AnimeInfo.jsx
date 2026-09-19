import { NavLink, useParams } from "react-router-dom";
import posterr from "./heroImage/ichigo-kurosaki-5120x2880-27177.jpg";
import sukuna from "./heroImage/jujutsu-kaisen-1284x2778-27211.png";
import { use, useEffect, useState } from "react";
import Streaming from "./Streaming";

const AnimeInfo = () => {
  const { id } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchAnime = async (id) => {
    const response = await fetch(
      `https://aniwixi.xyz/wp-json/aniwixi/v1/anilist/${id}`,
    )
      .then((res) => res.json())
      .then((res) => setAnimeData(res))
      .then(() => setLoading(false));
    return response;
  };

  useEffect(() => {
    if (id) {
      fetchAnime(id);
    }
  }, [id]);
  // console.log(id)

  // console.log(animeData)

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-screen text-white text-6xl">
        Loading...
      </div>
    );

  // Episodes List

  const episodeLists = () => {
    return (
      <div className="flex flex-col gap-2">
        {animeData.data?.episodes?.map((episode, index) => (
          <NavLink
            key={episode.episode_no || index}
            to={`/anime/${id}/episode/${episode.episode_no}`}
            className="flex items-center justify-between w-full p-3 bg-gray-800/70 hover:bg-gray-700 rounded-lg transition"
          >
            <span>Episode {episode.episode_no}</span>

            <span className="text-gray-400">▶</span>
          </NavLink>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="relative min-h-screen text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover blur-lg scale-105"
            src={animeData.data.info.poster || posterr}
            alt=""
          />

          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex justify-center md:justify-start shrink-0">
                    <img
                      className="w-64 h-96 object-cover rounded-2xl shadow-2xl"
                      src={animeData.data.info.poster || sukuna}
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col gap-5 min-w-0">
                    <div className="flex flex-wrap gap-3">
                      <h3 className="text-sm font-thin px-4 py-2 bg-green-900/50 rounded-full border-2 border-green-400">
                        {animeData.data.info.status}
                      </h3>

                      <h3 className="text-sm font-thin px-4 py-2 bg-yellow-900/50 rounded-full border-2 border-yellow-400">
                        ⭐ {animeData.data.info.score}
                      </h3>

                      <h3 className="text-sm font-thin px-4 py-2 bg-gray-900/50 rounded-full border-2 border-gray-400">
                        {animeData.data.info.year}
                      </h3>

                      <h3 className="text-sm font-thin px-4 py-2 bg-gray-900/50 rounded-full border-2 border-gray-400">
                        Ep -{" "}
                        {animeData.data?.statistics?.total_episodes_available}
                      </h3>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold break-words">
                      {animeData.data.info.title.romaji}
                    </h1>

                    <h2 className="text-xl md:text-2xl">
                      {animeData.data.info.title.native}
                    </h2>

                    <h2 className="text-xl font-bold">Overview</h2>

                    <p className="text-gray-200 leading-7">
                      {animeData.data.info.synopsis ||
                        "No synopsis available for this anime"}
                    </p>

                    <h2 className="font-thin">English Title</h2>

                    <p className="text-xl md:text-2xl font-bold break-words">
                      {animeData.data.info.title.english ||
                        "No name available for this anime"}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-2xl font-bold mb-5">Characters</h2>

                  <div className="flex gap-5 overflow-auto [&&::-webkit-scrollbar]:h-2 [&&::-webkit-scrollbar-thumb]:bg-gray-400 pb-5">
                    {animeData.data?.characters?.map((character, index) => (
                      <div
                        key={character.id || index}
                        className=" flex min-w-32  bg-black/40 rounded-xl p-3"
                      >
                        <img
                          className="w-28 h-40 object-cover rounded-lg"
                          src={character.image || character.img}
                          alt={character.name || "Character"}
                        />

                        <p className="text-sm text-center mt-2 truncate">
                          {character.name || "Unknown"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-black/40 rounded-xl overflow-hidden h-fit">
                <h1 className="text-2xl p-4 text-center bg-gray-700/80">
                  All Episodes
                </h1>

                <div className="max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-transparent p-3">
                  {episodeLists()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeInfo;
