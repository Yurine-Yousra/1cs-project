import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { getStudents, Student, StudentsResponse } from "../../apis/students.api";
import { Link } from "react-router-dom";


export const DataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [students,setStudents] = useState<Student[]>([]);
  const totalPages = 3

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const fetchStudent = async() => {
    const data:StudentsResponse = await getStudents(currentPage,7);
    setStudents(data.items);
  }
    fetchStudent();
  },[currentPage])
  return (
    <div className="py-2 px-10 mt-5">
      <div className="">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden ">
          <thead className="bg-blue-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">N° ref</th>
              <th className="px-6 py-3 text-left">Nom du parent</th>
              <th className="px-6 py-3 text-left">Contact du parent</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          
          <tbody className="text-gray-700  ">
            {students.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4 flex items-center space-x-3">
                {user.photoUrl ?<img src={""} alt="Avatar" className="w-10 h-10 rounded-full" />:  
                  <div className="relative h-16 w-16 rounded-full border-2 border-white shadow-md overflow-hidden">
                  <div className={`absolute inset-0 flex items-center justify-center ${Colors[index]}  text-gray-600 font-medium`}>
                  {user.lastName[0].toUpperCase()}{user.firstName[0].toUpperCase()}
                  </div>
                </div>

                }  
                 
                  <span>{user.firstName} {user.lastName }</span>
                </td>
                <td className="px-6 py-4 text-blue-500 hover:underline cursor-pointer">
                  {user.studentId}
                </td>
                <td className="px-6 py-4">{user.parentFullName}</td>
                <td className="px-6 py-4">{user.parentContact}</td>
                <td className="px-6 py-4">
                  <Link 
                    to={`?tab=student-details&id=${user.studentId}&color=${Colors[index]}`}
                  className="bg-yellow-400 cursor-pointer text-white px-4 py-2 rounded-lg text-sm">
                    voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
        <div className="mt-5 flex items-center justify-center bg-gray-50 ">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>          </div>
    </div>
  );
};


const Colors = [
  "bg-green-200",
  "bg-indigo-200",
  "bg-teal-200",
  "bg-red-200",
  "bg-blue-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
];
