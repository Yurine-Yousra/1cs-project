import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { getStudents, Student, StudentsResponse } from "../../apis/students.api";
import { Link } from "react-router-dom";

type SearchTerm = {
  searchTerm: string;
};

export const DataTable = ({searchTerm}:SearchTerm) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const totalPages = 3

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Filter students based on searchTerm
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStudents(students);
      return;
    }

    const filtered = students.filter(student => {
      const searchLower = searchTerm.toLowerCase();
      return (
        student.firstName.toLowerCase().includes(searchLower) ||
        student.lastName.toLowerCase().includes(searchLower) ||
        student.studentId.toLowerCase().includes(searchLower) ||
        student.parentFullName.toLowerCase().includes(searchLower) ||
        student.parentContact.toLowerCase().includes(searchLower)
      );
    });

    setFilteredStudents(filtered);
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [searchTerm, students]);

  useEffect(() => {
    const fetchStudent = async() => {
      const data:StudentsResponse = await getStudents(currentPage, 7);
      setStudents(data.items);
    }
    fetchStudent();
  }, [currentPage])

  if (filteredStudents.length === 0 && searchTerm.trim()) {
    return (
      <div className="text-center py-16 mt-2 bg-white rounded-xl shadow-sm">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No students found</h3>
        <p className="mt-1 text-sm text-gray-500">No students match your search for "{searchTerm}". Try a different search term.</p>
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-16 mt-2 bg-white rounded-xl shadow-sm">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No Student found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your token or refresh to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <div className="py-2 px-10 mt-5">
      <div className="">
        {searchTerm.trim() && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredStudents.length} result{filteredStudents.length !== 1 ? 's' : ''} for "{searchTerm}"
          </div>
        )}
        
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
            {filteredStudents.map((user, index) => (
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
        </div>
      </div>
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