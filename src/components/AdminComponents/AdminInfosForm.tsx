import { FiPhone, FiLock } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import InputForm from "../ui/InputForm";
import { FormEvent, useState  , useEffect} from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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
  schoolInfos: {
    Nom_détablissement: string;
    Type_détablissement: string;
    rue:string,
    ville:string,
      région:string,
      code_postal : string,
    Adresse_Email: string;
    Numéro_de_Téléphone: string;
  };
}

const AdminInfoForm: React.FC<AdminProps> = ({ setDisplayed  , adminInfos , setAdminInfos  , schoolInfos}) => {
   const [loading , setLoading] = useState<boolean>(false)
const [error  ,  setError] = useState<boolean>(false)
const [content , setContent] = useState({})
const [message , setMessage] = useState("")
const navigate = useNavigate()

useEffect(() => {
  if(adminInfos.pass !== adminInfos.confirm_pass){
    setMessage("password mismatch")
    console.log("password mismatch")
  }
  if (
    Object.values(schoolInfos).every((value) => value.trim() !== "") &&
    Object.values(adminInfos).every((value) => value.trim() !== "")  && adminInfos.pass == adminInfos.confirm_pass
  ){
    setContent({
      school : {
        schoolName:schoolInfos.Nom_détablissement ,
        schoolType:schoolInfos.Type_détablissement ,
        schoolEmail: schoolInfos.Adresse_Email ,
        phoneNumber: schoolInfos.Numéro_de_Téléphone ,
        address: {
          street:schoolInfos.rue ,
          city:  schoolInfos.ville,
          state: schoolInfos.région ,
          postalCode:schoolInfos.code_postal ,
          country: "Algéria", 
        }
      },
      employee : {
        firstName: adminInfos.prénom ,
        lastName: adminInfos.nom ,
        email: adminInfos.email ,
        phoneNumber: adminInfos.phone,
        password: adminInfos.pass ,
        permission: 0
      }
    }) }
}, [adminInfos , schoolInfos , adminInfos.confirm_pass])


const HandleRegistration = async(e :FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)
  setError(false)
  if (!content) {
    toast.error("Formulaire incomplet !");
    return;
  }
  try{
  const response = await fetch('http://localhost:5080/api/auth/register' , {
    method:"POST",
    body:JSON.stringify(content),
    headers:{'Content-type' : "application/json"}
  })

  const json = await response.json()
  if(!response.ok){
    setLoading(false)
    setError(json.error)
  }

  if(response.ok){
    toast.success("school created succesfully")
    navigate("/login")
  }
  }
  catch(error){
    if (error instanceof Error) {
      toast.error(` ${error.message}`)
      setError(true)
  } else {
      toast.error("An unknown error occurred")
      setError(true)
}   
  }
  finally{
    setLoading(false);
}

return {loading,error}

}

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
    <form className="flex flex-col gap-4"  onSubmit={HandleRegistration}>
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
      {message && <span><FiAlertTriangle />Password missmatch</span>}

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
