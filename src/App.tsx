import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Dashboard from "./pages/dashboard/Dashboard";
import Enseignants from "./pages/dashboard/Enseignants";
import AddTeacher from "./pages/dashboard/AddTeacher";
import TeacherProfil from "./pages/dashboard/TeacherProfil";
import Eleve from "./pages/dashboard/Eleve";
import AddEmployee from "./pages/dashboard/AddEmployee";
import Employees from "./pages/dashboard/Employees";
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard'
import Absence from "./pages/TeacherDashboard/Absence";
import Etablisment from "./pages/dashboard/Etablisment";
import Home from "./pages/home/Home";
import GestionClass from "./pages/dashboard/GestionClass";
import { Toaster } from "react-hot-toast";
import Profil from "./pages/TeacherDashboard/Profil";

const App = () => {
 
  return (
    <>
    <Routes>
      <Route path="/register" element={<UnProtectedRoute><Registration /></UnProtectedRoute>} />
      <Route path="/login" element={<UnProtectedRoute><Login /></UnProtectedRoute>} />
      <Route path="/" element={<Home />} />
      {/* Dashboard with subroutes */}
      <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> }>
        <Route index element={<Etablisment />} /> {/* Default route */}
        <Route path="enseignants" element={<Enseignants />} />
        <Route path="addTeacher" element={<AddTeacher />} />
        <Route path="TeacherProfil" element={<TeacherProfil />} />
        <Route path="eleves" element={<Eleve />} />
        <Route path="*" element={<div>Page Not Found</div>} />
        <Route path="employes" element={<Employees />} />
        <Route path="addEmployee" element={<AddEmployee />} />
        <Route path="gestion" element={<GestionClass />} />

        <Route path="établisment" element={<Etablisment />} />
      </Route>

      <Route path="/Teacherdashboard" element={<TeacherDashboard />}>
        <Route index element={<Etablisment />} /> {/* Default route */}
        <Route path="enseignants" element={<Enseignants />} />
        <Route path="TeacherProfil" element={<TeacherProfil />} />
        <Route path="eleves" element={<Absence />} />
        <Route path="établisment" element={<Etablisment />} />
        <Route path="profile" element={<Profil />} />
        <Route path="notes" element={<></>} />

      </Route>
      
    </Routes>
    <Toaster />

    </>
  );
}

export default App;






const ProtectedRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token)
  return children;
  else 
  return <Navigate to='/login' replace />;
};

const UnProtectedRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token)
  return children;
  else 
  return <Navigate to='/dashboard' replace />;
};