import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Dashboard from "./pages/dashboard/Dashboard";
import Enseignants from "./pages/dashboard/Enseignants";
import AddTeacher from "./pages/dashboard/AddTeacher";
import TeacherProfil from "./pages/dashboard/TeacherProfil";
import AddEmployee from "./pages/dashboard/AddEmployee";
import Employees from "./pages/dashboard/Employees";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      
      {/* Dashboard with subroutes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Enseignants />} /> {/* Default route */}
        <Route path="enseignants" element={<Enseignants />} />
        <Route path="addTeacher" element={<AddTeacher />} />
        <Route path="TeacherProfil" element={<TeacherProfil />} />
        <Route path="employes" element={<Employees />} />
        <Route path="addEmployee" element={<AddEmployee />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
