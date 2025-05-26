import Profile from "../../components/ui/profile"
import Image1 from '../../assets/images/image copy 2.png'

import { BiPlus } from "react-icons/bi"
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { MdOutlineMap } from "react-icons/md";
import { FaMapPin } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadFileToCloudinary from "../../config/UploadCloudinary";
import {bytesToBase64, imageUrlToBytes} from "../../config/bytesToBase64";
import { API_URL } from "../../lib/config";

interface Spécialité {
  specializationId: number,
  name: string,
}

interface Phone {
  number: string;
}

interface School {
  name: string,
  email: string,
  logo: string,
  websiteUrl: string,
  startDate: string,
  endDate: string,
  phoneNumbers: Phone[],
  street: string,
  city: string,
  state: string,
  postalCode: string,
  country: string,
  specializations: number[] 
}

interface School1 {
  schoolId: string,
  name: string,
  email: string,
  logo: string,
  websiteUrl: string,
  schoolConfig: string,
  academicYear: {
    startDate: string,
    endDate: string
  },
  phoneNumbers: Phone[],
  schoolType: {
    schoolTypeId: number,
    name: string,
  },
  address: {
    street: string,
    city: string,
    state: string,
    postalCode: string,
    country: string
  },
}

const Etablisment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [err, setErr] = useState<string>("");
  const [state, setState] = useState<string[]>([]);
  const [wilaya, setWilaya] = useState<string>("Oran");
  const [spe, setSpe] = useState<Spécialité[]>([]);
  const [selectedSpe, setSelectedSpe] = useState<number[]>([]);
  const [fileText, setFileText] = useState("");
  const [permitted, setPermitted] = useState<boolean>(false);
  const [showSchool, setShowSchool] = useState<School1>({
    schoolId: "",
    name: "",
    email: "",
    logo: "",
    websiteUrl: "",
    schoolConfig: "",
    academicYear: {
      startDate: "",
      endDate: ""
    },
    phoneNumbers: [{ number: "" }],
    schoolType: {
      schoolTypeId: 0,
      name: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    }
  });
  const [editSchool, setEditSchool] = useState<School>({
    name: "",
    email: "",
    logo: "",
    websiteUrl: "",
    startDate: "",
    endDate: "",
    phoneNumbers: [{ number: "" }],
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Algeria",
    specializations: []
  });
  const navigate = useNavigate();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = await uploadFileToCloudinary(file, "raw");
      if (fileURL) {
        setEditSchool(prev => ({ ...prev, logo: fileURL }));
        setFileText("Image uploaded successfully");
      }
    }
  };

  const handleSpecialitéChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const speId = parseInt(e.target.value, 10);
    setSelectedSpe(prev => {
      const newSpe = prev.includes(speId)
        ? prev.filter(id => id !== speId)
        : [...prev, speId];
      setEditSchool(prev => ({ ...prev, specializations: newSpe }));
      return newSpe;
    });
  };

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

  const handleSelectWilaya = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWilaya = e.target.value;
    setWilaya(selectedWilaya);
    setEditSchool(prev => ({ 
      ...prev, 
      city: selectedWilaya,
      // Reset state when wilaya changes
      state: "",
      postalCode: codesPostauxAlgerie.find(w => w.wilaya === selectedWilaya)?.codePostal || ""
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditSchool(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditSchool(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneNumberAdd = () => {
    if (editSchool.phoneNumbers.length < 3) {
      setEditSchool(prev => ({
        ...prev,
        phoneNumbers: [...prev.phoneNumbers, { number: "" }]
      }));
    }
  };

  const handleNumTel = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumbers = [...editSchool.phoneNumbers];
    newPhoneNumbers[index] = { number: e.target.value };
    setEditSchool(prev => ({ ...prev, phoneNumbers: newPhoneNumbers }));
  };

  useEffect(() => {
    const selectedWilaya = codesPostauxAlgerie.find(el => el.wilaya === wilaya);
    setState(selectedWilaya ? selectedWilaya.regions : []);
  }, [wilaya]);

  useEffect(() => {
    const fetchSchoolInfos = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      try {
        const [schoolRes, specializationsRes] = await Promise.all([
          fetch(`${API_URL}/api/School`, {
            headers: {
              "Authorization": `Bearer ${token}` 
            }
          }),
          fetch(`${API_URL}/api/Levels/specializations`, {
            headers: {
              "Authorization": `Bearer ${token}` 
            }
          })
        ]);

        if (!schoolRes.ok || !specializationsRes.ok) {
          throw new Error("Failed to fetch School Infos");
        }

        const schoolData = await schoolRes.json();
        const specializationsData = await specializationsRes.json();

        setShowSchool(schoolData);
        setEditSchool({
          name: schoolData.name,
          email: schoolData.email,
          logo: schoolData.logo,
          websiteUrl: schoolData.websiteUrl,
          startDate: schoolData.academicYear?.startDate || "",
          endDate: schoolData.academicYear?.endDate || "",
          phoneNumbers: schoolData.phoneNumbers,
          street: schoolData.address.street,
          city: schoolData.address.city,
          state: schoolData.address.state,
          postalCode: schoolData.address.postalCode,
          country: schoolData.address.country,
          specializations: []
        });
        
        setSpe(specializationsData);
        setWilaya(schoolData.address.city || "Oran");
        console.log(editSchool.logo)

      } catch (err) {
        setErr(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      } 
    };
    fetchSchoolInfos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      // Convert logo to Base64 if it's a new upload
      let logoBase64 = editSchool.logo;
      if (editSchool.logo && !editSchool.logo.startsWith('data:')) {
        const imageBytes = await imageUrlToBytes(editSchool.logo);
        logoBase64 = bytesToBase64(imageBytes);
      }

      const body = {
        name: editSchool.name,
        email: editSchool.email,
        logo: logoBase64,
        websiteUrl: editSchool.websiteUrl,
        phoneNumbers: editSchool.phoneNumbers.filter(phone => phone.number.trim() !== ""),
        address: {
          street: editSchool.street,
          city: editSchool.city,
          state: editSchool.state,
          postalCode: editSchool.postalCode,
          country: "Algeria"
        },
        specializations: selectedSpe,
        academicYear: {
          startDate: editSchool.startDate,
          endDate: editSchool.endDate
        }
      };

      console.log(body)

      const response = await fetch("${API_URL}/api/School", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update school");
      }

      const updatedSchool = await response.json();
      setShowSchool(updatedSchool);
      setPermitted(false);
      toast.success("School updated successfully");
      navigate('/dashboard')

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setPermitted(!permitted);
    if (!permitted) {
      // When entering edit mode, initialize with current data
      setEditSchool({
        name: showSchool.name,
        email: showSchool.email,
        logo: showSchool.logo,
        websiteUrl: showSchool.websiteUrl,
        startDate: showSchool.academicYear?.startDate || "",
        endDate: showSchool.academicYear?.endDate || "",
        phoneNumbers: showSchool.phoneNumbers,
        street: showSchool.address.street,
        city: showSchool.address.city,
        state: showSchool.address.state,
        postalCode: showSchool.address.postalCode,
        country: showSchool.address.country,
        specializations: []
      });
      setWilaya(showSchool.address.city || "Oran");
    }
  };

 

  return (
    <div className="w-[90%] max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-yousra)]">
          Information d'établissement
        </h1>
        <Profile />
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-[var(--color-yousra)] px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Profil de l'établissement</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Photo Section */}
          <div className="flex items-start mb-8">
            {permitted ? (
              <div className="w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo*</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center">
                  <input 
                    type="file" 
                    id="photo"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    onChange={handleFileUpload}
                  />
                  <div className="text-center p-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">Cliquez pour télécharger</p>
                  </div>
                </div>
                {fileText && <p className="mt-2 text-sm text-green-600">{fileText}</p>}
              </div>
            ) : (
              <div className="rounded-full w-32 h-32 overflow-hidden border-2 border-gray-200 shadow-sm">
                <img
                  src={showSchool.logo || Image1}
                  alt="School Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = Image1;
                  }}
                />
              </div>
            )}
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              {/* School Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'établissement*</label>
                {permitted ? (
                  <input
                  type="text"
                  value={editSchool.name}
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-yousra)] 
                             focus:border-[var(--color-yousra)]"
                  onChange={handleChange}
                />
                
                
                ) : (
                  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                    {showSchool.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email d'établissement*</label>
                <div className="relative">
                  <MdOutlineMailOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  {permitted ? (
                    <input
                      type="email"
                      value={editSchool.email}
                      name="email"
className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-yousra)] 
                             focus:border-[var(--color-yousra)]"                      onChange={handleChange}
                    />
                  ) : (
                    <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                      {showSchool.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Academic Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Année Scolaire*</label>
                <div className="grid grid-cols-2 gap-4">
                  {permitted ? (
                    <>
                      <div>
                       
                        <input
                          type="date"
                          name="startDate"
                          value={editSchool.startDate}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-yousra)] 
                             focus:border-[var(--color-yousra)]"                          onChange={handleChange}
                        />
                      </div>
                      <div>
                      
                        <input
                          type="date"
                          name="endDate"
                          value={editSchool.endDate}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-yousra)] 
                             focus:border-[var(--color-yousra)]"                          onChange={handleChange}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                          {showSchool.academicYear?.startDate || "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                          {showSchool.academicYear?.endDate || "N/A"}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Phone Numbers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéros de téléphone</label>
                <div className="space-y-2">
                  {(permitted ? editSchool.phoneNumbers : showSchool.phoneNumbers).map(
                    (phone, index) => (
                      <div key={index} className="relative">
                        <LuPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        {permitted ? (
                          <input
                            type="text"
                            value={phone.number}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border[var(--color-yousra)]"
                            onChange={(e) => handleNumTel(index, e)}
                          />
                        ) : (
                          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                            {phone.number}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
                {permitted && editSchool.phoneNumbers.length < 3 && (
                  <button
                    type="button"
                    className="mt-2 flex items-center gap-1 text-sm text-[var(--color-yousra)] hover:text-[var(--color-yousra-dark)]"
                    onClick={handlePhoneNumberAdd}
                  >
                    <BiPlus /> Ajouter un numéro
                  </button>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Address Section */}
              <div className="grid grid-cols-3 gap-4">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <div className="relative">
                    <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    {permitted ? (
                      <select
                        onChange={handleSelectWilaya}
                        className="w-full px-4 pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yousra)] focus:border-transparent"
                        name="city"
                        value={editSchool.city}
                      >
                        {codesPostauxAlgerie?.map((element, index) => (
                          <option value={element.wilaya} key={index}>
                            {element.wilaya}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="w-full px-4 pl-10 py-2 border border-gray-300 rounded-lg bg-gray-50">
                        {showSchool.address.city}
                      </div>
                    )}
                  </div>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
                  <div className="relative">
                    <MdOutlineMap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    {permitted ? (
                      <select
                        className="w-full px-4 pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yousra)] focus:border-transparent"
                        name="state"
                        value={editSchool.state}
                        onChange={handleSelect}
                      >
                        {state?.map((element, index) => (
                          <option value={element} key={index}>
                            {element}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="w-full px-4 pl-10 py-2 border border-gray-300 rounded-lg bg-gray-50">
                        {showSchool.address.state}
                      </div>
                    )}
                  </div>
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code Postal</label>
                  <div className="relative">
                    <FaMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    {permitted ? (
                      <select
                        className="w-full px-4 pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yousra)] focus:border-transparent"
                        name="postalCode"
                        value={editSchool.postalCode}
                        onChange={handleSelect}
                      >
                        {codesPostauxAlgerie?.map((element, index) => (
                          <option value={element.codePostal} key={index}>
                            {element.codePostal}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="w-full px-4 pl-10 py-2 border border-gray-300 rounded-lg bg-gray-50">
                        {showSchool.address.postalCode}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Web</label>
                <div className="relative">
                  <FaLink className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  {permitted ? (
                    <input
                      type="text"
                      value={editSchool.websiteUrl}
                      name="websiteUrl"
className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-yousra)] 
                             focus:border-[var(--color-yousra)]"                      onChange={handleChange}
                    />
                  ) : (
                    <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                      {showSchool.websiteUrl}
                    </div>
                  )}
                </div>
              </div>

              {/* Street */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <div className="relative">
                  <FiPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  {permitted ? (
                    <input
                      type="text"
                      value={editSchool.street}
                      name="street"
className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-yousra)] 
                             focus:border-[var(--color-yousra)]"                      onChange={handleChange}
                    />
                  ) : (
                    <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                      {showSchool.address.street}
                    </div>
                  )}
                </div>
              </div>

              {/* Specializations */}
              {permitted && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Spécialités</label>
                  <select
                    name="specializations"
                    multiple
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-[var(--color-yousra)] focus:border-transparent"
                    onChange={handleSpecialitéChange}
                    value={selectedSpe.map(String)}
                  >
                    {spe?.map((sp, index) => (
                      <option value={sp.specializationId} key={index}>
                        {sp.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            {permitted ? (
              <>
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => setPermitted(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-[var(--color-yousra)] text-white rounded-lg pointer"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enregistrement...
                    </span>
                  ) : (
                    "Enregistrer les modifications"
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="px-6 py-2 bg-[var(--color-yousra)] text-white rounded-lg pointer"
                onClick={handleEditToggle}
              >
                Modifier les informations
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};




export default Etablisment;