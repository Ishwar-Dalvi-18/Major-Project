import { createContext } from "react";

export const customerNavigationContext = createContext({
    info:{
        currentpage:"",
    },
    setInfo : ()=>{}
})