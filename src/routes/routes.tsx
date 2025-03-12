import { Routes, Route } from "react-router-dom";
import Registration from "../pages/auth/Registration";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import AddTeacher from "../pages/dashboard/AddTeacher";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard/>} />
        <Route path="/addTeacher" element={<AddTeacher/>} />
        
      </Routes>
  );
}

export default AppRoutes;
