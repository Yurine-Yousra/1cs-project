import { NavLink, useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Image1 from '../../assets/image copy 6.png';
import Image2 from '../../assets/image copy 7.png';
import Image3 from '../../assets/image copy 8.png';
import Image4 from '../../assets/image copy 9.png';
import Image5 from '../../assets/image copy 15.png';
import Image7 from '../../assets/image copy 12.png';
import Image8 from '../../assets/image copy 13.png';




interface SidebarProps {
  minimized: boolean;
  setMinimized: (value: boolean) => void;
}

const TeacherSideBar: React.FC<SidebarProps> = ({ minimized }) => {
  const location = useLocation();
  const isAddTeacherPage = ["addTeacher", "addEmployee"].some(substring =>
    location.pathname.includes(substring)
  );

  const sidebarArray = [
    { path: "/Teacherdashboard/profile", icon: Image2, title: "profile" },
    { path: "/Teacherdashboard/enseignants", icon: Image5, title: "Enseignants" },
    { path: "/Teacherdashboard/eleves", icon: Image7, title: "Élèves" },
    { path: "/Teacherdashboard/employes", icon: Image3, title: "Employés" },
    { path: "/Teacherdashboard/gestion", icon: Image4, title: "Gestion des classes" },
    { path: "/Teacherdashboard/examens", icon: Image8, title: "Planification" },
    { path: "/Teacherdashboard/etablissement", icon: Image1, title: "Etablissement" },
  ];

  

  return (
    <div className="h-screen w-[90%] m-auto ">
      {!isAddTeacherPage && !minimized && (
        <h1 className="text-xl font-bold my-6 pl-20">Dirassati</h1>
      )}

      {!isAddTeacherPage && !minimized && (
        <div className="mb-4 border-b-2 border-gray-300 pb-3" >
          <NavLink
            to={sidebarArray[6].path}
            className={({ isActive }) =>
              `flex gap-2 items-center w-full p-2 rounded-lg cursor-pointer transition-all ${
                isActive ? "bg-[var(--color-yousra)] text-white" : "hover:bg-gray-200"
              }`
            }
          >
            <img 
              src={sidebarArray[6].icon} 
              alt={sidebarArray[6].title} 
              className={`w-6 h-6 transition-all ${
                location.pathname.startsWith(sidebarArray[6].path) ? "filter brightness-0 invert" : ""
              }`}
            />
            <span className="text-[14px] font-semibold">{sidebarArray[6].title}</span>
          </NavLink>
        </div>
      )}

      {/* Main Sidebar List */}
      {(!isAddTeacherPage && !minimized) && (
        <div className="relative">
          <ul className="flex flex-col items-start gap-3 font-semibold border-b-2 border-gray-300 ">
            {sidebarArray.slice(0, 6).map((item, index) => (
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
                  className={`w-6 h-5 transition-all ${
                    location.pathname.startsWith(item.path) ? "filter brightness-0 invert" : ""
                  }`}
                />
                <span className="text-[15px] leading-1">{item.title}</span>
              </NavLink>
            ))}
          </ul>

          {/* Settings & Logout */}
          <ul className="flex flex-col items-start gap-2 font-semibold mt-60  w-full ">
            <li className="flex gap-2 items-center w-full p-2 hover:bg-gray-200 rounded-md cursor-pointer text-red-500 ">
              <BiLogOut  size={24}/>
              <span>Se Déconnecter</span>
            </li>
          </ul>
        </div>
      )}

      {/* Minimized Sidebar */}
       {(isAddTeacherPage || minimized) && (
        <div className="relative mt-19 ">
          <ul className="flex flex-col items-center justify-center gap-3 font-semibold border-b-2 pb-1 border-gray-300 w-[70%]  m-auto">
          <div className="mb-1 border-b-2 border-gray-300 pb-3 " >


          <NavLink
            to={sidebarArray[6].path}
            className={({ isActive }) =>
              `flex gap-2 items-center w-full p-2 rounded-lg cursor-pointer transition-all ${
                isActive ? "bg-[var(--color-yousra)] text-white" : "hover:bg-gray-200"
              }`
            }
          >
            <img 
              src={sidebarArray[6].icon} 
              alt={sidebarArray[6].title} 
              className={`w-6 h-6 transition-all ${
                location.pathname.startsWith(sidebarArray[6].path) ? "filter brightness-0 invert" : ""
              }`}
            />
          </NavLink>

        </div>
            {sidebarArray.slice(0, 6).map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={() =>
                  `w-full p-2 rounded-lg cursor-pointer transition-all  ${
                    location.pathname.startsWith(item.path) ? "bg-[var(--color-yousra)] text-white" : "hover:bg-gray-200"
                  }`
                }
              >
                <img 
                  src={item.icon} 
                  alt={item.title} 
                  className={`w-[90%] h-5 transition-all ${
                    location.pathname.startsWith(item.path) ? "filter brightness-0 invert" : ""
                  }`}
                />
              </NavLink>
            ))}
          </ul>

          {/* Settings & Logout */}
          <ul className="flex flex-col items-start  font-semibold mt-60  w-[70%] m-auto">
            <li className="flex gap-2 items-center w-full p-2 hover:bg-gray-200 rounded-md cursor-pointer text-red-500 ">
              <BiLogOut  size={24}/>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeacherSideBar;
