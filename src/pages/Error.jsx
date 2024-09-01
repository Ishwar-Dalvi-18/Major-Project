import React from 'react'

function Error() {
  return (
    <div style={{height:"100vh", display:'flex', justifyContent:'center' , alignItems:"center"}}>
        <div style={{display:"flex", color:"red" , textAlign:"center", letterSpacing:"1px", flexWrap:"wrap"}}>
            You are unable to connect to server please go back to home page and refresh the site 
        </div>
    </div>
  )
}

export default Error