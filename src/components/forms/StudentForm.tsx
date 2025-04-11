"use client"

import type React from "react"
import { useState, useRef, type FormEvent, useEffect } from "react"
import { getLevels, getRelationship, Levels, Relationship } from "../../hooks/levels.api"

interface StudentFormData {
  studentInfosDTO: {
    firstName: string
    lastName: string
    address: string
    birthDate: string
    birthPlace: string
    emergencyContact: string
    schoolLevelId: number
    specializationId: number
  }
  parentInfosDTO: {
    nationalIdentityNumber: string
    firstName: string
    lastName: string
    email: string
    relationshipToStudentId: number
    occupation: string
    phoneNumber: string
  }
}




const StudentForm: React.FC = () => {
  const [studentPhoto, setStudentPhoto] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [levels,setLevel] = useState<Levels[]>([]);
  const [relation,setReltion] = useState<Relationship[]>([]);

  const [formData, setFormData] = useState<StudentFormData>({
    studentInfosDTO: {
      firstName: "",
      lastName: "",
      address: "",
      birthDate: "",
      birthPlace: "",
      emergencyContact: "",
      schoolLevelId: 10,
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

  const handleSubmit =  (e: FormEvent) => {
    e.preventDefault()
  
  
    console.log(JSON.stringify(formData, null, 2))
  
    // Here you would send the data to your backend
    alert("Form submitted successfully!")
  }


  return (
    <div className="w-full max-w-6xl mx-auto ">
   
      <h1 className="text-2xl font-bold mb-6">Ajouter un Eleve</h1>

      <form onSubmit={handleSubmit}>
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
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Birth Place */}
                <div>
                  <label htmlFor="birthPlace" className="block text-gray-700 text-sm font-bold mb-2">
                    Lieu De Naissance*
                  </label>
                  <input
                    id="birthPlace"
                    name="birthPlace"
                    type="text"
                    value={formData.studentInfosDTO.birthPlace}
                    onChange={handleStudentChange}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yousra"
                    required
                  />
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

                {/* School Level */}
                {/* <div>
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
                    {schoolLevels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* Specialization */}
                <div>
                  <label htmlFor="specializationId" className="block text-gray-700 text-sm font-bold mb-2">
                    Spécialisation*
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
            className="px-6 py-2 bg-yousra text-white font-medium rounded-md hover:bg-yousra focus:outline-none focus:ring-2 focus:ring-yousra focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default StudentForm
