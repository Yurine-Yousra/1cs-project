import Image1 from "../../assets/image copy 4.png"
import {BiPhone} from "react-icons/bi"
import { BiDotsHorizontalRounded } from "react-icons/bi"


const EmployeeCard = () => {
  return (
    <div className="h-[248px] bg-white flex flex-col items-center pt-8 relative rounded-[16px] shadow-lg">
        <BiDotsHorizontalRounded size={24}  className="absolute top-1 right-1 "/>
        <div className="rounded-[50%]">
            <img src={Image1} alt="profil-image" />
        </div>

        <div>
            <h1>First Last</h1>
            <p className="text-gray-600">assistante</p>
        </div>

         <div className='flex items-center justify-center gap-2 mt-6'>
                    <div className='bg-[var(--color-yousra)] rounded-[50%] w-[30px] h-[30px] flex items-center justify-center '> <BiPhone size={20}  className='text-white '/></div>
                     <h3>066666666</h3>
                    </div>


      
    </div>
  )
}

export default EmployeeCard
