import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../service/UserSlice';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const dispatch = useDispatch();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  const userProfile = useSelector((state) => state.user.userData);
  console.log(userProfile);
  const handleLogout = () => {
    dispatch(logoutSuccess());

  }
  return (
    <div class="container mx-auto bg-gradient-to-r from-teal-600 to-white shadow-md rounded-lg overflow-hidden">
  <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200">
    <h2 class="text-2xl font-semibold text-gray-800">Welcome, {userProfile.name}!</h2>
    <button onClick={handleLogout} class="text-sm font-medium hover:bg-slate-300 p-3 rounded-full text-red-500 hover:text-red-600 focus:outline-none">Logout</button>
  </div>
  <div class="px-6 py-8">
    <p class="text-lg text-gray-600 pb-4">Keep up the incredible work and stay motivated! Let's make a positive impact together.</p>
    {/* <p class="text-lg mt-4 text-gray-700">Here are your amazing campaigns:</p> */}
    <DisplayCampaigns
      title="Your Impactful Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  </div>
</div>
  )
}

export default Profile