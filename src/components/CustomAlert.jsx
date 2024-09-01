import { Alert } from '@material-tailwind/react'
import React from 'react'

function CustomAlert({ settings }) {
  let bgcolor;
  const color = "white";
  if (settings.type === "success") {
    bgcolor = "green"
  }
  if (settings.type === "error") {
    bgcolor = "red"
  }
  return (
    <div className='flex' style={{justifyContent:'center', alignItems:"center"}}>
      <Alert style={{ color: color, backgroundColor: bgcolor, textAlign: "center", margin: "4vh", display:"flex", alignItems:'center',justifyContent:"center"}} severity={settings.type}><div style={{}}>{settings.message}</div></Alert>
    </div>
  )
}

export default CustomAlert