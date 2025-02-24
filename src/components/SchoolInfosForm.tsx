import { FaMapMarkerAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import InputForm from "./InputForm";


const SchoolInfoForm = () => {
   const labels = [
      { text: `Nom d'établissement` , icon :FaSchool},
      { text: `Type d'établissement` , icon:FaSchool },
      { text: "Adresse", icon: FaMapMarkerAlt }, 
      { text: "Adresse Email", icon: MdEmail },
      { text: "Numéro de Téléphone", icon: FiPhone },
    ];


  return (
                     
                     <div className="flex flex-col gap-4"> 
      {labels.map((label, index) => (
        <InputForm key={index} Inputtext={label.text} InputIcon={label.icon} />
      ))}
    </div>
   
   
   
  
   
  )
}

export default SchoolInfoForm

