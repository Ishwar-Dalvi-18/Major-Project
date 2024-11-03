import React from 'react'
import img from '../images/landing3_mp24.jpg'

function FarmerLanding() {
  return (
    <div style={{
        width:"100%",
        height:"100%",
        position:"fixed",
        top:"0"
    }}>
        <img style={{
        width:"100%",
        height:"100%",
        objectFit:"cover",
        filter:"blur(3px)"
    }} src={img} alt=""/>
        <div  style={{userSelect:"none",letterSpacing:"0.1em",width:"100%",fontSize:"5em",gap:"0em 0.5em",flexWrap:"wrap",display:"flex",justifyContent:"center",alignItems:"center",color:"white",position:"fixed",top:"50%",transform:"translateY(-50%)"}}>
            <div >{" Paving "}</div ><div > whole </div > <div > New </div> <div > Path </div>
        </div>
    </div>
  )
}

export default FarmerLanding    