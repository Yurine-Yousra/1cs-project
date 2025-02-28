import { Routes, Route } from "react-router-dom";
import Registration from "../pages/Registration";
import Login from "../pages/Login";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  );
}

export default AppRoutes;
