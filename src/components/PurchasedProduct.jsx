import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
import { NetworkContext } from '../contexts/networkContext';
import { ProductContext } from '../contexts/product';
import delete_img from '../images/delete.png'
import { MDBBtn } from 'mdb-react-ui-kit';

function PurchasedProduct(
  {
    _id,
    name,
    quantity,
    amount,
    image,
    sellername,
    sellercontact,
    selleremail,
    setReload,
    setIdtodelete,
    statusofproduct
  }
) {

  const navigate = useNavigate();
  const { url } = useContext(NetworkContext)
  useEffect(() => {
  })
  const { product, setProduct } = useContext(ProductContext);
  return (
    <div style={{display:"flex",alignSelf:"stretch",flexGrow:1}}>

      <div style={{ position: "relative", margin: "0em 0em",width:"100%"}} className='product-box'>

        {/* <img style={{
          height: "1em",
          filter:"invert(100%)",
          width:"auto"
        }} src={delete_img} alt="" /> */}
        {
          statusofproduct.shortdescription === "Order Completed" &&
          <div style={{
            position: "absolute",
            display: "flex",
            width: "100%",
            left: "0",
            top: "0",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "1em",
            paddingTop: "1em"
          }}>
            <img style={{
              height: "1.5em",
              filter: "invert(100%)"
            }} src={delete_img} alt="" onClick={e => {
              setIdtodelete(_id)
            }} />
          </div>
        }
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
          }}>Product ID</div>:<div style={{
            color: "aqua"
          }}>{_id}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }}>Product Name</div>:<div style={{
            color: "aqua"
          }}>{name}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }} >Quantity</div>:<div style={{
            color: "aqua"
          }}>{`${quantity}`}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }}>Amount</div>:<div style={{
            color: "aqua"
          }}>{`${amount}`}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }}>Seller Name</div>:<div style={{
            color: "aqua"
          }}>{`${sellername}`}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }}>Seller Contact</div>:<div style={{
            color: "aqua"
          }}>{`${sellercontact}`}</div>
        </div>
        <div className='row'>
          <div style={{
            fontWeight: "bold",
            color: "green"
          }}>Seller Email</div>:<div style={{
            color: "aqua"
          }}>{`${selleremail}`}</div>
        </div>
        <div className='row'>
          <div style={{
            width: "100%",
            border: "0.1em solid grey",
            padding: "1em",
            borderRadius: "1em",
            maxWidth:"350px"
          }}>
            <div style={{ fontWeight: "bold", fontSize: "1.2em", marginBottom: "0.5em" }}>Status of Delivery</div>
            <div style={{ fontWeight: "bold" }}>Status</div>
            <div>
              <p style={statusofproduct.shortdescription === "Order Not Viewed By Seller" ? { textAlign: "center", color: "red" } : { textAlign: "center", color: "blue" }}>{statusofproduct.shortdescription}</p>
            </div>
            {
              statusofproduct.longdescription && <><div style={{ fontWeight: "bold", marginTop: "1em" }}>Description</div> <div>
                <p style={{ textAlign: "center", color: "blueviolet" }}>{
                  statusofproduct.longdescription
                }
                </p>
              </div>
              </>
            }
          </div>
        </div>
        <div className='row'>
          {
            statusofproduct.shortdescription==="Order Completed"&&
            <>
            <MDBBtn onClick={e=>{
              navigate("/user/review")
            }} style={{padding:"1em 2em"}}>Add Review</MDBBtn>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default PurchasedProduct