import React from 'react'
import litchi_img from '../images/litchi_mp24.jpg'
import { MDBBtn } from 'mdb-react-ui-kit'
import './FarmerOrder.css'
import close_img from '../images/close.png'

function FarmerOrder({
    _id,
    name,
    image,
    quantity,
    amount,
    setVieworder
}) {
    return (
        <div  className='farmerorder-main-div' style={{ display: "flex",position:"relative",flexDirection:"column",gap: "1em", borderRadius: "1em", backgroundColor: "whitesmoke", userSelect: "none" }} >
            {/* <img style={{
                height:"1.5em",
                position:"absolute",
                top:"0.2em",
                left:"0.2em"
            }} src={close_img} alt="" /> */}
            <div className='farmerorder-holder-div' style={{display: "flex", gap: "1em", }}>
                <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <img style={{
                        height: "5em",
                        width: "5em",
                        borderRadius: "50%",
                        border: "1px solid black",
                        objectFit: "cover"
                    }} src={image} alt="" />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",

                }}>
                    <div style={{
                        display: "flex",
                        gap: "1em"
                    }}>
                        <div style={{
                            fontWeight: "bold"
                        }}>
                            Product Name
                        </div>
                        <div style={{overflow:"hidden",maxWidth:"20em"}}>
                            <p>{name}</p>
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        gap: "1em"
                    }}>
                        <div style={{
                            fontWeight: "bold"
                        }}>
                            Product Quantity
                        </div>
                        <div>
                            {quantity}
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        gap: "1em"
                    }}>
                        <div style={{
                            fontWeight: "bold"
                        }}>
                            Total Price
                        </div>
                        <div>
                            {amount}
                        </div>
                    </div>

                </div>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
                <MDBBtn onClick={e=>{
                    setVieworder({
                        _id:_id,
                        view: true
                    })
                }}>view</MDBBtn>
            </div>
        </div>
    )
}

export default FarmerOrder