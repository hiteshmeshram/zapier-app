"use client"

import { Appbar } from "@/components/Appbar";
import { InputField } from "@/components/InputField";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function () {
    const [ email,setEmail ] = useState("")
    const [ password,setPassword ] = useState("")

    const router = useRouter()

    return <div className="bg-orange-50 pb-40">
    <Appbar/>
    <div className="flex justify-center w-full ">
        <div className="max-w-4xl  grid grid-cols-2">
            <div className=" flex flex-col justify-center">
                <div className="font-semibold text-3xl mb-4">
                Automate across your teams
                </div>
                <div className="text-gray-500">
                    Zapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.
                </div>
                <div className="py-4">
                    <button className="bg-blue-900 py-2 text-white px-4 font-semibold rounded">explore Zapire Enterprise</button>
                </div>
            </div>
            <div className="border  rounded-md shadow-sm mt-24">
                <div className="m-4 border-b border-gray-400 py-4">
                    <button className="w-full bg-blue-500 text-white py-3 rounded-md font-bold ">Continue with Google</button>
                </div>
                <div>
                    <InputField label={" Email"} type={"email"} onChange={(value)=>{
                        setEmail(value)
                    }}/>
                </div>
                <div className="">
                    
                    <InputField label={"password"} type={"password"} onChange={(value)=>{
                        setPassword(value)
                    }}/>

                </div>
                <div className=" mx-4">
                    <button 
                        className="w-full bg-slate-50 border py-3 e  font-semibold rounded-full text-gray-500 text-xl"
                        onClick={async()=>{
                            const res = await axios.post(`${BASE_URL}/api/v1/user/signin`,{
                                username: email,
                                password
                            })
                            alert(res.data);
                            localStorage.setItem('token',res.data.token);
                            router.push('/dashboard')
                        }}>continue</button>
                </div>
                <div className="mx-4 my-6 text-gray-500">
                     By signing up, you agree to Zapier's terms of service and privacy policy.
                </div>
            </div>
        </div>
    </div>
     
</div>
}