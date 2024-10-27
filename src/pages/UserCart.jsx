import React, { useContext, useEffect, useState } from 'react'
import { customerNavigationContext } from '../contexts/customerNavigationContext'
import CartItem from '../components/CartItem'
import { NetworkContext } from '../contexts/networkContext'
import axios from 'axios'
import { MDBBtn } from 'mdb-react-ui-kit'

function UserCart() {
  const { info, setInfo } = useContext(customerNavigationContext)
  const [cartItems, setCartItems] = useState([])
  const { url } = useContext(NetworkContext)
  const [reload, setReload] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [totalAmount, setTotalAmount] = useState(0)
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
            cartItems.map((value, i,arr) => <CartItem key={value.id} arr={arr} id={value.id} quantity={value.quantity} reload={reload} setReload={setReload} index={i} />)
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
            <MDBBtn style={{
              backgroundColor: "black",
              color: "white"
            }}>
              Pay Online
            </MDBBtn>
          </div>
        }
      </>
      }
    </div>
  )
}

export default UserCart