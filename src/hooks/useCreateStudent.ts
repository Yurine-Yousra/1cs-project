import { useState } from "react";
import { API_URL } from "../lib/config";
import toast from "react-hot-toast";


export interface StudentFormData {
  studentInfosDTO: {
    firstName: string
    lastName: string
    address: string
    birthDate: string
    birthPlace: string
    emergencyContact: string
    schoolLevelId: number 
    specializationId: number 
  }
  parentInfosDTO: {
    nationalIdentityNumber: string
    firstName: string
    lastName: string
    email: string
    relationshipToStudentId: number
    occupation: string
    phoneNumber: string
  }
}  


export interface StudentFormPayload {
  studentInfosDTO: {
    firstName: string
    lastName: string
    address: string
    birthDate: string
    birthPlace: string
    emergencyContact: string
    schoolLevelId: number 
    specializationId: number | null
  }
  parentInfosDTO: {
    nationalIdentityNumber: string
    firstName: string
    lastName: string
    email: string
    relationshipToStudentId: number
    occupation: string
    phoneNumber: string
  }
}  


export function useCreateStudent() {
  const [loading, setLoading] = useState(false);
 
  const createStudent = async (data:StudentFormData) => {
    const payload:StudentFormPayload = {
    studentInfosDTO: {
      firstName: data.studentInfosDTO.firstName,
      lastName: data.studentInfosDTO.lastName,
      address: data.studentInfosDTO.address,
      birthDate: data.studentInfosDTO.birthDate,
      birthPlace: data.studentInfosDTO.birthPlace,
      emergencyContact: data.studentInfosDTO.emergencyContact,
      schoolLevelId: data.studentInfosDTO.schoolLevelId,
      specializationId: Number(localStorage.getItem("shool")) === 3 ? data.studentInfosDTO.specializationId:null
    },
    parentInfosDTO: {
      nationalIdentityNumber: data.parentInfosDTO.nationalIdentityNumber,
      firstName: data.parentInfosDTO.firstName,
      lastName: data.parentInfosDTO.lastName,
      email: data.parentInfosDTO.email,
      relationshipToStudentId: data.parentInfosDTO.relationshipToStudentId,
      occupation: data.parentInfosDTO.occupation,
      phoneNumber: data.parentInfosDTO.phoneNumber
    }
    }


    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/students/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if(res.ok) {
        toast.success("student create succesfully");
      }
      
      return result;

    } catch (error) {
        if (error instanceof Error) {
            toast.error(` ${error.message}`);
        } else {
            toast.error("An unknown error occurred");
        }}
    finally {
      setLoading(false);
    }
  };

  return { createStudent, loading };
}
