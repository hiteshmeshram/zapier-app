'use client'

import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";
import { BASE_URL } from "@/config";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    async function init() {
      const res = await axios.get(`${BASE_URL}/api/v1/user`,{
          headers: {
              Authorization: localStorage.getItem('token')
          }
      })

      if (res.data.user) {
          router.push('/dashboard')
      }
  }
  init()
  },[])

  return (
    <div className="bg-orange-50">
      <Appbar />
      <Hero/>
      <HeroVideo/>
    </div>
  );
}
