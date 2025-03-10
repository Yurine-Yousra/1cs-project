import { useState } from "react";
import { BiCloset } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Enseignants from "./Enseignants";
import AddTeacher from "./AddTeacher";
import DashboardUpper from "./DashboardUpper";
import TeacherProfil from "./TeacherProfil";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Check if we are in the "addTeacher" route
  const isAddTeacherPage = location.pathname.includes("addTeacher");

  return (
    <div
      className={`grid grid-cols-1 h-max-content text-black overflow-x-hidden relative ${
        isAddTeacherPage ? "lg:grid-cols-16" : "lg:grid-cols-5"
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
        className={`fixed lg:relative col-span-1 top-0 left-0 h-full bg-white flex flex-col items-start p-4 transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0 w-[50%]" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="w-full">
          <SideBar />
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`col-span-1 gap-10 mb-10 bg-[var(--color-sous)] ${
          isAddTeacherPage ? "lg:col-span-15" : "lg:col-span-4"
        }`}
      >
        {/* Search Bar for "Enseignants" */}
        {location.pathname.includes("enseignants") && <DashboardUpper />}

        <div className="mt-10">
          <Routes>
            <Route path="enseignants" element={<Enseignants />} />
            <Route path="addTeacher" element={<AddTeacher />} />
            <Route path="TeacherProfil" element={<TeacherProfil />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
