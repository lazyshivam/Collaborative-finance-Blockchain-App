import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loader, logout } from '../assets';
import { useStateContext } from '../context';
import crisis from '../assets/campaignType/crisis.jpg'
import bussiness from '../assets/campaignType/bussiness.jpg'
import travel from '../assets/campaignType/travel.jpg'
import other from '../assets/campaignType/others.jpg'
import education from '../assets/campaignType/educational.jpg'
import community from '../assets/campaignType/community.jpg'
import project from '../assets/campaignType/projectIdea.jpg'
import health from '../assets/campaignType/health.jpg'
import saveEarth from '../assets/campaignType/saveEarth.jpg'
// import travel from '../assets/campaignType/travel.jpg'











const CampaignType = () => {
    const navigate = useNavigate();
    const campaignTypes = [
        { name: 'Social Cause', value: '0', description: '(Support a cause you care about)', image: crisis },
        { name: 'Creative Project', value: '1', description: '(Bring your artistic vision to life)', image: project },
        { name: 'Business Idea', value: '2', description: '(Launch your dream startup)', image: bussiness },
        { name: 'Community Project', value: '3', description: '(Make a difference in your local area)', image: community },
        { name: 'Environmental Initiative', value: '4', description: '(Protect our planet)', image: saveEarth },
        { name: 'Medical Treatment', value: '5', description: '(Seek financial assistance for healthcare)', image: health },
        { name: 'Educational Expense', value: '6', description: '(Fund your educational goals)', image: education},
        { name: 'Travel Adventure', value: '7', description: '(Explore the world and share your story)', image:travel },
        { name: 'Other', description: '(Specify a unique campaign type)', image: other },
    ];
    const [selectedCampaignType, setSelectedCampaignType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const { address, contract, getCampaigns } = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();
        setCampaigns(data);
        console.log("Campaigns fetched", data)
        setIsLoading(false);
    }

    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [address, contract]);

    //   const filteredCampaigns = selectedCampaignType ?
    //   campaigns.filter(campaign => campaign.campaignType.toLowerCase().trim() === selectedCampaignType.toLowerCase().trim()) :
    //       campaigns;
    const handleCardClick = (campaignType) => {
        console.log("Card clicked", campaignType);
        setSelectedCampaignType(campaignType);
      
        const filteredCampaigns = campaigns.filter(campaign => campaign?.campaignType.toLowerCase().trim() === campaignType.toLowerCase().trim());
        const selectedCampaign = filteredCampaigns.length > 0 ? filteredCampaigns : [];
      
        console.log(selectedCampaign, "filtered applied");
        // const type = selectedCampaign.length > 0 ? selectedCampaign[0].campaignType : ""; // Handle empty type as well
        navigate(`/home/${campaignType}`, { state: selectedCampaign });
      }
      
    return (
        <div>
            {/* <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1> */}
  {/* <img src={crisis} alt="" srcset="" /> */}
            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {/* Render campaign type cards */}
                {campaignTypes.map(campaignType => (
                    <div key={campaignType.value} onClick={() => handleCardClick(campaignType.name)} className="max-w-[300px] bg-white p-4 border border-gray-300 rounded-lg cursor-pointer">
                        <img src={campaignType.image} alt={campaignType.name} className="w-full h-56 object-cover mb-2" />
                        <h2 className="font-semibold text-lg">{campaignType.name}</h2>
                        <p className="text-sm text-gray-600">{campaignType.description}</p>
                    </div>
                ))}

                {isLoading && (
                    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
                )}

                {!isLoading && campaigns.length === 0 && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                        You have not created any campaigns yet
                    </p>
                )}

            </div>
        </div>
    )
}

export default CampaignType;
