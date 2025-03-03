import { Routes, Route } from "react-router-dom";
import Registration from "../pages/auth/Registration";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
  );
}

export default AppRoutes;
