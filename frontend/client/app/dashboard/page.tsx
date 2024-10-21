"use client"
import { Appbar } from "@/components/Appbar";
import { LinkButton } from "@/components/LinkButton";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Zap {
    id: string,
    userId: string,
    trigger: {
        id: string,
        name: string,
        availableTriggerId: string,
        metadata: string,
        zapId: string
        type: {
            id: string,
            image: string,
            name: string
        }
    },
    actions: {
        id: string,
        availableActionId: string,
        metadata: String,
        name: string,
        zapId: string,
        type: {
            id: string,
            name: string,
            image: string
        }

    }[]
}

function useZaps() {
    const [ loading,setLoading ] = useState(true);
    const [ zaps,setZaps ] = useState<Zap[]>([]);

    useEffect(()=>{
        axios.get(`${BASE_URL}/api/v1/zap`,{
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res=>{
            console.log(res.data)
            setZaps(res.data.zaps);
            setLoading(false);
        })
    },[])

    return {
        loading,zaps
    }
}

export default function() {
    const {loading, zaps} = useZaps();
    const router = useRouter()
  
    if (loading) {
        return <div>
            loading...
        </div>
    }
    return <div>
        <Appbar/>
        welcome to dashboard
        <div className="flex justify-end mr-10 ">
            <button 
                className="border px-4 py-2 bg-purple-500 rounded-full font-semibold text-black"
                onClick={()=>{
                    router.push('/create/zap')
                }}>create</button>
        </div>
        <div className="flex w-full justify-center">
            <ZapTable zaps={zaps}/>
        </div>
    </div>
}

function ZapTable({zaps}: {
    zaps: Zap[]
}) {
    return <div className="max-w-screen-md">
        <div className="flex border-b mb-2 text-xl font-semibold">
            <div className="flex-1 mr-30">Id</div>
            <div className="flex-1 mr-10">name</div>
            <div className="flex-1 mr-10">webhookUrl</div>
            <div className="flex-1">Go</div>
        </div>
        {zaps.map(zap=>{
            return <div className="flex">
                <div className="flex-1 mr-30">{zap.id}</div>
                <div className="flex-1 mr-10">
                    {zap.trigger.name} {zap.actions.map(x=>x.name)}
                </div>
                <div className="flex-1 mr-10">{"http://localhost:3000"}</div>
                <div className="flex-1 mr-10">
                    <LinkButton onClick={()=>{}}>Go</LinkButton>
                </div>
            </div>
        })}

    </div>
}