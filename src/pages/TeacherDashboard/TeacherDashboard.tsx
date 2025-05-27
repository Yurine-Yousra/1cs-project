import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Enseignants from "../dashboard/Enseignants";
import DashboardUpper from "../../components/AdminComponents/DashboardUpper";
import TeacherProfil from "../dashboard/TeacherProfil";
//import Employees from "../dashboard/Employees";
import Absence from "./Absence";
import ResetTeacherPassword from "./ResetTeacherPassword";
import Sidebar from "../../components/sideBars/SideBar";
import {StudentProfile} from "../../components/_student/StudentProfile";
import { sidebarArrayTeacher } from "../../constants/sidebar.constant";
import Convocation from "./Convocation";
import ConvocationSuccess from "../SuccessPages/ConvocationSuccess";
import GroupSelectionPage from "./GroupSelectionPage";
import NotesManagementPage from "./NotesManagementPage";
import Time from "./Time";

const TeacherDashboard: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false)


  const isAddTeacherPage1 = ["employes", "enseignants" , "convocation"].some(substring =>
    location.pathname.includes(substring)
  );

  return (
    <div className="flex h-screen text-black overflow-hidden">
            
              <Sidebar  isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} sidebarArray={sidebarArrayTeacher} />

      <div
        className={`flex-1 transition-all duration-300 overflow-hidden bg-sous ${isCollapsed ? "lg:ml-[60px]" : "lg:ml-[280px]"}`}
      >
        {isAddTeacherPage1 && <DashboardUpper />}

        <div className="h-full overflow-y-auto  w-full">
          <Routes>
            <Route path="enseignants" element={<Enseignants />} />
            <Route path="teachers/:id" element={<TeacherProfil />} />
            <Route path="eleves" element={   <GroupSelectionPage tab="eleves" />} />
            <Route path="groups/:groupId/eleves" element={<Absence />} />
            <Route path="/notes" element={<GroupSelectionPage tab="notes" />} />
            <Route path="/groups/:groupId/notes" element={<NotesManagementPage />} />
            <Route path="profile" element={<ResetTeacherPassword />} />
              <Route path="students/:id" element={<StudentProfile />} />
            <Route path="students/:id/convocation" element={<Convocation />} />
             <Route path="convocation-success" element={<ConvocationSuccess />} />
             <Route path="planification" element={<Time />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
