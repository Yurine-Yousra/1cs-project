import {users} from "../../types/users.constant"


export const DataTable = () => {
  return (
    <div className="p-4 px-10 mt-5">
      <div className="overflow-x-auto">
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
      </div>
    </div>
  );
};


