"use client"
import { useRouter } from "next/navigation"
import { LinkButton } from "./LinkButton"
import { PrimaryButton } from "./PrimaryButton"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "@/config"

export const Appbar = ()=> {
    const router = useRouter();
    const [ isLoggedIn,setIsLoggedIn ] = useState(false);
    useEffect(()=>{
        async function init() {
            const res =await axios.get(`${BASE_URL}/api/v1/user`,{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
    
            if (res.data.user) {
                setIsLoggedIn(true)
            }
        }
        init()
      },[])

      if (isLoggedIn) {
        return <div className="flex justify-between border-b py-4 shadow-md px-10  w-full z-10 ">
            <div className="font-bold text-2xl ">Zapier</div>
            <PrimaryButton onClick={()=>{
                localStorage.removeItem('token');
                router.push('/signup');
            }}>sign out</PrimaryButton>
        </div>
      }

    return <div className="flex justify-between border-b py-4 shadow-md px-10  w-full z-10 ">
        <div className="font-bold text-2xl ">
            Zapier
        </div>
        <div className="flex">
            <LinkButton onClick={()=>{} } >Contact Sales </LinkButton>
            <LinkButton onClick={()=>{
                router.push('/login')
            } } >Login </LinkButton>
            <PrimaryButton onClick={()=>{
                router.push('/signup')
            }}>sign up</PrimaryButton>
           
        </div>
    </div>
}