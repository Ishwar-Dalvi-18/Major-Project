import './ProductInventory.css'
import Product from '../components/Product'
import { Button } from '@material-tailwind/react'

import React, { useContext, useEffect, useState } from 'react'
import { NetworkContext } from '../contexts/networkContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../contexts/product'
import { useTranslation } from 'react-i18next'
import { UserContext } from '../contexts/userContext'

function ProductInventory() {
  const { url } = useContext(NetworkContext);
  const [products, setProducts] = useState([]);
  const { setPreviousPage } = useContext(UserContext)
  const { product, setProduct } = useContext(ProductContext)
  const [reload, setReload] = useState(true);
  useEffect(() => {
    setPreviousPage("/profile/productinventory")
    if (reload === true) {
      setIsLoading(true)
      axios.get(`${url}api/products`, { withCredentials: true }).then(value => {
        setProducts(value.data.response.products)
        setIsLoading(false);
        setReload(false);
      })
    }
  }, [reload])
  const navigate = useNavigate()
  const { t } = useTranslation(['profile'])
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      {isLoading ? <div style={{ height: "90vh", alignItems: "center" }} class="flex gap-4 p-4 flex-wrap justify-center">
        <img className="w-10 h-10 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" />
      </div> : <>
        <div style={{ position: "relative" }} className='pi-main-component'>
          {
            products.map(value => <Product key={value._id} setReload={setReload} id={value._id} quantity={value.quantity} price={value.price} name={value.name} img={value.image} />)
          }
        </div>
        <div className='pi-features-container'>
          <div onClick={e => {
            setProduct({
              type: "ADD",
              id: null
            })
            navigate("/viewproduct")
          }} className='pi-feature'><Button style={{ backgroundColor: "blue", color: "white", fontSize: "1em" }} variant="contained">{t("add_btn")}</Button></div>
        </div>
      </>
      }
    </>
  )
}

export default ProductInventory