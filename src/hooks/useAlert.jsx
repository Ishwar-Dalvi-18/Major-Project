import { useState } from "react"

export const useAlert = (timeout)=>{
    const [settings, setsettings] = useState({
        type : "",
        message : "",
        isShowing : false,
    })
    if(settings.isShowing){
        setTimeout(()=>{
            setsettings(prevSettings=>{
                return {
                    ...prevSettings,
                    isShowing : false,
                }
            })
        },timeout);
    }
    return {
        settings , setsettings
    }
}