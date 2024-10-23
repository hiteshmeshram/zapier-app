"use client"

import { Appbar } from "@/components/Appbar";
import { InputField } from "@/components/InputField";
import { SecondaryButton } from "@/components/SecondaryButton";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function () {
    const [ name,setName ] = useState("")
    const [ email,setEmail ] = useState("")
    const [ password,setPassword ] = useState("")
    const [ismodelOpen,setIsmodelOpen ] = useState(false);

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
                <div className={`border border-black rounded-md shadow-md mt-24 relative ${ismodelOpen} ? blur-3xl: blur-none`}>
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
                        {ismodelOpen &&  <div className="absolute top-24 left-16"><OtpComponent email={email} name={name}  password={password} isOpen={(value)=>setIsmodelOpen(value)}/></div>}
                        <button 
                            className="w-full bg-orange-500 py-3 text-white  font-semibold rounded-full "
                            onClick={async ()=>{
                                console.log('hit');
                                //model  should open for otp 
                                if (!email && !password && !name) {
                                    return;
                                }
                                setIsmodelOpen(true);

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

function OtpComponent({email,name,password , isOpen}: {
    email: string,
    name: string,
    password: string,
    isOpen: (value: boolean)=>void
}) {
    const router = useRouter();
    const [otp,setOtp ] = useState(0)

    useEffect(()=>{
        const response =  axios.post(`${BASE_URL}/api/v1/user/otp`,{
            email
        })
    },[])

    return <div id="static-modal" data-modal-backdrop="static"  className=" z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
    
        <div className="relative bg-white rounded-lg shadow ">
            
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 flex justify-center">
                    Enter your Otp
                </h3>
                
            </div>
           
            <div className="p-4 md:p-5 space-y-4 w-full">
                <input onChange={(e)=>{
                    setOtp(Number(e.target.value))
                }} type='number' placeholder="enter otp " className="px-4 py-2 border w-full"></input>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 justify-center">
                <button onClick={async ()=>{
                    const firstResponse = await axios.post(`${BASE_URL}/api/v1/user/otpvalidate`,{
                        email: email,
                        otp: otp
                    })
                    if (firstResponse.status!==200) {
                        alert("invalid otp");
                        return;
                    }

                    if (firstResponse.status === 200) {
                        const res = await  axios.post(`${BASE_URL}/api/v1/user/signup`,{
                            username: email,
                            name,
                            password
                        })
                        router.push('/login');
                    }
                        
                }} data-modal-hide="static-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
               <button 
                    onClick={()=>isOpen(false)}
                    className="text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> close</button>
            </div>
        </div>
    </div>
</div>
}