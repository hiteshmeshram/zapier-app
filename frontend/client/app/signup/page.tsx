"use client"

import { Appbar } from "@/components/Appbar";
import { InputField } from "@/components/InputField";
import { SecondaryButton } from "@/components/SecondaryButton";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function () {
    const [ name,setName ] = useState("")
    const [ email,setEmail ] = useState("")
    const [ password,setPassword ] = useState("")

    const router = useRouter();

    return <div className="bg-orange-50 pb-40">
        <Appbar/>
        <div className="flex justify-center w-full ">
            <div className="max-w-4xl  grid grid-cols-2">
                <div className="pt-28">
                    <div className="font-semibold text-4xl mb-8">
                        Join millions worldwide who use Zapier to automate their work.
                    </div>
                    <div className="flex mb-4">
                        <div><TickSvg/></div>
                        <div className="ml-2">Easy setup, no coding required</div>
                    </div>
                    <div className="flex mb-4">
                        <div><TickSvg/></div>
                        <div className="ml-2">Free forever for core features
                        </div>
                    </div>
                    <div className="flex">
                        <div><TickSvg/></div>
                        <div className="ml-2">14-day trial of premium features & apps</div>
                    </div>
                </div>
                <div className="border border-black rounded-md shadow-md mt-24">
                    <div className="m-4 border-b border-gray-400 py-4">
                        <button className="w-full bg-blue-500 text-white py-3 rounded-md  ">sign in with Google</button>
                    </div>
                    <div>
                        <InputField label={"Work Email"} type={"email"} onChange={(value)=>{
                            setEmail(value)
                        }}/>
                    </div>
                    <div className="">
                        <InputField label={"First Name"} type={"text"} onChange={(value)=>{
                            setName(value)
                        }}/>
                        <InputField label={"password"} type={"password"} onChange={(value)=>{
                            setPassword(value)
                        }}/>

                    </div>
                    <div className=" mx-4">
                        <button 
                            className="w-full bg-orange-500 py-3 text-white  font-semibold rounded-full"
                            onClick={async ()=>{
                               const res = await  axios.post(`${BASE_URL}/api/v1/user/signup`,{
                                    username: email,
                                    name,
                                    password
                                })
                                alert(res.data.message)
                                router.push('/login');
                            }}>Get started for free</button>
                    </div>
                    <div className="mx-4 my-6 text-gray-500">
                         By signing up, you agree to Zapier's terms of service and privacy policy.
                    </div>
                </div>
            </div>
        </div>
         
    </div>
}

function TickSvg() {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="size-6">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
        </svg>

    </div>
}