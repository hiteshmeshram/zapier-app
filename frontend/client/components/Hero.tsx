"use client"
import { PrimaryButton } from "./PrimaryButton"
import { SecondaryButton } from "./SecondaryButton"

export const Hero = ()=>{
    return <div className="grid grid-cols-2 pt-28 px-[5%] pb-[5%]">
        <div className="">
            <div className="text-8xl font-bold w-full flex justify-center ">Automate without limits</div>
            <div className="mt-5 text-xl text-slate-400">Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no delays. The only limit is your imagination</div>
            <div className="flex justify-center mt-5 ">
                <SecondaryButton onClick={()=>{}}>Start free with email</SecondaryButton>
                <SecondaryButton onClick={()=>{}}>Start free with google</SecondaryButton>
            </div>
        </div>
        <div className="flex justify-center">
            <img className="h-[528px]" src={"https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"} alt="image"/>
        </div>
    </div>
}