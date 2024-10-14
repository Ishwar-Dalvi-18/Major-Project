import { createContext } from "react";

export const NetworkContext = createContext({
    url:null,
    setUrl:()=>{}
})