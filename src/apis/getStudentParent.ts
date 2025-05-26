import { API_URL } from "../lib/config"


export interface Parent {
    
  parentId: string,
  firstName: string,
  lastName: string,
  occupation: string,
  relationshipToStudent: string,
  email: string,
  phoneNumber: string

}

export const getStudentParent = async (id:string|null) => {
  try {
    const response = await fetch(`${API_URL}/api/parents/${id}/parent`, {
      method: 'GET',
      headers: {
        'accept': 'text/plain',
      },
    });

    
    if (response.status === 404) {
      return null; // Not found
    }
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data:Parent = await response.json(); 
    
    return data;
  } catch (error) {
    console.error('Failed to fetch students:', error);
    throw error;
  }


}  