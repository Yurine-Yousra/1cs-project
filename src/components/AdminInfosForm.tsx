import { FiPhone, FiLock } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import InputForm from "./ui/InputForm";

const AdminInfoForm = () => {
  const labels = [
    { text: "Prénom" , icon :BsPerson},
    { text: "Nom" , icon:BsPerson },
    { text: "Numéro De Téléphone", icon: FiPhone },
    { text: "Adresse Email", icon: MdEmail },
    { text: "Mot de Passe", icon: FiLock },
    { text: "Confirmer Mot de Passe", icon: FiLock },
  ];

  return (
    <div className="flex flex-col gap-4"> 
      {labels.map((label, index) => (
        <InputForm key={index} Inputtext={label.text} InputIcon={label.icon} />
      ))}
    </div>
  );
};

export default AdminInfoForm;
