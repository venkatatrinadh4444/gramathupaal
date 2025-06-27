"use client"

import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const UserContext=createContext({})
const API_URI=process.env.NEXT_PUBLIC_BACKEND_API_URI

export const UserContextProvider=({children}:{children:React.ReactNode})=> {
    const router=useRouter()
    const [user,setUser]=useState({})

    const fetchUser=()=> {
        axios.get(`${API_URI}/api/user/profile`,{withCredentials:true}).then(res=>setUser(res.data.user)).catch(()=>router.push('/login'))
    }

    useEffect(()=>{
        fetchUser()
    },[])
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useContextData=()=> {
    return useContext(UserContext)
}