import { useEffect, useState } from "react";
import { IoIosArrowDown, IoMdArrowBack } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";
import SearchBar from "../../components/ui/SearchBar";
import { DataTable } from "../../components/ui/TableData";
import { Link, useSearchParams } from "react-router-dom";

import StudentForm from "../../components/forms/StudentForm";
import  StudentProfile  from "../../components/profile/StudentProfile";



const Eleve = () => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("");


  





  useEffect(() => {
    setTab(searchParams.get("tab") || "");
  }, [searchParams]);

  if (tab === "addEleve") {
    return (
      <main className="bg-sous py-10">
        <Link to="" className="">
          <button className=" ml-18 mt-5    flex items-center gap-2 bg-yousra text-white px-4 py-2 rounded-4xl shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200">
            <IoMdArrowBack size={20} />
            <span>Back </span>
          </button>
        </Link>
        <StudentForm />
      </main>
    );
  } 
  if ( tab === "student-details"){
    return( 
    <main className="" >
       <Link to="" className="">
          <button className=" ml-18 mt-5    flex items-center gap-2 bg-yousra text-white px-4 py-2 rounded-4xl shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200">
            <IoMdArrowBack size={20} />
            <span>Back </span>
          </button>
        </Link>
      <StudentProfile /> 
    </main>
    )
  }
  else {
    return (
      <main className="mt-2  w-[90%] m-auto h-full">
        <nav className="flex justify-between items-center px-10 ">
<h2 className="text-3xl font-semibold  text-[var(--color-yousra)]  flex items-center gap-2 mb-5">
  <svg
    className="w-7 h-7 text-[var(--color-yousra)]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m10-4a4 4 0 11-8 0 4 4 0 018 0zm-8 0a4 4 0 100-8 4 4 0 000 8z"
    />
  </svg>
  Liste des Eleves
</h2>          <div className="flex gap-4 items-center">
            <span>
              <h3 className="font-semibold">N.Mohammed</h3>
              <p className="text-gray" dir="rtl">Secretary</p>
            </span>
            <img
              src="https://avatars.githubusercontent.com/u/124599?v=4"
              width={46}
              alt="avatar"
              className="rounded-full"
            />
          </div>
        </nav>

        <div className="mt-10 px-10 flex justify-between">
          <SearchBar />
          {(tab === "" || tab === "class" )&& (
            <div className="flex items-center gap-4">
            <div className="relative w-48">
              <select
                id="filter-Eleve"
                className="appearance-none border-2 w-full cursor-pointer border-yousra px-7 font-semibold text-xl text-yousra p-2 rounded-4xl"
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
              >
                <option value="alphabet">Plus récent</option>
                <option value="age">Old one</option>
              </select>
              <IoIosArrowDown
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />
            </div>
            <Link to={"?tab=addEleve"}>
              <button
                className="flex items-center gap-2 bg-yousra text-white px-4 py-2 rounded-4xl shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
              >
                <span>Ajouter un Eleve</span>
                <GrAddCircle />
              </button>
            </Link>
          </div>
          )}
          
        </div>
        
        

           <DataTable />       
      </main>
    );
  }
};

export default Eleve;
