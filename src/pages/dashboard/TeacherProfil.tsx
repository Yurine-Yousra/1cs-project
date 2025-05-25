import imageSrc from '../../assets/image copy 5.png';
import ImageProfil from '../../assets/image copy 4.png';
import { BiPhone  } from 'react-icons/bi';
import { TfiEmail } from 'react-icons/tfi';
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { PiNotePencil } from "react-icons/pi";
import { Teacher } from '../../apis/getTeacher';
import { useState , useEffect } from 'react';
import { getTeacher } from '../../apis/getTeacher';
import { useParams } from 'react-router-dom';

const TeacherProfil = () => {
  const {id} = useParams()
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  useEffect(() => {
      const fetchTeacher = async () => {
        const teacherData = await getTeacher(id as string);
        setTeacher(teacherData ?? null);
      };
     
      fetchTeacher();
    }, [id]);
  return (
    <div className=" px-8">
      <div >
        <h1 className='text-[20px] font-semibold text-[var(--color-yousra)] mb-4'>{`Détails D'enseigant`}</h1>
      </div>

      <div className=" grid grid-cols-4 gap-4 ">
        <div className=" col-span-3 rounded-[10px] relative bg-white ">
          <div
            className="h-[150px] bg-cover bg-center rounded-[10px]"
            style={{ backgroundImage: `url(${imageSrc})` }}
          ></div>

          <div className="absolute rounded-[50%] top-6 left-12 ">
          <img src={ImageProfil} alt="profil Image" />
          </div>

          <div className='flex flex-col items-start gap-4 pl-6 pb-6 pr-6 -mt-6'>
          <div>
            <h1 className='font-bold text-[20px]'>Meddah Soundous</h1>
            <p className='text-gray-500 '>Langue Arabe</p>
          </div>

          <div className='flex items-center justify-start gap-30'>
            <div className='flex items-center justify-center gap-2'>
            <div className='bg-orange-500 rounded-[50%] w-[30px] h-[30px] flex items-center justify-center '> <BiPhone size={20}  className='text-white '/></div>
             <h3>066666666</h3>
            </div>
            <div className='flex items-center justify-center gap-2'>
            <div className='bg-orange-500 rounded-[50%] w-[30px] h-[30px] flex items-center justify-center '> <TfiEmail size={20}  className='text-white '/></div>
             <h3>{teacher?.email}</h3>
            </div>


          </div>
          </div>

          <div className='mt-12  pl-6 pb-6 pr-6'>
            <h1 className='font-bold text-[20px] mb-4'>
                Matières & Classes
            </h1>

            <div className="flex h-[130px] w-full shadow-lg rounded-lg overflow-hidden mb-4">
  <div className="bg-orange-500 w-[5%]"></div>
  <div className="bg-white w-[95%] pt-4 pl-4  relative">
    <BiDotsHorizontalRounded className='absolute top-2 right-2' size={24} />
    <h1 className='font-semibold text-[18px] mb-4 '>Langue Arabe -1ere année</h1>
    <div className='w-[90%] flex items-center justify-between' >

    
    <div >
    <p className='text-gray-500 '>Classes</p>
    <span className='font-[400]'>M1 , M2 , M4</span>
    </div>

    <div>
    <p className='text-gray-500 '>Coefficient</p>
    <span className='font-[400]'>4</span>
    </div>

    <div>
    <p className='text-gray-500 '>Heures par semaine</p>
    <span className='font-[400]'>4 Heures</span>
    </div>
    </div>
  </div>
</div>

<div className="flex h-[130px] w-full shadow-lg rounded-lg overflow-hidden mb-4">
  <div className="bg-purple-800 w-[5%]"></div>
  <div className="bg-white w-[95%] pt-4 pl-4  relative">
    <BiDotsHorizontalRounded className='absolute top-2 right-2' size={24} />
    <h1 className='font-[400] text-[18px] mb-4 '>Langue Arabe -1ere année</h1>
    <div className='w-[90%] flex items-center justify-between' >

    
    <div >
    <p className='text-gray-500 '>Classes</p>
    <span className='font-[400]'>M1 , M2 , M4</span>
    </div>

    <div>
    <p className='text-gray-500 '>Coefficient</p>
    <span className='font-[400]'>4</span>
    </div>

    <div>
    <p className='text-gray-500 '>Heures par semaine</p>
    <span className='font-[400]'>4 Heures</span>
    </div>
    </div>


  </div>


</div>


<div className="flex h-[130px] w-full shadow-lg rounded-lg overflow-hidden mb-4">
  <div className="bg-yellow-500 w-[5%]"></div>
  <div className="bg-white w-[95%] pt-4 pl-4  relative">
    <BiDotsHorizontalRounded className='absolute top-2 right-2' size={24} />
    <h1 className='font-semibold text-[18px] mb-4 '>Langue Arabe -1ere année</h1>
    <div className='w-[90%] flex items-center justify-between' >

    
    <div >
    <p className='text-gray-500 '>Classes</p>
    <span className='font-[400]'>M1 , M2 , M4</span>
    </div>

    <div>
    <p className='text-gray-500 '>Coefficient</p>
    <span className='font-[400]'>4</span>
    </div>

    <div>
    <p className='text-gray-500 '>Heures par semaine</p>
    <span className='font-[400]'>4 Heures</span>
    </div>
    </div>


  </div>


</div>

          </div>
        </div>

        <div className="col-span-1 rounded-[10px] bg-white shadow-2xl p-6 relative">
            <PiNotePencil  size={24} className='absolute top-2 right-2'/>
  <h1 className="text-[20px] font-semibold text-[var(--color-yousra)]">Informations</h1>
  <h1 className="text-[18px] font-semibold mt-4 mb-10">Meddah Soundous Leila Saadia</h1>

  {/* First Section */}
  <div className="flex flex-col gap-8 border-b border-gray-300 pb-4">
    {[...Array(5)].map((_, index) => (
      <div key={index}>
        <p className="text-sm text-gray-500">Adresse</p>
        <h3 className="font-medium ">
          742 Evergreen Terrace, Springfield
        </h3>
      </div>
    ))}
  </div>

  {/* Second Section */}
  <div className="flex flex-col gap-4  pt-4 pb-4">
    {[...Array(4)].map((_, index) => (
      <div key={index}>
        <p className="text-sm text-gray-500">Adresse</p>
        <h3 className="font-medium ">
          742 Evergreen Terrace, Springfield
        </h3>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default TeacherProfil;
