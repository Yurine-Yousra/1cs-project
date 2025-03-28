import { useState } from "react"
import toast from "react-hot-toast";
import { useUserStore } from "../zustand/userStore";
import { useNavigate } from "react-router-dom";


export const Uselogin = () => {

    const [err,setErr] = useState<boolean>(false);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const {setUser} = useUserStore();
    const naviagte = useNavigate();


    const login = async (email:string,password:string):Promise<void> => {
        setIsLoading(true)
        setErr(false);
            try {
                const response = await fetch('http://localhost:5080/api/auth/login',{
                    method:"POST",
                    body:JSON.stringify({email,password}),
                    headers:{'Content-type':"application/json"},
                })
        
                const json = await response.json();
                if(! response.ok){
                    setIsLoading(false);
                    setErr(json.error);
                }
                if (response.ok) {
                    // save the user to local storage
                    localStorage.setItem('token',json.token)
                        toast.success("user Login succefully")
                        setUser(json);
                        
                       // console.log(user)
                        naviagte("/dashboard");
                }
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(` ${error.message}`)
                    setErr(true)
                } else {
                    toast.error("An unknown error occurred")
                    setErr(true)
                  }             }
            finally{
                setIsLoading(false);
            }
            
     
    }

    return {login,isLoading,err}

}