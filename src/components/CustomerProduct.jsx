import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
import { NetworkContext } from '../contexts/networkContext';
import { ProductContext } from '../contexts/product';
import delete_img from '../images/delete.png'
import { customerProductContext } from '../contexts/customerProductContext';

function CustomerProduct(
  {
    _id,
    name,
    price,
    img
  }
) {

  const { t } = useTranslation(["product"]);
  const navigate = useNavigate();
  const { url } = useContext(NetworkContext);
  const { id, setId } = useContext(customerProductContext);
  useEffect(() => {
  })
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
          height: "5em",
          width: "100%",
          borderRadius: "1em",
          objectFit: "cover"
        }} src={img} alt="" />
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "whitesmoke"
          }}>{t("p_name")}</div>:<div>{name}</div>
        </div>

        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "whitesmoke"
          }}>{t("p_price")}</div>:<div>{`${price.amount} ${price.currency} per ${price.unit}`}</div>
        </div>
        <button onClick={e => {
          setId(_id);
          navigate("/user/viewproduct")
        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
          {t("p_btn")}
        </button>
      </div>
    </div>
  )
}

export default CustomerProduct