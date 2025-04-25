import { useEffect, useState } from "react";

export default function Time() {
    const [today, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
          }, 1000);
          return () => {
            clearInterval(timer);
          }
    }, [])
    const date = today.toLocaleTimeString("en", { hour: 'numeric', hour12: true, minute: 'numeric' });
    return (
        <p>{date}</p>
    )
}