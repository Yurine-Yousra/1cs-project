"use client"

import { useEffect, useState } from "react"
import {  Calendar, MapPin, Phone, User } from "lucide-react"
import { getStudent, StudentDetails } from "../../apis/students.api"
import { useSearchParams } from "react-router-dom"
import { calculateAge, formatDate } from "../../utils/timePack"
import { schoolLevelMap, specializationMap } from "../../utils/schoolLevels"






export const  StudentProfile = ()  =>  {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const color = searchParams.get('color')
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
         
          <div className="p-6">

            
          </div>
        </div>
      </div>
    </div>
  )
 
}
