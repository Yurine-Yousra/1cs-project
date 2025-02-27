import { FaMapMarkerAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import InputForm from "./ui/InputForm";

interface SchoolProps {
  setDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  setSchoolInfos: React.Dispatch<
    React.SetStateAction<{
      Nom_détablissement: string;
      Type_détablissement: string;
      Adress: string;
      Adresse_Email: string;
      Numéro_de_Téléphone: string;
    }>
  >;
  schoolInfos: {
    Nom_détablissement: string;
    Type_détablissement: string;
    Adress: string;
    Adresse_Email: string;
    Numéro_de_Téléphone: string;
  };
}

const SchoolInfoForm: React.FC<SchoolProps> = ({ setDisplayed, setSchoolInfos, schoolInfos }) => {
  const labels = [
    { text: `Nom d'établissement`, icon: FaSchool, name: "Nom_détablissement", value: schoolInfos.Nom_détablissement },
    { text: `Type d'établissement`, icon: FaSchool, name: "Type_détablissement", value: schoolInfos.Type_détablissement },
    { text: "Adresse", icon: FaMapMarkerAlt, name: "Adress", value: schoolInfos.Adress },
    { text: "Adresse Email", icon: MdOutlineEmail, name: "Adresse_Email", value: schoolInfos.Adresse_Email },
    { text: "Numéro de Téléphone", icon: FiPhone, name: "Numéro_de_Téléphone", value: schoolInfos.Numéro_de_Téléphone },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchoolInfos((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="flex flex-col gap-4 items-center">
      <div className="w-full">
        {labels.map((label, index) => (
          <InputForm
            key={index}
            Inputtext={label.text}
            InputIcon={label.icon}
            name={label.name} 
            value={label.value} 
            onChange={handleChange} 
          />
        ))}
      </div>

      <div>
        <button
          type="button"
          className="flex items-center bg-[var(--color-secondary)] text-white py-2 rounded-[50px] px-10 cursor-pointer"
          onClick={() => setDisplayed(true)}
        >
          Suivant
        </button>
      </div>
    </form>
  );
};

export default SchoolInfoForm;
