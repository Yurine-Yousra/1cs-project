import React from "react";

interface InputProps {
  Inputtext: string;
  InputIcon?: React.ElementType;
  EyeIcon?: React.ElementType;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleVisibility?: () => void; 
  onClick?: () => void;
}

const InputForm: React.FC<InputProps> = ({
  Inputtext,
  InputIcon,
  EyeIcon,
  type,
  name,
  value,
  onChange,
  onToggleVisibility,
}) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={name}>{Inputtext}</label>
      <div className="relative w-full">
        {InputIcon && (
          <InputIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          required
          onChange={onChange}
          placeholder="Enter value..."
          
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--color-yousra)] focus:border-[var(--color-yousra)] transition pl-10"

        />
        {EyeIcon && (
          <EyeIcon
            className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={onToggleVisibility} // Call function to toggle password visibility
            size={20}
          />
        )}
      </div>
    </div>
  );
};

export default InputForm;
