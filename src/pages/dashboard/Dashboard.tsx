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
import ClassroomList from "./ClassroomList";
import Planifcation from "./Planifcation";
import {StudentProfile} from "../../components/_student/StudentProfile";
import Convocation from "../TeacherDashboard/Convocation";
import EmployeeProfil from "./EmployeeProfil";

const Dashboard: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

 
  return (
    <div
      className={`flex  text-black   min-h-screen `}
    >
     

      <SideBar  isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} sidebarArray={sidebarArray} />


      <div
className={`w-full flex flex-col flex-1 md:ml-[86px] ${!isCollapsed ? "xl:ml-[280px]" : "xl:ml-[85px]"} bg-sous pt-6`}      >
        {  /* <DashboardUpper /> */}
        <div className="">
          <Routes>
            <Route path="enseignants" element={<Enseignants />} />
            <Route path="addTeacher" element={<AddTeacher />} />
            <Route path="Eleves"  element={<Eleves />} />
            <Route path="teachers/:id" element={<TeacherProfil />} />
            <Route path="*" element={<div className="">Page Not Found</div>} />
            <Route path="employees" element={<Employees />} />
            <Route path="addEmployee" element={<AddEmployee />} />
            <Route path="gestion" element={<GestionClass />} />
            <Route path="etablisment" element={<Etablisment />} />
            <Route path="classroom" element={<ClassroomList   />} />
            <Route path="" element={<Statistic />} />
            <Route path="planification" element={<Planifcation />} />
            <Route path="students/:id" element={<StudentProfile />} />
            <Route path="students/:id/convocation" element={<Convocation />} />
            <Route path="employees/:id" element={<EmployeeProfil />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
