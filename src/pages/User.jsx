import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './User.css'


const isWrapping = (element) => {
  const afterHeight = element.clientHeight;
  element.style.whiteSpace = "";
  const initialheight = element.clientHeight;
  element.style.whiteSpace = "nowrap"
  return (initialheight) > afterHeight
}
function User() {
  const typed_text_value = "Buy Products Direct From Farmers"
  const [typed_text_display, setTyped_text_display] = useState("");
  const [blinkCursor, setBlinkCursor] = useState(false);
  const h1_ref = useRef(null);
  useEffect(() => {
    document.body.style.backgroundColor = "white"
    let index = 0;
    let slice_count = 0;
    let wrapdetected = false;
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
    }, 100)
    setInterval(() => {
      setBlinkCursor(pre => !pre)
    }, 100)
  }, [])
  return (
    <div className='user-main-container'>
      <div className='user-extra-info-header'>
        <h1 ref={h1_ref} style={blinkCursor ? {
          fontSize: "2em",
          color: "black",
          borderRight: "3px solid blue",
          whiteSpace:"nowrap"
        } : {
          fontSize: "2em",
          color: "black",
          whiteSpace:"nowrap",
        }}>{typed_text_display}</h1>

      </div>
      <div className='user-display-container'>
        <nav className='user-nav'>
          <div className='user-nav-item'>
            Buy Products
          </div>
          <div className='user-nav-item'>
            Products Purchased
          </div>
          <div className='user-nav-item'>
            Products Cart
          </div>
          <div className='user-nav-item'>
            Profile
          </div>
        </nav>
        <Outlet />
      </div>
    </div>
  )
}

export default User