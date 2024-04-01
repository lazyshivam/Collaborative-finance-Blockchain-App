import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import AboutPage from './pages/AboutPage';
import { BASE_URL } from './config/BaseUrl';
import UserLogin from './pages/Auth/UserLogin';
import UserRegister from './pages/Auth/UserRegister';
import Welcome from './LangingPage/Welcome';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
// import dotenv from 'dotenv';
// dotenv.config()

const App = () => {
  const isLoggedIn=useSelector((state)=>state.user.isLoggedIn);
  console.log(BASE_URL)
  return (
    <div >
      <ToastContainer />
      {
        !isLoggedIn ? (<div className='bg-[#1e5b69]'>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<UserLogin />} />
            <Route path='/register' element={<UserRegister />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />


          </Routes>
        </div>) : (
          <>
            <div className="relative sm:-8 p-4 bg-[#1e5b69]  min-h-screen flex flex-row">


              <div className="sm:flex hidden mr-10 relative">
                <Sidebar />
              </div>

              <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                <Navbar />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/create-campaign" element={<CreateCampaign />} />
                  <Route path="/campaign-details/:id" element={<CampaignDetails />} />
                  <Route path='/about' element={<AboutPage />} />
                </Routes>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default App