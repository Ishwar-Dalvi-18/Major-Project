import React, { useContext, useEffect, useRef, useState } from 'react'
import { customerNavigationContext } from '../contexts/customerNavigationContext'
import CartItem from '../components/CartItem'
import { NetworkContext } from '../contexts/networkContext'
import axios from 'axios'
import { MDBBtn } from 'mdb-react-ui-kit'
import hurray_img from '../images/yay-hooray.gif'
import { useFetcher, useNavigate } from 'react-router-dom'
import './UserCart.css'
import cancel_img from '../images/close.png'

function UserCart() {
  const navigate = useNavigate()
  const { info, setInfo } = useContext(customerNavigationContext)
  const [cartItems, setCartItems] = useState([])
  const { url } = useContext(NetworkContext)
  const [reload, setReload] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [totalAmount, setTotalAmount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const state_input_ref = useRef()
  const city_input_ref = useRef()
  const region_input_ref = useRef()
  const landmark_input_ref = useRef()
  const pincode_input_ref = useRef()
  const [errormessagecomponents, setErrormessagecomponents] = useState([])
  const [clickcount, setClickcount] = useState(0);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pin, setPin] = useState("")
  const [takeaddressinput, setTakeaddressinput] = useState(false)

  useEffect(() => {
    if (clickcount === 1) {
      if (state === "") {
        setErrormessagecomponents(prev => [...prev, 1])
      } else if (state.length < 3) {
        setErrormessagecomponents(prev => [...prev, 1])
      } else {
        setErrormessagecomponents(prev => {
          const arr = prev.filter(value => {
            if (value === 1) {
              return false;
            } else {
              return true
            }
          })
          return arr
        })
      }

      if (city === "") {
        setErrormessagecomponents(prev => [...prev, 2])
      } else {
        setErrormessagecomponents(prev => {
          const arr = prev.filter(value => {
            if (value === 2) {
              return false;
            } else {
              return true
            }
          })
          return arr
        })
      }

      if (region === "") {
        setErrormessagecomponents(prev => [...prev, 3])
      } else {
        setErrormessagecomponents(prev => {
          const arr = prev.filter(value => {
            if (value === 3) {
              return false;
            } else {
              return true
            }
          })
          return arr
        })
      }

      if (landmark === "") {
        setErrormessagecomponents(prev => [...prev, 4])
      } else {
        setErrormessagecomponents(prev => {
          const arr = prev.filter(value => {
            if (value === 4) {
              return false;
            } else {
              return true
            }
          })
          return arr
        })
      }

      if (pin === "") {
        setErrormessagecomponents(prev => [...prev, 5])
      } else if (pin.length !== 6) {
        setErrormessagecomponents(prev => [...prev, 5])
      } else {
        setErrormessagecomponents(prev => {
          const arr = prev.filter(value => {
            if (value === 5) {
              return false;
            } else {
              return true
            }
          })
          return arr
        })
      }
    }
  }, [state, city, region, landmark, pin, clickcount])
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
        navigate("/user/purchased")
      }, 2000);
    }
  }, [showMessage])
  useEffect(() => {
    setInfo({
      currentpage: "cart"
    })
    if (firstLoad || reload) {
      setTotalAmount(0);
      axios.get(`${url}api/user/cart`, { withCredentials: true }).then(value => {
        if (value.data.response.type) {
          setCartItems(value.data.response.cart)
          let amount = 0;
          value.data.response.cart.forEach((value) => {
            axios.get(`${url}api/product/${value.id}`, { withCredentials: true }).then(value2 => {
              if (value2.data.response.type) {
                setTotalAmount(prev => (value2.data.response.product.price.amount * value.quantity) + prev)
              }
            })
          })
          setFirstLoad(false);
          setReload(false);
        }
      })
    }
  }, [reload])

  useEffect(() => { }, [])
  return (
    <div style={{ position: "relative", overflow: "auto" }} className='user-universal'>
      {
        takeaddressinput&&<div className='black-screen' style={{
          top: "0",
          left: "0",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          overflow: "auto",
          padding: "2em 0em",
          zIndex: "10"
        }}>
          <div className='input_field_container' style={{
            backgroundColor: "whitesmoke",
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            border: "0.1em solid blueviolet",
            borderRadius: "1em",
            gap: "1em",
            position:"relative"
          }}>
            <div style={{
              top:"0.5em",
              left:"0.5em",
              position:"absolute",
            }}>
              <img onClick={e=>{
                setTakeaddressinput(false)
              }} style={{
                height:"2em"
              }} src={cancel_img} alt="" />
            </div>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              fontWeight: "bolder",
              fontSize: "1.3em",
              color: "blue"
            }}>
              <p style={{ textAlign: "center", userSelect: "none" }}>Address For Delivery</p>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.3em",
              width: "100%",
            }}>
              <label style={{
                paddingLeft: "1em",
                fontWeight: "bold",
                userSelect: "none"
              }} htmlFor="state">
                State
              </label>
              <input value={state} onChange={e => setState(e.target.value)} id='state' placeholder='State' ref={state_input_ref} style={{
                width: "100%",
                outline: "2px solid grey",
                borderRadius: "1em",
                padding: "0.5em 1em"
              }} onFocus={e => {
                state_input_ref.current.style.outline = "4px solid blue"
              }} onBlur={e => {
                state_input_ref.current.style.outline = "2px solid grey"
              }} type="text" />
              {
                errormessagecomponents.includes(1) && <label style={{
                  paddingLeft: "1em",
                  fontWeight: "bold",
                  userSelect: "none",
                  fontSize: "0.8em",
                  color: "red"
                }} htmlFor="">
                  <p style={{ textAlign: "center" }}>* State is required and must be of 3 letters</p>
                </label>
              }
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.3em",
              width: "100%",
            }}>
              <label style={{
                paddingLeft: "1em",
                fontWeight: "bold",
                userSelect: "none"
              }} htmlFor="city">
                City
              </label>
              <input value={city} onChange={e => setCity(e.target.value)} id='city' placeholder='City' ref={city_input_ref} style={{
                outline: "2px solid grey",
                borderRadius: "1em",
                padding: "0.5em 1em"
              }} onFocus={e => {
                city_input_ref.current.style.outline = "4px solid blue"
              }} onBlur={e => {
                city_input_ref.current.style.outline = "2px solid grey"
              }} type="text" />
              {errormessagecomponents.includes(2) && <label style={{
                paddingLeft: "1em",
                fontWeight: "bold",
                userSelect: "none",
                fontSize: "0.8em",
                color: "red"
              }} htmlFor="">
                <p style={{ textAlign: "center" }}>* City is required</p>
              </label>}
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.3em",
              width: "100%",
            }}>
              <label style={{
                paddingLeft: "1em",
                fontWeight: "bold",
                userSelect: "none"
              }} htmlFor="region">
                Region
              </label>
              <input value={region} onChange={e => setRegion(e.target.value)} id='region' placeholder='Region' ref={region_input_ref} style={{
                outline: "2px solid grey",
                borderRadius: "1em",
                padding: "0.5em 1em"
              }} onFocus={e => {
                region_input_ref.current.style.outline = "4px solid blue"
              }} onBlur={e => {
                region_input_ref.current.style.outline = "2px solid grey"
              }} type="text" />
              {
                errormessagecomponents.includes(3) && <label style={{
                  paddingLeft: "1em",
                  fontWeight: "bold",
                  userSelect: "none",
                  fontSize: "0.8em",
                  color: "red"
                }} htmlFor="">
                  <p style={{ textAlign: "center" }}>* Region is required</p>
                </label>
              }
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.3em",
              width: "100%",
            }}>
              <label style={{
                paddingLeft: "1em",
                fontWeight: "bold",
                userSelect: "none"
              }} htmlFor="landmark">
                Landmark
              </label>
              <input value={landmark} onChange={e => setLandmark(e.target.value)} id='landmark' placeholder='Landmark' ref={landmark_input_ref} style={{
                outline: "2px solid grey",
                borderRadius: "1em",
                padding: "0.5em 1em"
              }} onFocus={e => {
                landmark_input_ref.current.style.outline = "4px solid blue"
              }} onBlur={e => {
                landmark_input_ref.current.style.outline = "2px solid grey"
              }} type="text" />
              {
                errormessagecomponents.includes(4) && <label style={{
                  paddingLeft: "1em",
                  fontWeight: "bold",
                  userSelect: "none",
                  fontSize: "0.8em",
                  color: "red"
                }} htmlFor="">
                  <p style={{ textAlign: "center" }}>* Landmark is required</p>
                </label>
              }
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.3em",
              width: "100%",
            }}>
              <label style={{
                paddingLeft: "1em",
                fontWeight: "bold",
                userSelect: "none"
              }} htmlFor="pincode">
                Pin Code
              </label>
              <input value={pin} onChange={e => setPin(e.target.value)} id='pincode' placeholder='Pin Code' ref={pincode_input_ref} style={{
                outline: "2px solid grey",
                borderRadius: "1em",
                padding: "0.5em 1em"
              }} onFocus={e => {
                pincode_input_ref.current.style.outline = "4px solid blue"
              }} onBlur={e => {
                pincode_input_ref.current.style.outline = "2px solid grey"
              }} type="number" />
              {
                errormessagecomponents.includes(5) && <label style={{
                  paddingLeft: "1em",
                  fontWeight: "bold",
                  userSelect: "none",
                  fontSize: "0.8em",
                  color: "red"
                }} htmlFor="">
                  <p style={{ textAlign: "center" }}>* Pin Code must be of 6 digits</p>
                </label>
              }
            </div>

            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%"
            }}>
              <MDBBtn onClick={async e => {
                if(clickcount===1 && errormessagecomponents.length===0){
                  const result = await axios.post(`${url}api/user/purchased`, {
                    products: cartItems,
                    address:{
                      state:state,
                      city:city,
                      region:region,
                      landmark:landmark,
                      pincode:pin
                    }
                  }, { withCredentials: true });
                  if (result.data.response.type) {
                    const result2 = await axios.delete(`${url}api/user/entirecart`,{withCredentials:true});
                    if(result2.data.response.type){ 
                      setTakeaddressinput(false)          
                      setReload(true)
                      setShowMessage(true)
                    }
    
                  }
                }
                setClickcount(prev => 1)
              }}>Proceed</MDBBtn>
            </div>

          </div>
        </div>
      }
      {reload || firstLoad ? <div style={{ color: "black", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div> : <>
        <div style={{
          display: "flex",
          gap: "2em",
          flexWrap: "wrap",
          justifyContent: "center",
          overflow: "auto"
        }}>
          {
            cartItems.map((value, i, arr) => <CartItem key={value.id} arr={arr} id={value.id} quantity={value.quantity} reload={reload} setReload={setReload} index={i} />)
          }
        </div>
        {totalAmount > 0 ?
          <div style={{
            marginTop: "2em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "0.5em",
            padding: "1em 0em",
            width: "100%",
            color: "black",
            backgroundColor: "blueviolet",
            userSelect: "none"
          }}>
            Total Amount To Pay : {totalAmount} Rs
          </div> : <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            color: "black",
            fontSize: "2em"
          }}>
            <div style={{
              userSelect: "none",
              padding: "0.5em 1em",
              border: "0.1em solid blueviolet",
              borderRadius: "2em"
            }}>Your Cart Is Empty</div>
          </div>
        }
        {
          totalAmount > 0 && <div style={{
            color: "black",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none",
            padding: "2em"
          }}>
            <MDBBtn onClick={async e => {
              setTakeaddressinput(true)
              // const result = await axios.post(`${url}api/user/purchased`, {
              //   products: cartItems
              // }, { withCredentials: true });
              // if (result.data.response.type) {
              //   const result2 = await axios.delete(`${url}api/user/entirecart`,{withCredentials:true});
              //   if(result2.data.response.type){           
              //     setReload(true)
              //     setShowMessage(true)
              //   }

              // }
            }} style={{
              backgroundColor: "black",
              color: "white"
            }}>
              Pay Online
            </MDBBtn>
          </div>
        }
        {
          showMessage && <div style={{
            top: "0",
            left: "0",
            position: "fixed",
            height: "100vh",
            width: "100vw",
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}><div style={{
            position: "fixed",
            top: "50%",
            width: "100vw",
            maxWidth: "600px",
            transform: "translateY(-50%) translateX(-50%)",
            zIndex: "20",
            padding: "2em 5em",
            borderRadius: "1em",
            backgroundColor: "green",
            left: "50%",
            display: "flex",
            flexDirection: "column",
            color: "black",
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
            // fontSize:"1.2em"
          }}>
              Products Purchased Successfully
              <img style={{
                height: "4em"
              }} src={hurray_img} alt="" />
            </div>
          </div>
        }
      </>
      }
    </div>
  )
}

export default UserCart