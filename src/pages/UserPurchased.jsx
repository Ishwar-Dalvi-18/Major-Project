import React,{useContext,useEffect} from 'react'
import { customerNavigationContext } from '../contexts/customerNavigationContext'

function UserPurchased() {
  const {info,setInfo} = useContext(customerNavigationContext)
  useEffect(()=>{
    setInfo({
      currentpage:"purchased"
    })
  },[])
  return (
    <div className='user-universal'>
      User Purchased
    </div>
  )
}

export default UserPurchased