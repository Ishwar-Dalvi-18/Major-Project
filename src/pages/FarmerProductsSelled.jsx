import React, { useContext, useEffect, useState } from 'react'
import './FarmerOrders.css'
import FarmerOrder from '../components/FarmerOrder'
import axios from 'axios'
import { NetworkContext } from '../contexts/networkContext'
import FarmerProductOrderView from './FarmerProductOrderView'

function FarmerProductsSelled() {
  const [products, setProducts] = useState([])
  const { url } = useContext(NetworkContext)
  const [isloading, setIsloading] = useState(false)
  const [reload, setReload] = useState(true)
  const [vieworder, setVieworder] = useState({
    _id: "",
    view: false
  })
  useEffect(() => {
    if (reload) {
      setIsloading(true)
      axios.get(`${url}api/farmer/productselled`, { withCredentials: true }).then(value => {
        setProducts(value.data.response.pp)
        setIsloading(false);
        setReload(false)
      })
    }
  }, [reload])
  return (
    <>
      {
        isloading && <div
          style={{
            display: "flex",
            position: "fixed",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            backgroundColor: "rgba(0,0,0,0.7)"
          }}
        >
          <div style={{ height: "90vh", alignItems: "center" }} class="flex gap-4 p-4 flex-wrap justify-center">
            <img style={{ filter: "invert(100%)" }} className="w-10 h-10 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" />
          </div>
        </div>
      }
      {!isloading && !vieworder.view &&
      <>
      <div style={{display:"flex" , justifyContent:"center" , alignItems:"center",marginTop:"2em",fontWeight:"bold",letterSpacing:"0.1em",fontSize:"1.5em"}}><p style={{textAlign:"center"}}>Orders Completed</p></div>
        <div className='farmerorders-main-container'>
          {
            products.map(value => <FarmerOrder setVieworder={setVieworder} _id={value._id} image={value.image} amount={value.amount} name={value.name} quantity={value.quantity} key={value._id} />)
          }
        </div>
        </>
      }
      {
        !isloading && vieworder.view && <div style={{
          backgroundColor: "rgba(0,0,0,0.1)"
        }} className='farmerorders-main-container'>
          <FarmerProductOrderView statuseditable={false} reload={reload} setReload={setReload} setVieworder={setVieworder} _id={vieworder._id} />
        </div>
      }
    </>
  )
}

export default FarmerProductsSelled