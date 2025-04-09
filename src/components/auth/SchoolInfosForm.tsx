import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import { useEffect, useState } from "react";
import { RiSchoolLine, RiBookOpenLine } from "react-icons/ri";
import { FaCity } from "react-icons/fa"; // Icône pour Ville
import { MdOutlineMap } from "react-icons/md"; // Icône pour Région
import { FaMapPin } from "react-icons/fa"; // Icône pour Code postal

interface SchoolProps {
  setDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  setSchoolInfos: React.Dispatch<
    React.SetStateAction<{
      Nom_détablissement: string;
      Type_détablissement: string;
      rue:string,
      ville:string,
      région:string,
      code_postal : string,
      Adresse_Email: string;
      Numéro_de_Téléphone: string;
    }>
  >;
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

const SchoolInfoForm: React.FC<SchoolProps> = ({ setDisplayed, setSchoolInfos, schoolInfos }) => {
  const [state , setState] = useState([""])
  const [wilaya , setWilaya] = useState<string>("Oran")
  const codesPostauxAlgerie = [
    {
      wilaya: "Adrar",
      codePostal: "01000",
      regions: ["Adrar", "Reggane", "Timimoun", "Aoulef", "Zaouiet Kounta"]
    },
    {
      wilaya: "Chlef",
      codePostal: "02000",
      regions: ["Chlef", "Ténès", "Oued Fodda", "El Karimia", "Ouled Fares"]
    },
    {
      wilaya: "Laghouat",
      codePostal: "03000",
      regions: ["Laghouat", "Aflou", "Brida", "Hassi R'Mel", "El Assafia"]
    },
    {
      wilaya: "Oum El Bouaghi",
      codePostal: "04000",
      regions: ["Oum El Bouaghi", "Aïn Beida", "Aïn M'lila", "Sigus", "F'kirina"]
    },
    {
      wilaya: "Batna",
      codePostal: "05000",
      regions: ["Batna", "Barika", "Merouana", "Arris", "Timgad"]
    },
    {
      wilaya: "Béjaïa",
      codePostal: "06000",
      regions: ["Béjaïa", "Akbou", "Kherrata", "Seddouk", "Amizour"]
    },
    {
      wilaya: "Biskra",
      codePostal: "07000",
      regions: ["Biskra", "Tolga", "El Kantara", "Ouled Djellal", "Sidi Khaled"]
    },
    {
      wilaya: "Béchar",
      codePostal: "08000",
      regions: ["Béchar", "Kenadsa", "Béni Abbès", "Taghit", "Abadla"]
    },
    {
      wilaya: "Blida",
      codePostal: "09000",
      regions: ["Blida", "Boufarik", "El Affroun", "Mouzaïa", "Bouinan"]
    },
    {
      wilaya: "Bouira",
      codePostal: "10000",
      regions: ["Bouira", "Lakhdaria", "Sour El Ghozlane", "Haizer", "El Hachimia"]
    },
    {
      wilaya: "Tamanrasset",
      codePostal: "11000",
      regions: ["Tamanrasset", "Abalessa", "In Guezzam", "In Salah", "Tazrouk"]
    },
    {
      wilaya: "Tébessa",
      codePostal: "12000",
      regions: ["Tébessa", "Bir El Ater", "Cheria", "El Ogla", "Morsott"]
    },
    {
      wilaya: "Tlemcen",
      codePostal: "13000",
      regions: ["Tlemcen", "Maghnia", "Nedroma", "Remchi", "Ghazaouet"]
    },
    {
      wilaya: "Tiaret",
      codePostal: "14000",
      regions: ["Tiaret", "Frenda", "Sougueur", "Mahdia", "Dahmouni"]
    },
    {
      wilaya: "Tizi Ouzou",
      codePostal: "15000",
      regions: ["Tizi Ouzou", "Draa Ben Khedda", "Azeffoun", "Boghni", "Freha"]
    },
    {
      wilaya: "Alger",
      codePostal: "16000",
      regions: ["Alger-Centre", "Bab El Oued", "Kouba", "Hussein Dey", "El Harrach"]
    },
    {
      wilaya: "Djelfa",
      codePostal: "17000",
      regions: ["Djelfa", "Messaad", "Aïn Oussera", "El Idrissia", "Hassi Bahbah"]
    },
    {
      wilaya: "Jijel",
      codePostal: "18000",
      regions: ["Jijel", "Taher", "El Milia", "Chekfa", "Sidi Abdelaziz"]
    },
    {
      wilaya: "Sétif",
      codePostal: "19000",
      regions: ["Sétif", "El Eulma", "Aïn Oulmene", "Bougaa", "Guidjel"]
    },
    {
      wilaya: "Saïda",
      codePostal: "20000",
      regions: ["Saïda", "El Hassasna", "Youb", "Aïn El Hadjar", "Ouled Khaled"]
    },
    {
      wilaya: "Oran",
      codePostal: "31000",
      regions: ["Oran", "Es Senia", "Bir El Djir", "Aïn Turk", "Boutlelis"]
    },
    {
      wilaya: "Constantine",
      codePostal: "25000",
      regions: ["Constantine", "El Khroub", "Aïn Smara", "Hamma Bouziane", "Didouche Mourad"]
    },
    {
      wilaya: "Médéa",
      codePostal: "26000",
      regions: ["Médéa", "Berrouaghia", "Ouzera", "El Omaria", "Tablat"]
    },
    {
      wilaya: "Mostaganem",
      codePostal: "27000",
      regions: ["Mostaganem", "Aïn Tédelès", "Hassi Mameche", "Bouguirat", "Kheireddine"]
    },
    {
      wilaya: "Ouargla",
      codePostal: "30000",
      regions: ["Ouargla", "Touggourt", "Hassi Messaoud", "N'Goussa", "El Borma"]
    },
    {
      wilaya: "Ghardaïa",
      codePostal: "47000",
      regions: ["Ghardaïa", "Berriane", "Metlili", "El Atteuf", "Daya Ben Dahoua"]
    },
    {
      wilaya: "El Oued",
      codePostal: "39000",
      regions: ["El Oued", "Robbah", "Guemar", "Debila", "Taleb Larbi"]
    },
    {
      wilaya: "Relizane",
      codePostal: "48000",
      regions: ["Relizane", "Zemmoura", "Oued Rhiou", "Mazouna", "Sidi Khettab"]
    }
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

  const handleSelectWilaya = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSchoolInfos((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setWilaya(e.target.value)
    
  };


  useEffect(() => {
    const selectedwilaya = codesPostauxAlgerie.find((element) => element.wilaya === wilaya)
    setState(selectedwilaya ? selectedwilaya.regions : [])
  } , [wilaya])
  

  return (
    <form className="flex flex-col gap-4 items-center">
      <div className="w-full  flex flex-col gap-2">
      <div className="flex flex-col items-start gap-1" >
  <label htmlFor="Nom_détablissement" className="text-sm font-medium text-gray-700">
  {`Nom d'établissement`}
  </label>
  <div className="relative w-full">
      <RiSchoolLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    <input
      name="Nom_détablissement"
      type="text"
      value={schoolInfos.Nom_détablissement}
      onChange={handleChange}
      placeholder="Entez le nom de votre établissement"
      required
      className="w-full rounded-md h-[45px] border-2 border-gray-400 focus:border-[var(--color-secondary)] focus:outline-none pl-10"
    />
  </div>
</div>
<div className="flex flex-col items-start gap-1" >
  <label htmlFor="Type_détablissement" className="text-sm font-medium text-gray-700">
    {`Type d'établissement`}
  </label>
  <div className="relative w-full">
      <RiBookOpenLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    <select
      onChange={handleSelect}
      className="w-full rounded-md h-[45px] border-2 border-gray-400 focus:border-[var(--color-secondary)] focus:outline-none pl-10"
      name="Type_détablissement"
      required
      id="Type_détablissement"
      value={schoolInfos.Type_détablissement}
    >
      <option value="Primaire">Primaire</option>
      <option value="Moyenne">Moyenne</option>
      <option value="Secondaire">Secondaire</option>
    </select>
  </div>
</div>
<div className="flex flex-col items-start gap-1" >
  <label htmlFor="rue" className="text-sm font-medium text-gray-700">
  Rue
  </label>
  <div className="relative w-full">
  <BiMap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

    <input
      name="rue"
      type="text"
      value={schoolInfos.rue}
      onChange={handleChange}
      placeholder="Enter value..."
      required
      className="w-full rounded-md h-[45px] border-2 border-gray-400 focus:border-[var(--color-secondary)] focus:outline-none pl-10"
    />
  </div>
</div>


<div  className="flex flex-row w-full justify-between pt-4 gap-2">
<div className="flex flex-col items-start gap-1" >
  <label htmlFor="ville" className="text-sm font-medium text-gray-700">
    Ville
  </label>
  <div className=" relative w-full">    
  <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

    <select
      onChange={handleSelectWilaya}
      className="w-full text-[14px] rounded-md h-[45px] border-2 border-gray-400 focus:border-[var(--color-secondary)] focus:outline-none pl-10"
      name="ville"
      required
      id="ville"
      value={schoolInfos.ville}
    >
      {codesPostauxAlgerie?.map((element , index) => (
        <option 
        value={element.wilaya}
         key={index}
         className="text-[12px]"
         >{element.wilaya}</option>
      ))}
      
    </select>
  </div>
</div>

<div className="flex flex-col items-start gap-1" >
  <label htmlFor="région" className="text-sm font-medium text-gray-700">
    Région
  </label>
  <div className="relative w-full">  
  <MdOutlineMap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    <select
      onChange={handleSelect}
      className="w-full text-[14px]  rounded-md h-[45px] border-2 border-gray-400 focus:border-[var(--color-secondary)] focus:outline-none pl-10"
      name="région"
      required
      id="région"
      value={schoolInfos.région}
    >
      {state?.map((element , index) => (
        <option value={element} key={index}>{element}</option>
      ))}
    </select>
    
  </div>
</div>


<div className="flex flex-col items-start gap-1" >
  <label htmlFor="code_postal" className="text-sm font-medium text-gray-700">
    Code Postal
  </label>
  <div className="relative w-full">
  <FaMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    
      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
  
      <select
      onChange={handleSelect}
      className="w-full text-[14px]  rounded-md h-[45px] border-2 border-gray-400 focus:border-[var(--color-secondary)] focus:outline-none pl-10"
      name="code_postal"
      required
      id="code_postal"
      value={schoolInfos.code_postal}
    >
      {codesPostauxAlgerie?.map((element , index) => (
        <option value={element.codePostal} key={index}>{element.codePostal}</option>
      ))}
      
    </select>
  </div>
</div>

</div>

<div className="flex flex-col items-start gap-1" >
  <label htmlFor="" className="text-sm font-medium text-gray-700">
  Adresse Email
  </label>
  <div className="relative w-full">
      <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    <input
      name="Adresse_Email"
      type="email"
      value={schoolInfos.Adresse_Email}
      onChange={handleChange}
      placeholder="Enter value..."
      required
      className="w-full rounded-md h-[45px] border-2 border-gray-400 focus:border-[var(--color-secondary)] focus:outline-none pl-10"
    />
  </div>
</div>



<div className="flex flex-col items-start gap-1" >
  <label htmlFor="" className="text-sm font-medium text-gray-700">
  Numéro de Téléphone
  </label>
  <div className="relative w-full">
      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    <input
      name="Numéro_de_Téléphone"
      type="text"
      value={schoolInfos.Numéro_de_Téléphone}
      onChange={handleChange}
      placeholder="Enter value..."
      required
      className="w-full rounded-md h-[45px] border-2 border-gray-400 focus:border-[var(--color-secondary)] focus:outline-none pl-10"
    />
  </div>
</div>

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







