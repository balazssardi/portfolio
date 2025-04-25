import { closeW, focusW, toggleFullscreen, toggleTray } from "@/app/functions/func";
import { useGlobalContext } from "@/app/hooks/useGlobalContext"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";

export default function Window(props:any) {
    const { context, setContext } = useGlobalContext();
    const windowRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 250, y: 250 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const handleMouseDown = (e: React.MouseEvent) => {
        if (windowRef.current) {
          setIsDragging(true);
          setOffset({
            x: e.nativeEvent.clientX - windowRef.current.getBoundingClientRect().left,
            y: e.nativeEvent.clientY - windowRef.current.getBoundingClientRect().top,
          });
          focusW(props.windowid, setContext)
          setContext((prevContext) =>
            prevContext.map((item, index) =>
              index === props.windowid ? { ...item, fullscreen: false } : item
            )
          );
        }
      };

      const changeFullscreen = () => {
        if (context[props.windowid].fullscreen == false) {
            setPosition({
                x: 0,
                y: 0,
            });
        }
        toggleFullscreen(props.windowid, setContext, context)
        }
    
      const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !windowRef.current) return;
    
        setPosition({
          x: e.nativeEvent.clientX - offset.x,
          y: e.nativeEvent.clientY - offset.y,
        });
      };

    useEffect(() => {
        const handleMouseMoveDocument = (e: MouseEvent) => {
          if (!isDragging || !windowRef.current) return;
          setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
          });
        };
        if (context[props.windowid].fullscreen) {
          setPosition({x: 0, y: 0})
        }
        const handleMouseUpDocument = () => {
          setIsDragging(false);
        };
    
        if (isDragging) {
          document.addEventListener('mousemove', handleMouseMoveDocument);
          document.addEventListener('mouseup', handleMouseUpDocument);
        } else {
          document.removeEventListener('mousemove', handleMouseMoveDocument);
          document.removeEventListener('mouseup', handleMouseUpDocument);
        }
    
        return () => {
          document.removeEventListener('mousemove', handleMouseMoveDocument);
          document.removeEventListener('mouseup', handleMouseUpDocument);
        };

      }, [isDragging, offset, windowRef]);
    return (
        <div className={"absolute top-1/2 left-1/2 window rounded-t-lg " + (context[props.windowid].isFront ? "z-10 " : "z-0 brightness-85 ") + (context[props.windowid].fullscreen ? "w-full h-[calc(100%-36px)]": "w-4xl h-96")} ref={windowRef} style={{ transform: `translate(${position.x}px, ${position.y}px)`, top: 0, left: 0}}>
            <div className="h-8 w-full flex items-center justify-between flex-row gap-1 cursor-move pb-1">
                <div className="flex flex-row gap-1 items-center" onMouseDown={handleMouseDown}>
                    <img src={props.icon} alt="" width={16} height={16}/>
                    <p className="text-sm text-white">{props.title}</p>
                </div>
                <span className="w-full h-full" onMouseDown={handleMouseDown}/>
                <div className="flex flex-row gap-1">
                    <span className="minimize-button" onClick={() => toggleTray(props.windowid, setContext, context)}>
                    </span>
                    <span className={context[props.windowid].fullscreen ? "smallscreen-button" :"fullscreen-button"} onClick={() => changeFullscreen()}>
                    </span>
                    <span className="close-icon" onClick={() => closeW(props.windowid, setContext, context)}/>
                </div>
            </div>
            <div className="w-full h-full bg-white">

            </div>
        </div>
    )
}