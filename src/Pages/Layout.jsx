import React from 'react';
import Home from './Home';
import { Outlet } from 'react-router-dom';
import NavBar from '../component/NavBar';
import AnimeInfo from '../component/AnimeInfo';
// import UserProvider from '../assets/component/Context/userProvider';
const Layout = () => {
    return (
        <div>
                   <NavBar />
            <Outlet />
            
        </div>
    );
};

export default Layout;