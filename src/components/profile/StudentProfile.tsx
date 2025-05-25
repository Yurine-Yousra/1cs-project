import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getStudent } from '../../apis/students.api';
import { StudentDetails } from '../../apis/students.api';
import { Parent } from '../../apis/getStudentParent';
import { BiPhone } from 'react-icons/bi';
import { TfiEmail } from 'react-icons/tfi';
import { PiNotePencil } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { getStudentParent } from '../../apis/getStudentParent';
import defaultCover from '../../assets/image copy 5.png';
import defaultProfile from '../../assets/image copy 4.png';

const StudentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<StudentDetails | null>(null);
    const [parent, setParent] = useState<Parent | null>(null);
    const navigate = useNavigate();



  useEffect(() => {
    const fetchStudent = async () => {
      const studentData = await getStudent(id as string);
      setStudent(studentData ?? null);
    };
     const fetchParent = async () => {
      const parentData = await getStudentParent(id as string);
      setParent(parentData ?? null);
    };
    fetchStudent();
    fetchParent()
  }, [id]);

  if (!student) return <div className="p-10 text-center text-gray-500">Chargement des données...</div>;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="px-8 py-6  min-h-screen w-[80%] m-auto">
      <h1 className="text-3xl font-bold text-[var(--color-yousra)] mb-8">Profil de l'Étudiant</h1>

      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
          <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url(${defaultCover})` }} />
          <div className="absolute top-16 left-8 w-32 h-32 border-4 border-white rounded-full overflow-hidden">
            <img src={student.photoUrl || defaultProfile} alt="profile" className="object-cover w-full h-full" />
          </div>

          <div className="pt-20 px-6 pb-6">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-gray-600">Inscrit en {new Date(student.enrollmentDate).getFullYear()}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg">
                  <BiPhone className="text-orange-500" />
                  <span>{parent?.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg">
                  <TfiEmail className="text-orange-500" />
                  <span>{parent?.email}</span>
                </div>
                <button
          className="bg-[var(--color-yousra)] text-white px-4 py-2 rounded-lg hover:cursor-pointer transition"
          onClick={() => navigate(`/dashboard/students/${id}/convocation`)}
            // Action à personnaliser

        >
          Convocation
        </button>
              </div>
            </div>
          </div>
        </div>

        {/* Détails personnels */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-[var(--color-yousra)]">Informations Personnelles</h2>
            <PiNotePencil className="text-gray-500 cursor-pointer" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Date de Naissance</p>
              <p className="font-medium">{formatDate(student.birthDate)}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Lieu de Naissance</p>
              <p className="font-medium">{student.birthPlace}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Adresse</p>
              <p className="font-medium">{student.address}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Numéro Étudiant</p>
              <p className="font-medium">{student.studentIdNumber || "Non assigné"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Contact d'Urgence</p>
              <p className="font-medium">{student.emergencyContact}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Statut</p>
              <p className={`font-semibold ${student.isActive ? 'text-green-600' : 'text-red-500'}`}>
                {student.isActive ? 'Actif' : 'Inactif'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">ID Parent</p>
              <p className="font-medium">{student.parentId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Nom Parent</p>
              <p className="font-medium"> {parent?.lastName} , {parent?.firstName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Profession Parent</p>
              <p className="font-medium"> {parent?.occupation}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Relation avec parent</p>
              <p className="font-medium">{parent?.relationshipToStudent}</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default StudentProfile;
