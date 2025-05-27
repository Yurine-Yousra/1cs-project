import { API_URL } from "../lib/config";

export interface ExamType {
    examTypeId: number;
    name: string;
  }
  

export async function getExamTypes(): Promise<ExamType[] | string> {
    const response = await fetch(`${API_URL}/api/ExamTypes`, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
  