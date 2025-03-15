import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Dashboard from "./pages/dashboard/Dashboard";
import Enseignants from "./pages/dashboard/Enseignants";
import AddTeacher from "./pages/dashboard/AddTeacher";
import TeacherProfil from "./pages/dashboard/TeacherProfil";
import Eleve from "./pages/dashboard/Eleve";
import AddEmployee from "./pages/dashboard/AddEmployee";
import Employees from "./pages/dashboard/Employees";
import GestionClass from "./pages/dashboard/GestionClass";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
function AppRoutes() {
  return (
    <>
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      {/* Dashboard with subroutes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Enseignants />} /> {/* Default route */}
        <Route path="enseignants" element={<Enseignants />} />
        <Route path="addTeacher" element={<AddTeacher />} />
        <Route path="TeacherProfil" element={<TeacherProfil />} />
        <Route path="eleves" element={<Eleve />} />
        <Route path="*" element={<div>Page Not Found</div>} />
        <Route path="employes" element={<Employees />} />
        <Route path="addEmployee" element={<AddEmployee />} />
        <Route path="gestion" element={<GestionClass />} />

      </Route>
      
    </Routes>
    <Toaster />

    </>
  );
}

export default AppRoutes;
