import { useContext, useState } from "react"
import Image from "next/image"
import me from "../public/me.jpg"
import github from "../public/github.png"
import linkedin from "../public/linkedin.png"
import x from "../public/x.png"
import telegram from "../public/telegram.png"
import aboutme from "../public/aboutme.png"
import { Icon } from "@iconify/react";
import shutdown from "../public/turnoff.svg"
import volume from "../public/volume.png"
import trayicon from "../public/trayicon.png"
import Time from "./Time"
import { useGlobalContext } from "@/app/hooks/useGlobalContext"
import { openW, toggleTray } from "@/app/functions/func"

export default function NavBar() {
    const [menu, setMenu] = useState(false)
    const { context, setContext } = useGlobalContext()
    const openWi = (index:number) => {
        openW(index, setContext)
        setMenu(false)
    }
    return(
        <>
            <div className="h-9 navbar w-screen flex flex-row justify-between items-center overflow-hidden z-10 text-white">
                <div className="flex flex-row relative items-center z-20 gap-1">
                    <button className={"px-12 h-20 w-36 italic font-bold text-xl shadow-2xl rounded-r-full " + (menu ? "startbuttona" : "startbutton")} onClick={() => setMenu(!menu)}>
                        start
                    </button>
                    {context.map((item, index) => (item.active || item.onTray) && <div key={index} onClick={() => toggleTray(index, setContext, context)} className={"text-white text-xs items-center flex flex-row gap-1 cursor-pointer " + (!item.isFront ? "trayelement" : "trayelementactive")}>
                    <img src={item.icon} alt="" width={16} height={16}/>
                    {item.title}
                    </div>)}
                </div>

                <div className="trayright flex items-center justify-self-end gap-1">
                    <Image
                        src={volume}
                        alt="Volume icon"
                        width={16}
                    />
                    <Image
                        src={trayicon}
                        alt="Trayicon"
                        width={16}
                        height={16}
                    />
                    <Time/>
                </div>
            </div>
            <div className={"absolute w-96 bg-white transition-all text-white z-10 h-128 rounded-t-lg overflow-hidden flex flex-col shadow-[3px_1px_5px_rgba(0,0,0,0.8)] bottom-9 " + (menu ? "block" : "hidden")}>
                <div className="h-20 start flex items-center px-2 gap-2">
                    <Image
                        src={me}
                        alt="Profilkép"
                        className="w-14 h-14 rounded-md border-2 border-blue-100"
                    />
                    <p className="text-xl">Sárdi Balázs</p>
                </div>
                <div className="flex-1 flex flex-row">
                    <div className="w-1/2 flex flex-col p-1 gap-0.5">
                        {context.map((item, index) => <div key={index} className="p-1 flex flex-row gap-2 items-center text-blue-800 hover:bg-[rgb(49,106,197)] hover:text-white cursor-pointer" onClick={() => openWi(index)}>
                            <img src={item.icon} alt="Ikon" width={28} height={28}/>
                            <p className="text-sm font-bold">{item.title}</p>
                        </div>)}
                    </div>
                    <div className="w-1/2 bg-blue-200 border-l-2 border-blue-200 flex flex-col p-1 gap-0.5">
                        <div className="p-1 flex flex-row gap-2 items-center text-blue-800 hover:bg-[rgb(49,106,197)] hover:text-white cursor-pointer">
                            <Image
                                src={github}
                                alt="Github icon"
                                width={28}
                                height={28}
                            />
                            <p className="text-sm font-bold">Github</p>
                        </div>
                        <div className="p-1 flex flex-row gap-2 items-center text-blue-800 hover:bg-[rgb(49,106,197)] hover:text-white cursor-pointer">
                            <Image
                                src={telegram}
                                alt="Telegram icon"
                                width={28}
                                height={28}
                            />
                            <p className="text-sm font-bold">Telegram</p>
                        </div>
                        <div className="p-1 flex flex-row gap-2 items-center text-blue-800 hover:bg-[rgb(49,106,197)] hover:text-white cursor-pointer">
                            <Image
                                src={linkedin}
                                alt="LinkedIn icon"
                                width={28}
                                height={28}
                            />
                            <p className="text-sm font-bold">LinkedIn</p>
                        </div>
                        <div className="p-1 flex flex-row gap-2 items-center text-blue-800 hover:bg-[rgb(49,106,197)] hover:text-white cursor-pointer">
                            <Image
                                src={x}
                                alt="X icon"
                                width={28}
                                height={28}
                            />
                            <p className="text-sm font-bold">X</p>
                        </div>
                        <hr className="w-5/6 self-center my-2 border-blue-300" />
                        <div className="p-1 flex flex-row gap-2 items-center text-blue-800 hover:bg-[rgb(49,106,197)] hover:text-white cursor-pointer">
                            <Image
                                src={aboutme}
                                alt="About me icon"
                                width={28}
                                height={28}
                            />
                            <p className="text-sm">About me</p>
                        </div>
                    </div>
                </div>
                <div className="h-12 startbot flex items-center justify-end px-2">
                    <button className="flex flex-row gap-2 items-center">
                        <Image
                            src={shutdown}
                            alt="X icon"
                            width={28}
                            height={28}
                        />
                        Kapcsolat
                    </button>
                </div>
            </div>
        </>
    )
}