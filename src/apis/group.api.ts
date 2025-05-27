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

  
export type CreateGroupPayload = {
    groupName: string;
    classroomId: string;
    studentIds: string[];
  };
  
export const createStudentGroup = async (payload: CreateGroupPayload) => {
    const response = await fetch(`${API_URL}/api/group/students`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  
    if (!response.ok) {
      console.error('Failed to create group:', response.status, await response.text());
    } else {
      const result = await response.json();
      alert("Group created successfully!");
      return result;
    }
  };   
  
  export interface Student {
    studentId: string;
    firstName: string;
    lastName: string;
    studentIdNumber: string;
    parentName: string;
    parentContact: string;
    parentEmail: string;
  }
  
  export async function getStudentsByGroup(groupId: string): Promise<Student[] | string> {
    const response = await fetch(`${API_URL}/api/group/students/by-group/${groupId}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    try {
      const data = await response.json();
      return data as Student[];
    } catch {
      return await response.text();
    }
  }
  
  export async function assignStudentToGroup(studentId: string, groupId: string): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/api/Groups/assign-student`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          studentId,
          groupId
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return JSON.stringify(data); 
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error('Error assigning student to group:', error);
      return `Error: ${(error as Error).message}`;
    }
  }
  
  export interface UpdateGroupPayload {
    groupName: string;
    groupCapacity: number;
    studentIds: string[]; 
  }
  
  export const updateGroup = async (
    groupId: string,
    payload: UpdateGroupPayload
  ) => {
    const response = await fetch(`${API_URL}/api/Groups/${groupId}`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  
    if (!response.ok) {
      console.error('Failed to update group:', response.status, await response.text());
    } else {
      const result = await response.json();
      alert("Group updated successfully!");
      return result;
    }
  };
   
  export const deleteGroup = async (groupId: string) => {
    const response = await fetch(`${API_URL}/api/Groups/${groupId}`, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    });
  
    if (!response.ok) {
      console.error('Failed to delete group:', response.status, await response.text());
    } else {
      alert("Group deleted successfully!");
    }
  };
  
  
  