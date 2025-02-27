import { MdClose, MdLockOutline, MdOutlineEmail } from "react-icons/md";
import InputForm from "./ui/InputForm";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FormEvent, useState } from "react";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };



  const labels = [
    { text: "Adresse Email", icon: MdOutlineEmail, type: "email" },
    {
      text: "Mot de passe",
      icon: MdLockOutline,
      type: showPassword ? "text" : "password",
      EyeIcon: showPassword ? FaRegEye : FaRegEyeSlash, 
      onToggleVisibility: togglePasswordVisibility, 
    },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {labels.map((label, index) => (
        <InputForm
          key={index}
          Inputtext={label.text}
          InputIcon={label.icon}
          type={label.type}
          EyeIcon={label.EyeIcon} 
          onToggleVisibility={label.onToggleVisibility} 
        />
      ))}

      <h1 className="font-poppins font-semibold text-[15px] leading-[22.5px] tracking-[0] ml-auto hover:underline cursor-pointer ">
        Forgot password?
      </h1>

      <button
        className="mt-8 flex items-center justify-center font-semibold bg-[var(--color-secondary)] text-white py-2 rounded-lg shadow-2xl shadow-[#8A8A8A] px-10 cursor-pointer font-poppins text-[20px] leading-[30px]"
      >
        Se connecter
      </button>

      <div className="flex mt-2 items-center gap-4 bg-[#F87171] text-white p-4 rounded-xl shadow-lg ">
      <MdClose className="text-white bg-[#DC2626] text-xl rounded-full " size={30} />
      <span className="font-poppins font-semibold  leading-[20px] tracking-[0]">
        Mot de passe ou adresse email incorrecte, veuillez réessayer
      </span>
    </div>
    </form>
  );
};


export default LoginForm