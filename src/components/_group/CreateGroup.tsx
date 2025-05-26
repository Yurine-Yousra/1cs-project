"use client"

import type React from "react"
import { useState } from "react"
import { IoMdArrowBack } from "react-icons/io"
import { Link } from "react-router-dom"

// Mock student data
const mockStudents = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "First Last Name",
    refNumber: "124589762I-AA54",
    parentName: "Parent Name",
    parentContact: "0642346547987",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4fb85f64-5717-4562-b3fc-2c963f66afa7",
    name: "Alice Johnson",
    refNumber: "124589763I-BB55",
    parentName: "Robert Johnson",
    parentContact: "0642346547988",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5fc85f64-5717-4562-b3fc-2c963f66afa8",
    name: "Bob Smith",
    refNumber: "124589764I-CC56",
    parentName: "Sarah Smith",
    parentContact: "0642346547989",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6fd85f64-5717-4562-b3fc-2c963f66afa9",
    name: "Emma Wilson",
    refNumber: "124589765I-DD57",
    parentName: "Michael Wilson",
    parentContact: "0642346547990",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7fe85f64-5717-4562-b3fc-2c963f66afaa",
    name: "David Brown",
    refNumber: "124589766I-EE58",
    parentName: "Lisa Brown",
    parentContact: "0642346547991",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8ff85f64-5717-4562-b3fc-2c963f66afab",
    name: "Sophie Martin",
    refNumber: "124589767I-FF59",
    parentName: "Pierre Martin",
    parentContact: "0642346547992",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock classroom data
const mockClassrooms = [
  {
    classroomId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    className: "1ère année Classe Scientifique",
    schoolLevelId: 1,
    specializationId: 101,
    levelName: "1ère année",
    specializationName: "Scientifique",
    schoolType: "Lycée",
  },
  {
    classroomId: "4fb85f64-5717-4562-b3fc-2c963f66afa7",
    className: "2ème année Classe Littéraire",
    schoolLevelId: 2,
    specializationId: 102,
    levelName: "2ème année",
    specializationName: "Littéraire",
    schoolType: "Lycée",
  },
  {
    classroomId: "5fc85f64-5717-4562-b3fc-2c963f66afa8",
    className: "3ème année Classe Économique",
    schoolLevelId: 3,
    specializationId: 103,
    levelName: "3ème année",
    specializationName: "Économique",
    schoolType: "Lycée",
  },
  {
    classroomId: "6fd85f64-5717-4562-b3fc-2c963f66afa9",
    className: "1ère année Classe Technique",
    schoolLevelId: 1,
    specializationId: 104,
    levelName: "1ère année",
    specializationName: "Technique",
    schoolType: "Institut Technique",
  },
]

// Icons as SVG components
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>
)

const SchoolIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
)

// Modal Component
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-40 " onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <XIcon />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">{children}</div>
      </div>
    </div>
  )
}

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("")
  const [selectedClassroom, setSelectedClassroom] = useState<(typeof mockClassrooms)[0] | null>(null)
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [classroomSearchTerm, setClassroomSearchTerm] = useState("")
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [isClassroomDialogOpen, setIsClassroomDialogOpen] = useState(false)

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.refNumber.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      groupName,
      classroomId: selectedClassroom?.classroomId,
      studentIds: selectedStudentIds,
    }

    console.log("Group creation payload:", JSON.stringify(payload, null, 2))
    alert("Group created! Check console for payload.")
  }

  return (
    <div className="  p-4">
        <Link to="" className="">
                  <button className=" ml-18     flex items-center gap-2 bg-yousra text-white px-4 rounded-4xl shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200">
                    <IoMdArrowBack size={20} />
                    <span>Back </span>
                  </button>
                </Link>
      <div className="mx-auto max-w-6xl">
        <div className="bg-white rounded-lg shadow-sm border">
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
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
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
                  key={student.id}
                  className={`grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 border-b ${
                    selectedStudentIds.includes(student.id) ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedStudentIds.includes(student.id)}
                      onChange={(e) => handleStudentSelection(student.id, e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-sm font-medium">{student.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-blue-600">{student.refNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">{student.parentName}</span>
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Done ({selectedStudentIds.length} selected)
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
