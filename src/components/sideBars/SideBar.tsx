"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LogOut,
  BarChart2,
  Users,
  User,
  Briefcase,
  BookOpen,
  Calendar,
  CreditCard,
  Building,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { IshakLogo, LogowithoutText } from "../../assets"

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({isCollapsed,setIsCollapsed}:SidebarProps) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar")
      const toggleButton = document.getElementById("sidebar-toggle")

      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(true)
      } 
      else{
        setIsCollapsed(false);
      }
    }
  
    // Call it once on mount
    handleResize()
  
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [setIsCollapsed])
  
  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

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
  }

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
  ]

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-20 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Mobile Toggle Button */}
      <button
        id="sidebar-toggle"
        className="fixed top-4 left-4 z-30 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed bg-white border-r border-gray-200 h-screen z-30
          transition-all duration-300 ease-in-out
          ${isOpen ? "left-0" : "-left-[280px]"} md:left-0
          flex flex-col overflow-hidden
          ${isCollapsed ? "w-[85px]" : "w-[280px]"}
        `}
      >
        <div className="p-4 md:p-4  flex  justify-center md:justify-center xl:justify-start">
          {isCollapsed ? (
            <img src={LogowithoutText || "/placeholder.svg"} alt="Logo without text" className="w-24 " />
          ) : (
            <img src={IshakLogo || "/placeholder.svg"} alt="Logo with text" className="w-48" />
          )}
        </div>

        <nav className="flex flex-col gap-1.5 overflow-y-auto flex-grow">
          {sidebarArray.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap]
            const isActive = location.pathname === item.path
            const isActiveAdd =
              (location.pathname === "/dashboard/addTeacher" && index === 2) ||
              (location.pathname === "/dashboard/addEmployee" && index === 4)

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center rounded-md mx-auto px-4 py-3 text-gray-700
                  ${isCollapsed ? "justify-center" : "justify-start w-[94%]"}
                  
                  ${isActive || isActiveAdd ? "text-white bg-yousra" : "hover:bg-indigo-100"}
                `}
              >
                <span className={`w-6 h-6 ${isCollapsed ? "mr-0" : "mr-3"} flex-shrink-0`}>
                  <IconComponent size={24} />
                </span>
                {!isCollapsed && <span className="truncate">{item.title}</span>}
              </Link>
            )
          })}
        </nav>

        <Link 
          to={"/"}
        className="p-4 mt-auto">
          <button
            className={`
              flex items-center text-error hover:bg-red-50 rounded-md px-4 py-3 hover:text-red-700 transition-colors
              ${isCollapsed ? "justify-center" : "justify-start"}
              w-[94%] mx-auto
            `}
          >
            <LogOut className={`w-5 h-5 ${isCollapsed ? "mr-0" : "mr-2"} flex-shrink-0`} />
            {!isCollapsed && <span>Se deconnecter</span>}
          </button>
        </Link>

        {/* Collapse Toggle Button */}
        <button
  onClick={toggleCollapse}
  className="fixed top-15 left-[270px] z-40 hidden md:inline-block hover:bg-yousra hover:text-white bg-white border border-gray-200 rounded-full p-1 shadow-md transition-all duration-300"
  style={{ left: isCollapsed ? "73px" : "266px" }}
>
  {isCollapsed ? (
    <ChevronRight size={16} />
  ) : (
    <ChevronLeft size={16} />
  )}
</button>
      </aside>
    </>
  )
}
