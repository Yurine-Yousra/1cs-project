import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/config";







export const useSignup = () => {
  const [err, setErr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const naviagte = useNavigate();

  const signup = async (data: { 
    school: {
      schoolName: string;
      schoolType: string;
      schoolEmail: string;
      phoneNumber: string;
      address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
    };
    employee: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      password: string;
      permission: number;
    };
  }) => {
    setIsLoading(true);
    setErr(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school: {
            schoolName: data.school.schoolName,
            schoolType: data.school.schoolType,
            schoolEmail: data.school.schoolEmail,
            phoneNumber: data.school.phoneNumber,
            address: {
              street: data.school.address.street,
              city: data.school.address.city,
              state: data.school.address.state,
              postalCode: data.school.address.postalCode,
              country: data.school.address.country,
            },
          },
          employee: {
            firstName: data.employee.firstName,
            lastName: data.employee.lastName,
            phoneNumber: data.employee.phoneNumber,
            email: data.employee.email,
            password: data.employee.password,
            permission: data.employee.permission,
          },
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Something went wrong");
      }

      // Save the user to local storage
      toast.success("create acount succefully");
      naviagte("/dashboard");
      // update the auth context if needed

    } catch (error) {
        if (error instanceof Error) {
            toast.error(` ${error.message}`)
            setErr(error.message)
        } else {
            toast.error("An unknown error occurred")
            setErr("must be unkow")
          }        
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, err };
};
