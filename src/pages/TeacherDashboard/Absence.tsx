import Image from "../../assets/image copy 17.png";
import { RiArrowRightSLine } from "react-icons/ri";
import Profile from "../../components/ui/profile";
import { useState } from "react";
import SearchBar from "../../components/ui/SearchBar";

const Absence = () => {
  const [checkedRows, setCheckedRows] = useState<{ [key: number]: boolean }>({});

  const handleCheckboxChange = (index: number) => {
    setCheckedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-[90%]  mx-auto">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-10 mt-4">
        <h1 className="text-[var(--color-yousra)] text-[25px] font-semibold">Liste des Élèves</h1>
        <Profile />
      </div>

      {/* Sub-header */}
      <div className="w-full flex justify-between items-center">
        <h2 className="font-stretch-semi-condensed text-gray-900">1ère année Classe Scientifique</h2>
        <SearchBar />
      </div>

      {/* Table Wrapper */}
      <div className="w-full mt-14 relative">
        <div className=" overflow-hidden">
          {/* Table */}
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead className="bg-white h-[60px] border-b-20 border-[var(--color-sous)]">
              <tr>
                <th className="w-[5%] "></th>
                <th className="w-[5%] text-[15px] font-semibold ">Nom</th>
                <th className="w-[20%] text-left text-[15px] font-semibold  text-gray-800"></th>
                <th className="w-[20%] text-left text-[15px] font-semibold text-gray-800 ">N° Réf</th>
                <th className="w-[20%] text-left text-[15px] font-semibold text-gray-800 ">Nom du Parent</th>
                <th className="w-[25%] text-left text-[15px] font-semibold text-gray-800 ">Contact du Parent</th>
                <th className="w-[5%]"></th>
              </tr>
            </thead>

            {/* Scrollable Table Body */}
          </table>



          <div className="  w-full">
            <table className=" w-full border-collapse bg-white">
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((index) => (
                  <tr
                    className={`border-b border-gray-300 h-[72px] border-l-4 ${
                      checkedRows[index] ? "border-l-[var(--color-yousra)]" : "border-l-transparent"
                    }`}
                    key={index}
                  >
                    <td className="w-[5%] text-center ">
                      <input
                        type="checkbox"
                        checked={checkedRows[index] || false}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td className="w-[5%]  ">
                      <img src={Image} alt="Profile" className="w-10 h-10 object-cover rounded-full" />
                    </td>
                    <td className="w-[20%] text-[14px] text-left ">First Last Name</td>
                    <td className="w-[20%] text-left text-[14px] text-[var(--color-yousra)]  ">1245897621-AA54</td>
                    <td className="w-[20%] text-left text-[14px] ">Parent Name</td>
                    <td className="w-[25%] text-left text-[14px] ">06423465479874</td>
                    <td className="w-[5%]  text-[14px] ">
                      <div className="flex justify-center items-center bg-yellow-300 rounded-full px-2 py-0.5 text-white relative" >
                        <button>Voir</button>
                        <RiArrowRightSLine className="text-xl absolute right-0" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confirm Button */}
        <button className="absolute right-0 flex items-center gap-2 bg-[var(--color-yousra)] text-white px-4 py-2 rounded-full shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200 mt-4">
          Confirmer
        </button>
      </div>
    </div>
  );
};

export default Absence;
