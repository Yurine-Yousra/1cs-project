import { FiPhone, FiLock } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import InputForm from "../ui/InputForm";
import PostFunction from "../../LinkFunctions/Post";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface AdminProps {
  setDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  setAdminInfos : React.Dispatch<
  React.SetStateAction<{
        prénom: string,
        nom: string,
        phone: string,
        email: string,
        pass: string,
        confirm_pass: string,
  }>
  >;

  adminInfos : {
    prénom: string,
    nom: string,
    phone: string,
    email: string,
    pass: string,
    confirm_pass: string,
  }

   content : {
    Nom_détablissement : string,
    Type_détablissement : string ,
    Adress : string ,
    Adresse_Email : string ,
    Numéro_de_Téléphone :  string ,
    prénom: string ,
    nom:  string,
    phone: string  ,
    email: string ,
    pass:  string,
    confirm_pass: string  ,
  }


}

const AdminInfoForm: React.FC<AdminProps> = ({ setDisplayed  , adminInfos , setAdminInfos , content}) => {
 

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

 

  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminInfos((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // Use name instead of id
    }));
  };

  // Toggle function for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const labels = [
    { text: "Prénom", icon: BsPerson, type: "text", name: "prénom", value: adminInfos.prénom },
    { text: "Nom", icon: BsPerson, type: "text", name: "nom", value: adminInfos.nom },
    { text: "Numéro De Téléphone", icon: FiPhone, type: "text", name: "phone", value: adminInfos.phone },
    { text: "Adresse Email", icon: MdOutlineEmail, type: "email", name: "email", value: adminInfos.email },
    {
      text: "Mot de Passe",
      icon: FiLock,
      type: showPassword ? "text" : "password", 
      name: "pass",
      value: adminInfos.pass,
      EyeIcon: showPassword ? FaRegEye : FaRegEyeSlash, 
      onToggleVisibility: togglePasswordVisibility, 
    },
    {
      text: "Confirmer Mot de Passe",
      icon: FiLock,
      type: showPassword ? "text" : "password", 
      name: "confirm_pass",
      value: adminInfos.confirm_pass,
      EyeIcon: showPassword ? FaRegEye : FaRegEyeSlash,
      onToggleVisibility: togglePasswordVisibility,
    },
  ];

  return (
    <form className="flex flex-col gap-4" onSubmit={() => PostFunction("url" , content)}>
      <div>
        {labels.map((label, index) => (
          <InputForm
            key={index}
            Inputtext={label.text}
            InputIcon={label.icon}
            type={label.type}
            name={label.name}
            value={label.value}
            onChange={ChangeHandler}
            EyeIcon={label.EyeIcon}
            onToggleVisibility={label.onToggleVisibility} // Pass toggle function
          />
        ))}
      </div>

      <div className="w-full flex items-center justify-between">
        <button
          className="flex items-center gap-1 bg-[var(--color-secondary)] text-white py-2 rounded-[50px] px-10 cursor-pointer"
          onClick={() => setDisplayed(false)}
        >
          <span>
            <BiArrowBack />
          </span>
          Modifier
        </button>

        <button
          className="flex items-center bg-[var(--color-secondary)] text-white py-2 rounded-[50px] px-10 cursor-pointer"
        >
          Créer
        </button>
      </div>
    </form>
  );
};

export default AdminInfoForm;
