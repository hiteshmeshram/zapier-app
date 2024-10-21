"use client"

export const InputField = ({label,onChange,type}: {
    label: string,
    onChange: (value: any)=>void,
    type: "text" | "password" | "email"
})=>{
    return <div className="flex flex-col m-4 font-semibold">
        {label}
        <input  
            className="border border-slate-300 rounded-sm py-2 mt-1 px-4"
            type={type} 
            onChange={(e)=>onChange(e.target.value)}></input>
    </div>
}