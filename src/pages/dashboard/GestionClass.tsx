import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr"
import SearchBar from "../../components/ui/SearchBar"
import ClassCard from "../../components/ui/ClassTable";
import { Link,  useSearchParams } from "react-router-dom";

 const GestionClass = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const [tab, setTab] = useState<string>("");
  
    useEffect(() => {
      setTab(searchParams.get("tab") || "");
    }, [searchParams]);

  return (
    <main className=" w-[90%] m-auto mt-5">
            <nav className="flex justify-between items-center  px-10">
                <h1 className="text-yousra text-3xl font-semibold"  >Listes des élèves</h1>
                <div className="flex gap-4 items-center">
                    <span>
                            <h3 className="font-semibold">N.Mohammed</h3>
                            <p className="text-gray " dir="rtl">Secretary</p>
                    </span>
                    <img src="https://avatars.githubusercontent.com/u/124599?v=4" width={46} alt="avatar" className="rounded-full" />
                </div>
            </nav>

            <div className="mt-10 px-10 flex justify-between">
                <SearchBar />
                        
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

                        <Link
                            className="flex items-center gap-2 bg-yousra text-white px-4 py-2 rounded-4xl shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
                            to={"?tab=addGroup"}
                          >
                                <span>Ajouter une classe</span>
                            <GrAddCircle /> 
                          </Link>
                    
                    </div>
                        
                            
            
            
            
            
            
            
            </div>  


            {/* <div className=" px-10  mt-12 text-[#777777]">
                <div className="flex gap-10 w-80   border-b">
                {[{  
                  link:"class",
                  icon:<CiUser size={20} />
                }
                ,{
                  link:"matieres",
                  icon:<MdOutlineEventNote size={20} />
                }
                ,{
                  link:"temps",
                  icon:<CiCalendar size={20} />

                }
              ].map((tabs) => (
                  <Link to={`?tab=${tabs.link}`} 
                  className={`flex items-center gap-1 hover:text-yousra  ${( tab === tabs.link  || (tab === "" && tabs.link==="class") ) && "text-yousra font-semibold"} hover:shadow-2xl hover:cursor-pointer hover:scale-125 transition-all duration-200`}
                  >
                    {tabs.icon}
                    <span>{tabs.link} </span>
                  </Link>

                ))}
                 </div>
        </div> */}


              
                        { (tab === "" ) &&  <ClassCard /> }       
                        { tab === "addGroup" &&  "fuck you"   }
            
                                        
                                    



        
    </main>
  )
}
export default GestionClass