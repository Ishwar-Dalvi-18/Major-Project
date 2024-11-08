import React, { useContext, useEffect, useRef, useState } from 'react'
import close_img from '../images/close.png'
import axios from 'axios';
import { NetworkContext } from '../contexts/networkContext';
import './FarmerProductOrderView.css'
import edit_img from '../images/pencil.png'
import { MDBBtn, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import success_img from '../images/success.png';
import { io } from 'socket.io-client';
import { SocketContext } from '../contexts/socketContext';

function FarmerProductOrderView(
    {
        _id,
        setVieworder,
        reload,
        setReload,
        statuseditable,
    }
) {
    const [optionstoshow, setOptionstoshow] = useState(["Order Viewed By Seller", "Order Dispatched", "Order Completed"])
    const [longdes, setLongdes] = useState("")
    const [index, setIndex] = useState(0)
    const [optionselected, setOptionselected] = useState(null);
    const [currentstatus, setCurrentstatus] = useState(0)
    const [updatingstatus, setUpdatingstatus] = useState(false)
    const [updationsuccessful, setUpdationsuccessful] = useState(false)
    const [showsave, setShowsave] = useState(true)
    const status1_ref = useRef();
    const status2_ref = useRef();
    const status3_ref = useRef();
    const [error, setError] = useState(false)
    const [shownext, setShownext] = useState(false)
    const [showOtpPopper, setShowOtpPopper] = useState(false)
    const { socket, setSocket } = useContext(SocketContext)
    const [enteredOTP, setEnteredOTP] = useState(0)
    const [productInfo, setProductInfo] = useState({
        _id: "",
        image: "",
        name: "",
        amount: "",
        quantity: "",
        customer_id: {
            _id: "",
            name: "",
            address: "",
            contact: "",
            email: ""
        },
        addressofdelivery: {
            state: "",
            city: "",
            region: "",
            landmark: "",
            pincode: "",
        },
        status: {
            shortdes: "",
            longdes: "",
        }
    });
    const { url } = useContext(NetworkContext)
    const [showpopper, setShowpopper] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false)
                setErrorMessage("")
            }, 2000)
        }
    }, [error])
    useEffect(() => {
        axios.get(`${url}api/farmer/orderstatus/${_id}`, { withCredentials: true }).then(value => {
            if (value.data.response.type) {
                if (value.data.response.shortdescription === "Order Not Viewed By Seller") {
                    axios.patch(`${url}api/farmer/orderstatus/${_id}`, {
                        shortdes: "Order Viewed By Seller",
                        longdes: ""
                    }).then(value => {
                        if (value.data.response.type) {
                            axios.get(`${url}api/farmer/product/${_id}`, { withCredentials: true }).then(value2 => {
                                if (value2.data.response.type) {
                                    axios.post(`${url}api/sms/deliverystatus`, {
                                        to: value2.data.response.product.customer_id.contact,
                                        message: `\nStatus : ${value2.data.response.product.statusofproduct.shortdescription}\nDescription : ${value2.data.response.product.statusofproduct.longdescription}`
                                    })
                                    setProductInfo({
                                        status: {
                                            shortdes: value2.data.response.product.statusofproduct.shortdescription,
                                            longdes: value2.data.response.product.statusofproduct.longdescription
                                        }, ...value2.data.response.product
                                    })
                                    if (value2.data.response.product.statusofproduct.shortdescription === "Order Viewed By Seller") {
                                        setIndex(1)
                                        setLongdes(value2.data.response.product.statusofproduct.longdescription)
                                        setCurrentstatus(0)
                                    } else if (value2.data.response.product.statusofproduct.shortdescription === "Order Dispatched") {
                                        setIndex(2)
                                        setLongdes(value2.data.response.product.statusofproduct.longdescription)
                                        setCurrentstatus(1)
                                    } else if (value2.data.response.product.statusofproduct.shortdescription === "Order Completed") {
                                        setIndex(2)
                                        setLongdes(value2.data.response.product.statusofproduct.longdescription)
                                        setCurrentstatus(2)
                                    }
                                }
                            })
                        }
                    })
                } else {
                    axios.get(`${url}api/farmer/product/${_id}`, { withCredentials: true }).then(value2 => {
                        if (value2.data.response.type) {
                            setProductInfo({
                                status: {
                                    shortdes: value2.data.response.product.statusofproduct.shortdescription,
                                    longdes: value2.data.response.product.statusofproduct.longdescription
                                }, ...value2.data.response.product
                            })
                            if (value2.data.response.product.statusofproduct.shortdescription === "Order Viewed By Seller") {
                                setIndex(1)
                                setLongdes(value2.data.response.product.statusofproduct.longdescription)
                                setCurrentstatus(0)
                            } else if (value2.data.response.product.statusofproduct.shortdescription === "Order Dispatched") {
                                setIndex(2)
                                setLongdes(value2.data.response.product.statusofproduct.longdescription)
                                setCurrentstatus(1)
                                setShowsave(false)
                                setShownext(true)
                            } else if (value2.data.response.product.statusofproduct.shortdescription === "Order Completed") {
                                setIndex(2)
                                setLongdes(value2.data.response.product.statusofproduct.longdescription)
                                setCurrentstatus(2)
                            }
                        }
                    })
                }
            }
        })

    }, [])

    const [seconds, setSeconds] = useState(30)
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            width: "100%",
            color: "black",
        }}>{
                showpopper && <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "fixed",
                    zIndex: "10",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.9)"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2em",
                        borderRadius: "1em",
                        backgroundColor: "#1f1f1f",
                        color: "white",
                        position: "fixed",
                        top: "50vh",
                        left: "50vw",
                        minWidth: "300px",
                        width: "50%",
                        transform: "translateX(-50%) translateY(-50%)"
                    }}>
                        <div onClick={e => {
                            setShowpopper(false)
                        }} style={{
                            position: "absolute",
                            top: "0.5em",
                            left: "0.5em",

                        }}>
                            <img style={{
                                height: "1.5em",
                                filter: "invert(100%)"
                            }} src={close_img} alt="" />
                        </div>
                        {
                            updatingstatus && <div style={{ height: "100%", alignItems: "center" }} class="flex gap-4 p-4 flex-wrap justify-center">
                                <img style={{
                                    filter: "invert(100%)"
                                }} className="w-10 h-10 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" />
                            </div>
                        }

                        {!updatingstatus && !updationsuccessful && <>
                            {showOtpPopper ? <div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "0em 0.5em",
                                    marginBottom: "1em"
                                }}>
                                    <p style={{
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        color: "greenyellow"
                                    }}>OTP Confirmation</p>
                                </div>
                                <div>
                                    <MDBInput value={enteredOTP} onChange={e => {
                                        setEnteredOTP(e.target.value)
                                    }} type='number' placeholder='OTP' style={{ color: "white" }} />
                                </div>
                                <div style={{
                                    color: "red",
                                    marginTop: "2em"
                                }}>
                                    <p style={{
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "0.8em",
                                    }}>Time Remaining</p>
                                </div>
                                <div style={{
                                    color: "red"
                                }}>
                                    <p style={{
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: "0.8em",
                                    }}>{seconds}</p>
                                </div>
                            </div> : <><div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "0em 0.5em",
                                marginBottom: "1em"
                            }}>
                                <p style={{
                                    textAlign: "center",
                                    fontWeight: "bolder",
                                    color: "greenyellow"
                                }}>Status Updation</p>
                            </div>
                                <div style={{ width: "100%", display: "flex", alignItems: "flex-start", fontWeight: "bold" }}>
                                    Status To Update To
                                </div>
                                <div>
                                    {
                                        optionstoshow.map((value, i) => {
                                            let ref
                                            if (i === 0) {
                                                ref = status1_ref;
                                            }
                                            if (i === 1) {
                                                ref = status2_ref;
                                            }
                                            if (i === 2) {
                                                ref = status3_ref
                                            }
                                            if (i <= index && i > currentstatus) {
                                                return <div style={{
                                                    display: "flex",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                    gap: "1em"
                                                }}>
                                                    <input onClick={e => {
                                                        setOptionselected(i)
                                                        ref.current.click()
                                                    }} ref={ref} style={{ color: "white" }} name="status" value={value} id={`${value}`} type='radio' />
                                                    <label onClick={e => {
                                                        setOptionselected(i)
                                                        ref.current.click()
                                                    }} htmlFor={`${value}`} style={{ color: "grey" }}>{value}</label>
                                                </div>
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </div>
                                <div style={{ marginTop: "1em", width: "100%", display: "flex", alignItems: "flex-start", fontWeight: "bold" }}>
                                    Description
                                </div>
                                <div style={{
                                    width: "100%"
                                }}>
                                    <MDBTextArea onChange={e => setLongdes(e.target.value)} value={longdes} style={{ color: "white" }} />
                                </div>
                            </>
                            }
                            {
                                showsave && <MDBBtn onClick={async e => {
                                    try {
                                        setUpdatingstatus(true);
                                        let shortdes;

                                        if (!optionselected) {
                                            throw new Error("Select the status option")
                                        }
                                        else if (optionselected === 0) {
                                            shortdes = "Order Viewed By Seller"
                                        } else if (optionselected === 1) {
                                            shortdes = "Order Dispatched"
                                        } else {
                                            shortdes = "Order Completed"
                                        }


                                        if (shortdes) {
                                            if (shortdes==="Order Completed") {
                                                const result = await axios.get(`${url}api/otp/${productInfo.customer_id._id}`, {
                                                    withCredentials: true
                                                })
                                                if (result.data.response.type) {
                                                    console.log(result.data.response.otp)
                                                    console.log(result.data.response.otp === enteredOTP)
                                                    if (result.data.response.otp === enteredOTP) {
                                                        const result2 = await axios.patch(`${url}api/farmer/orderstatus/${_id}`, {
                                                            shortdes: shortdes,
                                                            longdes: longdes
                                                        }, { withCredentials: true })
                                                        if (result2.data.response.type) {
                                                            axios.post(`${url}api/sms/deliverystatus`, {
                                                                to: productInfo.customer_id.contact,
                                                                message: `\nStatus : ${shortdes}\nDescription : ${longdes}`
                                                            })
                                                            if (shortdes === "Order Completed") {
                                                                const result3 = await axios.delete(`${url}api/farmer/productsaled/${_id}`, { withCredentials: true })
                                                                if (result3.data.response.type) {
                                                                    setUpdationsuccessful(true);
                                                                    setUpdatingstatus(false);
                                                                    setVieworder({
                                                                        _id: "",
                                                                        view: false
                                                                    })
                                                                    setReload(true)
                                                                }
                                                            } else {
                                                                setUpdationsuccessful(true);
                                                                setUpdatingstatus(false);
                                                            }
                                                        }
                                                    } else {
                                                        setUpdatingstatus(false);
                                                        setError(true);
                                                        setErrorMessage("Wrong OTP")
                                                    }
                                                } else {
                                                    setUpdatingstatus(false);
                                                    setError(true);
                                                    setErrorMessage("OTP Expired")
                                                }
                                            } else {
                                                const result = await axios.patch(`${url}api/farmer/orderstatus/${_id}`, {
                                                    shortdes: shortdes,
                                                    longdes: longdes
                                                }, { withCredentials: true })
                                                if (result.data.response.type) {
                                                    axios.post(`${url}api/sms/deliverystatus`, {
                                                        to: productInfo.customer_id.contact,
                                                        message: `\nStatus : ${shortdes}\nDescription : ${longdes}`
                                                    })
                                                    
                                                        setUpdationsuccessful(true);
                                                        setUpdatingstatus(false);
                                                        setReload(true)
                                                }
                                            }
                                        }
                                    }
                                    catch (err) {
                                        setError(true)
                                        setErrorMessage("Select Status To Update")
                                        setUpdatingstatus(false);
                                    }
                                }} style={{
                                    marginTop: "1em"
                                }}>Save</MDBBtn>
                            }{
                                shownext && <MDBBtn onClick={async e => {
                                    try {
                                        const shortdes = document.querySelector('input[name="status"]:checked').value;
                                        if (shortdes) {
                                            const result = await axios.post(`${url}api/otp`, {
                                                id: productInfo.customer_id._id
                                            }, { withCredentials: true })
                                            if (result.data.response.type) {
                                                setShowOtpPopper(prev => true);
                                                setShowsave(prev => true)
                                                setShownext(prev => false)
                                                const ti = setInterval(() => {
                                                    setSeconds(prev => {
                                                        if (prev - 1 > 0) {
                                                            return prev - 1
                                                        } else {
                                                            setShowOtpPopper(false)
                                                            setShowsave(false)
                                                            setShownext(true)
                                                            clearInterval(ti)
                                                            return 30
                                                        }
                                                    })
                                                }, 1000)

                                            } else {
                                                setError(true)
                                                setErrorMessage("Customer is Offline. Cant Send OTP")
                                            }
                                        } else {
                                            setError(true)
                                            setErrorMessage("Select Status To Update")
                                        }
                                    } catch (err) {
                                        setError(true)
                                        setErrorMessage("Select Status To Update")
                                    }
                                }} style={{
                                    marginTop: "1em"
                                }}>Next</MDBBtn>
                            }
                        </>}
                        {
                            updationsuccessful && <> <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "1em"
                            }}>
                                <img style={{
                                    height: "3em"
                                }} src={success_img} alt="" />
                                <div>
                                    Order Status Updated Successfully
                                </div>
                            </div>
                                <img onClick={e => {
                                    setShowpopper(false);
                                    setUpdationsuccessful(false);
                                }} style={{
                                    position: "absolute",
                                    top: "0.5em",
                                    left: "0.5em",
                                    height: "1.5em",
                                    filter: "invert(100%)"
                                }} src={close_img} alt="" />
                            </>
                        }{
                            error && <div onClick={e => {
                                setShowpopper(false);
                                setUpdationsuccessful(false);
                            }} style={{
                                position: "absolute",
                                top: "0em",
                                left: "0em",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopLeftRadius: "1em",
                                borderTopRightRadius: "1em",
                                backgroundColor: "red",
                                color: "white",
                                padding: "1em 0em",
                                width: "100%"
                            }}>
                                {errorMessage}
                            </div>
                        }
                    </div>
                </div>
            }
            <div onClick={e => {
                setReload(true)
                setVieworder({
                    _id: "",
                    view: false
                })
            }} style={{
                position: "absolute",
                top: "-2em",
                left: "0.5em",
                zIndex: "5"
            }}>
                <img style={{
                    height: "2em"
                }} src={close_img} alt="" />
            </div>

            {
                <div style={{ width: "100%" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        marginTop: "1em"
                    }}>
                        <img style={{
                            height: "10em",
                            width: "20em",
                            objectFit: "cover",
                            borderRadius: "1em",
                            border: "0.2em solid black"
                        }} src={productInfo.image} alt="" />
                    </div>

                    <div className='f-productview-infocontainer' style={{ marginTop: "2em", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
                        <div style={{
                            display: "flex",
                            gap: "1em",
                            width: "100%",
                            padding: "1em 1em",
                            borderRadius: "1em"
                        }}>
                            <div style={{ fontWeight: "bolder" }}><p>Product ID</p></div>
                            <div><p>{productInfo._id}</p></div>
                        </div>
                        <div style={{
                            display: "flex",
                            gap: "1em",
                            width: "100%",
                            padding: "1em 1em",
                            borderRadius: "1em"
                        }}>
                            <div style={{ fontWeight: "bolder" }}><p>Product</p></div>
                            <div><p>{productInfo.name}</p></div>
                        </div>
                        <div style={{
                            display: "flex",
                            gap: "1em",
                            width: "100%",
                            padding: "1em 1em",
                            borderRadius: "1em"
                        }}>
                            <div style={{ fontWeight: "bolder" }}><p>Quantity To Deliver</p></div>
                            <div><p>{productInfo.quantity}</p></div>
                        </div>
                        <div style={{
                            display: "flex",
                            gap: "1em",
                            width: "100%",
                            padding: "1em 1em",
                            borderRadius: "1em"
                        }}>
                            <div style={{ fontWeight: "bolder" }}><p>Amount Paid</p></div>
                            <div ><p>{productInfo.amount}</p></div>
                        </div>
                        <div style={{
                            width: "100%",
                            height: "0.2em",
                            margin: "2em 0em",
                            backgroundColor: "rgba(0,0,0,0.5)"
                        }}>
                        </div>
                        <div style={{
                            display: "flex",
                            gap: "1em",
                            width: "100%",
                            padding: "1em 1em",
                            borderRadius: "1em"
                        }}>
                            <div style={{ fontWeight: "bolder" }}><p>Customer Name</p></div>
                            <div ><p>{productInfo.customer_id.name}</p></div>
                        </div>
                        <div style={{
                            display: "flex",
                            gap: "1em",
                            width: "100%",
                            padding: "1em 1em",
                            borderRadius: "1em"
                        }}>
                            <div style={{ fontWeight: "bolder" }}><p>Customer Contact</p></div>
                            <div ><p>{productInfo.customer_id.contact}</p></div>
                        </div>
                        <div style={{
                            display: "flex",
                            gap: "1em",
                            width: "100%",
                            padding: "1em 1em",
                            borderRadius: "1em"
                        }}>
                            <div style={{ fontWeight: "bolder" }}><p>Customer Email</p></div>
                            <div ><p>{productInfo.customer_id.email}</p></div>
                        </div>

                        <div style={{
                            display: "flex",
                            gap: "1em",
                            width: "100%",
                            padding: "1em 1em",
                            borderRadius: "1em"
                        }}>
                            <div style={{ fontWeight: "bolder" }}><p>Residential Address</p></div>
                            <div ><p>{productInfo.customer_id.address}</p></div>
                        </div>
                        <div style={{
                            width: "100%",
                            height: "0.2em",
                            margin: "2em 0em",
                            backgroundColor: "rgba(0,0,0,0.5)"
                        }}>
                        </div>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            borderRadius: "1em"
                        }}>
                            <div style={{
                                display: "flex",
                                gap: "1em",
                                width: "100%",
                                padding: "1em 1em",
                                borderRadius: "1em",
                            }}>
                                <div style={{ fontWeight: "bolder", color: "black" }}><p>Address Of Delivery</p></div>
                            </div>
                            <div style={{
                                display: "flex",
                                gap: "1em",
                                width: "100%",
                                padding: "1em 1em",
                                paddingLeft: "2em",
                                borderRadius: "1em"
                            }}>
                                <div style={{ fontWeight: "bolder", color: "black" }}><p>State</p></div>
                                <div ><p>{productInfo.addressofdelivery.state}</p></div>
                            </div>
                            <div style={{
                                display: "flex",
                                gap: "1em",
                                width: "100%",
                                padding: "1em 1em",
                                paddingLeft: "2em",
                                borderRadius: "1em"
                            }}>
                                <div style={{ fontWeight: "bolder", color: "black" }}><p>City</p></div>
                                <div ><p>{productInfo.addressofdelivery.city}</p></div>
                            </div>
                            <div style={{
                                display: "flex",
                                gap: "1em",
                                width: "100%",
                                padding: "1em 1em",
                                paddingLeft: "2em",
                                borderRadius: "1em"
                            }}>
                                <div style={{ fontWeight: "bolder", color: "black" }}><p>Region</p></div>
                                <div ><p>{productInfo.addressofdelivery.region}</p></div>
                            </div>
                            <div style={{
                                display: "flex",
                                gap: "1em",
                                width: "100%",
                                padding: "1em 1em",
                                paddingLeft: "2em",
                                borderRadius: "1em"
                            }}>
                                <div style={{ fontWeight: "bolder", color: "black" }}><p>LandMark</p></div>
                                <div ><p>{productInfo.addressofdelivery.landmark}</p></div>
                            </div>
                            <div style={{
                                display: "flex",
                                gap: "1em",
                                width: "100%",
                                padding: "1em 1em",
                                paddingLeft: "2em",
                                borderRadius: "1em"
                            }}>
                                <div style={{ fontWeight: "bolder", color: "black" }}><p>Pincode</p></div>
                                <div ><p>{productInfo.addressofdelivery.pincode}</p></div>
                            </div>
                        </div>
                        <div style={{
                            width: "100%",
                            height: "0.2em",
                            margin: "2em 0em",
                            backgroundColor: "rgba(0,0,0,0.5)"
                        }}>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            width: "100%",
                            padding: "1em 0em",
                            paddingLeft: "1em",
                            borderRadius: "1em"
                        }}>
                            <div>
                                <div style={{ fontWeight: "bolder", color: "black" }}><p>Status Of Delivery</p></div>
                            </div>
                            <div style={{ paddingLeft: "2em", display: "flex", padding: "1em 1em", justifyContent: "flex-start", alignItems: "center", gap: "1em" }}>
                                {statuseditable && <div>
                                    <img onClick={e => {
                                        setShowpopper(true)
                                    }} style={{
                                        height: "1em"
                                    }} src={edit_img} alt="" />
                                </div>
                                }
                                <div style={{ fontWeight: "bold", color: "black" }}>Status</div>
                                <div><p>{productInfo.status.shortdes}</p></div>
                            </div>{
                                productInfo.status.longdes &&
                                <div style={{ paddingLeft: "2em", display: "flex", padding: "0em 1em", justifyContent: "flex-start", alignItems: "center", gap: "1em" }}>
                                    {statuseditable && <div>
                                        <img style={{
                                            height: "1em",
                                            visibility: "hidden"
                                        }} src={edit_img} alt="" />
                                    </div>}
                                    <div style={{ fontWeight: "bold", color: "black" }}>Description</div>
                                    <div><p>{productInfo.status.longdes}</p></div>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            }

        </div>
    )
}

export default FarmerProductOrderView