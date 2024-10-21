"use client"

export const PrimaryButton = ({children,onClick}: {
    children: React.ReactNode,
    onClick: ()=>void
})=>{
    return <div>
        <button className="px-4 py-2 bg-orange-600 rounded-full text-white font-semibold " onClick={onClick}>{children}</button>
    </div>
}