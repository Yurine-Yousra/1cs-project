import { API_URL } from "../lib/config"
import { Teacher } from "./getTeacher";

const token = localStorage.getItem("token");

export const getSybjects = async (id:string|null) => {
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