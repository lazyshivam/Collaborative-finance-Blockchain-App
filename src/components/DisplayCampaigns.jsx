import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader, logout } from '../assets';

// import { logout } from '../service/UserSlice';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  console.log(campaigns)
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }

  
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns?.length})</h1>
      
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        { campaigns?.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {campaigns?.length > 0 && campaigns?.map((campaign) => <FundCard
          key={uuidv4()}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from "uuid";
// import FundCard from './FundCard';
// import { loader, logout } from '../assets';

// const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
//   const campaignTypes = [
//     { name: 'Social Cause', value: '0', description: '(Support a cause you care about)',image:'https://picsum.photos/200/300' },
//     { name: 'Creative Project', value: '1', description: '(Bring your artistic vision to life)',image:'https://picsum.photos/200/300' },
//     { name: 'Business Idea', value: '2', description: '(Launch your dream startup)',image:'https://picsum.photos/200/300' },
//     { name: 'Community Project', value: '3', description: '(Make a difference in your local area)',image:'https://picsum.photos/200/300' },
//     { name: 'Environmental Initiative', value: '4', description: '(Protect our planet)',image:'https://picsum.photos/200/300' },
//     { name: 'Medical Treatment', value: '5', description: '(Seek financial assistance for healthcare)',image:'https://picsum.photos/200/300' },
//     { name: 'Educational Expense', value: '6', description: '(Fund your educational goals)',image:'https://picsum.photos/200/300' },
//     { name: 'Travel Adventure', value: '7', description: '(Explore the world and share your story)',image:'https://picsum.photos/200/300' },
//     { name: 'Other', description: '(Specify a unique campaign type)',image:'https://picsum.photos/200/300' },
//   ];
//   const navigate = useNavigate();
//   const [selectedCampaignType, setSelectedCampaignType] = useState(null);

//   const handleNavigate = (campaign) => {
//     navigate(`/campaign-details/${campaign.title}`, { state: campaign })
//   }

//   const filteredCampaigns = selectedCampaignType ?
//     campaigns.filter(campaign => campaign.campaignType === selectedCampaignType) :
//     campaigns;
//   const [clicked, setClicked] = useState(false);
//   const handleCardClick = (campaignType) => {
//     setSelectedCampaignType(campaignType);
//     setClicked(!clicked);
//   }

//   return (
//     <div>
//       <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>
      
//       <div className="flex  flex-wrap mt-[20px] gap-[26px]">
//         {/* Render campaign type cards */}
//         {!clicked && campaignTypes.map(campaignType => (
//           <div  key={campaignType.value} onClick={() => handleCardClick(campaignType.value)} className="max-w-[300px]  bg-white p-4 border border-gray-300 rounded-lg cursor-pointer">
//             <img src={campaignType.image} alt={campaignType.name} className="w-56 h-56 object-cover  mb-2" />
//             <h2 className="font-semibold text-lg">{campaignType.name}</h2>
//             <p className="text-sm text-gray-600">{campaignType.description}</p>
//           </div>
//         ))}

//         {isLoading && (
//           <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
//         )}

//         {!isLoading && filteredCampaigns.length === 0 && (
//           <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
//             You have not created any campaigns yet
//           </p>
//         )}

//         {!isLoading && clicked && filteredCampaigns.length > 0 && filteredCampaigns.map((campaign) => (
//           <FundCard 
//             key={uuidv4()}
//             {...campaign}
//             handleClick={() => handleNavigate(campaign)}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default DisplayCampaigns;
