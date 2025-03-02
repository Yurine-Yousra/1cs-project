import { Routes, Route } from "react-router-dom";
import Registration from "../pages/Registration";
import Login from "../pages/Login";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<h1>  sssss </h1>} />
      </Routes>
  );
}

export default AppRoutes;
