import imageSrc from '../../assets/image copy 5.png';
// import ImageProfil from '../../assets/image copy 4.png';
import { BiPhone } from 'react-icons/bi';
import { TfiEmail } from 'react-icons/tfi';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Teacher } from '../../apis/getTeacher';
import { useState, useEffect } from 'react';
import { getTeacher } from '../../apis/getTeacher';
import { useParams } from 'react-router-dom';

const TeacherProfil = () => {
  const { id } = useParams()
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  
  useEffect(() => {
    const fetchTeacher = async () => {
      const teacherData = await getTeacher(id as string);
      setTeacher(teacherData ?? null);
    };
   
    fetchTeacher();
  }, [id]);

 

  return (
    <div className="px-8 w-[70%] m-auto mt-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className='text-[20px] font-semibold text-[var(--color-yousra)]'>{`Détails D'enseignant`}</h1>
       
      </div>

      <div className="rounded-[10px] relative bg-white shadow-lg">
        {/* Banner with profile picture */}
        <div
          className="h-[150px] bg-cover bg-center rounded-t-[10px]"
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>

        <div className="absolute rounded-[50%] top-6 left-12">
          {teacher?.photo ? (
            <img src={teacher.photo} alt="profile" className="w-24 h-24 rounded-full object-cover border-4 border-white" />
          ) : (
            <img src={`https://avatar.iran.liara.run/public/boy?username=${teacher?.firstName}`} alt="default profile" className="w-24 h-24 rounded-full border-4 border-white" />
          )}
        </div>

        {/* Main content */}
        <div className="p-6 pt-12">
          {/* Teacher name and basic info */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className='font-bold text-2xl'>{teacher?.firstName} {teacher?.lastName}</h1>
              <p className='text-gray-500'>Enseignant</p>
            </div>
            
          </div>

          {/* Contact information */}
          <div className='flex items-center gap-6 mb-8'>
            {teacher?.phoneNumber && (
              <div className='flex items-center gap-2'>
                <div className='bg-orange-500 rounded-[50%] w-[30px] h-[30px] flex items-center justify-center'>
                  <BiPhone size={20} className='text-white'/>
                </div>
                <h3>{teacher.phoneNumber}</h3>
              </div>
            )}
            
            <div className='flex items-center gap-2'>
              <div className='bg-orange-500 rounded-[50%] w-[30px] h-[30px] flex items-center justify-center'>
                <TfiEmail size={20} className='text-white'/>
              </div>
              <h3>{teacher?.email}</h3>
            </div>
          </div>

          {/* Detailed information sections */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Date d'embauche</p>
                <h3 className="font-medium">
                  {teacher?.hireDate ? new Date(teacher.hireDate).toLocaleDateString() : 'Non spécifié'}
                </h3>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Type de contrat</p>
                <h3 className="font-medium">{teacher?.contractType || 'Non spécifié'}</h3>
              </div>
            </div>

            <div className="space-y-4">
              {teacher?.address && (
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <h3 className="font-medium">{teacher.address}</h3>
                </div>
              )}
              
              <div>
                <p className="text-sm text-gray-500">ID Enseignant</p>
                <h3 className="font-medium">{teacher?.teacherId}</h3>
              </div>
            </div>
            
          </div>

          {/* Subjects section */}
          {teacher?.subjectIds && teacher.subjectIds.length > 0 && (
            <div>
              <h2 className='font-bold text-xl mb-4'>Matières enseignées</h2>
              
              <div className="space-y-4">
                <div className="flex h-[130px] w-full shadow rounded-lg overflow-hidden">
                  <div className="bg-orange-500 w-[5%]"></div>
                  <div className="bg-white w-[95%] p-4 relative">
                    <BiDotsHorizontalRounded className='absolute top-2 right-2' size={24} />
                    <h1 className='font-semibold text-[18px] mb-4'>Matière à définir</h1>
                    <div className='grid grid-cols-3 gap-4'>
                      <div>
                        <p className='text-gray-500'>Classes</p>
                        <span className='font-[400]'>Non spécifié</span>
                      </div>
                      <div>
                        <p className='text-gray-500'>Coefficient</p>
                        <span className='font-[400]'>-</span>
                      </div>
                      <div>
                        <p className='text-gray-500'>Heures/semaine</p>
                        <span className='font-[400]'>-</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfil;