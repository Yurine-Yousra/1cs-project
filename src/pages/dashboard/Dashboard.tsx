import { useState , useEffect} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "../../components/sideBars/SideBar";
import Enseignants from "./Enseignants";
import AddTeacher from "./AddTeacher";
import DashboardUpper from "../../components/AdminComponents/DashboardUpper";
import TeacherProfil from "./TeacherProfil";
import  Eleves from "./Eleve";
import Employees from "./Employees";
import AddEmployee from "./AddEmployee";
import GestionClass from "./GestionClass";
import Etablisment from "./Etablisment";
import { BiCloset, BiMessageRoundedMinus } from "react-icons/bi";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//  const location = useLocation();


  

  return (
    <div
      className={`flex  text-black  `}
    >
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-gray-800 p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <BiCloset size={24} /> : <BiMessageRoundedMinus size={24} />}
      </button>

      <SideBar  />


      <div
        className={` w-full   bg-sous `}
      >
        { <DashboardUpper />}
        <div className=" ">
          <Routes>
            <Route path="enseignants" element={<Enseignants />} />
            <Route path="addTeacher" element={<AddTeacher />} />
            <Route path="eleves"  element={<Eleves />} />
            <Route path="TeacherProfil" element={<TeacherProfil />} />
            <Route path="*" element={<div>Page Not Found</div>} />
            <Route path="employes" element={<Employees />} />
            <Route path="addEmployee" element={<AddEmployee />} />
            <Route path="gestion" element={<GestionClass />} />
            <Route path="etablisment" element={<Etablisment />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
