"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { IoMdArrowBack } from "react-icons/io"
import { Link } from "react-router-dom"
import { Modal,XIcon,UsersIcon,SchoolIcon, SearchIcon } from "./Icons"
import { getStudents, Student, StudentsResponse } from "../../apis/students.api"
import { Classroom, getClassrooms } from "../../apis/classroom.api"
import { CreateGroupPayload, createStudentGroup } from "../../apis/group.api"






export default function CreateGroup() {

  const  [mockClassrooms,setMockClassrooms] = useState<Classroom[]>([])
  const [groupName, setGroupName] = useState("")
  const [selectedClassroom, setSelectedClassroom] = useState<(typeof mockClassrooms)[0] | null>(null)
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [classroomSearchTerm, setClassroomSearchTerm] = useState("")
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [isClassroomDialogOpen, setIsClassroomDialogOpen] = useState(false)
  const [mockStudents,setMockStudents] = useState<Student[]>([])



  const filteredStudents = mockStudents.filter(
    (student) =>
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parentContact.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredClassrooms = mockClassrooms.filter(
    (classroom) =>
      classroom.className.toLowerCase().includes(classroomSearchTerm.toLowerCase()) ||
      classroom.levelName.toLowerCase().includes(classroomSearchTerm.toLowerCase()) ||
      classroom.specializationName.toLowerCase().includes(classroomSearchTerm.toLowerCase()),
  )

  const handleStudentSelection = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudentIds([...selectedStudentIds, studentId])
    } else {
      setSelectedStudentIds(selectedStudentIds.filter((id) => id !== studentId))
    }
  }

  const removeStudent = (studentId: string) => {
    setSelectedStudentIds(selectedStudentIds.filter((id) => id !== studentId))
  }

  const handleClassroomSelection = (classroom: (typeof mockClassrooms)[0]) => {
    setSelectedClassroom(classroom)
    setIsClassroomDialogOpen(false)
  }

  const removeClassroom = () => {
    setSelectedClassroom(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload:CreateGroupPayload = {
      groupName,
      classroomId: selectedClassroom?.classroomId || "",
      studentIds: selectedStudentIds,
    }
    await createStudentGroup(payload)
    
  }

  useEffect(() => {
     const fetchStudent = async() => {
        const data:StudentsResponse = await getStudents(1,100);
        setMockStudents(data.items);
      }
        fetchStudent();


  },[])

useEffect(() => {
  const fetchData = async () => {
    try {
      const data:Classroom[]|string = await getClassrooms(); // ✅ use await here
      if (typeof data === 'string') {
      } else {
        setMockClassrooms(data)
      }
    } catch (err: any) {
    }
  };

  fetchData();


},[])

  return (
    <div className="  p-4">
        <Link to="" className="">
                  <button className=" ml-18     flex items-center gap-2 bg-yousra text-white px-4 rounded-4xl shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200">
                    <IoMdArrowBack size={20} />
                    <span>Back </span>
                  </button>
                </Link>
      <div className="mx-auto  max-w-6xl">
        <div className="bg-white rounded-lg shadow-2xl border-white">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Create New Group</h1>
            <p className="text-gray-600 mt-1">
              Fill in the details and select classroom and students to create a new group.
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Group Name */}
              <div className="space-y-2">
                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">
                  Group Name
                </label>
                <input
                  id="groupName"
                  type="text"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Classroom Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Selected Classroom</label>
                  <button
                    type="button"
                    onClick={() => setIsClassroomDialogOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <SchoolIcon />
                    Select Classroom
                  </button>
                </div>

                {/* Display Selected Classroom */}
                <div className="space-y-2">
                  {!selectedClassroom ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="w-12 h-12 mx-auto mb-2 opacity-50">
                        <SchoolIcon />
                      </div>
                      <p>No classroom selected</p>
                      <p className="text-sm">Click "Select Classroom" to choose a classroom for your group</p>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 bg-blue-50">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <h3 className="font-medium text-lg">{selectedClassroom.className}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Classroom ID:</span>
                              <p className="font-mono text-xs break-all">{selectedClassroom.classroomId}</p>
                            </div>
                            <div>
                              <span className="font-medium">Level:</span>
                              <p>{selectedClassroom.levelName}</p>
                            </div>
                            <div>
                              <span className="font-medium">Specialization:</span>
                              <p>{selectedClassroom.specializationName}</p>
                            </div>
                            <div>
                              <span className="font-medium">School Type:</span>
                              <p>{selectedClassroom.schoolType}</p>
                            </div>
                            <div>
                              <span className="font-medium">Level ID:</span>
                              <p className="font-mono">{selectedClassroom.schoolLevelId}</p>
                            </div>
                            <div>
                              <span className="font-medium">Specialization ID:</span>
                              <p className="font-mono">{selectedClassroom.specializationId}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeClassroom}
                          className="p-1 hover:bg-red-100 rounded-full transition-colors ml-2"
                        >
                          <XIcon />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Student Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Selected Students ({selectedStudentIds.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsStudentDialogOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <UsersIcon />
                    Select Students
                  </button>
                </div>

                {/* Display Selected Student IDs */}
                <div className="space-y-2">
                  {selectedStudentIds.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="w-12 h-12 mx-auto mb-2 opacity-50">
                        <UsersIcon />
                      </div>
                      <p>No students selected</p>
                      <p className="text-sm">Click "Select Students" to add students to your group</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {selectedStudentIds.map((studentId) => (
                        <div
                          key={studentId}
                          className="inline-flex items-center justify-between px-3 py-1 rounded-full text-xs font-mono bg-gray-100 text-gray-800"
                        >
                          <span className="truncate">{studentId}</span>
                          <button
                            type="button"
                            onClick={() => removeStudent(studentId)}
                            className="ml-2 p-0.5 hover:bg-red-100 rounded-full transition-colors"
                          >
                            <XIcon />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!groupName || !selectedClassroom || selectedStudentIds.length === 0}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Group ({selectedStudentIds.length} students selected)
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Classroom Selection Modal */}
      <Modal isOpen={isClassroomDialogOpen} onClose={() => setIsClassroomDialogOpen(false)} title="Select Classroom">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search classrooms..."
              value={classroomSearchTerm}
              onChange={(e) => setClassroomSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-6 gap-4 bg-gray-50 p-4 text-sm font-medium text-gray-700 border-b">
              <div>Nom de la Classe</div>
              <div>Niveau</div>
              <div>Spécialisation</div>
              <div>Type d'École</div>
              <div>Level ID</div>
              <div>Spec ID</div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredClassrooms.map((classroom) => (
                <div
                  key={classroom.classroomId}
                  className={`grid grid-cols-6 gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b ${
                    selectedClassroom?.classroomId === classroom.classroomId
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                  onClick={() => handleClassroomSelection(classroom)}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="classroom"
                      checked={selectedClassroom?.classroomId === classroom.classroomId}
                      onChange={() => handleClassroomSelection(classroom)}
                      className="h-4 w-4 text-blue-600 focus:ring-yousra"
                    />
                    <span className="text-sm font-medium">{classroom.className}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">{classroom.levelName}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">{classroom.specializationName}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">{classroom.schoolType}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-mono">{classroom.schoolLevelId}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-mono">{classroom.specializationId}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsClassroomDialogOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Student Selection Modal */}
      <Modal isOpen={isStudentDialogOpen} onClose={() => setIsStudentDialogOpen(false)} title="Select Students">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 gap-4 bg-gray-50 p-4 text-sm font-medium text-gray-700 border-b">
              <div>Nom</div>
              <div>N° Réf</div>
              <div>Nom du Parent</div>
              <div>Contact du Parent</div>
              <div className="text-center">Action</div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.studentId}
                  className={`grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 border-b ${
                    selectedStudentIds.includes(student.studentId) ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedStudentIds.includes(student.studentId)}
                      onChange={(e) => handleStudentSelection(student.studentId, e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                      {student.firstName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-sm font-medium">{student.lastName}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-blue-600">{student.studentIdNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">{student.parentFullName}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">{student.parentContact}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="px-3 py-1 bg-yellow-400 text-black text-sm rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      Voir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsStudentDialogOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setIsStudentDialogOpen(false)}
              className="px-4 py-2  text-white rounded-md text-sm font-medium bg-yousra focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Done ({selectedStudentIds.length} selected)
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
