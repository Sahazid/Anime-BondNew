import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db, googleProvider } from "../FireBase/fireBase";
import userContext from "../Context/UserContext";
import { setDoc, doc } from "firebase/firestore";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

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

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `https://aniwixi.xyz/wp-json/aniwixi/v1/search?query=${search}`,
      );

      const data = await response.json();
      setResults(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnimeClick = (id) => {
    setResults([]);
    setSearch("");
    setMenuOpen(false);
    navigate(`/details/${id}`);
  };

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
    <div className="z-50 w-full sticky top-0">
      <nav className="bg-[#202125]/95 text-white px-4 sm:px-6 lg:px-10 xl:px-16 py-4">
        {/* ================= TOP NAV ================= */}
        <div className="flex justify-between items-center gap-3">
          {/* LOGO */}
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="shrink-0"
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
              Anime <span className="text-cyan-300">Bond</span>
              <span className="text-red-700">.to</span>
            </h2>
          </NavLink>

          {/* ================= DESKTOP SEARCH ================= */}
          <div className="hidden lg:flex relative flex-1 max-w-[28rem] xl:max-w-[32rem] mx-4">
            <input
              className="bg-white p-3 w-full outline-none text-black rounded-sm"
              type="search"
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
              className="ml-2 bg-cyan-400 px-4 rounded-sm flex justify-center items-center text-black"
            >
              <i className="fa-regular fa-paper-plane"></i>
            </button>

            {results.length > 0 && (
              <div className="absolute top-14 left-0 w-full h-[30rem] bg-[#202125] rounded-sm shadow-lg overflow-y-auto z-50">
                {results.map((anime) => (
                  <div
                    key={anime.anilist_id}
                    onClick={() => handleAnimeClick(anime.anilist_id)}
                    className="flex gap-3 p-3 cursor-pointer hover:bg-gray-700"
                  >
                    <img
                      src={anime.poster}
                      alt=""
                      className="w-12 h-16 object-cover rounded shrink-0"
                    />

                    <div className="min-w-0">
                      <h3 className="font-bold truncate">
                        {anime.title?.romaji}
                      </h3>

                      <p className="text-sm text-gray-400 truncate">
                        {anime.title?.english}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6 shrink-0">
            <NavLink to="/watchList">
              <h2 className="bg-cyan-800/40 px-3 py-2 rounded-sm font-bold hover:bg-cyan-500 whitespace-nowrap">
                Watch List
              </h2>
            </NavLink>

            {user ? (
              <div className="flex items-center gap-2 xl:gap-3">
                <NavLink to="/profile">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-9 h-9 xl:w-10 xl:h-10 rounded-full"
                  />
                </NavLink>

                <span className="font-bold max-w-[120px] xl:max-w-[160px] truncate">
                  {user?.displayName}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 xl:px-4 py-2 rounded-sm font-bold whitespace-nowrap"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="bg-cyan-400 px-3 xl:px-4 py-2 rounded-sm font-bold text-black whitespace-nowrap"
              >
                Sign in
              </button>
            )}
          </div>

          {/* ================= TABLET / MOBILE USER ================= */}
          <div className="lg:hidden flex items-center gap-3 ml-auto">
            {user && (
              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 min-w-0"
              >
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0"
                />

                <span className="hidden sm:block font-bold max-w-[120px] truncate">
                  {user?.displayName}
                </span>
              </NavLink>
            )}

            {/* HAMBURGER */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl w-10 h-10 flex items-center justify-center shrink-0"
            >
              {menuOpen ? (
                <i className="fa-solid fa-xmark"></i>
              ) : (
                <i className="fa-solid fa-bars"></i>
              )}
            </button>
          </div>
        </div>

        {/* ================= TABLET / MOBILE DROPDOWN ================= */}
        {menuOpen && (
          <div className="lg:hidden mt-5 border-t border-gray-700 pt-5">
            {/* SEARCH */}
            <div className="relative mb-5">
              <div className="flex gap-2">
                <input
                  className="bg-white p-3 w-full outline-none text-black rounded-sm"
                  type="search"
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
                  className="bg-cyan-400 px-4 rounded-sm text-black shrink-0"
                >
                  <i className="fa-regular fa-paper-plane"></i>
                </button>
              </div>

              {results.length > 0 && (
                <div className="absolute top-14 left-0 w-full max-h-[25rem] bg-[#202125] rounded-sm shadow-lg overflow-y-auto z-50">
                  {results.map((anime) => (
                    <div
                      key={anime.anilist_id}
                      onClick={() => handleAnimeClick(anime.anilist_id)}
                      className="flex gap-3 p-3 cursor-pointer hover:bg-gray-700"
                    >
                      <img
                        src={anime.poster}
                        alt=""
                        className="w-12 h-16 object-cover rounded shrink-0"
                      />

                      <div className="min-w-0">
                        <h3 className="font-bold truncate">
                          {anime.title?.romaji}
                        </h3>

                        <p className="text-sm text-gray-400 truncate">
                          {anime.title?.english}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* WATCHLIST */}
            <NavLink to="/watchList" onClick={() => setMenuOpen(false)}>
              <div className="bg-cyan-800/40 hover:bg-cyan-500 px-4 py-3 rounded-sm font-bold mb-4">
                <i className="fa-solid fa-bookmark mr-2"></i>
                Watch List
              </div>
            </NavLink>

            {/* USER */}
            {user ? (
              <div className="flex flex-col gap-4">
                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-12 h-12 rounded-full"
                  />

                  <div>
                    <p className="font-bold">{user?.displayName}</p>
                    <p className="text-sm text-gray-400">View Profile</p>
                  </div>
                </NavLink>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 px-4 py-3 rounded-sm font-bold w-full"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleGoogleLogin();
                  setMenuOpen(false);
                }}
                className="bg-cyan-400 px-4 py-3 rounded-sm font-bold text-black w-full"
              >
                Sign in
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
