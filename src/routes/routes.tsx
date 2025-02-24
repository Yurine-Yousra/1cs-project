import { Routes, Route } from "react-router-dom";
import Registration from "../pages/Registration";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Registration />} />
      </Routes>
  );
}

export default AppRoutes;
