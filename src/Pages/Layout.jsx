import React from "react";
import Home from "./Home";
import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";
import AnimeInfo from "../component/AnimeInfo";
import Footer from "../component/Footer";
// import UserProvider from '../assets/component/Context/userProvider';
const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
