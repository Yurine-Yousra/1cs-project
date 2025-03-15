import { NavLink, useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Image1 from '../assets/image copy 6.png';
import Image2 from '../assets/image copy 7.png';
import Image3 from '../assets/image copy 8.png';
import Image4 from '../assets/image copy 9.png';
import Image5 from '../assets/image copy 15.png';
import Image6 from '../assets/image copy 11.png';
import Image7 from '../assets/image copy 12.png';
import Image8 from '../assets/image copy 13.png';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface SidebarProps {
  minimized: boolean;
  setMinimized: (value: boolean) => void;
}

const SideBar: React.FC<SidebarProps> = ({ minimized, setMinimized }) => {
  const location = useLocation();
  const isAddTeacherPage = ["addTeacher", "addEmployee"].some(substring =>
    location.pathname.includes(substring)
  );

  const sidebarArray = [
    { path: "/dashboard/statistics", icon: Image2, title: "Statistiques" },
    { path: "/dashboard/enseignants", icon: Image5, title: "Enseignants" },
    { path: "/dashboard/eleves", icon: Image7, title: "Élèves" },
    { path: "/dashboard/employes", icon: Image3, title: "Employés" },
    { path: "/dashboard/gestion", icon: Image4, title: "Gestion des classes" },
    { path: "/dashboard/examens", icon: Image8, title: "Planification" },
    { path: "/dashboard/paiments", icon: Image6, title: "Paiments" },
    { path: "/dashboard/etablissement", icon: Image1, title: "Etablissement" },
  ];

  return (
    <div className=" w-[97%] m-auto">
      {!isAddTeacherPage && !minimized && (
        <h1 className="text-xl font-bold mb-6 pl-20">Dirassati</h1>
      )}

      {!isAddTeacherPage && !minimized && (
        <div className="mb-10 border-b-2 border-gray-300 pb-10">
          <NavLink
            to={sidebarArray[7].path}
            className={({ isActive }) =>
              `flex gap-2 items-center w-full p-2 rounded-lg cursor-pointer transition-all ${
                isActive ? "bg-[var(--color-yousra)] text-white" : "hover:bg-gray-200"
              }`
            }
          >
            <img 
              src={sidebarArray[7].icon} 
              alt={sidebarArray[7].title} 
              className={`w-8 h-8 transition-all ${
                location.pathname.startsWith(sidebarArray[7].path) ? "filter brightness-0 invert" : ""
              }`}
            />
            <span className="text-[14px] font-semibold">{sidebarArray[7].title}</span>
          </NavLink>
        </div>
      )}

      {/* Main Sidebar List */}
      {(!isAddTeacherPage && !minimized) && (
        <div className="relative">
          <div
            className="absolute  z-40 -top-42 -right-4.5 bg-[var(--color-yousra)] p-2 rounded-full cursor-pointer"
            onClick={() => setMinimized(!minimized)}
          >
            <IoIosArrowBack className="text-white" />
          </div>

          <ul className="flex flex-col items-start gap-4 font-semibold">
            {sidebarArray.slice(0, 7).map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={() =>
                  `flex gap-2 items-center w-full p-2 rounded-lg cursor-pointer transition-all ${
                    location.pathname.startsWith(item.path) ? "bg-[var(--color-yousra)] text-white" : "hover:bg-gray-200"
                  }`
                }
              >
                <img 
                  src={item.icon} 
                  alt={item.title} 
                  className={`w-7 h-7 transition-all ${
                    location.pathname.startsWith(item.path) ? "filter brightness-0 invert" : ""
                  }`}
                />
                <span className="text-[14px]">{item.title}</span>
              </NavLink>
            ))}
          </ul>

          {/* Settings & Logout */}
          <ul className="flex flex-col items-start gap-2 font-semibold mt-10 border-t-2 border-gray-300 w-full pt-16">
            <li className="flex gap-2 items-center w-full p-2 hover:bg-gray-200 rounded-md cursor-pointer text-red-500 ">
              <BiLogOut />
              <span>Se Déconnecter</span>
            </li>
          </ul>
        </div>
      )}

      {/* Minimized Sidebar */}
      {(isAddTeacherPage || minimized) && (
        <div className="w-full flex flex-col items-center mt-4 relative">
          <div
            className="absolute -right-1 bg-[var(--color-yousra)] p-2 rounded-full cursor-pointer"
            onClick={() => setMinimized(!minimized)}
          >
            <IoIosArrowForward className="text-white" />
          </div>
          <img src={sidebarArray[7].icon} alt={sidebarArray[7].title} 
           className={`w-6 h-6 transition-all ${
            location.pathname.startsWith(sidebarArray[7].path) ? "filter brightness-0 invert" : ""
          }`}
          />
          <ul className="flex flex-col items-center gap-4 font-semibold mt-20">
            {sidebarArray.slice(0, 7).map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={() =>
                  `flex gap-2 items-center w-full p-2 rounded-lg cursor-pointer transition-all ${
                    location.pathname.startsWith(item.path) ? "bg-[var(--color-yousra)] text-white" : "hover:bg-gray-200"
                  }`
                }
              >
                <img 
                  src={item.icon} 
                  alt={item.title} 
                  className={`w-10 h-10 transition-all ${
                    location.pathname.startsWith(item.path) ? "filter brightness-0 invert" : ""
                  }`}
                />
              </NavLink>
            ))}
          </ul>

          {/* Settings & Logout in Minimized Mode */}
          <ul className="flex flex-col items-start gap-4 font-semibold mt-10 border-t border-gray-500">
            <li className="w-full p-2 hover:bg-gray-200 rounded-md cursor-pointer text-red-500">
              <BiLogOut size={26} className="mt-28" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;