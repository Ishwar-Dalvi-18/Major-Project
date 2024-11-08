import React, { useContext, useEffect, useState } from 'react'
import './FarmerOrders.css'
import FarmerOrder from '../components/FarmerOrder'
import axios from 'axios'
import { NetworkContext } from '../contexts/networkContext'
import FarmerProductOrderView from './FarmerProductOrderView'
import { MDBBtn } from 'mdb-react-ui-kit'

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
  const [showpopper, setShowpopper] = useState(false)
  const [idtodelete, setIdtodelete] = useState("")
  return (
    <>
    {showpopper && <>
        <div style={{
          position: "fixed",
          width: "100%",
          top: "0",
          left: "0",
          height: "100%",
          zIndex: "10",
          backgroundColor: "rgba(0,0,0,0)",
        }}>

        </div>
        <div style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          zIndex: "20",
          transform: "translateX(-50%) translateY(-50%)"
        }}>
          <div style={{
            userSelect: "none",
            backgroundColor: "black",
            padding: "1em 3em",
            display: "flex",
            flexDirection: "column",
            borderRadius: "0.5em"
          }}>
            <div><p style={{ color:"white", textAlign: "center", fontWeight: "bold" }}>Are you sure you want to delete the product</p></div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1em", marginTop: "2em" }}>
              <MDBBtn onClick={async e => {
                setShowpopper(false)
                setIsloading(true)
                const result = await axios.delete(`${url}api/farmer/complete-delete/${idtodelete}`,{withCredentials:true});
                if (result.data.response.type) {
                  setReload(true)
                  idtodelete("")
                  setIsloading(false)
                }
              }}>Yes</MDBBtn>
              <MDBBtn onClick={e => {
                setShowpopper(false);
                setIdtodelete("")
              }}>No</MDBBtn>
            </div>
          </div>
        </div>
      </>
      }
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
            products.map(value => <FarmerOrder setIdtodelete={setIdtodelete} setShowpopper={setShowpopper} delivered={true} statusofproduct={value.statusofproduct} setVieworder={setVieworder} _id={value._id} image={value.image} amount={value.amount} name={value.name} quantity={value.quantity} key={value._id} />)
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
      {
        products.length === 0 && !isloading && <div style={{
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
          }}>No Orders Completed</div>
        </div>
      }
    </>
  )
}

export default FarmerProductsSelled