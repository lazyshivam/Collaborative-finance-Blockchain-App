import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const campaignTypes = [
    { name: 'Social Cause', value: '0', description: '(Support a cause you care about)' },
    { name: 'Creative Project', value: '1', description: '(Bring your artistic vision to life)' },
    { name: 'Business Idea', value: '2', description: '(Launch your dream startup)' },
    { name: 'Community Project', value: '3', description: '(Make a difference in your local area)' },
    { name: 'Environmental Initiative', value: '4', description: '(Protect our planet)' },
    { name: 'Medical Treatment', value: '5', description: '(Seek financial assistance for healthcare)' },
    { name: 'Educational Expense', value: '6', description: '(Fund your educational goals)' },
    { name: 'Travel Adventure', value: '7', description: '(Explore the world and share your story)' },
    { name: 'Other', description: '(Specify a unique campaign type)' },
  ];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
    campaignType: campaignTypes[0].name, // Set default campaign type
    otherCampaignType: '' // New state to store other campaign type
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form,"form data before submission");
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide a valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  const handleCampaignTypeChange = (e) => {
    const selectedCampaignType = e.target.value;
    if (selectedCampaignType === 'Other') {
      setForm({ ...form, campaignType: selectedCampaignType });
    } else {
      setForm({ ...form, campaignType: selectedCampaignType, otherCampaignType: '' });
    }
  };

  return (
    <div className="bg-[#ffffff] dark:bg-black shadow-lg flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>
        <FormField
          labelName="Campaign Type *"
          inputType="select"
          isSelect
          value={form.campaignType}
          selectOptions={campaignTypes}
          handleChange={(e) => handleCampaignTypeChange(e)}
        />
        {form.campaignType === 'Other' && (
          <FormField
            labelName="Specify Other Campaign Type *"
            placeholder="Specify other campaign type"
            inputType="text"
            value={form.otherCampaignType}
            handleChange={(e) => handleFormFieldChange('otherCampaignType', e)}
          />
        )}
        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
