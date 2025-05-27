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
