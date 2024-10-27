import React, { useContext, useEffect, useState } from 'react'
import { customerNavigationContext } from '../contexts/customerNavigationContext'
import CartItem from '../components/CartItem'
import { NetworkContext } from '../contexts/networkContext'
import axios from 'axios'
import { MDBBtn } from 'mdb-react-ui-kit'
import hurray_img from '../images/yay-hooray.gif'
import { useNavigate } from 'react-router-dom'

function UserCart() {
  const navigate = useNavigate()
  const { info, setInfo } = useContext(customerNavigationContext)
  const [cartItems, setCartItems] = useState([])
  const { url } = useContext(NetworkContext)
  const [reload, setReload] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [totalAmount, setTotalAmount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  useEffect(()=>{
    if(showMessage){
      setTimeout(() => {
        setShowMessage(false);
        navigate("/user/purchased")
      }, 2000);
    }
  },[showMessage])
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
    <div className='user-universal'>
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
              const result = await axios.post(`${url}api/user/purchased`, {
                products: cartItems
              }, { withCredentials: true });
              if (result.data.response.type) {
                const result2 = await axios.delete(`${url}api/user/entirecart`,{withCredentials:true});
                if(result2.data.response.type){           
                  setReload(true)
                  setShowMessage(true)
                }
               
              }
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
            top:"0",
            left:"0",
            position:"fixed",
            height:"100vh",
            width:"100vw",
            backgroundColor:'rgba(0, 0, 0, 0.8)'
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
            display:"flex",
            flexDirection:"column",
            color:"black",
            fontWeight:"bold",
            justifyContent:"center",
            alignItems:"center",
            // fontSize:"1.2em"
          }}>
            Products Purchased Successfully
            <img style={{
              height:"4em"
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