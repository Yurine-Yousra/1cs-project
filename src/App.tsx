import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Dashboard from "./pages/dashboard/Dashboard";
import Enseignants from "./pages/dashboard/Enseignants";
import AddTeacher from "./pages/dashboard/AddTeacher";
import TeacherProfil from "./pages/dashboard/TeacherProfil";
import AddEmployee from "./pages/dashboard/AddEmployee";
import Employees from "./pages/dashboard/Employees";
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard'
import Absence from "./pages/TeacherDashboard/Absence";
import Etablisment from "./pages/dashboard/Etablisment";
import Profil from "./pages/TeacherDashboard/Profil";

const App = () => {
 
  return (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      
      {/* Dashboard with subroutes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Etablisment />} /> {/* Default route */}
        <Route path="enseignants" element={<Enseignants />} />
        <Route path="addTeacher" element={<AddTeacher />} />
        <Route path="TeacherProfil" element={<TeacherProfil />} />
        <Route path="employes" element={<Employees />} />
        <Route path="addEmployee" element={<AddEmployee />} />
        <Route path="établisment" element={<Etablisment />} />
      </Route>

      <Route path="/Teacherdashboard" element={<TeacherDashboard />}>
        <Route index element={<Etablisment />} /> {/* Default route */}
        <Route path="enseignants" element={<Enseignants />} />
        <Route path="TeacherProfil" element={<TeacherProfil />} />
        <Route path="eleves" element={<Absence />} />
        <Route path="établisment" element={<Etablisment />} />
        <Route path="profile" element={<Profil />} />
      </Route>
    </Routes>
  );
}

export default App;
