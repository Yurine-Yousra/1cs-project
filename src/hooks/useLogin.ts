import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/config";
import { jwtDecode } from 'jwt-decode';

export const Uselogin = () => {
    const [err, setErr] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
    interface DecodedToken {
        sub: string;
        email: string;
        SchoolId: string;
        role: string; // This will be "Teacher" or whatever role you set
        exp: number;
        // Add other claims you include in your token
    }

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        setErr(false);
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': "application/json" },
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setErr(json.error || "Login failed");
                toast.error(json.error || "Login failed");
                return;
            }

            // Decode the JWT token
            const decoded: DecodedToken = jwtDecode(json.token);
            console.log("Decoded token:", decoded);

            // Save token and user data
            localStorage.setItem('token', json.token);
            localStorage.setItem('userRole', decoded.role);
            localStorage.setItem('schoolId', decoded.SchoolId);
            localStorage.setItem('userId', decoded.sub);

            // Redirect based on role
            if (decoded.role === "Teacher") {
                toast.success("Teacher logged in successfully");
                navigate("/teacher-dashboard");
            } else if (decoded.role === "Employee") {
                toast.success("Employee logged in successfully");
                navigate("/employee-dashboard");
            } else {
                toast.error("Unknown user role");
                navigate("/");
            }

        } catch (error) {
            console.error("Login error:", error);
            toast.error(error instanceof Error ? error.message : "Login failed");
            setErr(true);
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, err };
};