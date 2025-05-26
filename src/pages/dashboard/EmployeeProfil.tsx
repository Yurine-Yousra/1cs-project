import imageSrc from '../../assets/image copy 5.png';
import { BiPhone } from 'react-icons/bi';
import { TfiEmail } from 'react-icons/tfi';
import { EmployeeDetails } from '../../apis/getEmployee';
import { useState, useEffect } from 'react';
import { getEmployee } from '../../apis/getEmployee';
import { useParams } from 'react-router-dom';

const EmployeeProfil = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<EmployeeDetails | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const employeeData = await getEmployee(id as string);
      setEmployee(employeeData ?? null);
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className="px-8 w-[70%] m-auto mt-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className='text-[20px] font-semibold text-[var(--color-yousra)]'>Détails de l'Employé</h1>
      </div>

      <div className="rounded-[10px] relative bg-white shadow-lg">
        {/* Banner */}
        <div
          className="h-[150px] bg-cover bg-center rounded-t-[10px]"
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>

        {/* Profile picture */}
       

        <div className="p-6 pt-12">
          {/* Full name and role */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className='font-bold text-2xl'>{employee?.firstName} {employee?.lastName}</h1>
              <p className='text-gray-500'>{employee?.position}</p>
            </div>
          </div>

          {/* Contact */}
          <div className='flex items-center gap-6 mb-8'>
            {employee?.phoneNumber && (
              <div className='flex items-center gap-2'>
                <div className='bg-orange-500 rounded-full w-[30px] h-[30px] flex items-center justify-center'>
                  <BiPhone size={20} className='text-white' />
                </div>
                <h3>{employee.phoneNumber}</h3>
              </div>
            )}
            {employee?.email && (
              <div className='flex items-center gap-2'>
                <div className='bg-orange-500 rounded-full w-[30px] h-[30px] flex items-center justify-center'>
                  <TfiEmail size={20} className='text-white' />
                </div>
                <h3>{employee.email}</h3>
              </div>
            )}
          </div>

          {/* Informations détaillées */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">ID Employé</p>
                <h3 className="font-medium">{employee?.employeeId}</h3>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID Utilisateur</p>
                <h3 className="font-medium">{employee?.userId}</h3>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de Naissance</p>
                <h3 className="font-medium">
                  {employee?.birthDate ? new Date(employee.birthDate).toLocaleDateString() : 'Non spécifiée'}
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date d'embauche</p>
                <h3 className="font-medium">
                  {employee?.hireDate ? new Date(employee.hireDate).toLocaleDateString() : 'Non spécifiée'}
                </h3>
              </div>
             
              
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <h3 className="font-medium">{employee?.isActive ? 'Actif' : 'Inactif'}</h3>
              </div>
            </div>

            {/* Adresse & timestamps */}
            <div className="space-y-4">
              {employee?.address && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Rue</p>
                    <h3 className="font-medium">{employee.address.street || 'Non spécifiée'}</h3>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ville</p>
                    <h3 className="font-medium">{employee.address.city || 'Non spécifiée'}</h3>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">État / Région</p>
                    <h3 className="font-medium">{employee.address.state || 'Non spécifié'}</h3>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Code Postal</p>
                    <h3 className="font-medium">{employee.address.postalCode || 'Non spécifié'}</h3>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pays</p>
                    <h3 className="font-medium">{employee.address.country || 'Non spécifié'}</h3>
                  </div>
                </>
              )}
            
            </div>
          </div>

          {/* Matières enseignées (facultatif - adapt to your data structure) */}
       

        </div>
      </div>
    </div>
  );
};

export default EmployeeProfil;
