import toast from "react-hot-toast";
import { API_URL } from "../lib/config"

export interface Levels {
    levelId:number;
    levelYear:number;
    schoolTypeId:number; 
    schoolTypeName:string;
  }

export interface Relationship {
    id:number;
    name:string;
}  

export interface Specializations {
     specializationId: number;
    name: string
}


export const getLevels = async() => {
    try {
            const res =  await fetch(`${API_URL}/api/Levels`);
            const json:Levels[] = await res.json();
            const SchoolTypeId = Number(localStorage.getItem("shool"))
            
            
            return json.filter( item => SchoolTypeId == item.schoolTypeId )
    } catch (error) {
        toast.error("Failed to fetch levels:")
        return []
    }
}


export const getRelationship = async () => {
    try {
        const res =  await fetch(`${API_URL}/api/RelationshipToStudent`);
        const json:Relationship[] = await res.json();
        return json;
    } catch (error) {
        toast.error("Failed to fetch Realtionship:")
        return []
    }
}


export const getSpecializations = async () => {
    try {
        const res =  await fetch(`${API_URL}/api/Levels/specializations`);
        const json:Specializations[] = await res.json();
        return json;
    } catch (error) {
        toast.error("Failed to fetch Realtionship:")
        return []
    }



}

