import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
import { NetworkContext } from '../contexts/networkContext';
import { ProductContext } from '../contexts/product';
import delete_img from '../images/delete.png'

function Product(
  {
    id,
    name,
    quantity,
    price,
    img
  }
) {

  const { t } = useTranslation(["product"]);
  const navigate = useNavigate();
  const { url } = useContext(NetworkContext)
  useEffect(() => {
    if (id) {
    }
  })
  const { product, setProduct } = useContext(ProductContext);
  return (
    <div>

      <div className='product-box'>

        {/* <img style={{
          height: "1em",
          filter:"invert(100%)",
          width:"auto"
        }} src={delete_img} alt="" /> */}

        <img style={{
          justifySelf: "center",
          alignSelf: "center",
          border: "2px solid white",
          height: "4em",
          width: "4em",
          borderRadius: "50%",
          objectFit: "cover"
        }} src={img} alt="" />
        <div className='row'>
          {t("p_name")} : {name}
        </div>
        <div className='row'>
          {t("p_quantity")} : {`${quantity.count} ${quantity.unit}`}
        </div>
        <div className='row'>
          {t("p_price")} : {`${price.amount} ${price.currency} per ${price.unit}`}
        </div>
        <button onClick={e => {
          console.log(`Id : ${id}`)
          setProduct({
            type: "VIEW/EDIT",
            id: id
          })
          navigate("/viewproduct")
        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
          {t("p_btn")}
        </button>
      </div>
    </div>
  )
}

export default Product