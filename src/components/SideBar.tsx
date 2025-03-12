import { NavLink, useLocation } from "react-router-dom";
import { BsPerson, BsPeople } from "react-icons/bs";
import { PiExam } from "react-icons/pi";
import { MdSubscriptions, MdOutlineManageAccounts } from "react-icons/md";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FaSchool } from "react-icons/fa";

const SideBar: React.FC = () => {
  const location = useLocation();
  const isAddTeacherPage = location.pathname.includes("addTeacher");
    
  const sidebarArray = [
    { path: "/dashboard", icon: <FaArrowUpRightDots size={24} />, title: "Dashboard" },
    { path: "/dashboard/enseignants", icon: <PiChalkboardTeacherLight size={24} />, title: "Enseignants" },
    { path: "/dashboard/eleves", icon: <BsPerson size={24} />, title: "Élèves" },
    { path: "/dashboard/employes", icon: <BsPeople size={24} />, title: "Employés" },
    { path: "/dashboard/gestion", icon: <MdOutlineManageAccounts size={24} />, title: "Gestion des classes" },
    { path: "/dashboard/examens", icon: <PiExam size={24} />, title: "Planification" },
    { path: "/dashboard/abonnement", icon: <MdSubscriptions size={24} />, title: "Paiments" }
  ];

  return (
    <div className="h-screen ">
      {!isAddTeacherPage && <h1 className="text-xl font-bold mb-6">Dirassati</h1>}

      {/* Main Sidebar List */}
      { !isAddTeacherPage && (
        <div>
          <ul className="flex flex-col items-start gap-4 font-semibold">
            {sidebarArray.map((item, index) => (
              <NavLink 
                key={index} 
                to={item.path}
                className={ 
                  `flex gap-2 items-center w-full p-2 rounded-lg cursor-pointer transition-all ${
                    location.pathname === item.path ? "bg-[var(--color-yousra)] text-white" : "hover:bg-gray-200"
                  }`
                }
              >
                {item.icon} <span className="text-[14px]">{item.title}</span>
              </NavLink>
            ))}
          </ul>

          {/* Settings & Logout */}
          <ul className="flex flex-col items-start gap-2 font-semibold mt-10 border-t-2 border-gray-300 w-full pt-4">
            <li className="flex gap-2 items-center w-full p-2 hover:bg-gray-200 rounded-md cursor-pointer">
              <CiSettings />
              <span>Settings</span>
            </li>
            <li className="flex gap-2 items-center w-full p-2 hover:bg-gray-200 rounded-md cursor-pointer text-red-500">
              <BiLogOut />
              <span>Logout</span>
            </li>    
          </ul>
        </div>
      )}

      {/* Minimized Sidebar for AddTeacher Page */}
      { isAddTeacherPage && (
        <div className="w-full flex flex-col items-center mt-4">
          <h1 className="mb-6">LOGO</h1>
          <FaSchool size={24} />
          <ul className="flex flex-col items-center gap-4 font-semibold mt-20">
            {sidebarArray.map((item, index) => (
              <NavLink 
                key={index} 
                to={item.path}
                className={({ isActive }) =>
                  `flex gap-2 items-center w-full p-2 rounded-lg cursor-pointer transition-all ${
                    isActive  ? "bg-[var(--color-yousra)] text-white" : "hover:bg-gray-200"
                  }`
                }
              >
                {item.icon} 
              </NavLink>
            ))}
          </ul>

          {/* Settings & Logout in Minimized Mode */}
          <ul className="flex flex-col items-start gap-4 font-semibold mt-10 border-t border-gray-700">
            <li className="w-full p-2 hover:bg-gray-200 cursor-pointer">
              <CiSettings size={24} />
            </li>
            <li className="w-full p-2 hover:bg-gray-200 rounded-md cursor-pointer text-red-500">
              <BiLogOut size={24} />
            </li>    
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;
