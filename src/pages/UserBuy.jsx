import { MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import React, { useEffect, useRef , useState } from 'react'
import close from '../images/close.png'

function UserBuy() {
  useEffect(() => {
    document.body.style.backgroundColor = "white"
  }, [])
  const close_img_ref = useRef(null);
  const [usersearch, setUsersearch] = useState("");
  return (
    <div className='user-universal'>
      <div style={{width:"100%",height:"100%", display:"flex",flexDirection:"column"}}>
        <div style={{
         
        }} className='user-buy-search'>
          <MDBInput value={usersearch} onChange={e=>{
            setUsersearch(e.target.value);
          }} style={{display:"flex",position:"relative",color:"white"}}>
            <img onClick={e=>{
              setUsersearch("")
              close_img_ref.current.style.filter="invert(70%)"
              setTimeout(()=>{
                close_img_ref.current.style.filter="invert(100%)"
              },100)
            }} ref={close_img_ref} style={{filter:"invert(100%)",height:"1.5em",position:"absolute",right:"1em",top:"50%",transform:"translateY(-50%)"}} src={close} alt="" />
          </MDBInput>
          <MDBBtn>Search</MDBBtn>
        </div>

      </div>
    </div>
  )
}

export default UserBuy