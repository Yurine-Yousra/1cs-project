import React, { useState } from "react";
import uploadFileToCloudinary from "../../config/UploadCloudinary";

const AddTeacher = () => {
    const algerianCities = ["Alger", "Oran", "Constantine", "Annaba", "Blida", "Batna", "Sétif", "Tlemcen", "Béjaïa", "Mostaganem"];

    const matieres = ["Langue Arabe", "Langue Française", "Mathématiques", "Éducation Islamique", "Éducation Civique", "Sciences de la Nature et de la Vie", "Histoire et Géographie", "Éducation Artistique", "Éducation Physique et Sportive", "Langue Amazighe"];

    const [selectedMatieres, setSelectedMatieres] = useState<string[]>([]);
    const [fileText , setFileText] = useState("")

    const [teacher, setTeacher] = useState({
        nom: "",
        prénom: "",
        addresse: "",
        email: "",
        phone: "",
        date: "",
        lieu: "",
        diplome: "",
        date_début: "",
        salaire: "",
        matière: [] as string[],
    });

    const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    const selectionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileURL = await uploadFileToCloudinary(file, "raw");
            if (fileURL) {
                setTeacher((prev) => ({ ...prev, file: fileURL }));
                setFileText("image uploaded succesfully")
            }
        }
    };

    const handleMatieresChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const matière = e.target.value;
  
      setSelectedMatieres((prevMatieres) => {
          if (prevMatieres.includes(matière)) {
              // If the subject already exists, remove it
              return prevMatieres.filter((m) => m !== matière);
          } else {
              // If the subject doesn't exist, add it
              return [...prevMatieres, matière];
          }
      });
  
      setTeacher((prev) => ({
          ...prev,
          matière: selectedMatieres.includes(matière)
              ? selectedMatieres.filter((m) => m !== matière)
              : [...selectedMatieres, matière],
      }));
  };
  

    return (
        <div className="w-[90%] m-auto mb-10">
            <h1 className="font-semibold text-[var(--color-yousra)] text-[18px] mb-6">Ajouter un Enseignant</h1>

            {/* Informations Personnelles */}
            <div className="flex flex-col">
                <div className="h-[60px] bg-[var(--color-yousra)] rounded-tl-[24px] rounded-tr-[24px]">
                    <h1 className="font-bold ml-4 mt-4 text-white">Informations Personnelles</h1>
                </div>

                <div className="grid grid-cols-5 bg-white px-4 gap-10 rounded-br-[6px] rounded-bl-[6px] pb-20 pt-4">
                    <div className="col-span-1">
                        <label htmlFor="photo">Photo*</label>
                        <input type="file" className="border border-gray-500 border-dashed w-full h-[197px]" id="photo" onChange={handleFileUpload} />
                       <span className="text-green-600 text-[15px]">{fileText}</span> 

                    </div>

                    <div className="col-span-2 flex flex-col gap-4">
                        <div>
                            <label>Nom*</label>
                            <input type="text" name="nom" className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" onChange={ChangeHandler} />
                        </div>

                        <div>
                            <label>Adresse Email*</label>
                            <input type="email" name="email" className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" onChange={ChangeHandler} />
                        </div>

                        <div>
                            <label>Adresse*</label>
                            <input type="text" name="addresse" className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" onChange={ChangeHandler} />
                        </div>
                    </div>

                    <div className="col-span-2 flex flex-col gap-4">
                        <div>
                            <label>Prénom*</label>
                            <input type="text" name="prénom" className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" onChange={ChangeHandler} />
                        </div>

                        <div>
                            <label>Numéro De Téléphone*</label>
                            <input type="text" name="phone" className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" onChange={ChangeHandler} />
                        </div>

                        <div>
                            <label>Date & Lieu De Naissance*</label>
                            <input type="date" name="date" className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" onChange={ChangeHandler} />
                        </div>

                        <div>
                            <label>Lieu</label>
                            <select name="lieu" className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" onChange={selectionHandler}>
                                <option>Sélectionner une ville</option>
                                {algerianCities.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-10">
                <div className="h-[60px] bg-[var(--color-yousra)] rounded-tl-[24px] rounded-tr-[24px]">
                    <h1 className="font-bold ml-4 mt-4 text-white">Informations Professionnelles</h1>
                </div>

                <div className="grid grid-cols-5 bg-white px-4 gap-10 rounded-br-[6px] rounded-bl-[6px] pb-6 pt-4">
                    <div className="col-span-2 flex flex-col gap-4 mb-10">
                        <div>
                            <label>Diplôme*</label>
                            <input type="text" name="diplome" className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" onChange={ChangeHandler} />
                        </div>

                        <div>
                            <label>Date Début*</label>
                            <input type="date" name="date_début" className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" onChange={ChangeHandler} />
                        </div>
                    </div>

                    <div className="col-span-2 flex flex-col gap-4">
                        <div>
                            <label>Matières enseignées</label>
                            <select multiple className="p-2 w-full rounded h-[100px] border-gray-400 border-[2px]" value={selectedMatieres} onChange={handleMatieresChange}>
                                {matieres.map((matière, index) => (
                                    <option key={index} value={matière}>
                                        {matière}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTeacher;
