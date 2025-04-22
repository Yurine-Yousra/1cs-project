"use client"

import { useEffect, useState } from "react"
import { BookOpen, Calendar, GraduationCap, MapPin, Phone, Star, Trophy, User } from "lucide-react"
import { getStudent, StudentDetails } from "../../apis/students.api"
import { useSearchParams } from "react-router-dom"
import { calculateAge, formatDate } from "../../utils/timePack"
import { schoolLevelMap, specializationMap } from "../../utils/schoolLevels"

// Define the student data type





export const  StudentProfile = ()  =>  {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const color = searchParams.get('color')
  const [activeTab, setActiveTab] = useState("overview")
  const [studentData, setStudentData] = useState<StudentDetails | null>()

  useEffect(() => {
         
    const fetchUser = async () => {
                const data = await getStudent(id);
                if (!data) {
                  setStudentData(null);  // No student found
                } else {
                  setStudentData(data);  // Student found
                }
        } 
        fetchUser();
  },[id])

 

  // Get initials for avatar fallback
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }
  if (studentData === undefined) {
    return <div>Loading...</div>;
  }

  if (studentData === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-3xl font-bold mb-4">Student Not Found</h1>
        <p className="text-gray-600">We couldn't find a student with that ID.</p>
      </div>
    );
  }

  if (studentData)
  return (
    <div className="container mx-auto py-5">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column - Student Info */}
        <div className="rounded-lg border  shadow-sm md:col-span-1">
          <div className="flex flex-col items-center p-6 text-center">
            {/* Avatar */}
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              {studentData.photoUrl ? (
                <img
                  src={studentData.photoUrl || "/placeholder.svg"}
                  alt={`${studentData.firstName} ${studentData.lastName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className={` flex h-full w-full items-center justify-center ${color} text-lg font-medium `}>
                  {getInitials(studentData?.firstName, studentData.lastName)}
                </div>
              )}
            </div>
            <h2 className="mt-4 text-xl font-bold">{`${studentData.firstName} ${studentData.lastName}`}</h2>
            <p className="text-sm text-gray-500">Student ID: {studentData.studentId.substring(0, 8)}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <span className="rounded-full border bg-blue-50 px-2.5 py-0.5 text-xs  font-semibold">
                {specializationMap[studentData.specializationId] || `Specialization ${studentData.specializationId}`}
              </span>
              <span className="rounded-full border bg-green-50 px-2.5 py-0.5  text-xs font-semibold">
                {schoolLevelMap[studentData.schoolLevelId] || `Level ${studentData.schoolLevelId}`}
              </span>
              {studentData.isActive && (
                <span className="rounded-full border bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  Active
                </span>
              )}
            </div>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Address: {studentData.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                Birth: {formatDate(studentData.birthDate)} ({calculateAge(studentData.birthDate)} years)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Birth Place: {studentData.birthPlace}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Emergency Contact: {studentData.emergencyContact}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Enrollment Date: {formatDate(studentData.enrollmentDate)}</span>
            </div>
            <hr className="my-4 border-t border-gray-200" />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">School Information</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">School ID:</span>
                <span className="text-sm">{studentData.schoolId.substring(0, 8)}...</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Parent ID:</span>
                <span className="text-sm">{studentData.parentId.substring(0, 8)}...</span>
              </div>
            </div>
          </div>
        
        </div>

        {/* Right Column - Tabs Content */}
        <div className="rounded-lg border bg-white shadow-sm md:col-span-2">
          {/* Custom Tabs */}
          <div className="border-b">
            <div className="flex p-6">
              <div className="grid w-full grid-cols-3 rounded-md bg-gray-100 p-1">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`rounded-sm px-3 py-1.5 text-sm font-medium ${
                    activeTab === "overview" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`rounded-sm px-3 py-1.5 text-sm font-medium ${
                    activeTab === "courses" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Courses
                </button>
                <button
                  onClick={() => setActiveTab("achievements")}
                  className={`rounded-sm px-3 py-1.5 text-sm font-medium ${
                    activeTab === "achievements"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Achievements
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            {/* Overview Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Program Progress</h3>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full w-[65%] rounded-full bg-blue-500"></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    65% completed toward {specializationMap[studentData.specializationId] || "Degree"}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Current Status</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border bg-white p-4 shadow-sm">
                      <div className="pb-2">
                        <h3 className="text-base font-medium">Enrollment Status</h3>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{studentData.isActive ? "Active" : "Inactive"}</div>
                        <p className="text-xs text-gray-500">Since {formatDate(studentData.enrollmentDate)}</p>
                      </div>
                    </div>
                    <div className="rounded-lg border bg-white p-4 shadow-sm">
                      <div className="pb-2">
                        <h3 className="text-base font-medium">Academic Level</h3>
                      </div>
                      <div>
                        <div className="text-lg font-bold">
                          {schoolLevelMap[studentData.schoolLevelId] || `Level ${studentData.schoolLevelId}`}
                        </div>
                        <p className="text-xs text-gray-500">
                          {specializationMap[studentData.specializationId] ||
                            `Specialization ${studentData.specializationId}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Student Information</h3>
                  <div className="rounded-lg border bg-white shadow-sm">
                    <div className="p-4">
                      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                          <dd className="text-sm">{`${studentData.firstName} ${studentData.lastName}`}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Student ID</dt>
                          <dd className="text-sm">{studentData.studentId}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                          <dd className="text-sm">{formatDate(studentData.birthDate)}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Place of Birth</dt>
                          <dd className="text-sm">{studentData.birthPlace}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Address</dt>
                          <dd className="text-sm">{studentData.address}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Emergency Contact</dt>
                          <dd className="text-sm">{studentData.emergencyContact}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Upcoming Events</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Midterm Exams</p>
                        <p className="text-sm text-gray-500">October 15-20, 2023</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Course Registration</p>
                        <p className="text-sm text-gray-500">November 1, 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab Content */}
            {activeTab === "courses" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Current Courses</h3>
                  <div className="space-y-3">
                    {[
                      { code: "CS301", name: "Data Structures and Algorithms", grade: "A", credits: 3 },
                      { code: "CS315", name: "Database Systems", grade: "A-", credits: 3 },
                      { code: "CS350", name: "Operating Systems", grade: "B+", credits: 3 },
                      { code: "MATH240", name: "Linear Algebra", grade: "A", credits: 3 },
                      { code: "ENG210", name: "Technical Writing", grade: "A-", credits: 3 },
                    ].map((course, i) => (
                      <div key={i} className="rounded-lg border bg-white shadow-sm">
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">
                                {course.code}: {course.name}
                              </p>
                              <p className="text-sm text-gray-500">{course.credits} credits</p>
                            </div>
                            <div className="text-right">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  course.grade.startsWith("A")
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {course.grade}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Previous Courses</h3>
                    <button className="rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { code: "CS201", name: "Object-Oriented Programming", grade: "A", semester: "Spring 2023" },
                      { code: "CS210", name: "Computer Architecture", grade: "B+", semester: "Spring 2023" },
                      { code: "MATH220", name: "Calculus III", grade: "A-", semester: "Fall 2022" },
                    ].map((course, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">
                            {course.code}: {course.name}
                          </p>
                          <p className="text-sm text-gray-500">{course.semester}</p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            course.grade.startsWith("A") ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {course.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Achievements Tab Content */}
            {activeTab === "achievements" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Academic Achievements</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                      <div className="bg-blue-50 p-2">
                        <Trophy className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium">Dean's List</h4>
                        <p className="text-sm text-gray-500">Fall 2022, Spring 2023</p>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                      <div className="bg-blue-50 p-2">
                        <Star className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium">Academic Excellence Award</h4>
                        <p className="text-sm text-gray-500">2022-2023 Academic Year</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Certifications</h3>
                  <div className="space-y-3">
                    {[
                      { name: "AWS Certified Cloud Practitioner", date: "August 2023", issuer: "Amazon Web Services" },
                      { name: "Microsoft Azure Fundamentals", date: "May 2023", issuer: "Microsoft" },
                      { name: "Google IT Support Professional", date: "January 2023", issuer: "Google" },
                    ].map((cert, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <GraduationCap className="mt-0.5 h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-gray-500">
                            {cert.issuer} • {cert.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Extracurricular Activities</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Computer Science Club", role: "Vice President", period: "2022-Present" },
                      { name: "Hackathon Team", role: "Team Lead", period: "2023" },
                      { name: "Peer Tutoring Program", role: "Tutor", period: "2022-Present" },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <BookOpen className="mt-0.5 h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-gray-500">
                            {activity.role} • {activity.period}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
 
}
