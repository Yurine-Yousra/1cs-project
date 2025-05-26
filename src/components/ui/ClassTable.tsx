import {  useEffect, useState } from "react";
import { GetStudentGroup, GroupResponse } from "../../apis/group.api";


const getBadgeColor = (type: string) => {
  switch (type) {
    case "success":
      return "bg-green-400";
    case "danger":
      return "bg-red-400";
    default:
      return "bg-gray-300";
  }
};

const ClassCard = () => {
  const [classes, setClasses] = useState<GroupResponse[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data:GroupResponse[] = await GetStudentGroup();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="bg-[#F4F5FF] p-6 rounded-lg px-10">
    {/* Header */}
    <div className="grid grid-cols-6 bg-white p-4   text-gray-700  font-semibold rounded-t-lg">
    <div>Classe</div>
  <div>Spécialité</div>
  <div>Class room</div>
  <div>Capacité</div>
  <div className="text-center">Effectif</div>
  <div className="text-center">Moyenne</div>
    </div>

    {/* Cards */}
    <div className="flex flex-col gap-3 mt-5">
    {classes.map((classItem) => (
  <div
    key={classItem.groupId} // Use groupId as it's guaranteed to be unique
    className="grid grid-cols-6 bg-white p-4 items-center text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    {/* Group name + avatar */}
    <div className="flex items-center gap-2">
      <img
        src={`https://ui-avatars.com/api/?name=${classItem.groupName}&background=random&size=32`}
        alt={classItem.groupName}
        className="w-8 h-8 rounded-full"
      />
      <span className="font-medium">{classItem.groupName}</span>
    </div>

    {/* Specialization + Year */}
    <div className="flex flex-col">
      <span className="text-sm">{classItem.level.specialization}</span>
      <span className="text-xs text-gray-500">Year {classItem.level.year}</span>
    </div>

    {/* School Type */}
    <div className="text-sm ">{classItem.level.schoolType}</div>

    {/* Group Capacity */}
    <div className="">
      <span className={`text-xs px-2 py-1 rounded ${getBadgeColor("info")}`}>
        Capacity: {classItem.groupCapacity}
      </span>
    </div>

    {/* Current Students */}
    <div className="text-center">
      <span className={`text-xs px-2 py-1 rounded ${getBadgeColor("success")}`}>
        {classItem.studentCount} élèves
      </span>
    </div>

    {/* Placeholder or Action */}
    <div className="text-center">
      <button className="text-sm text-blue-500 hover:underline">Details</button>
    </div>
  </div>
))}
    </div>
  </div>
  );
};

export default ClassCard;
