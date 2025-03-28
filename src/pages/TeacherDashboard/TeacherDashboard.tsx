import { useState } from "react";
import { BiCloset } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { Routes, Route, useLocation } from "react-router-dom";
import Enseignants from "../dashboard/Enseignants";
import DashboardUpper from "../../components/AdminComponents/DashboardUpper";
import TeacherProfil from "../dashboard/TeacherProfil";
import Employees from "../dashboard/Employees";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import TeacherSideBar from "../../components/sideBars/TeacherSide";
import Absence from "./Absence";


const TeacherDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [minimized , setMinimized] = useState(false)
  const [showArrow, setShowArrow] = useState(false);

  // Check if we are in the "addTeacher" route
  const isAddTeacherPage = ["addTeacher", "addEmployee"].some(substring =>
    location.pathname.includes(substring)
  );

  const isAddTeacherPage1 = ["employes" , "enseignants"].some(substring =>
    location.pathname.includes(substring)
  );
  
  return (
    <div
      className={`grid grid-cols-1 h-max-content text-black overflow-x-hidden relative ${
        (isAddTeacherPage || minimized) ? "lg:grid-cols-21" : "lg:grid-cols-5"
      }`}
    >
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-gray-800 p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <BiCloset size={24} /> : <BiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`relative col-span-1 top-0 left-0 h-full flex flex-col items-start  transition-transform duration-300  z-50  
        ${isSidebarOpen ? "translate-x-0  bg-white" : "-translate-x-full"} lg:translate-x-0`}
        onMouseEnter={() => setShowArrow(true)} onMouseLeave={() => setShowArrow(false)}
      >
           
           {showArrow && !minimized && (
  <div
    className="absolute -right-3 top-18 bg-white rounded-full cursor-pointer border border-gray-400 w-7 h-7 flex items-center justify-center shadow-2xl 
               hover:bg-[var(--color-yousra)] transition duration-300 "
    onClick={() => setMinimized(!minimized)}
  >
    <IoIosArrowBack
      className="text-[var(--color-yousra)] font-bold hover:text-white transition duration-300" 
      size={14} 
    />
  </div>
)}


{showArrow && minimized && (
  <div
    className="absolute -right-3 top-18 bg-white rounded-full cursor-pointer border border-gray-400 w-6 h-6 flex items-center justify-center shadow-2xl 
               hover:bg-[var(--color-yousra)] transition duration-300"
    onClick={() => setMinimized(!minimized)}
  >
    <IoIosArrowForward 
      className="text-[var(--color-yousra)] font-bold hover:text-white transition duration-300" 
      size={14} 
    />
  </div>
)}



        <div className="w-full  fixed h-full overflow-hidden ">
          <TeacherSideBar minimized={minimized} setMinimized={setMinimized} />
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`col-span-1 gap-10 mb-10  bg-[var(--color-sous)] ${
          (isAddTeacherPage || minimized) ? "lg:col-span-20" : "lg:col-span-4"
        }`}
      >
        {/* Search Bar for "Enseignants" */}
        {isAddTeacherPage1 && <DashboardUpper />}

        <div className="h-screen overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="enseignants" element={<Enseignants />} />
            <Route path="TeacherProfil" element={<TeacherProfil />} />
            <Route path="eleves" element={<Absence />} />
            <Route path="employees" element={<Employees />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
