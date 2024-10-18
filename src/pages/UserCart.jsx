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
  useEffect(() => {
    setInfo({
      currentpage: "cart"
    })
    if (firstLoad || reload) {
      axios.get(`${url}api/user/cart`, { withCredentials: true }).then(value => {
        if (value.data.response.type) {
          setCartItems(value.data.response.cart)
          setFirstLoad(false);
          setReload(false);
        }
      })
    }
  }, [reload])
  return (
    <div className='user-universal'>
      <div style={{
        display: "flex",
        gap: "2em",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {
          cartItems.map((value, i) => <CartItem id={value.id} quantity={value.quantity} reload={reload} setReload={setReload} index={i} />)
        }
      </div>
    </div>
  )
}

export default UserCart