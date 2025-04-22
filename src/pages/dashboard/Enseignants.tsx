import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
// import Card from "../../components/cards/TeacherCard";
import { Globe, Mail, Phone } from "lucide-react";

const Enseignants: React.FC = () => {
  const navigate = useNavigate();
  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      email: "sarah.johnson@school.edu",
      phone: "(555) 123-4567",
      website: "sarahjohnson.edu",
      bio: "Dr. Johnson has been teaching mathematics for over 15 years with a specialization in calculus and statistics. She holds a Ph.D. in Applied Mathematics from MIT.",
      initials: "SJ",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      subject: "Physics",
      email: "michael.chen@school.edu",
      phone: "(555) 234-5678",
      website: "michaelchen.edu",
      bio: "Professor Chen is an award-winning physics teacher with 10 years of experience. His research in quantum mechanics has been published in several scientific journals.",
      initials: "MC",
    },
    {
      id: 3,
      name: "Ms. Emily Rodriguez",
      subject: "English Literature",
      email: "emily.rodriguez@school.edu",
      phone: "(555) 345-6789",
      website: "emilyrodriguez.edu",
      bio: "Ms. Rodriguez specializes in contemporary literature and creative writing. She has published two novels and holds an MFA in Creative Writing from Columbia University.",
      initials: "ER",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      subject: "History",
      email: "james.wilson@school.edu",
      phone: "(555) 456-7890",
      website: "jameswilson.edu",
      bio: "Dr. Wilson is a historian specializing in American history. He has authored three books on the Civil War era and regularly leads student trips to historical sites.",
      initials: "JW",
    },
  ]


  return (
    <div>
      <div className="w-[90%] p-4 m-auto">

        <div className="flex w-full justify-between items-center ">
          {/* Filtres */}
          <div className="flex items-center gap-6 w-full ">
            {/* Ordre */}

            {/* Filtre */}
            <div className="flex  items-center justify-between gap-4  w-full">
            <h2 className="text-lg font-semibold mb-4 pt-3">Liste des Enseignants</h2>
            <div className="flex  items-center gap-2">
            <select id="filtre" className="border border-[var(--color-yousra)] p-1.5 rounded-full text-[var(--color-yousra)] w-[120px] text-[15px]">
                <option value="alphabet">Alphabet</option>
                <option value="age">Âge</option>
              </select>
                {/* Bouton Ajouter */}
         
            </div> <button
            className="flex items-center gap-2 bg-[var(--color-yousra)] text-white px-4 py-2 rounded-full shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
            onClick={() => navigate("/dashboard/addTeacher")}
          >
            <span>Nouveau</span> <GrAddCircle />
          </button>
            </div>
          </div>  
        </div>
        <div className="w-full m-auto grid  gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teachers.map((teacher,index) => (
          <div key={teacher.id} className="overflow-hidden  rounded-lg border border-gray-200 bg-white shadow-sm">
            

            {/* Card Header */}
            <div className="p-4 pb-2">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative h-16 w-16 rounded-full border-2 border-white shadow-md overflow-hidden">
                  <div className={`absolute inset-0 flex items-center justify-center ${Colors[index]}  text-gray-600 font-medium`}>
                    {teacher.initials}
                  </div>
                </div>

                <div>
                  {/* Card Title */}
                  <h2 className="text-lg font-semibold">{teacher.name}</h2>
                  {/* Badge */}
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 mt-1">
                    {teacher.subject}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="px-4 pb-2">
              <p className="text-sm text-gray-500 mb-4">{teacher.bio}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span>{teacher.website}</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4">
              <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>
      
    </div>
  );
};

export default Enseignants;


const Colors =["bg-red-200","bg-green-200","bg-blue-200","bg-yellow-200"]