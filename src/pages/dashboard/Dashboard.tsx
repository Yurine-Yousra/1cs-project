import { useState } from "react";
import { BiCloset } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Enseignants from "./Enseignants";
import AddTeacher from "./AddTeacher";
import DashboardUpper from "./DashboardUpper";
import TeacherProfil from "./TeacherProfil";
import  Eleves from "./Eleve";
import Employees from "./Employees";
import AddEmployee from "./AddEmployee";
import GestionClass from "./GestionClass";


const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [minimized , setMinimized] = useState(false)

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
        (isAddTeacherPage || minimized) ? "lg:grid-cols-16" : "lg:grid-cols-5"
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
 className={`fixed lg:relative col-span-1 top-0 left-0 h-full flex flex-col items-start 
  transition-all duration-300 
  ${isSidebarOpen ? " min-w-[50%]" : " min-w-full"} lg:translate-x-0`}
>
  <div className={isSidebarOpen ? " min-w-[50%]" : " min-w-full"} >
    <SideBar minimized={minimized} setMinimized={setMinimized} />
  </div>
</div>

      {/* Content Area */}
      <div
        className={`col-span-1 gap-10 mb-10 bg-[var(--color-sous)] ${
          (isAddTeacherPage || minimized) ? "lg:col-span-15" : "lg:col-span-4"
        }`}
      >
        {/* Search Bar for "Enseignants" */}
        {isAddTeacherPage1 && <DashboardUpper />}

        <div className="mt-10 h-screen overflow-y-auto">
          <Routes>
            <Route path="enseignants" element={<Enseignants />} />
            <Route path="addTeacher" element={<AddTeacher />} />
            <Route path="eleves"  element={<Eleves />} />
            <Route path="TeacherProfil" element={<TeacherProfil />} />
            <Route path="*" element={<div>Page Not Found</div>} />
            <Route path="employes" element={<Employees />} />
            <Route path="addEmployee" element={<AddEmployee />} />
            <Route path="gestion" element={<GestionClass />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
