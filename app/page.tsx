'use client'
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Window from "@/components/Window";
import { useGlobalContext } from "./hooks/useGlobalContext";
import Draggable from "react-draggable";
import { openW } from "./functions/func";

export default function Home() {
  const { context, setContext } = useGlobalContext()
  useEffect(()=>{
    const floader = setTimeout(()=>{
      const loading = document.getElementById("loading")
      if (loading != null) {
        loading.style.display = "none";
      }
    }, 5000);
    const sloader = setTimeout(()=>{
      const welcome = document.getElementById("welcome")
      if (welcome != null) {
        welcome.style.display = "none";
      }
    }, 10000);
    return () => {
      clearTimeout(floader);
      clearTimeout(sloader);
    }
  }, [])
  return (
    <>

    <div id="loading" className="w-screen h-screen flex flex-col gap-12 items-center justify-center bg-black text-white transition-all z-50 absolute">
      <div className="w-60">
        <p className="font-light leading-none">Frontend</p>
        <p className="text-5xl font-bold leading-12">Balázs<span className="text-xl inline-block align-top -mt-2 text-orange-400">UI/UX</span></p>
        <p className="text-3xl font-light leading-7">Developer</p>
      </div>
      <div className="animatedLoadingContainer">
        <div className="animatedLoading"></div>
        <div className="animatedLoading"></div>
        <div className="animatedLoading"></div>
      </div>
    </div>
    <div className="w-screen h-screen flex justify-between flex-col bg-indigo-400 fixed z-40 text-white" id="welcome">
      <svg className="absolute -top-20 -left-30 z-30" width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_89_9)">
        <circle cx="300" cy="300" r="125" fill="white"/>
        </g>
        <defs>
        <filter id="filter0_f_89_9" x="0" y="0" width="600" height="600" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="87.5" result="effect1_foregroundBlur_89_9"/>
        </filter>
        </defs>
      </svg>

      <div className="z-40">
        <div className="w-screen h-24 bg-blue-900 z-40" />
        <div className="w-full h-0.5 bg-[linear-gradient(90deg,rgba(28,_57,_142,_1)_0%,_rgba(155,155,155,_1)_54%)]" />
      </div>
      <p className="font-bold text-5xl self-center ml-[15%] italic">hello world</p>
      <div>
        <div className="w-full h-0.5 bg-[linear-gradient(90deg,rgba(28,_57,_142,_1)_0%,_rgba(155,155,155,_1)_54%)]" />
        <div className="w-screen h-24 bg-blue-900 z-40" />
      </div>
    </div>
    <div className="w-screen h-screen flex flex-col">
      <div className="flex-1 bg-[url(/bg.jpg)] bg-cover flex items-center w-full h-full justify-center">
        {context.map((item:any, index:number) => context[index].active && <Window key={index} windowid={index} title={item.title} icon={item.icon} />)}
        <div className="flex flex-row gap-6">
          {context.map((item:any, index:number) => <div key={index} onClick={()=> openW(index, setContext)} className="flex items-center flex-col justify-center gap-2 cursor-pointer">
              <img src={item.icon} alt="Ikon" width={52} height={52}/>
              <p className="text-xs text-white"  style={{textShadow: "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000"}}>{item.title}</p>
          </div>)}
        </div>
      </div>
      <NavBar />
    </div>
    </>
  );
}
