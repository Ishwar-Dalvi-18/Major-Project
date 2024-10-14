import { createContext } from "react";

export const UserContext = createContext({
    previousPage : null,
    setPreviousPage : ()=>{},
    user : {},
    setUser : ()=>{}
})