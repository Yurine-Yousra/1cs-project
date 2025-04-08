import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { BarChart2, Users, User, Briefcase, BookOpen, Calendar, CreditCard, Building } from "lucide-react";
import Logo from "../../assets/6028568452496737456.jpg"

export default function Sidebar() {
  const location = useLocation();

  // Map the icon names to actual components
  const iconMap = {
    Image1: Building,
    Image2: BarChart2,
    Image3: Briefcase,
    Image4: BookOpen,
    Image5: Users,
    Image6: CreditCard,
    Image7: User,
    Image8: Calendar,
  };

  // Sidebar links array
  const sidebarArray = [
    { path: "/dashboard/etablisment", icon: "Image1", title: "Etablissement" },
    { path: "/dashboard/statistics", icon: "Image2", title: "Statistiques" },
    { path: "/dashboard/enseignants", icon: "Image5", title: "Enseignants" },
    { path: "/dashboard/eleves", icon: "Image7", title: "Élèves" },
    { path: "/dashboard/employes", icon: "Image3", title: "Employés" },
    { path: "/dashboard/gestion", icon: "Image4", title: "Gestion des classes" },
    { path: "/dashboard/examens", icon: "Image8", title: "Planification" },
    { path: "/dashboard/paiments", icon: "Image6", title: "Paiments" },
  ];

  return (
    <aside className=" bg-white w-80 border-r border-gray-200 h-screen gap-2 flex flex-col">
      <div className="p-6">
          <img src={Logo} alt="ssssss" className="w-48" />
      </div>

      <nav className="flex flex-col gap-1.5">
        {sidebarArray.map((item,index) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
          const isActive = location.pathname === item.path;
          const isEtablisment = index === 0;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center w-[94%] rounded-md mx-auto px-4 py-3 text-gray-700  ${
                isActive ? "text-white bg-yousra" : "hover:bg-indigo-100 "
              }
               ${  isEtablisment ? "font-bold h-20 text-xl bg-indigo-100 ":"" }
              `}
            >
              <span className="w-6 h-6 mr-3">
                <IconComponent size={20} />
              </span>
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <button className="flex items-center text-error hover:bg-red-50  w-[94%] mx-auto  rounded-md  px-4 py-3   hover:text-red-700 transition-colors">
          <LogOut className="w-5 h-5 mr-2" />
          <span>Se deconnecter</span>
        </button>
      </div>
    </aside>
  );
}