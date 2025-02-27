import { FaMapMarkerAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaSchool } from "react-icons/fa";

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
    { text: `Nom d'établissement`, icon: FaSchool, name: "Nom_détablissement", value: schoolInfos.Nom_détablissement , type:"text"  , selectElement:false},
    { text: `Type d'établissement`, icon: FaSchool, name: "Type_détablissement", value: schoolInfos.Type_détablissement  , type:"text" ,  selectElement:true},
    { text: "Adresse", icon: FaMapMarkerAlt, name: "Adress", value: schoolInfos.Adress , type:"text" , selectElement:false },
    { text: "Adresse Email", icon: MdOutlineEmail, name: "Adresse_Email", value: schoolInfos.Adresse_Email , type:"email" , selectElement:false },
    { text: "Numéro de Téléphone", icon: FiPhone, name: "Numéro_de_Téléphone", value: schoolInfos.Numéro_de_Téléphone, type:"text" , selectElement:false },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchoolInfos((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSchoolInfos((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="flex flex-col gap-4 items-center">
      <div className="w-full">
        {labels.map((label, index) => (
         <div className="flex flex-col items-start gap-1" key={index}>
         <label>{label.text}</label>
         <div className="relative w-full">
             <label.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
             {label.selectElement ? (
             <select onChange={handleSelect} className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10">
              <option value="Primaire">Primaire</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Secondaire">Secondaire</option>

             </select>
             ) : (
              <input
             id={label.name}
             name={label.name}
             type={label.type}
             value={label.value}
             onChange={handleChange}
             placeholder="Enter value..."
             required
             className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10"
           />
             )
             }
          
         </div>
       </div>
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
