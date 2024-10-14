import React, { useContext, useEffect, useRef } from 'react'
import edit from '../images/pencil.png';
import save from '../images/check.png';
import './ViewProduct.css'
import { useState } from 'react';
import { Button } from '@material-tailwind/react';
import SubInputs from '../components/SubInputs';
import { ProductContext } from '../contexts/product';
import axios from 'axios';
import { NetworkContext } from '../contexts/networkContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import close_btn from '../images/close.png'

function ViewProduct({
    _id
}) {
    const { t } = useTranslation(['viewproduct'])
    const p_name_ref = useRef(null);
    const p_quantity_ref = useRef(null);
    const p_price_ref = useRef(null);
    const p_id_ref = useRef(null);
    const message_ref = useRef(null)

    const s0 = useRef(null);
    const s1 = useRef(null);
    const s2 = useRef(null);
    const s3 = useRef(null);

    const e0 = useRef(null);
    const e1 = useRef(null);
    const e2 = useRef(null);
    const e3 = useRef(null);

    const p0 = useRef(null);
    const p1 = useRef(null);
    const p2 = useRef(null);
    const p3 = useRef(null);
    const [id, setId] = useState(null)
    const [amount, setAmount] = useState(null);
    const [currency, setCurrency] = useState("")
    const [unit, setUnit] = useState("")
    const [name, setName] = useState("")
    const [owner, setOwner] = useState("")
    const { url } = useContext(NetworkContext)
    const subinputinfo_price = [
        {
            r_name: t("amount"),
            r_placeholder: t("amount"),
            r_type: "number",
            r_value: amount,
            setr_value: setAmount
        },
        {
            r_name: t("currency"),
            r_placeholder: t("currency"),
            r_type: "text",
            r_value: currency,
            setr_value: setCurrency
        },
        {
            r_name: t("unit"),
            r_placeholder: t("unit"),
            r_type: "text",
            r_value: unit,
            setr_value: setUnit
        }

    ]
    const [count, setCount] = useState(null);
    const [q_unit, setQ_unit] = useState("");
    const subinputinfo_quantity = [
        {
            r_name: t("count"),
            r_placeholder: t("count"),
            r_type: "number",
            r_value: count,
            setr_value: setCount
        },
        {
            r_name: t("unit"),
            r_placeholder: t("unit"),
            r_type: "text",
            r_value: q_unit,
            setr_value: setQ_unit
        }

    ]
    const { product, setProduct } = useContext(ProductContext);
    const [btn, setBtn] = useState()

    const [showMessage, setShowMessage] = useState({
        isShowing: false,
        message: "",
        bgcolor: ""
    })
    useEffect(() => {
        console.log(showMessage)
        if (showMessage.isShowing) {
            console.log("Inside if")
            message_ref.current.style.display = "flex"
            setTimeout(() => {
                message_ref.current.style.display = "none"
            }, 3000)
        }
        else {

            message_ref.current.style.display = "none"
        }
    }, [showMessage])
    const [showsubproperties, setshowsubproperties] = useState([])
    const [isIdEditting, setIsIdEditting] = useState(false);
    const [isNameEditting, setIsNameEditting] = useState(false);
    const [isQuantityEditting, setIsQuantityEditting] = useState(false);
    const [isPriceEditting, setIsPriceEditting] = useState(false)
    const navigate = useNavigate()
    const product_input_img_ref = useRef(null);
    const product_img_ref = useRef(null)
    useEffect(() => {
        // document.body.style.backgroundColor = "#212121"
        product_input_img_ref.current.style.display = "none";
        console.log(_id)
        if (product.type === "VIEW/EDIT") {

            // p_id_ref.current.disabled = true;
            p_name_ref.current.disabled = true;
            setBtn("no")
            axios.get(`${url}api/product/${product.id}`, { withCredentials: true }).then(value => {
                console.log(value.data.response)
                const rproduct = value.data.response.product;
                setId(rproduct._id);
                setName(rproduct.name);
                setCount(rproduct.quantity.count);
                setQ_unit(rproduct.quantity.unit);
                setAmount(rproduct.price.amount);
                setCurrency(rproduct.price.currency);
                setUnit(rproduct.price.unit);
                setImage(rproduct.image);
                p_quantity_ref.current.value = `${rproduct.quantity.count} ${rproduct.quantity.unit}`
                p_price_ref.current.value = `${rproduct.price.amount} ${rproduct.price.currency} per ${rproduct.price.unit}`
            })
        }
        if (product.type == "ADD") {
            setBtn("add")
        }

        if (!product.id) {
            axios.get(`${url}api/get/user`, { withCredentials: true }).then(value => {
                if (value.data.response.type) {
                    setOwner(value.data.response.user._id);
                } else {
                    navigate("/login")
                }
            })
            // p0.current.style.borderRadius = "1em"
            // p0.current.style.borderTopWidth = "0.1em"
            // p0.current.style.borderTopColor = "rgb(30, 95, 0)"
            // p0.current.style.borderTopStyle = "solid"
            // p0.current.style.borderBottomWidth = "0.1em"
            // p0.current.style.borderBottomColor = "rgb(30, 95, 0)"
            // p0.current.style.borderBottomStyle = "solid"
            // s0.current.style.display = "block"
            // e0.current.style.display = "none"
            // console.log(`p:::: ${p_id_ref.current.disabled}`)
            // p_id_ref.current.disabled = false;
            // setIsIdEditting(true);

            p1.current.style.borderRadius = "1em"
            p1.current.style.borderTopWidth = "0.1em"
            p1.current.style.borderTopColor = "rgb(30, 95, 0)"
            p1.current.style.borderTopStyle = "solid"
            p1.current.style.borderBottomWidth = "0.1em"
            p1.current.style.borderBottomColor = "rgb(30, 95, 0)"
            p1.current.style.borderBottomStyle = "solid"
            s1.current.style.display = "block"
            e1.current.style.display = "none"
            p_name_ref.current.disabled = false;
            setIsNameEditting(true)

            p2.current.style.borderRadius = "1em"
            p2.current.style.borderTopWidth = "0.1em"
            p2.current.style.borderTopColor = "rgb(30, 95, 0)"
            p2.current.style.borderTopStyle = "solid"
            p2.current.style.borderBottomWidth = "0.1em"
            p2.current.style.borderBottomColor = "rgb(30, 95, 0)"
            p2.current.style.borderBottomStyle = "solid"
            s2.current.style.display = "block"
            e2.current.style.display = "none"
            setshowsubproperties(pre => [2, ...pre])
            setIsQuantityEditting(true)

            p3.current.style.borderRadius = "1em"
            p3.current.style.borderTopWidth = "0.1em"
            p3.current.style.borderTopColor = "rgb(30, 95, 0)"
            p3.current.style.borderTopStyle = "solid"
            p3.current.style.borderBottomWidth = "0.1em"
            p3.current.style.borderBottomColor = "rgb(30, 95, 0)"
            p3.current.style.borderBottomStyle = "solid"
            s3.current.style.display = "block"
            e3.current.style.display = "none"
            setshowsubproperties(pre => [3, ...pre])
            setIsPriceEditting(true)

        }
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
        p_quantity_ref.current.disabled = true;
        p_price_ref.current.disabled = true

        return () => {
            setProduct({
                id: null,
                type: ""
            })
        }
    }, [])
    const [image, setImage] = useState("")
    const img_container = useRef(null);
    const [viewImg, setViewImg] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const master_ref = useRef(null);
    return (
        <>{
            isLoading ? <div style={{ height: "90vh", alignItems: "center" }} class="flex gap-4 p-4 flex-wrap justify-center">
                <img style={{ filter: "invert(100%)" }} className="w-10 h-10 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" />
            </div> :
                <>
                    <div className='mynavbar-selection-box' style={{ visibility: viewImg ? `visible` : "hidden", paddingLeft: "0.3em", paddingTop: "0.3em", paddingRight: "0.3em", paddingBottom: "1em" }}>
                        <img style={{
                            objectFit: "contain",
                            borderTopLeftRadius: "1em",
                            borderTopRightRadius: "1em"
                        }} src={image} alt="" />
                        <img onClick={e => {
                            master_ref.current.style.filter="blur(0px)"
                            setViewImg(false)
                        }} style={{
                            alignSelf: "center",
                            width: "2.5em",
                            height: "2.5em",
                            filter: "invert()"
                        }} src={close_btn} alt="" />
                    </div>
                    <div ref={master_ref}>

                        <input style={{
                            display:"none"
                        }} onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                                const fr = new FileReader();
                                fr.onload = (event) => {
                                    const base64img = event.target.result;
                                    setImage(base64img);
                                    product_img_ref.current.src = base64img;
                                }
                                fr.readAsDataURL(file)
                            }
                        }} ref={product_input_img_ref} type='file' accept='image/*' />
                        <div ref={message_ref} style={{
                            height: "5em",
                            position: "fixed",
                            width: "100vw",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: "20",
                            backgroundColor: "transparent",
                            borderRadius: "3em"
                        }}>
                            <div style={{
                                padding: "1em 2em",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "3em",
                                backgroundColor: showMessage.bgcolor
                            }}>
                                <p style={{
                                    userSelect: "none",
                                    fontSize: "1.3em",
                                    fontWeight: "bold",
                                    color: "black"
                                }}>{showMessage.message}</p>
                            </div>
                        </div>
                        <div className='product-container-info'>

                            {/* <div style={{
                    paddingTop: "0.5em",
                    paddingBottom: "1em"
                }} ref={p0} className='my-3 '>
                    <label for="p_id" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">{"Id"}</label>
                    <div style={{
                        display: "flex",
                        gap: "1em",
                        alignItems: "center"
                    }}>
                        <input value={id} onChange={e => setId(parseInt(e.target.value))} ref={p_id_ref} style={{
                        }} type="number" id="p_id" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Id" required />
                        <img ref={e0} onClick={e => {
                            if (!product.id) {
                                setBtn(prev => {
                                    if (prev === "no" || prev === "yes") {
                                        return "yes"
                                    } else {
                                        return prev
                                    }
                                })
                                p0.current.style.borderRadius = "1em"
                                p0.current.style.borderTopWidth = "0.1em"
                                p0.current.style.borderTopColor = "rgb(30, 95, 0)"
                                p0.current.style.borderTopStyle = "solid"
                                p0.current.style.borderBottomWidth = "0.1em"
                                p0.current.style.borderBottomColor = "rgb(30, 95, 0)"
                                p0.current.style.borderBottomStyle = "solid"
                                s0.current.style.display = "block"
                                e0.current.style.display = "none"
                                p_id_ref.current.disabled = false;
                                setIsIdEditting(true);
                            } else {
                                setShowMessage({
                                    isShowing: true,
                                    message: "Cant edit Id of product",
                                    bgcolor: "red"
                                })
                            }
                        }} style={{
                            height: "1em",
                            filter: "invert(100%)"
                        }
                        } src={edit} alt="" />

                        <img onClick={e => {
                            if (id > 0) {
                                p0.current.style.borderTopWidth = "0em"
                                p0.current.style.borderBottomWidth = "0em"
                                s0.current.style.display = "none"
                                e0.current.style.display = "block"
                                p_id_ref.current.disabled = true;
                                setIsIdEditting(false);
                            } else {
                                setShowMessage({
                                    isShowing: true,
                                    message: "Id should be greater than zero",
                                    bgcolor: "red"
                                })
                            }

                        }} ref={s0} style={{
                            height: "1em",
                            display: "none",
                            filter: "invert(100%)"
                        }
                        } src={save} aly="" />
                    </div>
                </div> */}

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.5em",
                                paddingTop: "0.5em",
                                paddingBottom: "1em"
                            }} ref={img_container} className='my-3 '>
                                <img onClick={e => {
                                    if (image) {
                                        master_ref.current.style.filter = "blur(5px)"
                                        setViewImg(true)
                                    }
                                }} ref={product_img_ref} style={{
                                    border: "2px solid white",
                                    height: "7em",
                                    width: "7em",
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                }} src={image} alt="" />

                                <div style={{
                                    width: "7em",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    position: "relative",
                                    bottom: "3em",
                                    right: "1em",
                                }}>
                                    <div onClick={e => {
                                        setBtn(prev => {
                                            if (prev === "no" || prev === "yes") {
                                                return "yes"
                                            } else {
                                                return prev
                                            }
                                        })
                                        product_input_img_ref.current.click()
                                    }} style={{
                                        backgroundColor: "white",
                                        borderRadius: "50%",
                                        padding: "0.5em"
                                    }}>
                                        <img style={{
                                            width: "1em",
                                        }} src={edit} alt="" />
                                    </div>
                                </div>

                            </div>

                            <div style={{
                                paddingTop: "0.5em",
                                paddingBottom: "1em"
                            }} ref={p1} className='my-3 '>
                                <label for="p_name" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">{t("name")}</label>
                                <div style={{
                                    display: "flex",
                                    gap: "1em",
                                    alignItems: "center"
                                }}>
                                    <input value={name} onChange={e => setName(e.target.value)} ref={p_name_ref} style={{
                                    }} type="text" id="p_name" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("name_p")} required />
                                    <img ref={e1} onClick={e => {

                                        setBtn(prev => {
                                            if (prev === "no" || prev === "yes") {
                                                return "yes"
                                            } else {
                                                return prev
                                            }
                                        })
                                        p1.current.style.borderRadius = "1em"
                                        p1.current.style.borderTopWidth = "0.1em"
                                        p1.current.style.borderTopColor = "rgb(30, 95, 0)"
                                        p1.current.style.borderTopStyle = "solid"
                                        p1.current.style.borderBottomWidth = "0.1em"
                                        p1.current.style.borderBottomColor = "rgb(30, 95, 0)"
                                        p1.current.style.borderBottomStyle = "solid"
                                        s1.current.style.display = "block"
                                        e1.current.style.display = "none"
                                        p_name_ref.current.disabled = false;
                                        setIsNameEditting(true)
                                    }} style={{
                                        height: "1em",
                                        filter: "invert(100%)"
                                    }
                                    } src={edit} alt="" />

                                    <img onClick={e => {
                                        if (name) {
                                            p1.current.style.borderTopWidth = "0em"
                                            p1.current.style.borderBottomWidth = "0em"
                                            s1.current.style.display = "none"
                                            e1.current.style.display = "block"
                                            p_name_ref.current.disabled = true;
                                            setIsNameEditting(false)
                                        } else {
                                            setShowMessage({
                                                isShowing: true,
                                                message: t("name_err"),
                                                bgcolor: "red"
                                            })
                                        }

                                    }} ref={s1} style={{
                                        height: "1em",
                                        display: "none",
                                        filter: "invert(100%)"
                                    }
                                    } src={save} aly="" />
                                </div>
                            </div>
                            <div style={{
                                paddingTop: "0.5em",
                                paddingBottom: "1em"
                            }} ref={p2} className='my-3'>
                                <label for="p_quantity" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">{t("quantity")}</label>
                                <div style={{
                                    display: "flex",
                                    gap: "1em",
                                    alignItems: "center"
                                }}>
                                    <input ref={p_quantity_ref} type="text" id="p_quantity" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("quantity_p")} required />
                                    <img ref={e2} onClick={e => {
                                        setBtn(prev => {
                                            if (prev === "no" || prev === "yes") {
                                                return "yes"
                                            } else {
                                                return prev
                                            }
                                        })
                                        p2.current.style.borderRadius = "1em"
                                        p2.current.style.borderTopWidth = "0.1em"
                                        p2.current.style.borderTopColor = "rgb(30, 95, 0)"
                                        p2.current.style.borderTopStyle = "solid"
                                        p2.current.style.borderBottomWidth = "0.1em"
                                        p2.current.style.borderBottomColor = "rgb(30, 95, 0)"
                                        p2.current.style.borderBottomStyle = "solid"
                                        s2.current.style.display = "block"
                                        e2.current.style.display = "none"
                                        setshowsubproperties(pre => [2, ...pre])
                                        setIsQuantityEditting(true)
                                        // p_quantity_ref.current.disabled = false;
                                    }} style={{
                                        height: "1em",
                                        filter: "invert(100%)"
                                    }
                                    } src={edit} alt="" />
                                    <img onClick={e => {
                                        try {
                                            if (count && q_unit && count) {
                                                if (count > 0) {
                                                    let value = `${count} ${q_unit}`
                                                    console.log(value)
                                                    p_quantity_ref.current.value = value
                                                    p2.current.style.borderTopWidth = "0em"
                                                    p2.current.style.borderBottomWidth = "0em"
                                                    s2.current.style.display = "none"
                                                    e2.current.style.display = "block"
                                                    p_quantity_ref.current.disabled = true;
                                                    setshowsubproperties(pre => pre.filter(value => value !== 2))
                                                    setIsQuantityEditting(false)
                                                } else {
                                                    setShowMessage({
                                                        isShowing: true,
                                                        message: t("count_err"),
                                                        bgcolor: "red"
                                                    })
                                                }
                                            } else {
                                                setShowMessage({
                                                    isShowing: true,
                                                    message: t("quantity_err"),
                                                    bgcolor: "red"
                                                })
                                            }
                                        } catch (err) {

                                        }

                                    }} ref={s2} style={{
                                        height: "1em",
                                        display: "none",
                                        filter: "invert(100%)"
                                    }
                                    } src={save} aly="" />
                                </div>
                                {
                                    showsubproperties.includes(2) ? <SubInputs rowsInfo={subinputinfo_quantity} /> : ""
                                }
                            </div>
                            <div style={{
                                paddingTop: "0.5em",
                                paddingBottom: "1em"
                            }} ref={p3} className='my-3'>
                                <label for="p_price" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">{t("price")}</label>
                                <div style={{
                                    display: "flex",
                                    gap: "1em",
                                    alignItems: "center"
                                }}>
                                    <input ref={p_price_ref} type="text" id="p_price" class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("price_p")} required />
                                    <img ref={e3} onClick={e => {
                                        setBtn(prev => {
                                            if (prev === "no" || prev === "yes") {
                                                return "yes"
                                            } else {
                                                return prev
                                            }
                                        })
                                        p3.current.style.borderRadius = "1em"
                                        p3.current.style.borderTopWidth = "0.1em"
                                        p3.current.style.borderTopColor = "rgb(30, 95, 0)"
                                        p3.current.style.borderTopStyle = "solid"
                                        p3.current.style.borderBottomWidth = "0.1em"
                                        p3.current.style.borderBottomColor = "rgb(30, 95, 0)"
                                        p3.current.style.borderBottomStyle = "solid"
                                        s3.current.style.display = "block"
                                        e3.current.style.display = "none"
                                        setshowsubproperties(pre => [3, ...pre])
                                        setIsPriceEditting(true)
                                        // p_price_ref.current.disabled = false

                                    }
                                    } style={{
                                        height: "1em",
                                        filter: "invert(100%)"
                                    }
                                    } src={edit} alt="" />
                                    <img onClick={e => {
                                        if (amount && unit && currency) {
                                            if (amount > 0) {
                                                p_price_ref.current.value = `${amount} ${currency} per ${unit}`
                                                p3.current.style.borderTopWidth = "0em"
                                                p3.current.style.borderBottomWidth = "0em"
                                                s3.current.style.display = "none"
                                                e3.current.style.display = "block"
                                                p_price_ref.current.disabled = true
                                                setshowsubproperties(pre => pre.filter(value => value !== 3))
                                                setIsPriceEditting(false)
                                            } else {
                                                setShowMessage({
                                                    isShowing: true,
                                                    message: t("amount_err"),
                                                    bgcolor: "red"
                                                })
                                            }
                                        } else {
                                            setShowMessage({
                                                isShowing: true,
                                                message: t("price_err"),
                                                bgcolor: "red"
                                            })
                                        }

                                    }} ref={s3} style={{
                                        height: "1em",
                                        display: "none",
                                        filter: "invert(100%)"
                                    }
                                    } src={save} aly="" />

                                </div>{
                                    showsubproperties.includes(3) ? <SubInputs rowsInfo={subinputinfo_price} /> : ""
                                }
                            </div>
                            <div style={{
                                visibility: btn === "no" ? "hidden" : "visible",
                                display: btn === "no" ? "none" : "flex",
                                justifyContent: "center",
                                paddingTop: "0.5em",
                                paddingBottom: "1em"
                            }} className='my-3'>
                                <Button onClick={async e => {
                                    if (!image) {
                                        return setShowMessage({
                                            bgcolor: "red",
                                            message: t("img_err"),
                                            isShowing: true,
                                        })
                                    }
                                    setIsLoading(true)
                                    if (btn === "yes") {
                                        if (!isNameEditting && !isQuantityEditting && !isPriceEditting) {

                                            const result = await axios.patch(`${url}api/product`, {
                                                product: {
                                                    _id: id,
                                                    name: name,
                                                    quantity: {
                                                        count: count,
                                                        unit: q_unit
                                                    },
                                                    price: {
                                                        amount: amount,
                                                        currency: currency,
                                                        unit: unit
                                                    },
                                                    image: image
                                                }
                                            }, { withCredentials: true })
                                            console.log(result.data.response)
                                            if (result.data.response.type) {
                                                setIsLoading(false)
                                                setTimeout(() => {
                                                    navigate("/profile/productinventory")
                                                }, 2000)
                                                setShowMessage({
                                                    isShowing: true,
                                                    bgcolor: "green",
                                                    message: "Product details updated successfully"
                                                })
                                                setBtn("no")
                                            } else {
                                                setIsLoading(false)
                                                setShowMessage({
                                                    isShowing: true,
                                                    bgcolor: "red",
                                                    message: result.data.response.msg
                                                })
                                            }


                                        } else {
                                            setIsLoading(false)
                                            setShowMessage({
                                                isShowing: true,
                                                bgcolor: "red",
                                                message: t("all_field_err")
                                            })
                                        }
                                    }
                                    if (btn === "add") {
                                        if (!isNameEditting && !isQuantityEditting && !isPriceEditting) {
                                            try {
                                                const result = await axios.post(`${url}api/product`, {
                                                    product: {
                                                        _id: id,
                                                        name: name,
                                                        quantity: {
                                                            count: count,
                                                            unit: q_unit
                                                        },
                                                        price: {
                                                            amount: amount,
                                                            currency: currency,
                                                            unit: unit
                                                        },
                                                        owner: owner,
                                                        image: image
                                                    }
                                                }, { withCredentials: true })
                                                console.log(result.data.response)
                                                if (result.data.response.type) {
                                                    setIsLoading(false)
                                                    setShowMessage({
                                                        isShowing: true,
                                                        bgcolor: "green",
                                                        message: "Product added successfully"
                                                    })
                                                    setTimeout(() => {
                                                        navigate("/profile/productinventory")
                                                    }, 2000)
                                                } else {
                                                    throw new Error(result.data.response.msg)
                                                }

                                            } catch (err) {
                                                setIsLoading(false)
                                                setShowMessage({
                                                    isShowing: true,
                                                    bgcolor: "red",
                                                    message: err.message
                                                })
                                            }

                                        } else {
                                            setIsLoading(false)
                                            setShowMessage({
                                                isShowing: true,
                                                bgcolor: "red",
                                                message: t("all_field_err")
                                            })
                                        }
                                    }
                                    product_input_img_ref.current.style.display="none"
                                }} style={{ backgroundColor: "blue", color: "white", fontSize: "1em" }} variant="contained">{btn === "add" && t("add")}{btn === "yes" && t("save")}</Button>
                            </div>
                        </div>
                    </div>
                </>
        }
        </>
    )
}

export default ViewProduct