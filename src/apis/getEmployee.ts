import { API_URL } from "../lib/config";

// src/apis/getEmployee.ts
const token = localStorage.getItem("token");

export interface Employee {
  employeeId: string;
  fullName: string;
  email: string;
  position: string;
  hireDate: string;
  contractType: string;
  isActive: boolean;
  permissions: number;
}

export interface EmployeesResponse {
  data: Employee[];
  pagination: {
    page: number;
    pageSize: number;
    hasNext: boolean;
  };
}

export interface EmployeeDetails {
  employeeId: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: string; // ISO date string (e.g., "0001-01-01")
  position: string;
  hireDate: string; // ISO date string (e.g., "2025-05-24")
  contractType: string;
  isActive: boolean;
  permissions: number;
  phoneNumber: string;
  address: {
    adresseId: number;
    street: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    country: string | null;
  };
  createdAt: string; // ISO date string (e.g., "0001-01-01T00:00:00")
  lastModified: string | null; // ISO date string or null
}


export const getEmployees = async (page: number, pageSize: number) => {
  try {
    const response = await fetch(
      `${API_URL}/api/employees?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: EmployeesResponse = await response.json();

    const totalPages = data.pagination.hasNext
      ? data.pagination.page + 1
      : data.pagination.page;

    return {
      data: data.data,
      totalPages,
    };
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    throw error;
  }
};


export const getEmployee = async (id:string|null) => {
  try {
    const response = await fetch(`http://localhost:5080/api/employees/${id}`, {
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
    
    const data:EmployeeDetails = await response.json(); 
    
    return data;
  } catch (error) {
    console.error('Failed to fetch students:', error);
    throw error;
  }
}  


