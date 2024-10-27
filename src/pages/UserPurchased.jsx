import React,{useContext,useEffect} from 'react'
import { customerNavigationContext } from '../contexts/customerNavigationContext'

function UserPurchased() {
  const {info,setInfo} = useContext(customerNavigationContext)
  useEffect(()=>{
    setInfo({
      currentpage:"purchased"
    })
  },[])
  return (
    <div className='user-universal'>
      <div style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          width:"100%",
          height:"100%",
          color:"black",
          fontSize:"2em",
        }}>
          <div style={{
            userSelect:"none",
            padding:"0.5em 1em",
            border:"0.1em solid blueviolet",
            borderRadius:"2em",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center"
          }}><div>This Section Is Under Development</div>
          <div>Coming Soon !!!</div></div>
        </div>
    </div>
  )
}

export default UserPurchased