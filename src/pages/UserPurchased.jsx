import React, { useContext, useEffect, useState } from 'react'
import { customerNavigationContext } from '../contexts/customerNavigationContext'
import { NetworkContext } from '../contexts/networkContext';
import axios from 'axios';
import PurchasedProduct from '../components/PurchasedProduct';

function UserPurchased() {
  const { info, setInfo } = useContext(customerNavigationContext)
  const [reload, setReload] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const { url } = useContext(NetworkContext)
  const [purchasedProducts, setPurchasedProducts] = useState([])
  useEffect(() => {
    setIsLoading(true);
    setInfo({
      currentpage: "purchased"
    })
    axios.get(`${url}api/user/productspurchased`, { withCredentials: true }).then(value => {
      if (value.data.response.type) {
        setPurchasedProducts(value.data.response.pp);
        setIsLoading(false);
      }
    })
  }, [])
  return (
    <div className='user-universal'>
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
          alignItems: "center",
          gap: "1em"
        }}>
          {
            purchasedProducts.map((value) => <PurchasedProduct name={value.name} quantity={value.quantity} amount={value.amount} image={value.image} sellercontact={value.sellercontact} selleremail={value.selleremail} sellername={value.sellername} />)
          }
        </div>
      }
    </div>
  )
}

export default UserPurchased