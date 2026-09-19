import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Pages/Home";
import AnimeInfo from "./component/AnimeInfo";
import Layout from "./Pages/Layout";
import Streaming from "./component/Streaming";
import Login from "./Pages/Login";
import userContext from "./Context/UserContext";
import Profile from "./Pages/Profile";

// import LogoBgRemoved from './assets/component/heroImage/LogoBgRemoved.png'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "details/:id",
          element: <AnimeInfo />,
        },
        {
          path: "/anime/:id/episode/:episodeNumber",
          element: <Streaming />,
        },
        {
          path: "/anime/:id/episode/:episodeNumber",
          element: <Streaming />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
