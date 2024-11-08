import React, { useContext } from 'react'
import litchi_img from '../images/litchi_mp24.jpg'
import { MDBBtn } from 'mdb-react-ui-kit'
import './FarmerOrder.css'
import close_img from '../images/close.png'
import axios from 'axios'
import { NetworkContext } from '../contexts/networkContext'

function FarmerOrder({
    _id,
    name,
    image,
    quantity,
    amount,
    setVieworder,
    statusofproduct,
    delivered = false,
    setShowpopper,
    setIdtodelete
}) {
    return (
        <div className='farmerorder-main-div' style={{ display: "flex", position: "relative", flexDirection: "column", gap: "1em", backgroundColor: "whitesmoke", userSelect: "none" }} >
            {
                statusofproduct.shortdescription==="Order Completed"&&<div onClick={async e=>{
                    e.preventDefault();
                    setIdtodelete(_id);
                    setShowpopper(true);
                }} style={{
                    position:"absolute",
                    top:"0.2em",
                    right:"0.2em",
                }}>
                    <img style={{
                        height:"1.5em"
                    }} src={close_img} alt="" />
                </div>
            }
            {
                delivered ?  <div style={{
                    position: "absolute",
                    backgroundColor: "goldenrod",
                    top: "-1.5em",
                    left: "-0.1em",
                    color: "black",
                    fontSize: "0.7em",
                    fontWeight: "bold",
                    borderRadius: "2em",
                    padding: "0.5em 1.5em",
                    borderBottomLeftRadius:"0em",
                    border: "0.1em solid black",
                    boxShadow: "5px 5px 5px #4F4f4f"
                }}>
                    Delivered
                </div>
                    : <>
                        {statusofproduct.shortdescription === "Order Not Viewed By Seller" ? <div style={{
                            position: "absolute",
                            backgroundColor: "red",
                            top: "-1.5em",
                            left: "-0.1em",
                            color: "white",
                            fontSize: "0.7em",
                            fontWeight: "bold",
                            borderRadius: "2em",
                            padding: "0.5em 1.5em",
                            borderBottomLeftRadius:"0em",
                            border: "0.1em solid black",
                            boxShadow: "5px 5px 5px #4F4f4f"
                        }}>
                            Not Viewed
                        </div> : <div style={{
                            position: "absolute",
                            backgroundColor: "green",
                            top: "-1.5em",
                            left: "-0.1em",
                            color: "white",
                            fontSize: "0.7em",
                            fontWeight: "bold",
                            borderRadius: "2em",
                            borderBottomLeftRadius:"0em",
                            padding: "0.5em 1.5em",
                            border: "0.1em solid black",
                            boxShadow: "5px 5px 5px #4F4f4f"
                        }}>
                            Viewed
                        </div>
                        }
                    </>
            }
            {/* <img style={{
                height:"1.5em",
                position:"absolute",
                top:"0.2em",
                left:"0.2em"
            }} src={close_img} alt="" /> */}
            <div className='farmerorder-holder-div' style={{ display: "flex", gap: "1em", }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
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
                            Product ID
                        </div>
                        <div style={{ overflow: "hidden", maxWidth: "20em" }}>
                            <p>{_id}</p>
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        gap: "1em"
                    }}></div>
                    <div style={{
                        display: "flex",
                        gap: "1em"
                    }}>
                        <div style={{
                            fontWeight: "bold"
                        }}>
                            Product Name
                        </div>
                        <div style={{ overflow: "hidden", maxWidth: "20em" }}>
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
            <div style={{ display: "flex", justifyContent: "center" }}>
                <MDBBtn onClick={e => {
                    setVieworder({
                        _id: _id,
                        view: true
                    })
                }}>view</MDBBtn>
            </div>
        </div>
    )
}

export default FarmerOrder