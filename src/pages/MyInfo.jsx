import React, { useContext, useEffect, useRef, useState } from 'react'
import './MyInfo.css'
import background_cover from '../images/background-cover.jpg'
import back_arrow from '../images/arrow.png'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UserContext } from '../contexts/userContext'
import axios from 'axios'
import { data } from 'autoprefixer'
import { NetworkContext } from '../contexts/networkContext'
import edit from '../images/pencil.png';
import close_btn from '../images/close.png'
import './ProductInventory.css'

function MyInfo() {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        // document.body.style.color = "black";
        return () => {
            document.body.style.backgroundColor = "black";
        }
    }, [])
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { t } = useTranslation(['myinfo']);
    const [info, setInfo] = useState({
        username: "",
        email: "",
        country: "",
        state: "",
        contact: "",
        address: "",
        image: "",
        id: ""
    })
    const [isEditting, setIsEditting] = useState(false);
    const [User, setUser] = useState(null)
    const { url } = useContext(NetworkContext)
    useEffect(() => {
        axios.get(`${url}api/get/user`, { withCredentials: true }
        ).then(value => {
            console.log(value.data.response)
            if (value.data.response.type) {
                console.log(value.data.response)
                const result = value.data.response.user
                setUser(result)
                console.log(result)
                setInfo({
                    username: result.name,
                    email: result.email,
                    state: result.state,
                    address: result.address,
                    contact: result.contact,
                    country: result.country,
                    image: result.image,
                    id: result._id
                })
            }
            if (value.data.response.type === false) {
                navigate("/login")
            }
        }
        )
    }, [])
    const { previousPage } = useContext(UserContext)
    const my_img_ref = useRef(null);
    const img_container = useRef(null);
    const img_input_ref = useRef(null);
    const master_ref = useRef(null);
    const [viewImg, setViewImg] = useState(false)
    return (
        <>
            <div className='mynavbar-selection-box' style={{ visibility: viewImg ? `visible` : "hidden", paddingLeft: "0.3em", paddingTop: "0.3em", paddingRight: "0.3em", paddingBottom: "1em" }}>
                
                <img style={{
                    objectFit: "contain",
                    borderTopLeftRadius: "1em",
                    borderTopRightRadius: "1em"
                }} src={info.image} alt="" />
                <img onClick={e => {
                    master_ref.current.style.filter = "blur(0px)"
                    setViewImg(false)
                }} style={{
                    alignSelf: "center",
                    width: "2.5em",
                    height: "2.5em",
                    filter: "invert()"
                }} src={close_btn} alt="" />
            </div>

            <input ref={img_input_ref} style={{
                display: "none"
            }} onChange={e => {
                const file = e.target.files[0];
                if (file) {
                    const fr = new FileReader();
                    fr.onload = async (event) => {
                        const img = event.target.result
                        setInfo(prev => {
                            return {
                                ...prev,
                                image: img
                            }
                        })
                        const result = await axios.patch(`${url}api/user`, {
                            _id: info.id,
                            image: img,
                            country: info.country,
                            state: info.state,
                            address: info.address,
                            contact: info.contact
                        }, { withCredentials: true })
                        console.log(result.data.response)
                        if (result.data.response.type) {
                            alert("User info updated successfully");
                        } else {
                            alert("Unable to updated user info");
                        }
                    }
                    fr.readAsDataURL(file)
                }
            }} type="file" accept='image/*' />
            <div ref={master_ref} >
                <img onClick={e => {
                    console.log(previousPage)
                    navigate(`${previousPage}`);
                }} style={{
                    filter: "invert()",
                    top: "1em",
                    left: "1em",
                    position: "fixed",
                    width: "2.5em"
                }} src={back_arrow} alt="" />
                <div className='myinfo-main-container'>

                    <div className='myinfo-cover'>

                    </div>
                    <div className='myinfo-content'>
                        <div style={{
                            position:"relative"
                        }} className='myinfo-content-firsthalf'>
                            <div style={{
                                position:"absolute",
                                top:"0.5em",
                                right:"1em"
                            }}>
                                <button style={{
                                    fontSize:"0.9em",
                                    backgroundColor:"#141414",
                                }} className='logout-btn'>Logout</button>
                            </div>
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
                                    if (info.image) {
                                        master_ref.current.style.filter = "blur(5px)"
                                        setViewImg(true)
                                    }
                                }} ref={my_img_ref} style={{
                                    border: "2px solid white",
                                    height: "7em",
                                    width: "7em",
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                }} src={info.image} alt="" />

                                <div style={{
                                    width: "7em",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    position: "relative",
                                    bottom: "3em",
                                    right: "1em",
                                }}>
                                    <div onClick={e => {
                                        if (!isEditting) {
                                            img_input_ref.current.click()
                                        }else{
                                            alert("Cant update image while updating other information")
                                        }
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
                            {/* <img onClick={e=>{

                        }} style={
                            {
                                height: "6em",
                                width: "6em",
                                borderRadius: "50%",
                                borderStyle: "solid",
                                borderWidth: "2px",
                                borderColor: "white"
                            }
                        } src={info.image} alt="" /> */}
                            <div className="myinfo-content-name">
                                <p>{info.username}</p>
                            </div>
                            <div className="myinfo-content-email">
                                <p>{info.email}</p>
                            </div>
                        </div>
                        <div className='myinfo-content-secondhalf'>
                            <div className='first'>
                                <div className='m-1'>
                                    <label for="username" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">{t("username")}</label>
                                    <input value={info.username} disabled={true} type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
                                </div>
                                <div className='m-1'>
                                    <label for="email" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">{t("email")}</label>
                                    <input value={info.email} disabled={true} type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
                                </div>
                                <div className='m-1'>
                                    <label for="country" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">{t("country")}</label>
                                    <input value={info.country} disabled={isEditting ? false : true} onChange={e => setInfo(pre => { return { ...pre, country: e.target.value } })} type="text" id="country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Country" required />
                                </div>
                                <div className='m-1'>
                                    <label for="state" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">{t("state")}</label>
                                    <input value={info.state} disabled={isEditting ? false : true} onChange={e => setInfo(pre => { return { ...pre, state: e.target.value } })} type="text" id="state" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="State" required />
                                </div>
                                <div className='m-1'>
                                    <label for="contact" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">{t("contact")}</label>
                                    <input value={info.contact} disabled={isEditting ? false : true} onChange={e => setInfo(pre => { return { ...pre, contact: parseInt(e.target.value) } })} type="number" id="contact" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contact Number" required />
                                </div>
                                <div className='m-1'>
                                    <label for="address" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">{t("address")}</label>
                                    <input value={info.address} disabled={isEditting ? false : true} onChange={e => setInfo(pre => { return { ...pre, address: e.target.value } })} type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required />
                                </div>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "0.2em"
                            }}>
                                <button onClick={async e => {
                                    if (isEditting) {
                                        if (info.country && info.state && info.contact && info.address) {
                                            console.log(info.contact)
                                            if (info.contact.toString().length === 10) {
                                                const result = await axios.patch(`${url}api/user`,{
                                                    _id:info.id,
                                                    country:info.country,
                                                    state:info.state,
                                                    address:info.address,
                                                    contact:info.contact,
                                                    image:info.image
                                                },{withCredentials:true})
                                                if(result.data.response.type){
                                                    setInfo({
                                                        username: result.data.response.user.name,
                                                        email: result.data.response.user.email,
                                                        state: result.data.response.user.state,
                                                        address: result.data.response.user.address,
                                                        contact: result.data.response.user.contact,
                                                        country: result.data.response.user.country,
                                                        image: result.data.response.user.image,
                                                        id: result.data.response.user._id
                                                    })
                                                    alert("User info updated successfully")
                                                    setIsEditting(false);
                                                }else{
                                                    alert(result.data.response.msg)
                                                }
                                            } else {
                                                alert(t("no_alert"))
                                            }
                                        } else {
                                            alert(t("empty_alert"))
                                        }
                                    }
                                    else {
                                        setIsEditting(true)
                                    }
                                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    {isEditting ? t("save") : t("edit")}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default MyInfo