import { useState } from "react";
import { BiCloset } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import SideBar from "../../components/SideBar";
import Card from "../../components/ui/Card";
import SearchBar from "../../components/ui/SearchBar";
import Image1 from '../../assets/image copy 4.png'

const Dashboard: React.FC = () => {
const [isSidebarOpen , setIsSidebarOpen] = useState(false)

 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-max-content  text-black overflow-x-hidden  relative">
      
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-gray-800 p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <BiCloset size={24} /> : <BiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 h-full bg-white flex flex-col items-start p-4 transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0 w-[50%]" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="w-full">
            <SideBar />
        </div>
      </div>

      {/* Content Area */}
      <div className="col-span-1 lg:col-span-3  gap-10 mb-10 bg-[var(--color-sous)]">
        {/* search*/}
        <div className="w-[90%] p-2 m-auto mb-10 flex items-center justify-between pt-4">
            <SearchBar />
            <div className="flex items-center gap-2">
            <img src={Image1} alt="user image" className="rounded-[50%] w-[48px] h-[48px]" />
                <div >
                    <h2 className="font-semibold">first name last name</h2>
                    <span className="text-gray-500 text-[12px]">Admin</span>
                </div>
            </div>
        </div>
        {/* add teacher */}
        <div className="w-[90%] bg-white p-4 m-auto mb-10 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Liste des Enseignants</h2>

      <div className="flex w-[90%] justify-between items-center">
        {/* Filtres */}
        <div className="flex items-center gap-6">
          {/* Ordre */}
          <div className="flex flex-col items-start">
            <label htmlFor="ordre" className="text-gray-700 font-medium">Ordre</label>
            <select 
              name="ordre" 
              id="ordre" 
              className="border border-[var(--color-yousra)] p-1 rounded-md"
            >
              <option value="croissant">Croissant</option>
              <option value="décroissant">Décroissant</option>
            </select>
          </div>

          {/* Filtre */}
          <div className="flex flex-col items-start">
            <label htmlFor="filtre" className="text-gray-700 font-medium">Filtre</label>
            <select 
              name="filtre" 
              id="filtre" 
              className="border border-[var(--color-yousra)] p-1 rounded-md"
            >
              <option value="alphabet">Alphabet</option>
              <option value="age">Âge</option>
            </select>
          </div>
        </div>

        {/* Bouton Ajouter */}
        <button className="flex items-center gap-2 bg-[var(--color-yousra)] text-white px-4 py-2 rounded-md shadow-lg hover:shadow-2xl  hover:cursor-pointer hover:scale-105 transition-all duration-200">
  <GrAddCircle /> <span>Ajouter un Enseignant</span>
</button>



      </div>
    </div>
        <div className="w-[90%]  m-auto grid grid-cols-3 gap-4"> 
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
