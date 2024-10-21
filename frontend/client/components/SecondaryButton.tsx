export const SecondaryButton = ({children,onClick}: {
    children: React.ReactNode,
    onClick: ()=>void
})=>{
     return <div>
        <button className="px-6 py-3 bg-orange-600 rounded-full text-white font-semibold mr-5" onClick={onClick}>{children}</button>
    </div>
}