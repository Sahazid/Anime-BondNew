import React from 'react';
import Home from './Home';
import { Outlet } from 'react-router-dom';
import NavBar from '../assets/component/NavBar';
import AnimeInfo from '../assets/component/AnimeInfo';

const Layout = () => {
    return (
        <div>
                   <NavBar />
            
            <Outlet />
        </div>
    );
};

export default Layout;