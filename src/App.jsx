import React, { useEffect } from 'react';
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
import { useSelector ,useDispatch} from 'react-redux';
import EmailVerification from './pages/Auth/EmailVerification';
import Layout from './layout/Layout';
import PrivateRoute from './route/PrivateRoute';
import { NotFoundError } from '@thirdweb-dev/sdk';
import PageNotFound from './pages/NotFoundPage';
import { loginSuccess } from './service/UserSlice';
import CampaignType from './pages/CampaignType';
// import dotenv from 'dotenv';
// dotenv.config()

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, []);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(BASE_URL)
  // className='bg-[#1e5b69]'
  return (
    <div >
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/register' element={<UserRegister />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/resend-verification' element={<EmailVerification />} />
          <Route path='/verify' element={<EmailVerification />} />

         <Route path='*'  element={<PageNotFound/>} />

          
          {/* Protected route here */}
          <Route path="/" element={<PrivateRoute />} >
            <Route index element={<CampaignType />} />
          </Route>
          <Route path="/home/:id" element={<PrivateRoute />} >
            <Route index element={<Home />} />
          </Route>

          <Route path="/profile" element={<PrivateRoute />} >
            <Route index element={<Profile />} />
          </Route>

          <Route path="/create-campaign" element={<PrivateRoute />} >
            <Route index element={<CreateCampaign />} />
          </Route>

          <Route path="/campaign-details/:id" element={<PrivateRoute />} >
            <Route index element={<CampaignDetails />} />

          </Route>

          <Route path='/about' element={<PrivateRoute />} >
            <Route index element={<AboutPage />} />
          </Route>

        </Routes>
        {/* </div>
            </div> */}
      </Layout>

    </div>
  )
}

export default App