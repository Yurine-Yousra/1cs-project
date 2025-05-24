import { API_URL } from "../lib/config";


export interface CreateClassroomRequest {
    className: string;
    levelName: string;
    specializationName: string;
    schoolType:string
  }
  

export async function createClassroom(newClass: CreateClassroomRequest): Promise<string> {
    const response = await fetch(`${API_URL}/api/classrooms`, {
      method: 'POST',
      headers: {
        'Accept': 'text/plain',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        className: newClass.className,
        schoolLevelId: Number(newClass.levelName),
        specializationId: Number(newClass.specializationName)
      })
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const result = await response.text(); 
    return result;
  }
 
 export async function updateClassroom(
  classroomId: string,
  data: CreateClassroomRequest
): Promise<string> {
  const response = await fetch(`${API_URL}/api/classrooms/${classroomId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'text/plain',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.text(); // assuming the API returns plain text
} 

export async function deleteClassroom(classroomId: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/classrooms/${classroomId}`, {
    method: 'DELETE',
    headers: {
      'Accept': '*/*',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to delete classroom. Status: ${response.status}`);
  }
} 