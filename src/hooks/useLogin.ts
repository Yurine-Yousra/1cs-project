import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useRoleStore } from "../store/utls";
import { API_URL } from "../lib/config";

export const Uselogin = () => {
    const [err, setErr] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { role } = useRoleStore();
    
    interface DecodedToken {
        sub: string;
        email: string;
        firstName: string;
        lastName: string;
        SchoolId: string;
        exp: number;
        iat: number;
        SchoolTypeId: string;
        Permission: string;
        TeacherId:string;
        EmployeeId:string;
    }

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        setErr(false);

        const endpoint = role === "admin" ? "api/auth/login" : "api/teacher/auth/login";
        
        try {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { 'Content-type': "application/json" },
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setErr(json.error || "Login failed");
                toast.error(json.error || "Login failed");
                return;
            }

            if (response.ok) {
                const decoded: DecodedToken = jwtDecode(json.token);
                console.log(decoded);
                
                // Store token and common user data
                localStorage.setItem('token', json.token);
                localStorage.setItem('SchoolId', decoded.SchoolId);
                localStorage.setItem('role', decoded.Permission);
                localStorage.setItem('shool', decoded.SchoolTypeId); // do change this to SchoolTypeId
                
                // Store role-specific ID
                if(role ==="admin"){
                    localStorage.setItem('employeeId' , decoded.EmployeeId)
                    console.log(decoded.EmployeeId)
                }
                else{
                    localStorage.setItem('teacherId' , decoded.TeacherId)
                    console.log(decoded.TeacherId)
                }
                
                // Store user details that might be needed globally

                toast.success("Logged in successfully");
                
                // Redirect based on role if needed
                const redirectPath = role === "admin" ? "/dashboard" : "/Teacherdashboard/profile";
                navigate(redirectPath);
            }
        } catch (error) {
            setIsLoading(false);
            setErr(true);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred during login");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return { login, isLoading, err };
};