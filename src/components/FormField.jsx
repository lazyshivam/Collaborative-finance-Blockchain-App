import React from 'react';

const FormField = ({
  labelName,
  placeholder,
  inputType = 'text', // Set default input type
  isTextArea = false,
  isSelect = false,
  selectOptions = [], // Include for select fields
  value,
  handleChange,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{labelName}</span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : isSelect ? (
        <select className="py-[15px] max-w-full sm:px-[25px] px-[15px]  outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]" name="" id="" value={value} onChange={handleChange}>
          {selectOptions.map((option) => (
            <option    key={option.value} value={option.name}>
              {option.name}
              <span className='text-green-500'> {option.description}</span>
            </option>
          ))}
        </select>
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1" // Adjust step for numerical inputs as needed
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;
