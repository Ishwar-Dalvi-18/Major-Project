import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './User.css'
import nav_bar_img from '../images/navigation-bar.png'
import { customerNavigationContext } from '../contexts/customerNavigationContext'


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
      <div className='user-extra-info-header'>
        <h1 ref={h1_ref} style={blinkCursor ? {
          fontWeight: "bold",
          fontSize: "2em",
          color: "inherit",
          borderRight: "3px solid blue",
          whiteSpace: "nowrap"
        } : {
          fontWeight: "bold",
          fontSize: "2em",
          color: "inherit",
          whiteSpace: "nowrap",
        }}>{typed_text_display}</h1>

      </div>
      
      <div style={{
        position: "relative"
      }} className='user-display-container'>
        {
          showmobilenav && <div style={{
            backgroundColor: "rgb(124, 169, 124)",
            position: "fixed",
            top: "1em",
            left: "0.5em",
            zIndex: "20"
          }}>
            <img onClick={e => {
            }} style={{
              height: "2.5em"
            }}
              src={nav_bar_img} alt="" />
          </div>
        }
        {
          !showmobilenav && <nav ref={desktopnav_ref} className='user-nav'>
            <div onClick={e => {
              navigate("/user/buy")
            }} style={info.currentpage==="buy"?{color:"blue",fontWeight:"bold"}:{}} className='user-nav-item'>
              Buy Products
            </div>
            <div onClick={e => {
              navigate("/user/purchased")
            }} style={info.currentpage==="purchased"?{color:"blue",fontWeight:"bold"}:{}} className='user-nav-item'>
              Products Purchased
            </div>
            <div onClick={e => {
              navigate("/user/cart")
            }} style={info.currentpage==="cart"?{color:"blue",fontWeight:"bold"}:{}} className='user-nav-item'>
              Products Cart
            </div>
            <div onClick={e => {
              navigate("/user/profile")
            }} style={info.currentpage==="profile"?{color:"blue",fontWeight:"bold"}:{}} className='user-nav-item'>
              Profile
            </div>
          </nav>
        }
        <customerNavigationContext.Provider value={{info,setInfo}}>
          <Outlet />
        </customerNavigationContext.Provider>
      </div>
    </div>
  )
}

export default User