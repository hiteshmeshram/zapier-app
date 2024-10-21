import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-orange-50">
      <Appbar />
      <Hero/>
      <HeroVideo/>
    </div>
  );
}
