// src/api/markAbsence.ts
import { API_URL } from "../lib/config";

export async function markAbsences(
  groupId: string,
  studentIds: string[]
): Promise<void | string> {
  const response = await fetch(`${API_URL}/api/Absence/mark/${groupId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(studentIds),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  try {
    return await response.text(); // If the API returns text (can also use json() depending on response type)
  } catch {
    return "Unexpected response format";
  }
}



export interface TeacherReportRequest {
  studentId: string;
  title: string;
  description: string;
  reportDate: string; // ISO format e.g., "2025-05-27T04:16:01.776Z"
}

export async function addTeacherReport(
  report: TeacherReportRequest
): Promise<string> {
  const response = await fetch(`${API_URL}/api/teacher/reports/add`, {
    method: "POST",
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(report),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.text();
}
