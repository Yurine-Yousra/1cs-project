import React, { useEffect, useState } from "react";
import uploadFileToCloudinary from "../../config/UploadCloudinary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


interface Subject {
    subjectId : string,
    name : string
}


const AddTeacher = () => {

    const [selectedMatieres, setSelectedMatieres] = useState<string[]>([]);
    const [fileText , setFileText] = useState("")
    const [subjects , setSubjects] = useState<Subject []>([])
    const [error , setError] = useState("")
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()

    const [teacher, setTeacher] = useState({
        nom: "",
        prénom: "",
        addresse: "",
        email: "",
        phone: "",
        file :"",
        date_début: "",
        matière: [] as string[],
    });

    const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            const newMatieres = prevMatieres.includes(matière)
                ? prevMatieres.filter((m) => m !== matière)
                : [...prevMatieres, matière];
    
            setTeacher((prev) => ({ ...prev, matière: newMatieres }));
            return newMatieres;
        });
    };
    
  console.log(teacher)
  useEffect(() => {
    const fetchUserData = async () => {
        setLoading(true);
        const token = localStorage.getItem("token"); 
        try {
            const response = await fetch("http://localhost:5080/api/Subjects/BySchoolLevel", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                },
            });
            if (!response.ok) throw new Error("Failed to fetch subjects");
            
            const data = await response.json();
            setSubjects(data.subjects);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    fetchUserData();
}, []);


const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token"); 

    try {
        const response = await fetch("http://localhost:5080/api/teacher/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, 
            },
            body: JSON.stringify({
                email: teacher.email,
                firstName: teacher.prénom,
                lastName: teacher.nom,
                phoneNumber: teacher.phone,
                hireDate: teacher.date_début,
                contractTypeId :0 ,
                subjectIds: teacher.matière,
                schoolId:"3fa85f64-5717-4562-b3fc-2c963f66afa6",
                photo: teacher.file,
                address: { fullAddress: teacher.addresse }
            })
        });


        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create teacher");
        }

        toast.success("Teacher created successfully");
        navigate('/dashboard');

    } catch (error) {
        toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
        setLoading(false);
    }
};


console.log(subjects)
  

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
                            <label>Date Début*</label>
                            <input type="date" name="date_début" className="w-full rounded-[5px] h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" onChange={ChangeHandler} />
                        </div>
                    </div>

                    <div className="col-span-2 flex flex-col gap-4">
                        <div>
                            <label>Matières enseignées</label>
                            <select multiple className="p-2 w-full rounded h-[100px] border-gray-400 border-[2px]" value={selectedMatieres} onChange={handleMatieresChange}>
                                {subjects?.map((subject) => (
                                    <option key={subject.subjectId} value={subject.subjectId}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handelSubmit}>{loading ? "Loading" : "Submit"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTeacher;
