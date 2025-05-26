import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { getTeachers, Teacher } from "../../apis/getTeacher";
import { Globe, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { bgColor200Array } from "../../constants/colors";

const Enseignants: React.FC = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeachers();
       setTeachers(response ?? []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="w-[90%] p-4 m-auto">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-6 w-full">
          <div className="flex items-center justify-between gap-4 w-full">
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
  Liste des Enseigants
</h2>           
            <button
              className="flex items-center gap-2 bg-[var(--color-yousra)] text-white px-4 py-2 rounded-full shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
              onClick={() => navigate("/dashboard/addTeacher")}
            >
              <span>Nouveau</span> <GrAddCircle />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {teachers.map((teacher,index) => (
          <div key={teacher.teacherId} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-4 pb-2">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-full border-2 border-white shadow-md overflow-hidden">
                  <div className={`absolute inset-0 flex items-center justify-center ${bgColor200Array[index]}  font-medium`}>
                    {teacher.firstName[0]}{teacher.lastName[0]}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{teacher.firstName} {teacher.lastName}</h2>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 mt-1">
                    {teacher.contractType || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 pb-2">
              <p className="text-sm text-gray-500 mb-4">Professeur à l'école</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{teacher.phoneNumber || "Non renseigné"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span>{teacher.address || "Adresse non disponible"}</span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <button
                onClick={() => navigate(`/dashboard/teachers/${teacher.teacherId}`)}
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Voir Profil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enseignants;

