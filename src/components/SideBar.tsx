import { BsPerson, BsPeople } from "react-icons/bs";
import { PiExam } from "react-icons/pi";
import { MdSubscriptions, MdOutlineManageAccounts } from "react-icons/md";
import { useState } from "react";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";

const SideBar = () => {
    const sidebar_array = [
        { icon: <FaArrowUpRightDots />, title: "Dashboard" },
        { icon: <PiChalkboardTeacherLight />, title: "Enseignants" },
        { icon: <BsPerson />, title: "Élèves" },
        { icon: <BsPeople />, title: "Employés" },
        { icon: <MdOutlineManageAccounts />, title: "Gestion des classes" },
        { icon: <PiExam />, title: "Planification Examens" },
        { icon: <MdSubscriptions />, title: "Dirassati abonnement" }
    ];
    const [tab, setTab] = useState<string>("Dashboard");

    return (
        <div className="h-screen p-5 ">
            <h1 className="text-xl font-bold mb-6">Dirassati</h1>

            {/* Liste principale */}
            <ul className="flex flex-col items-start gap-4 font-semibold">
                {sidebar_array.map((element, index) => (
                    <li
                        key={index}
                        className={`flex gap-2 items-center w-full p-2 rounded-lg cursor-pointer transition-all ${
                            tab === element.title
                                ? "bg-[var(--color-yousra)] text-white"
                                : "hover:bg-gray-200"
                        }`}
                        onClick={() => setTab(element.title)}
                    >
                        {element.icon}
                        <span>{element.title}</span>
                    </li>
                ))}
            </ul>

            {/* Section Paramètres & Déconnexion */}
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
    );
};

export default SideBar;
