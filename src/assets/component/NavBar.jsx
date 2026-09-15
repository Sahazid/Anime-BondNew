import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `https://aniwixi.xyz/wp-json/aniwixi/v1/search?query=${search}`
      );

      const data = await response.json();

    //   console.log(data);

      setResults(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnimeClick = (id) => {
    setResults([]);
    setSearch("");

    navigate(`/details/${id}`);
  };

  return (
    <div className=" z-50 w-full sticky top-0">
      <nav className="bg-[#202125]/50 pt-4 pb-4 text-white flex justify-between items-center pl-16 pr-16">

        <div className="flex gap-10 justify-center items-center">

          <div className="text-2xl">
            <i className="fa-solid fa-bars"></i>
          </div>

          <NavLink to="/" className="text-2xl">
            Anime <span className="text-cyan-200">Bond</span>.to
          </NavLink>

          <div className="relative flex">

            <input
              className="hidden md:flex lg:flex bg-white p-1 pt-3 pb-3 w-[25rem] outline-none text-black rounded-sm hover:border-3 border-cyan-800"
              type="search"
              name="search"
              id="search-btn"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button
              onClick={handleSearch}
              className="hidden md:flex lg:flex ml-4 bg-cyan-400 pt-1 pb-1 pl-3 pr-3 rounded-sm flex justify-center items-center"
            >
              <i className="fa-regular fa-paper-plane"></i>
            </button>

            {results.length > 0 && (
              <div className="absolute top-14 left-0 w-[29rem] h-[30rem] bg-[#202125]/50 rounded-sm shadow-lg overflow-y-scroll">

                {results.map((anime) => (
                  <div
                    key={anime.anilist_id}
                    onClick={() => handleAnimeClick(anime.anilist_id)}
                    className="flex gap-3 p-3 cursor-pointer hover:bg-gray-700"
                  >

                    <img
                      src={anime.poster}
                      alt=""
                      className="w-12 h-16 object-cover rounded"
                    />

                    <div>
                      <h3 className="font-bold">
                        {anime.title?.romaji}
                      </h3>

                      <p className="text-sm text-gray-400">
                        {anime.title?.english}
                      </p>
                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

        <div className="flex gap-10 items-center">

          <div className="text-2xl hidden md:flex lg:flex">
            <i className="fa-solid fa-shuffle"></i>
          </div>

          <button className="bg-cyan-400 pt-2 pb-2 pl-4 pr-4 text-[1em] rounded-sm font-bold">
            Login
          </button>

        </div>

      </nav>
    </div>
  );
};

export default NavBar;