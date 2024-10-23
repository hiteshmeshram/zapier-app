'use client'

import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/PrimaryButton";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

interface AvailableTrigger {
    id: string,
    image: string,
    name: string
}

interface AvailableActions {
    image: string,
    name: string
    id: string
}

 function useAvailableTriggerAndAvailableActions() {
    const [ availableTriggers,setAvailableTriggers ] = useState< AvailableTrigger[]>([]);
    const [ availableActions,setAvailableActions ] = useState< AvailableActions[]>([]);

    useEffect(()=>{        
        const res = axios.get(`${BASE_URL}/api/v1/trigger/available`,{
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        res.then(res=>{
            setAvailableTriggers(res.data);
            })
        

        const response = axios.get(`${BASE_URL}/api/v1/actions/available`,{
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        response.then(res=>setAvailableActions(res.data))
    },[])
    
    return {
        availableTriggers,availableActions
    }
}

export default function () {
    const [ trigger,setTrigger ] = useState<null | {
        id: string,
        name: string,
        index: number
    }>(null)

    const [actions,setActions ] = useState<{
        id: string,
        name: string,
        index: number
    }[]>([])

    const { availableTriggers, availableActions } = useAvailableTriggerAndAvailableActions();

    function handleSelect(name: string, id: string,index: number) {
         if (index === 1) {
            setTrigger({
                name,
                index,
                id
            })
        } else {
            console.log('above set|Actions')
            setActions((action)=>{
                let a = [...action];
               a[index-2] = {
                id,
                name,
                index
               }
                return a;

            })
        }

       
    }

    if (!availableActions && !availableTriggers) return null;

    return <div>
            <Appbar/>
            <div className="">
                create zap
                <div className="flex justify-end mr-10">
                    <button
                        onClick={()=>{console.log("hitesh")}}
                         className="border px-4 py-2 rounded-md bg-purple-900 text-white font-semibold">publish</button>
                </div>
                <div className="flex justify-center mt-32">
                    <div className="max-w-4xl bg-gray ">
                        <ZapCell title={trigger?.name ? trigger.name : "Trigger"} onSelect={(name,id,index)=>{
                            handleSelect(name,id,index)
                        }} index={1}  availableItems={availableTriggers }/>
                        {/* <ZapCell title="Trigger" index={1} onSelect={handleSelect(name,index,id)} availableItems={availableTriggers }/> */}
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <div className="max-w-4xl bg-gray ">
                      {actions.map((a,i) => {
                        return <ZapCell title={a.name ? a.name : "Actions"} onSelect={(name,id,index)=>{
                            handleSelect(name,id,index)
                        }} index={i+2} availableItems={availableActions}/>
                      })}
                    </div>
                </div>
                <div className="flex justify-center mt-5 ">
                    <div className="max-w-4xl bg-gray ">
                      <PrimaryButton onClick={()=>{
                        setActions((a)=>[...a,{
                            id: "",
                            name: "action",
                            index: a.length+2
                        }])
                      }}><div className="text-2xl">+</div></PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
}

function ZapCell({title, index, availableItems, onSelect}: {
    title: string,
    index: number,
    availableItems: AvailableTrigger[] | AvailableActions[],
    onSelect: (name: string,id: string, index: number)=>void
}) {

    if (!availableItems) {
        return null;
    }

    const [ismodelOpen,setIsmodelOpen ] = useState(false);
    const [ step,setStep ] = useState(0);
    const [ action,setAction ] = useState<null | {
        id: string,
        name: string,
        index: number
    }>(null)

    function handleClick() {
        setIsmodelOpen(true)
    }
    
    if (ismodelOpen) {
        return <div className="flex justify-center max-w-4xl ">
                    <div  className="  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow ">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                                    <h3 className="text-xl font-semibold text-gray-900 ">
                                    {index ===1 ? "Triggers": "Actions"}
                                    </h3>
                                    <button
                                        onClick={()=>{setIsmodelOpen(false)}} 
                                        type="button" className="ml-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button> 
                                </div>        
                                <div className="p-4 md:p-5 space-y-4">
                                <div className=" text-xl   ">
                                        {/* {index ===1 ? availableItems?.availableTriggers?.map(action=>{
                                            return <div onClick={()=>{
                                                onSelect(action.name, index, action.id)
                                            }}>{action.name}</div>
                                        }) : availableItems.availableActions.map(action=>{
                                            return <div onClick={()=>{
                                                onSelect(action.name, index, action.id)
                                            }} className="flex flex-col my-4  hover:bg-gray-100 py-2 px-4">{action.name}</div>
                                        })} */}

                                        {step > 0 && action && action.name === 'email' ? <EmailSelector isScondModelOpen={(value: boolean)=>setIsmodelOpen(value)}/> : ""}

                                            {index === 1 ? availableItems?.availableTriggers?.map(x=>{
                                                return <div 
                                                    className="cursor-pointer"
                                                    onClick={()=>{
                                                        onSelect(x.name,x.id,index);
                                                        setIsmodelOpen(false)}}>{x.name}</div>
                                            }): availableItems.availableActions.map((x,i)=>{
                                                return <div 
                                                className="cursor-pointer my-2 py-2"
                                                onClick={()=>{
                                                    console.log(x.name, i+2, x.id)
                                                    setAction({
                                                        id: x.id,
                                                        name: x.name,
                                                        index: i
                                                    })
                                                    onSelect(x.name,x.id,i+2);
                                                    setStep(s=>s+1)
                                                    }}>{x.name}</div>
                                            })}
                                       
                                    </div>
                                </div>            
                                
                            </div>
                        </div>
                    </div>
        </div>
    }
    return (
        <div 
            onClick={handleClick}
            className="border border-black cursor-pointer shadow-sm rounded-md py-6 px-24 font-semibold text-2xl m-4">
            {title}
        </div>)
}

function EmailSelector({isScondModelOpen}:{isScondModelOpen : (value: boolean)=>void} ) {
    return <div>
        <div className="text-xl font-semibold">Email</div>
        <input className="border px-4 py-2" type='email' placeholder="enter email"></input>
        <button onClick={()=>isScondModelOpen(false)} className="border py-2 px-4 rounded">submit</button>
    </div>
}