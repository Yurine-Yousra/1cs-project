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
} from "lucide-react"
import { IshakLogo } from "../../assets"

export default function Sidebar() {
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
          fixed xl:static bg-white border-r border-gray-200 h-screen z-30
          w-[280px] md:w-[70px] xl:w-[280px] transition-all duration-300 ease-in-out
          ${isOpen ? "left-0" : "-left-[280px]"} md:left-0
          flex flex-col
        `}
      >
        <div className="p-4 md:p-2 xl:p-6 flex justify-center md:justify-center xl:justify-start">
          <img src={IshakLogo} alt="Logo" className="w-36 md:w-36 xl:w-48" />
        </div>

        <nav className="flex flex-col gap-1.5 overflow-y-auto flex-grow">
          {sidebarArray.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap]
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center rounded-md mx-auto px-4 py-3 text-gray-700
                  md:justify-center xl:justify-start
                  w-[94%] md:w-[90%] xl:w-[94%]
                  ${isActive ? "text-white bg-yousra" : "hover:bg-indigo-100"}
                `}
              >
                <span className="w-6 h-6 mr-3 md:mr-0 xl:mr-3 flex-shrink-0">
                  <IconComponent size={20} />
                </span>
                <span className="truncate md:hidden xl:inline">{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button
            className="flex items-center text-error hover:bg-red-50 rounded-md px-4 py-3 hover:text-red-700 transition-colors
  md:justify-center xl:justify-start
  w-[94%] md:w-[90%] xl:w-[94%] mx-auto"
          >
            <LogOut className="w-5 h-5 mr-2 md:mr-0 xl:mr-2 flex-shrink-0" />
            <span className="md:hidden xl:inline">Se deconnecter</span>
          </button>
        </div>
      </aside>
    </>
  )
}
