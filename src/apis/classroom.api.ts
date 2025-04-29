import { API_URL } from "../lib/config";

export interface Classroom {
    classroomId: string;
    className: string;
    schoolLevelId: number;
    specializationId: number;
    levelName: string;
    specializationName: string;
    schoolType: string;
  }
  
 export async function getClassrooms(): Promise<Classroom[] | string> {
    const response = await fetch(`${API_URL}/api/classrooms`, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
      }
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    try {
      return await response.json();
    } catch {
      return await response.text();
    }
  }
  
  