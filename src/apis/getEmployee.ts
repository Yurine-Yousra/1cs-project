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

export const getEmployees = async (page: number, pageSize: number) => {
  try {
    const response = await fetch(
      `http://localhost:5080/api/employees?page=${page}&pageSize=${pageSize}`,
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


export const getStudent = async (id:string|null) => {
  try {
    const response = await fetch(`http://localhost:5080/api/students/${id}`, {
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
    
    const data:StudentDetails = await response.json(); 
    
    return data;
  } catch (error) {
    console.error('Failed to fetch students:', error);
    throw error;
  }


}  