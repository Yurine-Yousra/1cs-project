import { MdClose, MdLockOutline, MdOutlineEmail } from "react-icons/md";
import InputForm from "./ui/InputForm";
<<<<<<< HEAD
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
=======
import { FaRegEye, FaRegEyeSlash, FaSpinner } from "react-icons/fa";
>>>>>>> 5873b6e912ead1f8ca2d94159e74e465d7779eb9
import { FormEvent, useState } from "react";
import { uselogin } from "../hooks/useLogin";

export const LoginForm = () => {
<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false);
  

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


=======
  const [showPassword, setShowPassword] = useState<'password' | 'text'>('password');
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
>>>>>>> 5873b6e912ead1f8ca2d94159e74e465d7779eb9

  const labels = [
    { text: "Adresse Email", icon: MdOutlineEmail, type: "email",name:"email",value:email },
    {
      text: "Mot de passe",
      name:"password",
      icon: MdLockOutline,
<<<<<<< HEAD
      type: showPassword ? "text" : "password",
      EyeIcon: showPassword ? FaRegEye : FaRegEyeSlash, 
      onToggleVisibility: togglePasswordVisibility, 
=======
      password:password,
      type: showPassword,
      value:password,
      eyeIcon: showPassword === 'password' ? FaRegEye : FaRegEyeSlash,
      onClick: () => setShowPassword(showPassword === 'password' ? 'text' : 'password'),
>>>>>>> 5873b6e912ead1f8ca2d94159e74e465d7779eb9
    },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password" ) {
      setPassword(e.target.value);
    } };


    const {login,isLoading,err} = uselogin();
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    await login(email,password)
  
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {labels.map((label, index) => (
        <InputForm
          key={index}
          name={label.name}
          Inputtext={label.text}
          InputIcon={label.icon}
          type={label.type}
<<<<<<< HEAD
          EyeIcon={label.EyeIcon} 
          onToggleVisibility={label.onToggleVisibility} 
=======
          value={label.value}
          onChange={handleChange}
          EyeIcon={label.eyeIcon} // password field
          onClick={label.onClick} //  password field
>>>>>>> 5873b6e912ead1f8ca2d94159e74e465d7779eb9
        />
      ))}

      <h1 className="font-poppins font-semibold text-[15px] leading-[22.5px] tracking-[0] ml-auto hover:underline cursor-pointer ">
        Forgot password?
      </h1>

      <button
  type="submit"
  disabled={isLoading}
  className={`mt-8 flex items-center justify-center font-semibold ${
    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[var(--color-secondary)]"
  } text-white py-2 rounded-lg shadow-2xl shadow-[#8A8A8A] px-10 cursor-pointer font-poppins text-[20px] leading-[30px]`}
>
  {isLoading ? <span className="flex items-center gap-2">
      <FaSpinner className="animate-spin" /> Connexion en cours...
    </span> : "Se connecter"}
</button>


        {err &&   <div className="flex mt-2 items-center gap-4 bg-[#F87171] text-white p-4 rounded-xl shadow-lg ">
      <MdClose className="text-white bg-error text-xl rounded-full " size={30} />
      <span className="font-poppins font-semibold  leading-[20px] tracking-[0]">
        Mot de passe ou adresse email incorrecte, veuillez réessayer
      </span>
    </div>}
    
    </form>
  );
};


export default LoginForm