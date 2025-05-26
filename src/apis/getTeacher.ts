import { API_URL } from "../lib/config"


export interface Teacher {
  teacherId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  hireDate: string; // ISO date string (e.g., "2020-05-24")
  contractTypeId: number;
  contractType: string;
  subjectIds: string[]; // Assuming these are UUIDs or string IDs of subjects
  schoolId: string;
  photo: string;
  address: string | null;
}




const token = localStorage.getItem("token");

export const getTeachers = async (): Promise<Teacher[] | null> => {
  try {
    const response = await fetch(`${API_URL}/api/teacher`, {
      method: 'GET',
      headers: {
        'accept': 'text/plain',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Teacher[] = await response.json(); // ✅ liste d'enseignants
    return data;
  } catch (error) {
    console.error('Failed to fetch teachers:', error);
    return null;
  }
};


export const getTeacher = async (id:string|null) => {
  try {
    const response = await fetch(`${API_URL}/api/teacher/${id}`, {
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
    
    const data:Teacher = await response.json(); 
    
    return data;
  } catch (error) {
    console.error('Failed to fetch students:', error);
    throw error;
  }
}  