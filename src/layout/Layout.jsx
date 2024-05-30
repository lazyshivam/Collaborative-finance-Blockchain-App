import React from 'react';
import { useLocation } from 'react-router-dom';
// import Header from './Header';
// import Sidebar from './Sidebar';
import { Navbar, Sidebar } from '../components';

const Layout = ({ children }) => {
    const location = useLocation();
    const authRoutes = ['/login', '/forgot-password', '/reset-password', '/register', '/welcome', '/verify'];

    // Check if the current route is an authentication-related route
    const isAuthPage = authRoutes.includes(location.pathname);

    // Render layout only if it's not an authentication-related page
    if (isAuthPage) {
        return <>{children}</>;
    }

    {/* <div className="relative sm:-8 p-4 bg-[#1e5b69]  min-h-screen flex flex-row">


              <div className="sm:flex hidden mr-10 relative">
                {/* <Sidebar /> */}
    {/* </div> */ }

    {/* <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5"> */ }
    {/* <Navbar /> */ }

    return (
        <>
            <div className="relative sm:-8 p-4 dark:bg-black bg-[#1e5b69]  min-h-screen flex flex-row">
                <div className=' sm:flex hidden mr-10 relative'>
                    <Sidebar />
                </div>
                <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">'>
                    <Navbar />
                    <div className=''>{children}</div>
                </div>

            </div>
        </>
    );
};

export default Layout;
