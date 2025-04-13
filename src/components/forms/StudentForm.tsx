
import type React from "react"
import { useState, useRef, type FormEvent, useEffect } from "react"
import { getLevels, getRelationship, getSpecializations, Levels, Relationship, Specializations } from "../../apis/levels.api"
import { algerianCities } from "../../constants/information.constant"
import { StudentFormData, useCreateStudent } from "../../hooks/useCreateStudent"





const StudentForm: React.FC = () => {
  const [studentPhoto, setStudentPhoto] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [levels,setLevel] = useState<Levels[]>([]);
  const [relation,setReltion] = useState<Relationship[]>([]);
  const [schoolLevels,setSchoolLevel] = useState<Specializations[]>([]);
  const [formData, setFormData] = useState<StudentFormData>({
    studentInfosDTO: {
      firstName: "",
      lastName: "",
      address: "",
      birthDate: "",
      birthPlace: "",
      emergencyContact: "",
      schoolLevelId: 12,
      specializationId: 1,
    },
    parentInfosDTO: {
      nationalIdentityNumber: "",
      firstName: "",
      lastName: "",
      email: "",
      relationshipToStudentId: 1,
      occupation: "",
      phoneNumber: "",
    },
  })
  const {createStudent, loading} = useCreateStudent();

  useEffect(() => {
    const fetchData = async () => { 
    const data = await getLevels();
    setLevel(data);
}   
    fetchData()
  },[])

  useEffect(() => {
    const fetchData = async () => { 
    const data = await getRelationship();
    setReltion(data);
}   
    fetchData()
  },[])
  
  useEffect(() => {
    const fetchData = async () => {
        const data = await getSpecializations();
       
          setSchoolLevel(data);
      } 
    if (Number(localStorage.getItem("shool")) === 3){
        fetchData()
    }

  },[])



  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setStudentPhoto(event.target?.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      studentInfosDTO: {
        ...formData.studentInfosDTO,
        [name]: name === "schoolLevelId" || name === "specializationId" ? Number.parseInt(value) : value,
      },
    })     
  }

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      parentInfosDTO: {
        ...formData.parentInfosDTO,
        [name]: name === "relationshipToStudentId" ? Number.parseInt(value) : value,
      },
    })
    
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    await createStudent(formData);
    console.log(JSON.stringify(formData, null, 2))
  
  }

  return (
    <div className="w-full max-w-7xl bg-sous h-full mx-auto ">
   
      <h1 className="text-2xl font-bold mb-6">Ajouter un Eleve</h1>

      <form onSubmit={handleSubmit} >
        {/* Student Information Section */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="bg-yousra text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Informations Personnelles</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 lg:col-span-1 space-y-4">
                {/* Photo Upload */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Photo*</label>
                  <div
                    className={`border-2 border-dashed rounded-md h-[150px] flex items-center justify-center cursor-pointer relative ${
                      studentPhoto ? "border-transparent" : "border-gray-300"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {studentPhoto ? (
                      <div className="relative w-full h-full">
                        <img
                          src={studentPhoto || "/placeholder.svg"}
                          alt="Student"
                          className="h-full w-full object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white text-sm">Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="mt-1 text-sm text-gray-500">Click to upload photo</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </div>

                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                    Prénom*
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.studentInfosDTO.firstName}
                    onChange={handleStudentChange}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                    Nom*
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.studentInfosDTO.lastName}
                    onChange={handleStudentChange}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                    Adresse*
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.studentInfosDTO.address}
                    onChange={handleStudentChange}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra min-h-[100px]"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2 lg:col-span-1 space-y-4">
                {/* Birth Date */}
                <div>
                  <label htmlFor="birthDate" className="block text-gray-700 text-sm font-bold mb-2">
                    Date De Naissance*
                  </label>
                  <div className="relative">
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.studentInfosDTO.birthDate}
                      onChange={handleStudentChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                      required
                    />
                  
                  </div>
                </div>

        {/* Birth Place */}
<div>
  <label htmlFor="birthPlace" className="block text-gray-700 text-sm font-bold mb-2">
    Lieu De Naissance*
  </label>
  <select
    id="birthPlace"
    name="birthPlace"
    value={formData.studentInfosDTO.birthPlace}
    onChange={handleStudentChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
    required
  >
    <option value="" disabled>Choisir une ville</option>
    {algerianCities.map((city, index) => (
      <option key={index} value={city}>{city}</option>
    ))}
  </select>
</div>
      {/* Emergency Contact */}
                <div>
                  <label htmlFor="emergencyContact" className="block text-gray-700 text-sm font-bold mb-2">
                    Numéro De Téléphone*
                  </label>
                  <input
                    id="emergencyContact"
                    name="emergencyContact"
                    type="tel"
                    value={formData.studentInfosDTO.emergencyContact}
                    onChange={handleStudentChange}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  />
                </div>

              
                {/* Level */}
                <div>
                  <label htmlFor="specializationId" className="block text-gray-700 text-sm font-bold mb-2">
                    Année*
                  </label>
                  <select
                    id="specializationId"
                    name="specializationId"
                    value={formData.studentInfosDTO.specializationId}
                    onChange={handleStudentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  >
                    {levels.map((spec) => (
                      <option key={spec.levelId} value={spec.levelId}>
                        {spec.levelYear} {spec.levelYear === 1 ? "ére":"éme"} 
                        
                      </option>
                    ))}
                  </select>
                </div>
                  {/* Specialization */}
                  { Number(localStorage.getItem("shool")) ===3 && <div>
                  <label htmlFor="schoolLevelId" className="block text-gray-700 text-sm font-bold mb-2">
                    Classe*
                  </label>
                  <select
                    id="schoolLevelId"
                    name="schoolLevelId"
                    value={formData.studentInfosDTO.schoolLevelId}
                    onChange={handleStudentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  >
                    {
  (
    formData.studentInfosDTO.specializationId === 10
      ? schoolLevels.slice(0, 2)
      : schoolLevels.slice(2)
  ).map((level) => (
    <option key={level.specializationId} value={level.specializationId}>
      {level.name}
    </option>
  ))
}

                  </select>
                </div> }

              </div>
            </div>
          </div>
        </div>

        {/* Parent Information Section */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="bg-yousra text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Informations des Parents</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* National Identity Number */}
                <div>
                  <label htmlFor="nationalIdentityNumber" className="block text-gray-700 text-sm font-bold mb-2">
                    Numéro d'Identité Nationale*
                  </label>
                  <input
                    id="nationalIdentityNumber"
                    name="nationalIdentityNumber"
                    type="text"
                    value={formData.parentInfosDTO.nationalIdentityNumber}
                    onChange={handleParentChange}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  />
                </div>

                {/* Parent First Name */}
                <div>
                  <label htmlFor="parentFirstName" className="block text-gray-700 text-sm font-bold mb-2">
                    Prénom*
                  </label>
                  <input
                    id="parentFirstName"
                    name="firstName"
                    type="text"
                    value={formData.parentInfosDTO.firstName}
                    onChange={handleParentChange}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  />
                </div>

                {/* Parent Last Name */}
                <div>
                  <label htmlFor="parentLastName" className="block text-gray-700 text-sm font-bold mb-2">
                    Nom*
                  </label>
                  <input
                    id="parentLastName"
                    name="lastName"
                    type="text"
                    value={formData.parentInfosDTO.lastName}
                    onChange={handleParentChange}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  />
                </div>

                {/* Relationship to Student */}
                <div>
                  <label htmlFor="relationshipToStudentId" className="block text-gray-700 text-sm font-bold mb-2">
                    Relation*
                  </label>
                  <select
                    id="relationshipToStudentId"
                    name="relationshipToStudentId"
                    value={formData.parentInfosDTO.relationshipToStudentId}
                    onChange={handleParentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  >
                    {relation.map((rel) => (
                      <option key={rel.id} value={rel.id}>
                        {rel.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Adresse Email*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.parentInfosDTO.email}
                    onChange={handleParentChange}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label htmlFor="occupation" className="block text-gray-700 text-sm font-bold mb-2">
                    Occupation*
                  </label>
                  <input
                    id="occupation"
                    name="occupation"
                    type="text"
                    value={formData.parentInfosDTO.occupation}
                    onChange={handleParentChange}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                    Numéro De Téléphone*
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.parentInfosDTO.phoneNumber}
                    onChange={handleParentChange}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
        <button
        type="submit"
        className="px-6 py-2 bg-yousra text-white font-medium rounded-md hover:bg-yousra focus:outline-none focus:ring-2 focus:ring-yousra focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
        </div>
      </form>
    </div>
  )
}

export default StudentForm
