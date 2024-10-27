import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './User.css'
import nav_bar_img from '../images/navigation-bar.png'
import { customerNavigationContext } from '../contexts/customerNavigationContext'
import CustomerProductView from './CustomerProductView'
import { customerProductContext } from '../contexts/customerProductContext'
import close_img from '../images/close.png'

const isWrapping = (element) => {
  const afterHeight = element.clientHeight;
  element.style.whiteSpace = "";
  const initialheight = element.clientHeight;
  element.style.whiteSpace = "nowrap"
  return (initialheight) > afterHeight
}


function User() {
  const navigate = useNavigate()
  const typed_text_value = "Buy Products Direct From Farmers"
  const [typed_text_display, setTyped_text_display] = useState("");
  const [blinkCursor, setBlinkCursor] = useState(false);
  const h1_ref = useRef(null);
  const [showmobilenav, setShowmobilenav] = useState(false);
  const desktopnav_ref = useRef(null);
  const [info, setInfo] = useState({})
  const [id, setId] = useState("");
  const mobile_nav_ref = useRef(null);
  useEffect(() => {
    document.body.style.backgroundColor = "white"

    let index = 0;
    let slice_count = 0;
    let wrapdetected = false;
    if (desktopnav_ref) {
      if (getComputedStyle(desktopnav_ref.current).visibility === "hidden") {
        setShowmobilenav(true);
      }
    }
    setInterval(() => {
      setTyped_text_display(pre => typed_text_value.slice(slice_count, index + 1));
      if (!wrapdetected) {
        if (isWrapping(h1_ref.current)) {
          wrapdetected = true
          console.log("Hello")
          console.log(slice_count)
          slice_count = slice_count + 1;
        }
      } else {
        console.log(slice_count)
        slice_count = slice_count + 1;
      }
      if (index + 1 === typed_text_value.length) {
        wrapdetected = false
        slice_count = 0;
        index = 0;
        setTyped_text_display(pre => pre)
      } else {
        index = index + 1;
      }
    }, 200)
    setInterval(() => {
      setBlinkCursor(pre => !pre)
    }, 200)
  }, [])

  return (
    <div className='user-main-container'>
      <div ref={mobile_nav_ref} className='user-mobile-nav'>
        <div style={{
          width:"100%",
          display:"flex",
          flexDirection:"column",
          padding:"1em",
          marginBottom:"2em",
        }}>
          <img onClick={e=>{
            e.preventDefault();
            mobile_nav_ref.current.style.opacity = '0'
            setTimeout(()=>{
              mobile_nav_ref.current.style.visibility = "hidden"
            },200)
          }} style={{
            filter:"invert(100%)",
            justifySelf:"flex-end",
            alignSelf:"flex-end",
            height:"2em"
          }} src={close_img} alt="" />
        </div>
        <div onClick={e=>{
          mobile_nav_ref.current.style.opacity = '0'
          setTimeout(()=>{
            mobile_nav_ref.current.style.visibility = "hidden"
          },200)
          navigate("/user/buy")
        }} style={info.currentpage==="buy"?{
          width:"100%",
          paddingLeft:"1em",
          fontSize:"1.5em",
          marginBottom:"0.5em",
          color: "blue", 
          fontWeight: "bold"
        }:{
          width:"100%",
          paddingLeft:"1em",
          fontSize:"1.5em",
          marginBottom:"0.5em",
        }}>
          Buy Products
        </div>
        <div onClick={e=>{
          mobile_nav_ref.current.style.opacity = '0'
          setTimeout(()=>{
            mobile_nav_ref.current.style.visibility = "hidden"
          },200)
          navigate("/user/purchased")
        }} style={info.currentpage==="purchased"?{
          width:"100%",
          paddingLeft:"1em",
          fontSize:"1.5em",
          marginBottom:"0.5em",
          color: "blue", 
          fontWeight: "bold"
        }:{
          width:"100%",
          paddingLeft:"1em",
          fontSize:"1.5em",
          marginBottom:"0.5em",
        }}>
          Products Purchased
        </div>
        <div onClick={e=>{
          mobile_nav_ref.current.style.opacity = '0'
          setTimeout(()=>{
            mobile_nav_ref.current.style.visibility = "hidden"
          },200)
          navigate("/user/cart")
        }} style={info.currentpage==="cart"?{
          width:"100%",
          paddingLeft:"1em",
          fontSize:"1.5em",
          marginBottom:"0.5em",
          color: "blue", 
          fontWeight: "bold"
        }:{
          width:"100%",
          paddingLeft:"1em",
          fontSize:"1.5em",
          marginBottom:"0.5em",
        }}>
          Products Cart
        </div>
        <div onClick={e=>{
          mobile_nav_ref.current.style.opacity = '0'
          setTimeout(()=>{
            mobile_nav_ref.current.style.visibility = "hidden"
          },200)
          navigate("/user/profile")
        }} style={info.currentpage==="profile"?{
          width:"100%",
          paddingLeft:"1em",
          fontSize:"1.5em",
          marginBottom:"0.5em",
          color: "blue", 
          fontWeight: "bold"
        }:{
          width:"100%",
          paddingLeft:"1em",
          fontSize:"1.5em",
          marginBottom:"0.5em",
        }}>
          Profile
        </div>
      </div>
      <div className='user-extra-info-header'>
        <h1 ref={h1_ref} style={blinkCursor ? {
          userSelect:"none",
          fontWeight: "500",
          fontSize: "1.5em",
          color: "inherit",
          borderRight: "3px solid blue",
          whiteSpace: "nowrap"
        } : {
          userSelect:"none",
          fontWeight: "500",
          fontSize: "1.5em",
          color: "inherit",
          whiteSpace: "nowrap",
        }}>{typed_text_display}</h1>

      </div>

      <div style={{
        position: "relative"
      }} className='user-display-container'>
        {
          showmobilenav && <div style={{
            backgroundColor: "black",
            position: "fixed",
            top: "0.5em",
            left: "0em",
            zIndex: "20"
          }}>
            <img onClick={e => {
              mobile_nav_ref.current.style.opacity = '1'
              mobile_nav_ref.current.style.visibility = "visible"
            }} style={{
              height: "2.5em",
              filter: "invert(50%)"
            }}
              src={nav_bar_img} alt="" />
          </div>
        }
        {
          !showmobilenav && <nav ref={desktopnav_ref} className='user-nav'>
            <div onClick={e => {
              navigate("/user/buy")
            }} style={info.currentpage === "buy" ? { color: "blue", fontWeight: "bold" } : {}} className='user-nav-item'>
              Buy Products
            </div>
            <div onClick={e => {
              navigate("/user/purchased")
            }} style={info.currentpage === "purchased" ? { color: "blue", fontWeight: "bold" } : {}} className='user-nav-item'>
              Products Purchased
            </div>
            <div onClick={e => {
              navigate("/user/cart")
            }} style={info.currentpage === "cart" ? { color: "blue", fontWeight: "bold" } : {}} className='user-nav-item'>
              Products Cart
            </div>
            <div onClick={e => {
              navigate("/user/profile")
            }} style={info.currentpage === "profile" ? { color: "blue", fontWeight: "bold" } : {}} className='user-nav-item'>
              Profile
            </div>
          </nav>
        }
        <customerNavigationContext.Provider value={{ info, setInfo }}>
          <customerProductContext.Provider value={{id:id,setId:setId}} >
            <Outlet />
          </customerProductContext.Provider>
        </customerNavigationContext.Provider>
      </div>
    </div>
  )
}

export default User