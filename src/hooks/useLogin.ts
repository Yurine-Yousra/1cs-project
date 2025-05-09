import { useState } from "react";
import toast from "react-hot-toast";
//import { useUserStore } from "../store/userStore"; wiil use later
import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/config";

import {jwtDecode} from 'jwt-decode';  // Correct import
import { useRoleStore } from "../store/utls";

export const Uselogin = () => {
    const [err, setErr] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {role} = useRoleStore()
    
    // Define interface for the decoded token
    interface DecodedToken {
        sub: string;
        email: string;
        firstName: string;
        lastName: string;
        SchoolId: string;
        exp: number;
        iat: number;
        SchoolTypeId:string;
        Permission:string,
    }

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        setErr(false);

        const endpoint = role === "admin" ? "api/auth/login" :"api/teacher/auth/login"
        try {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { 'Content-type': "application/json" },
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setErr(json.error);
                return;
            }

            if (response.ok) {
                // Decode the JWT token after successful login
                const decoded: DecodedToken = jwtDecode(json.token);
                console.log(decoded)
              
                // Save the token in local storage
                localStorage.setItem('token', json.token);

                // Set the decoded user info to the store
               
                    localStorage.setItem('SchoolId' ,decoded.SchoolId)
                  localStorage.setItem('role' ,decoded.Permission)
                  localStorage.setItem('shool',decoded.SchoolTypeId)
                

                toast.success("User logged in successfully");

                // Redirect to the dashboard
                navigate("/dashboard");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(` ${error.message}`);
                setErr(true);
            } else {
                toast.error("An unknown error occurred");
                setErr(true);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return { login, isLoading, err }
}
