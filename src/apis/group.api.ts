import { API_URL } from "../lib/config";

export interface GroupResponse {
    groupId: string;
    groupName: string;
    levelId: number;
    groupCapacity: number;
    studentCount: number;
    level: {
      levelId: number;
      year: number;
      specialization: string;
      schoolType: string;
    };
  }
  
  
export  const GetStudentGroup = async () => {
    const response = await fetch(`${API_URL}/api/Groups`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    });
  
    if (!response.ok) {
      console.error('Failed to create group:', response.status, await response.text());
    return [] as GroupResponse[]; // Return an empty array on error
    } else {
      const result:GroupResponse[] = await response.json();
     return result;
    }
  };
  
 
  