"use client"

export const LinkButton = ({children,onClick}: {
    children: React.ReactNode,
    onClick: ()=>void,
    
})=>{
    return <div>
        <button className=" px-4 py-2 rounded-lg hover:bg-slate-100" onClick={onClick}>{children}</button>
    </div>
}