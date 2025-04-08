import { useState } from "react";
import {users} from "../../constants/users.constant"
import Pagination from "./Pagination";


export const DataTable = () => {
  const [currentPage, setCurrentPage] = useState(3)
  const totalPages = 12

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    console.log(`Navigated to page ${page}`)
    // Here you would typically fetch data for the new page
  }

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
            {users.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <span>{user.name}</span>
                </td>
                <td className="px-6 py-4 text-blue-500 hover:underline cursor-pointer">
                  {user.ref}
                </td>
                <td className="px-6 py-4">{user.parentName}</td>
                <td className="px-6 py-4">{user.contact}</td>
                <td className="px-6 py-4">
                  <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg text-sm">
                    voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
        <div className="mt-5 flex items-center justify-center bg-gray-50">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>          </div>
    </div>
  );
};


