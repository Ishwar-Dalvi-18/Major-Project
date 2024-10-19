import React, { useContext, useEffect, useState } from 'react'
import { customerNavigationContext } from '../contexts/customerNavigationContext'
import CartItem from '../components/CartItem'
import { NetworkContext } from '../contexts/networkContext'
import axios from 'axios'

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
          value.data.response.cart.forEach((value)=>{
            axios.get(`${url}api/product/${value.id}`, { withCredentials: true }).then(value2=>{
              if(value2.data.response.type){
                setTotalAmount(prev=>(value2.data.response.product.price.amount*value.quantity)+prev)
              }
            })
          })

          setFirstLoad(false);
          setReload(false);
        }
      })
    }
  }, [reload])

  useEffect(()=>{},[])
  return (
    <div className='user-universal'>
      <div style={{
        display: "flex",
        gap: "2em",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {
          cartItems.map((value, i) => <CartItem key={value.id} id={value.id} quantity={value.quantity} reload={reload} setReload={setReload} index={i}/>)
        }
      </div>
      {totalAmount > 0 &&
        <div style={{
          marginTop: "2em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "2em",
          padding: "1em 0em",
          width: "100%",
          color: "black",
          backgroundColor: "blueviolet"
        }}>
          Total Amount To Pay : {totalAmount} Rs
        </div>
      }
    </div>
  )
}

export default UserCart