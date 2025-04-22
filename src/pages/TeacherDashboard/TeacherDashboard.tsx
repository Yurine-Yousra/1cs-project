import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Enseignants from "../dashboard/Enseignants";
import DashboardUpper from "../../components/AdminComponents/DashboardUpper";
import TeacherProfil from "../dashboard/TeacherProfil";
//import Employees from "../dashboard/Employees";
import Absence from "./Absence";
import Profil from "./Profil";
import Sidebar from "../../components/sideBars/SideBar";
import { sidebarArrayTeacher } from "../../constants/sidebar.constant";

const TeacherDashboard: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false)


  const isAddTeacherPage1 = ["employes", "enseignants"].some(substring =>
    location.pathname.includes(substring)
  );

  return (
    <div className="flex h-screen text-black overflow-hidden">
            
              <Sidebar  isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} sidebarArray={sidebarArrayTeacher} />

      <div
        className={`flex-1 transition-all duration-300 overflow-hidden bg-sous ${isCollapsed ? "lg:ml-[60px]" : "lg:ml-[280px]"}`}
      >
        {/* Barre de recherche pour certaines pages */}
        {isAddTeacherPage1 && <DashboardUpper />}

        {/* Contenu des routes */}
        <div className="h-full overflow-y-auto  w-full">
          <Routes>
            <Route path="enseignants" element={<Enseignants />} />
            <Route path="TeacherProfil" element={<TeacherProfil />} />
            <Route path="eleves" element={<Absence />} />
            {/* <Route path="employees" element={<Employees />} /> */}
            <Route path="notes" element={ <h1>  sssssssss  </h1> } />
            <Route path="profile" element={<Profil />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
