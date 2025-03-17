import { useState } from "react"
import toast from "react-hot-toast";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/config";


export const Uselogin = () => {

    const [err,setErr] = useState<boolean>(false);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const {setUser} = useUserStore();
    const naviagte = useNavigate();


    const login = async (email:string,password:string):Promise<void> => {
        setIsLoading(true)
        setErr(false);
            try {
                const response = await fetch(`${API_URL}/api/auth/login`,{
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
                   // localStorage.setItem('user',JSON.stringify(json))
                        toast.success("user Login succefully")
                        setUser(json);
                        document.cookie= `token=${json.token}`
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