import React, { useContext, useEffect, useState } from 'react'
import { customerNavigationContext } from '../contexts/customerNavigationContext'
import { NetworkContext } from '../contexts/networkContext';
import axios from 'axios';
import PurchasedProduct from '../components/PurchasedProduct';
import { MDBBtn } from 'mdb-react-ui-kit';

function UserPurchased() {
  const { info, setInfo } = useContext(customerNavigationContext)
  const [reload, setReload] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const { url } = useContext(NetworkContext)
  const [purchasedProducts, setPurchasedProducts] = useState([])
  const [idtodelete, setIdtodelete] = useState("");
  const [showpopper, setShowpopper] = useState(false)
  useEffect(() => {
    if (reload) {
      setIsLoading(true);
      setInfo({
        currentpage: "purchased"
      })
      axios.get(`${url}api/user/productspurchased`, { withCredentials: true }).then(value => {
        if (value.data.response.type) {
          setPurchasedProducts(value.data.response.pp);
          setIsLoading(false);
          setReload(false)
        }
      })
    }
  }, [reload])
  useEffect(() => {
    if (idtodelete !== "") {
      setShowpopper(true)
    }
  }, [idtodelete])
  return (
    <div style={{
      position: "relative",
    }} className='user-universal'>
      {showpopper && <>
        <div style={{
          position: "fixed",
          width: "100%",
          top: "0",
          left: "0",
          height: "100%",
          zIndex: "10",
          backgroundColor: "rgba(0,0,0,0.586)",
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
            <div><p style={{ textAlign: "center", fontWeight: "bold" }}>Are you sure you want to delete the product</p></div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1em", marginTop: "2em" }}>
              <MDBBtn onClick={async e => {
                setShowpopper(false)
                setIsLoading(true)
                const result = await axios.delete(`${url}api/user/productpurchased/${idtodelete}`)
                if (result.data.response.type) {
                  setReload(true)
                  idtodelete("")
                  setIsLoading(false)
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
        isLoading && <div style={{ height: "90vh", alignItems: "center" }} class="flex gap-4 p-4 flex-wrap justify-center">
          <img className="w-10 h-10 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" />
        </div>
      }
      {
        !isLoading && purchasedProducts.length === 0 && <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          color: "black",
          fontSize: "2em",
        }}>
          <div style={{
            userSelect: "none",
            padding: "0.5em 1em",
            border: "0.1em solid blueviolet",
            borderRadius: "2em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}><div>No Products Purchased</div>
          </div>
        </div>
      }{
        purchasedProducts.length > 0 && <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "2em"
        }} className='userpurchased-main-container'>
          {
            purchasedProducts.map((value) => <PurchasedProduct statusofproduct={value.statusofproduct} setIdtodelete={setIdtodelete} setReload={setReload} _id={value._id} name={value.name} quantity={value.quantity} amount={value.amount} image={value.image} sellercontact={value.sellercontact} selleremail={value.selleremail} sellername={value.sellername} />)
          }
        </div>
      }
    </div>
  )
}

export default UserPurchased