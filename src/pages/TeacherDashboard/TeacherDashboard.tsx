import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Enseignants from "../dashboard/Enseignants";
import DashboardUpper from "../../components/AdminComponents/DashboardUpper";
import TeacherProfil from "../dashboard/TeacherProfil";
import Employees from "../dashboard/Employees";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import TeacherSideBar from "../../components/sideBars/TeacherSide";
import Absence from "./Absence";
import Profil from "./Profil";

const TeacherDashboard: React.FC = () => {
  const [minimized, setMinimized] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const location = useLocation();

  const isAddTeacherPage1 = ["employes", "enseignants"].some(substring =>
    location.pathname.includes(substring)
  );

  return (
    <div className="flex h-screen text-black overflow-hidden">
      {/* Sidebar Fixe */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-50 
          ${minimized ? "w-[70px]" : "w-[300px]"}`}
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
      >
        <TeacherSideBar minimized={minimized} setMinimized={setMinimized} />

        {/* Bouton pour Minimiser/Agrandir la Sidebar */}
        {showArrow && (
          <div
            className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white rounded-full cursor-pointer border border-gray-400 w-7 h-7 flex items-center justify-center shadow-2xl 
                      hover:bg-[var(--color-yousra)] transition duration-300"
            onClick={() => setMinimized(!minimized)}
          >
            {minimized ? (
              <IoIosArrowForward className="text-[var(--color-yousra)] font-bold hover:text-white transition duration-300" size={14} />
            ) : (
              <IoIosArrowBack className="text-[var(--color-yousra)] font-bold hover:text-white transition duration-300" size={14} />
            )}
          </div>
        )}
      </div>

      <div
        className={`flex-1 transition-all duration-300 overflow-hidden bg-[var(--color-sous)] ${minimized ? "ml-[70px]" : "ml-[300px]"}`}
      >
        {/* Barre de recherche pour certaines pages */}
        {isAddTeacherPage1 && <DashboardUpper />}

        {/* Contenu des routes */}
        <div className="h-full overflow-y-auto  w-full">
          <Routes>
            <Route path="enseignants" element={<Enseignants />} />
            <Route path="TeacherProfil" element={<TeacherProfil />} />
            <Route path="eleves" element={<Absence />} />
            <Route path="employees" element={<Employees />} />
            <Route path="profile" element={<Profil />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
