import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr";
import { Globe, Mail, Phone } from "lucide-react";
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
    <div className="w-[90%] p-4 m-auto">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-6 w-full">
          <div className="flex items-center justify-between gap-4 w-full">
            <h2 className="text-lg font-semibold mb-4 pt-3">Liste des Employés</h2>
            <div className="flex items-center gap-2">
              <select className="border border-[var(--color-yousra)] p-1.5 rounded-full text-[var(--color-yousra)] w-[120px] text-[15px]">
                <option value="alphabet">Alphabet</option>
                <option value="recent">Plus récent</option>
                <option value="oldest">Plus ancien</option>
              </select>
            </div>
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
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                >
                  <div className="p-4 pb-2">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-full border-2 border-white shadow-md overflow-hidden">
                        <div
                          className={`absolute inset-0 flex items-center justify-center bg-[var(--color-primary)] text-white font-medium`}
                        >
                          {firstName?.[0] || "E"}
                          {lastName?.[0] || "E"}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">
                          {employee.fullName}
                        </h2>
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 mt-1">
                          {employee.position || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-2">
                    <p className="text-sm text-gray-500 mb-4">
                      {employee.contractType || "Employé"}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{employee.phoneNumber || "Non renseigné"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <span>{employee.address || "Adresse non disponible"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/employees/${employee.employeeId}`)
                      }
                      className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
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