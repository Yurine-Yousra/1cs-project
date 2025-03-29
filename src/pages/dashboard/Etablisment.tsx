import Profile from "../../components/ui/profile"
import Image1 from '../../assets/image copy 4.png'
import { BiPlus } from "react-icons/bi"
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { IoCalendarNumber } from "react-icons/io5";
const Etablisment = () => {
  return (
    <div className="w-[90%] m-auto">
       <div className="w-full flex items-center justify-between mt-4 ">
        <h1 className="text-[var(--color-yousra)] text-[25px] font-semibold">{`Information d'établissement`}</h1>
        <Profile />
      </div>


      <div className="bg-white pt-4 mt-10 flex flex-col items-start">

        <div className="w-full px-6  ">
            <img src={Image1} alt="" />
        </div>
        

        <div className="flex items-start justify-between w-[95%] m-auto   mt-6   ">
<div className=" flex flex-col items-start gap-4 w-[45%]  ">
                        <div  className="w-full ">
                            <label className="text-gray-600 text-[14.5px]">{`Nom d'établissement`}</label>
                            <div>
                            <input type="text" name="nom" className="w-full  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2"  />

                            </div>
                        </div> <div className="w-full ">
                            <label className="text-gray-600 text-[14.5px]">{`Email d'établissement`}</label>
                            <div className="relative">
                                <MdOutlineMailOutline  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" / >
                            <input type="text" name="nom" className="w-full  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2"  />

                            </div>
                        </div> <div className="w-full ">
                            <label className="text-gray-600 text-[14.5px]">Date de création</label>
                            <div className="relative">
                            <IoCalendarNumber className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"  />
                            <input type="text" name="nom" className="w-full  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2"  />

                            </div>
                        </div> <div className="w-full ">
                            <label className="text-gray-600 text-[14.5px]">Numéro de telephone</label>
                            <div className="relative">
<LuPhone  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input type="text" name="nom" className="w-full  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2"  />

                            </div>
                        </div>

        
                       <button
                                   className="flex items-center gap-2 bg-[var(--color-yousra)] text-white px-4 py-2  shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
                                 >
                                   <span>Ajouter un contact</span> <BiPlus />
                                 </button>
</div>
<div className=" flex flex-col items-start gap-4 w-[45%] ">
<div className="w-full ">
                            <label className="text-gray-600 text-[14.5px]">Type d'établissement</label>
                            <div className="w-full flex items-center justify-between gap-6">
                            <select name="niveau" id="" className="w-full  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2">
                                <option value="Etudes primaires">Etudes primaires</option>
                                <option value="Etudes moyennes">Etudes moyennes</option>
                                <option value="Etudes secondaires">Etudes secondaires</option>
                            </select>
                            <select name="type" id="" className="w-full  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2">
                                <option value="Privé">Privé</option>
                                <option value="Public">Public</option>
                            </select>
                            </div>
                           

                        </div> 
                        <div className="w-full ">
                            <label className="text-gray-600 text-[14.5px]">Lien du site Web</label>
                            <div className="relative">
                            <FaLink  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"  /> 
                            <input type="text" name="nom" className="w-full  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2"  />

                            </div>
                        </div> <div className="w-full ">
                            <label className="text-gray-600 text-[14.5px]">Adresse Phyisique</label>
                            <div className="relative">
                            <IoLocationOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input type="text" name="nom" className="w-full  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2"  />
                            </div>
                      
                        </div> <div className="w-full ">
                        <label className="text-gray-600 text-[14.5px]">Numéro de telephone</label>
                            <div className="relative">
<LuPhone  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input type="text" name="nom" className="w-full  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2"  />

                            </div>
                        </div>
</div>

        </div>

        <div className="flex flex-col  gap-4 items-end w-[95%] m-auto mt-10 ">
<div className="w-full" >
<label htmlFor="description" className="text-gray-600 text-[14.5px]">description</label>
    <textarea name="description" id="description" rows={4}className="border-[2px] border-gray-400 w-full focus:border-[var(--color-secondary)] focus:outline-none pl-2 pt-2"></textarea>
</div>
<button
            className="flex items-center gap-2 bg-[var(--color-yousra)] text-white px-4 py-2 rounded-sm shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <span>Modifier</span> 
          </button>
        </div>
      </div>
    </div>
  )
}

export default Etablisment
