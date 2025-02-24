interface InputProps {
  Inputtext: string;
  InputIcon?: React.ElementType;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputProps> = ({ Inputtext, InputIcon, type , name, value, onChange }) => {
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
          onChange={onChange}
          placeholder="Enter value..."
          className="border w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10"
        />
      </div>
    </div>
  );
};

export default InputForm;
