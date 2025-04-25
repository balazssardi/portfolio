import { useGlobalContext } from "../hooks/useGlobalContext"
import { ContextType } from "../layout";

export const focusW = (id:number, setContext:React.Dispatch<React.SetStateAction<ContextType[]>>) => {
    setContext((prevContext) =>
        prevContext.map((item, index) =>
          index === id ? { ...item, isFront: true } : { ...item, isFront: false }
        )
    );
}
export const closeW = (id:number, setContext:React.Dispatch<React.SetStateAction<ContextType[]>>, context:ContextType[]) => {
    setContext((prevContext) =>
        prevContext.map((item, index) =>
          index === id ? { ...item, active: false, isFront: false, onTray: false } : item
        )
    );
    console.log(context)
}

export const toggleTray = (id:number, setContext:React.Dispatch<React.SetStateAction<ContextType[]>>, context:ContextType[]) => {
    if (context[id].active && !context[id].isFront && !context[id].onTray) {
        setContext((prevContext) =>
            prevContext.map((item, index) =>
              index === id ? { ...item, isFront: true } : { ...item, isFront:false }
            )
        );
    } else {
        if (context[id].onTray) {
            setContext((prevContext) =>
                prevContext.map((item, index) =>
                index === id ? { ...item, active: true, isFront: true, onTray: false } : { ...item, isFront:false }
                )
            );
        } else {
            setContext((prevContext) =>
                prevContext.map((item, index) =>
                index === id ? { ...item, active: false, isFront: false, onTray: true } : item
                )
            );
        }
    }
}

export const toggleFullscreen = (id:number, setContext:React.Dispatch<React.SetStateAction<ContextType[]>>, context:ContextType[]) => {
    setContext((prevContext) =>
        prevContext.map((item, index) =>
          index === id ? { ...item, isFront:true, fullscreen: !context[id].fullscreen } : { ...item, isFront:false }
        )
    );
}

export const openW = (id:number, setContext:React.Dispatch<React.SetStateAction<ContextType[]>>) => {
    setContext((prevContext) =>
        prevContext.map((item, index) =>
          index === id ? { ...item, isFront: true, active: true, onTray: false } : { ...item, isFront:false }
        )
    );
}

