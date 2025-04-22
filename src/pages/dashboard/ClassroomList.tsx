// ClassroomList.tsx

import React, { useState } from "react";

interface ClassroomListProps {
  isCollapsed: boolean;
}
const ClassroomList: React.FC<ClassroomListProps>  = ({isCollapsed}) => {
  const [classrooms, setClassrooms] = useState([
    {
      classroomId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      className: "Mathematics 101",
      schoolLevelId: 1,
      specializationId: 101,
      levelName: "Beginner",
      specializationName: "Mathematics",
      schoolType: "Public"
    },
    {
      classroomId: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
      className: "Physics Advanced",
      schoolLevelId: 2,
      specializationId: 202,
      levelName: "Advanced",
      specializationName: "Physics",
      schoolType: "Private"
    },
    {
      classroomId: "9z8y7x6w-5v4u-3t2s-1r0q-p9o8n7m6l5k4",
      className: "Chemistry Basics",
      schoolLevelId: 1,
      specializationId: 303,
      levelName: "Beginner",
      specializationName: "Chemistry",
      schoolType: "Charter"
    },
    {
      classroomId: "abcd1234-ef56-gh78-ij90-klmn1234opqr",
      className: "English Literature",
      schoolLevelId: 3,
      specializationId: 404,
      levelName: "Intermediate",
      specializationName: "English",
      schoolType: "Public"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    className: "",
    levelName: "",
    specializationName: "",
    schoolType: "Public"
  });

  const handleAddClassroom = () => {
    const newClassroom = {
      classroomId: crypto.randomUUID(),
      className: newClass.className,
      schoolLevelId: 0,
      specializationId: 0,
      levelName: newClass.levelName,
      specializationName: newClass.specializationName,
      schoolType: newClass.schoolType
    };
    setClassrooms([...classrooms, newClassroom]);
    setIsDialogOpen(false);
    setNewClass({
      className: "",
      levelName: "",
      specializationName: "",
      schoolType: "Public"
    });
  };

  return (
    <div className="p-8 bg-sous min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Classrooms</h1>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-yousra hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-md transition"
        >
          Add Classroom
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {classrooms.map((classroom) => (
          <div
            key={classroom.classroomId}
            className="bg-white rounded-3xl shadow-xl p-8 transform transition hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {classroom.className}
              </h2>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  classroom.schoolType === "Public"
                    ? "bg-green-100 text-green-700"
                    : classroom.schoolType === "Private"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {classroom.schoolType}
              </span>
            </div>
            <div className="text-gray-600 space-y-2">
              <p><strong>Level:</strong> {classroom.levelName}</p>
              <p><strong>Specialization:</strong> {classroom.specializationName}</p>
              <p className="text-sm text-gray-400 mt-2 break-all">
                <strong>ID:</strong> {classroom.classroomId}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <div className={`fixed inset-0 ml-[290px] ${! isCollapsed ? "xl:ml-[300px]":"xl:ml-[100px]"}  flex items-center justify-center backdrop-blur-md bg-opacity-40 z-50`}>
          <div className="bg-white  rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
              Add New Classroom
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Class Name"
                value={newClass.className}
                onChange={(e) => setNewClass({ ...newClass, className: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Level Name"
                value={newClass.levelName}
                onChange={(e) => setNewClass({ ...newClass, levelName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Specialization Name"
                value={newClass.specializationName}
                onChange={(e) => setNewClass({ ...newClass, specializationName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <select
                value={newClass.schoolType}
                onChange={(e) => setNewClass({ ...newClass, schoolType: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Charter">Charter</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClassroom}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassroomList;
