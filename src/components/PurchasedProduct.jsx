import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
import { NetworkContext } from '../contexts/networkContext';
import { ProductContext } from '../contexts/product';
import delete_img from '../images/delete.png'

function PurchasedProduct(
  {
    name,
    quantity,
    amount,
    image,
    sellername,
    sellercontact,
    selleremail
  }
) {

  const navigate = useNavigate();
  const { url } = useContext(NetworkContext)
  useEffect(() => {
  })
  const { product, setProduct } = useContext(ProductContext);
  return (
    <div>

      <div style={{position:"relative",margin:"0em 1em"}} className='product-box'>

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
          }} />

        </div>
        <img style={{
          justifySelf: "center",
          alignSelf: "center",
          border: "2px solid white",
          height: "7em",
          width: "15em",
          borderRadius: "1em",
          objectFit: "cover"
        }} src={image} alt="" />
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }}>Product Name</div>:<div style={{
            color:"aqua"
          }}>{name}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }} >Quantity</div>:<div style={{
            color:"aqua"
          }}>{`${quantity}`}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }}>Amount</div>:<div style={{
            color:"aqua"
          }}>{`${amount}`}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }}>Seller Name</div>:<div style={{
            color:"aqua"
          }}>{`${sellername}`}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }}>Seller Contact</div>:<div style={{
            color:"aqua"
          }}>{`${sellercontact}`}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }}>Seller Email</div>:<div style={{
            color:"aqua"
          }}>{`${selleremail}`}</div>
        </div>
      </div>
    </div>
  )
}

export default PurchasedProduct