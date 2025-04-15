import { Routes, Route,/* useLocation*/ } from "react-router-dom";
import SideBar from "../../components/sideBars/SideBar";
import Enseignants from "./Enseignants";
import AddTeacher from "./AddTeacher";
//import DashboardUpper from "../../components/AdminComponents/DashboardUpper";
import TeacherProfil from "./TeacherProfil";
import  Eleves from "./Eleve";
import Employees from "./Employees";
import AddEmployee from "./AddEmployee";
import GestionClass from "./GestionClass";
import Etablisment from "./Etablisment";
import { useState } from "react";
import Statistic from "./Statistic";
import { sidebarArray } from "../../constants/sidebar.constant";


const Dashboard: React.FC = () => {
//  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false)

  

  return (
    <div
      className={`flex  text-black  `}
    >
     

      <SideBar  isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} sidebarArray={sidebarArray} />


      <div
        className={` w-full  flex-1 md:ml-[86px] ${! isCollapsed ? "xl:ml-[280px]":"xl:ml-[85px]"}  h-screen bg-sous `}
      >
        {  /* <DashboardUpper /> */}
        <div className=" ">
          <Routes>
            <Route path="enseignants" element={<Enseignants />} />
            <Route path="addTeacher" element={<AddTeacher />} />
            <Route path="eleves"  element={<Eleves />} />
            <Route path="TeacherProfil" element={<TeacherProfil />} />
            <Route path="*" element={<div className="">Page Not Found</div>} />
            <Route path="employes" element={<Employees />} />
            <Route path="addEmployee" element={<AddEmployee />} />
            <Route path="gestion" element={<GestionClass />} />
            <Route path="etablisment" element={<Etablisment />} />
            <Route path="" element={<Statistic />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
