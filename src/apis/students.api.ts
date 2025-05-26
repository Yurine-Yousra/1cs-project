import { API_URL } from "../lib/config";

export interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  studentIdNumber: string;
  parentFullName: string;
  photoUrl: string;
  parentContact: string;
}

export interface StudentsResponse {
  items: Student[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
}

export interface StudentDetails {
  studentId: string;
  firstName: string;
  lastName: string;
  address: string;
  birthDate: string;         // ISO date string (ex: "2005-02-08")
  birthPlace: string;
  schoolId: string;
  studentIdNumber: string | null;
  emergencyContact: string;
  schoolLevelId: number;
  specializationId: number;
  parentRelationshipToStudentTypeId: number;
  photoUrl: string | null;
  enrollmentDate: string;    // ISO date string (ex: "2025-04-22")
  parentId: string;
  isActive: boolean;
  groupId: string | null;
}



const token = localStorage.getItem("token");

 
export const  getStudents =  async (page: number, pageSize: number) => {
    

    try {
      const response = await fetch(`${API_URL}/api/students/list?page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: {
          'accept': 'text/plain',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data:StudentsResponse = await response.json(); 
      return data;
    } catch (error) {
      console.error('Failed to fetch students:', error);
      throw error;
    }
  }
  

export const getStudent = async (id:string|null) => {
  try {
    const response = await fetch(`${API_URL}/api/students/${id}`, {
      method: 'GET',
      headers: {
        'accept': 'text/plain',
        'Authorization': `Bearer ${token}`,
      },
    });

    
    if (response.status === 404) {
      return null; // Not found
    }
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data:StudentDetails = await response.json(); 
    
    return data;
  } catch (error) {
    console.error('Failed to fetch students:', error);
    throw error;
  }


}  