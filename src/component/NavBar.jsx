import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { auth, db, googleProvider } from "../FireBase/fireBase";
import userContext from "../Context/UserContext";
import { setDoc, doc } from "firebase/firestore";
const NavBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({});

  // Context Child
  const { user, setUser } = useContext(userContext);

  const auth = getAuth();

  const authentic = async (user) => {
    if (!user) return;

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        { merge: true },
      );

      console.log("User stored in Firestore");
    } catch (error) {
      console.error("Error storing user:", error);
    }
  };

  // console.log(user);
  const navigate = useNavigate();

  // Handeling Search
  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `https://aniwixi.xyz/wp-json/aniwixi/v1/search?query=${search}`,
      );

      const data = await response.json();

      //   console.log(data);

      setResults(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Checking Poster
  const handleAnimeClick = (id) => {
    setResults([]);
    setSearch("");

    navigate(`/details/${id}`);
  };

  // Google PopUp
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      await authentic(user);

      console.log("Logged in:", user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    <div className=" z-50 w-full sticky top-0">
      <nav className="sm:pl-4 sm:pr-4 bg-[#202125]/50 pt-4 pb-4 text-white flex justify-between items-center lg:pl-16 lg:pr-16">
        <div className="flex gap-1 justify-start lg:flex lg:gap-10 lg:justify-center lg:items-center">
          <NavLink to="/" className="text-md lg:text-2xl">
            <h2 className="flex text-md">
              Anime <span className="text-cyan-200">Bond</span>.to
            </h2>
          </NavLink>

          <div className="relative flex">
            <div>
              <input
                className="hidden md:flex lg:flex bg-white p-1 pt-3 pb-3 w-[25rem] outline-none text-black rounded-sm  border-cyan-800"
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
            </div>

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
                      <h3 className="font-bold">{anime.title?.romaji}</h3>

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

        {/* WatchList  */}
        <div>
          <NavLink to="watchList">
            <h2 className="bg-cyan-800/40 pr-3 pl-3 pt-2 pb-2 rounded-sm font-bold hover:bg-cyan-500 cursor-pointer">
              Watch List
            </h2>
          </NavLink>
        </div>

        {/* Button and User Profile */}
        <div className="sm:pr-5 flex gap-10 items-center ">
          {user ? (
            <div className="flex items-center gap-3">
              <NavLink to="/profile">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </NavLink>

              <span className="font-bold">{user?.displayName}</span>

              <div>
                <NavLink to="/">
                  <button
                    className="cursor-pointer bg-red-500 pt-2 pl-4 pb-2 pr-4 text-[1rem] rounded-sm font-bold "
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </NavLink>
              </div>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="bg-cyan-400 pt-2 pb-2 pl-4 pr-4 text-[1em] rounded-sm font-bold cursor-pointer"
            >
              sign in
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
