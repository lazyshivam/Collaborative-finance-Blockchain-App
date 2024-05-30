import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'
import {useLocation} from 'react-router-dom'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { state } = useLocation();
 
  
  console.log(state,"hell");
  // const { address, contract, getCampaigns } = useStateContext();

  // const fetchCampaigns = async () => {
  //   setIsLoading(true);
  //   const data = await getCampaigns();
  //   setCampaigns(data);
  //   console.log("Campaigns fetched",data)
  //   setIsLoading(false);
  // }

  // useEffect(() => {
  //   if(contract) fetchCampaigns();
  // }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={state}
    />
  )
}

export default Home