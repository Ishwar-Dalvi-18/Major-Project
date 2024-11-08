import React, { useRef, useState } from 'react'
import review_img from '../images/product-rating.png'
import './CustomerReview.css'
import arrow_img from '../images/dropdown-arrow.png'
import star_img from '../images/9008098.png'
import { MDBBadge, MDBBtn, MDBCard, MDBCardTitle, MDBTextArea } from 'mdb-react-ui-kit'

const CustomerReview = () => {
    const [showdropdown1, setShowdropdown1] = useState(false);
    const [showdropdown2, setShowdropdown2] = useState(false);
    const [showdropdown3, setShowdropdown3] = useState(false);

    const [deliveryrating, setDeliveryrating] = useState(null);
    const [qualityrating, setQualityrating] = useState(null);
    const [servicerating, setServicerating] = useState(null);


    const img1_ref = useRef();
    const img2_ref = useRef();
    const img3_ref = useRef();

    return (
        <div style={{
            letterSpacing: "0.1em",
            fontWeight: "bold"
        }} className='user-universal'>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <div className='header-main-container' style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "monospace",
                }}>
                    <div style={{
                    }}>
                        <img style={{
                            height: "3em",
                            userSelect: "none"
                        }} src={review_img} alt="" />
                    </div>
                    <div style={{
                    }}>
                        <p style={{
                            textAlign: "center",
                            fontSize: "2em",
                            userSelect: "none"
                        }} className='header-text'>
                            Product Review
                        </p>
                    </div>
                    <div style={{
                    }}>
                        <img style={{
                            height: "3em",
                            userSelect: "none"
                        }} src={review_img} alt="" />
                    </div>
                </div>


                <div className='review-container'>
                    <div style={{
                        width: "100%",
                        // backgroundColor: "blue"
                    }} className='user-selctors'>
                        <div style={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5em",
                            flexDirection: "column",
                            userSelect: "none",
                            position:"relative",
                            zIndex:"5"
                        }}>
                            {/* <div style={{
                                position:"absolute",
                                top:"50%",
                                left:"50%",
                                backgroundColor:"black",
                                width:"100%",
                                height:"100%",
                                transform:"translateX(-50%) translateY(-50%)",
                                zIndex:"1",
                                padding:"2em",
                                borderRadius:"0.5em"
                            }}>
                                
                            </div> */}
                            <div onClick={e => {
                                setShowdropdown1(prev => {
                                    if (prev) {
                                        img1_ref.current.style.transform = "rotateZ(0deg)"
                                    } else {
                                        img1_ref.current.style.transform = "rotateZ(180deg)"
                                    }
                                    return !prev
                                }
                                )
                            }} style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.5em",
                            }}>
                                <p style={{
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>
                                    Delivery
                                </p>
                                <img ref={img1_ref} style={{
                                    height: "1em",
                                    transition: "transform 0.5s ease-in-out "
                                }} src={arrow_img} alt="" />
                            </div>
                            <div style={showdropdown1 ? {
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.2em",
                            } : {
                                width: "100%",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.2em",
                                display: "none"
                            }}>
                                <div onClick={e => {
                                    setDeliveryrating(1);
                                    setShowdropdown1(false);
                                    img1_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={deliveryrating === 1 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                                <div onClick={e => {
                                    setDeliveryrating(2);
                                    setShowdropdown1(false);
                                    img1_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={deliveryrating === 2 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div >
                                <div onClick={e => {
                                    setDeliveryrating(3);
                                    setShowdropdown1(false);
                                    img1_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={deliveryrating === 3 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                                <div onClick={e => {
                                    setDeliveryrating(4);
                                    setShowdropdown1(false);
                                    img1_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={deliveryrating === 4 ? 'selected rating' : "rating"} >
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                                <div onClick={e => {
                                    setDeliveryrating(5);
                                    setShowdropdown1(false);
                                    img1_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={deliveryrating === 5 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                            </div>
                        </div>
                        <div style={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5em",
                            flexDirection: "column",
                            userSelect: "none"
                        }}>
                            <div onClick={e => {
                                setShowdropdown2(prev => {
                                    if (prev) {
                                        img2_ref.current.style.transform = "rotateZ(0deg)"
                                    } else {
                                        img2_ref.current.style.transform = "rotateZ(180deg)"
                                    }
                                    return !prev
                                }
                                )
                            }} style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.5em",
                            }}>
                                <p style={{
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>
                                    Quality
                                </p>
                                <img ref={img2_ref} style={{
                                    height: "1em",
                                    transition: "transform 0.5s ease-in-out "
                                }} src={arrow_img} alt="" />
                            </div>
                            <div style={showdropdown2 ? {
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.2em",
                            } : {
                                width: "100%",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.2em",
                                display: "none"
                            }}>
                                <div onClick={e => {
                                    setQualityrating(1);
                                    setShowdropdown2(false);
                                    img2_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={qualityrating === 1 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                                <div onClick={e => {
                                    setQualityrating(2);
                                    setShowdropdown2(false);
                                    img2_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={qualityrating === 2 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div >
                                <div onClick={e => {
                                    setQualityrating(3);
                                    setShowdropdown2(false);
                                    img2_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={qualityrating === 3 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                                <div onClick={e => {
                                    setQualityrating(4);
                                    setShowdropdown2(false);
                                    img2_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={qualityrating === 4 ? 'selected rating' : "rating"} >
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                                <div onClick={e => {
                                    setQualityrating(5);
                                    setShowdropdown2(false);
                                    img2_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={qualityrating === 5 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                            </div>
                        </div>
                        <div style={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5em",
                            flexDirection: "column",
                            userSelect: "none"
                        }}>
                            <div onClick={e => {
                                setShowdropdown3(prev => {
                                    if (prev) {
                                        img3_ref.current.style.transform = "rotateZ(0deg)"
                                    } else {
                                        img3_ref.current.style.transform = "rotateZ(180deg)"
                                    }
                                    return !prev
                                }
                                )
                            }} style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.5em",
                            }}>
                                <p style={{
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>
                                    Service
                                </p>
                                <img ref={img3_ref} style={{
                                    height: "1em",
                                    transition: "transform 0.5s ease-in-out "
                                }} src={arrow_img} alt="" />
                            </div>
                            <div style={showdropdown3 ? {
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.2em",
                            } : {
                                width: "100%",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.2em",
                                display: "none"
                            }}>
                                <div onClick={e => {
                                    setServicerating(1);
                                    setShowdropdown3(false);
                                    img3_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={servicerating === 1 ? 'selected rating' : "rating"} >
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                                <div onClick={e => {
                                    setServicerating(2);
                                    setShowdropdown3(false);
                                    img3_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={servicerating === 2 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div >
                                <div onClick={e => {
                                    setServicerating(3);
                                    setShowdropdown3(false);
                                    img3_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={servicerating === 3 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                                <div onClick={e => {
                                    setServicerating(4);
                                    setShowdropdown3(false);
                                    img3_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={servicerating === 4 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                                <div onClick={e => {
                                    setServicerating(5);
                                    setShowdropdown3(false);
                                    img3_ref.current.style.transform = "rotateZ(0deg)"
                                }} className={servicerating === 5 ? 'selected rating' : "rating"}>
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                    <img style={{
                                        height: "1.5em"
                                    }} src={star_img} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        width: "100%",
                        // backgroundColor: "red"
                    }} className='user-entries'>
                        <MDBBadge style={{
                            padding: "1em 2em",
                            fontSize: "1em"
                        }}>Improvement To Be Done</MDBBadge>
                        <MDBTextArea placeholder='Enter Improvement to be Done'></MDBTextArea>
                        <div style={{
                            alignSelf: "flex-end"
                        }}>
                            <MDBBtn style={{
                                backgroundColor: "green"
                            }}>Submit</MDBBtn>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CustomerReview