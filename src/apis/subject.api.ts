import { API_URL } from "../lib/config";

export interface Subject {
    subjectId: number;
    name: string;
    schoolType: number;
    teachers: any[]; 
  }

export async function getSubjectsBySchoolLevel(): Promise<any> {
    const response = await fetch(`${API_URL}/api/Subjects/BySchoolLevel`, {
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
      return data.subjects as Subject[];
    } catch {
      return await response.text();
    }
  }
  