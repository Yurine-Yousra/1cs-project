export interface SidebarItem {
    path: string;
    icon: string;
    title: string;
  }
  
 export const sidebarArray: SidebarItem[] = [
    { path: "/dashboard/etablisment", icon: "Image9", title: "Etablissement" },
    { path: "/dashboard", icon: "Image2", title: "Statistiques" },
    { path: "/dashboard/enseignants", icon: "Image11", title: "Enseignants" },
    { path: "/dashboard/eleves", icon: "Image7", title: "Élèves" },
    { path: "/dashboard/employes", icon: "Image3", title: "Employés" },
    { path: "/dashboard/gestion", icon: "Image4", title: "Gestion des classes" },
    { path: "/dashboard/examens", icon: "Image8", title: "Planification" },
    { path: "/dashboard/paiments", icon: "Image6", title: "Paiments" },
  ];
  


export  const sidebarArrayTeacher:SidebarItem[] = [
    { path: "/Teacherdashboard/TeacherProfil", icon: "Image12", title: "Profile" },
    { path: "/Teacherdashboard/profile", icon: "Image13", title: "Statistiques" },
    { path: "/Teacherdashboard/eleves", icon: "Image7", title: "Absence" },
   { path: "/Teacherdashboard/notes", icon: "Image14", title: "Notes" },
    { path: "/Teacherdashboard/examens", icon: "Image8", title: "Planification" },
  ]