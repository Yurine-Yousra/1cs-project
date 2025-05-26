import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr";
import { Globe, Mail   } from "lucide-react";
import { getEmployees } from "../../apis/getEmployee";
import Pagination from "../../components/ui/Pagination";

interface Employee {
  employeeId: string;
  fullName: string;
  email: string;
  position: string;
  hireDate: string;
  contractType: string;
  isActive: boolean;
  phoneNumber?: string;
  address?: string;
}

const Employees = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get pagination from URL or use defaults
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10; // Fixed page size (can be made configurable)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await getEmployees(page, pageSize);
        console.log(response.data)
        setEmployees(response.data);
        
      } catch (err) {
        setError("Failed to load employees");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [page, pageSize]);
  console.log(employees)

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (loading) {
    return (
      <div className="w-[90%] p-4 m-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-yousra)]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[90%] p-4 m-auto">
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-[90%] pl-4 pr-4 pb-4 m-auto">
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
  Liste des Employés
</h2>


           
            <button
              className="flex items-center gap-2 bg-[var(--color-yousra)] text-white px-4 py-2 rounded-full shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
              onClick={() => navigate("/dashboard/addEmployee")}
            >
              <span>Nouveau</span> <GrAddCircle />
            </button>
          </div>
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Aucun employé trouvé</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {employees.map((employee) => {
              const [firstName, lastName] = employee.fullName.split(" ");
              return (
               <div
  key={employee.employeeId}
  className="rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
>
  {/* Header - avatar + nom + poste */}
  <div className="p-5 flex items-center gap-4">
    <div className="relative h-16 w-16">
      <div className="h-full w-full rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-lg shadow-inner">
        {firstName?.[0] || "E"}
        {lastName?.[0] || "E"}
      </div>
    </div>

   
  </div>

  {/* Infos - email, contrat, téléphone, etc. */}
  <div className="px-5 pb-4 text-sm text-gray-700">
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-gray-400" />
        <span>{employee.email || "Email non renseigné"}</span>
      </div>

      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-gray-400" />
        <span>{employee.position || "Poste non défini"}</span>
      </div>

      

      <div className="flex items-center gap-2">
        <span className="text-gray-500">Embauché le :</span>
        <span className="font-medium">
          {employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : "Non défini"}
        </span>
      </div>
    </div>
  </div>

  {/* Bouton */}
  <div className="p-5 border-t border-gray-100">
    <button
      onClick={() => navigate(`/dashboard/employees/${employee.employeeId}`)}
      className="w-full py-2 px-4 bg-[var(--color-yousra)] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
    >
      Voir Profil
    </button>
  </div>
</div>

              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(employees.length / pageSize)}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Employees;