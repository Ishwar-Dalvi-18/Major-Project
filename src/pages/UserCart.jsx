import React, { useContext, useEffect  } from 'react'
import { customerNavigationContext } from '../contexts/customerNavigationContext'

function UserCart() {
  const {info,setInfo} = useContext(customerNavigationContext)
  useEffect(()=>{
    setInfo({
      currentpage:"cart"
    })
  },[])
  return (
    <div className='user-universal'>
      User Cart
    </div>
  )
}

export default UserCart