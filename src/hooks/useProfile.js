import { useEffect, useState } from "react";
import USER from "../../mock-backend/user.json"


export default function useProfile(){
    const [profileData, setProfileData]= useState(USER)
    useEffect(()=> {
        setProfileData(USER)

    },[])
    console.log(profileData)

    return{
        profileData
    }

}