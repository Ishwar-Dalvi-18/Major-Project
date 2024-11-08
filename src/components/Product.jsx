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
    img,
    setReload
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
    <div style={{
      flexGrow:1,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      maxWidth:"400px"
    }}>

      <div style={{position:"relative",width:"100%"}} className='product-box'>

        {/* <img style={{
          height: "1em",
          filter:"invert(100%)",
          width:"auto"
        }} src={delete_img} alt="" /> */}
        <div style={{
          position:"absolute",
          display:"flex",
          width:"100%",
          left:"0",
          top:"0",
          alignItems:"center",
          justifyContent:"flex-end",
          paddingRight:"1em",
          paddingTop:"1em"
        }}>
          <img style={{
            height:"1.5em",
            filter:"invert(100%)"
          }} src={delete_img} alt="" onClick={async e=>{
            const result = await axios.delete(`${url}api/product/${id}`,{withCredentials:true})
            if(result.data.response.type){
              console.log("Hello")
              setReload(true);
            }
          }} />

        </div>
        <img style={{
          justifySelf: "center",
          alignSelf: "center",
          border: "2px solid white",
          borderRadius: "50%",
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
          }} >{t("p_quantity")}</div>:<div>{`${quantity.count} ${quantity.unit}`}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "whitesmoke"
          }}>{t("p_price")}</div>:<div>{`${price.amount} ${price.currency} per ${price.unit}`}</div>
        </div>
        <button onClick={e => {
          console.log(`Id : ${id}`)
          setProduct({
            type: "VIEW/EDIT",
            id: id
          })
          navigate("/profile/viewproduct")
        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
          {t("p_btn")}
        </button>
      </div>
    </div>
  )
}

export default Product