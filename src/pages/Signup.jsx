import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from '../hooks/useAlert';
import CustomAlert from '../components/CustomAlert';
import { Alert } from '@material-tailwind/react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NetworkContext } from '../contexts/networkContext';

function Signup() {
    const { t } = useTranslation(["signup"]);
    const { i18n } = useTranslation();
    const { currentpage, setCurrentpage } = useOutletContext()
    const navigate = useNavigate();
    const { settings, setsettings } = useAlert(4000);
    const [Name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setCurrentpage("signup")
    }, [])
    const {url} = useContext(NetworkContext)
    const onRegisterHandler = async (e) => {
        setLoading(true)
        e.preventDefault();
        
        if (!Name || !email || !password || !confirmpassword || !country || !state || !contact || !address) {
            let message
            if (i18n.language === "en") {
                message = "Fill all credentials"
            }
            else if (i18n.language === "mr") {
                message = "सर्व तपशील भरा"
            } else if (i18n.language === "hi") {
                message = "सभी विवरण भरें"
            }
            setsettings({
                type: 'error',
                message: message,
                isShowing: true,
            })
        } else {
            if (contact.length !== 10) {
                let message
                if (i18n.language === "en") {
                    message = "Contact Number must include 10 digits"
                }
                else if (i18n.language === "mr") {
                    message = "संपर्क क्रमांकात 10 अंक असणे आवश्यक आहे"
                } else if (i18n.language === "hi") {
                    message = "संपर्क संख्या में 10 अंक होने चाहिए"
                }
                setsettings({
                    type: 'error',
                    message: message,
                    isShowing: true
                })
            } else {
                if (confirmpassword !== password) {
                    let message
                    if (i18n.language === "en") {
                        message = "Password and confirm password are not same"
                    }
                    else if (i18n.language === "mr") {
                        message = "पासवर्ड आणि पुष्टी पासवर्ड समान नाहीत"
                    } else if (i18n.language === "hi") {
                        message = "पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते"
                    }
                    setsettings({
                        type: 'error',
                        message: message,
                        isShowing: true
                    })
                } else {
                    const selectedRole = document.getElementById("select-role").value;
                    if(selectedRole==="none"){
                        let message
                    if (i18n.language === "en") {
                        message = "You must select role"
                    }
                    else if (i18n.language === "mr") {
                        message = "तुम्ही भूमिका निवडली पाहिजे."
                    } else if (i18n.language === "hi") {
                        message = "आपको भूमिका चुननी होगी।"
                    }
                    setsettings({
                        type: 'error',
                        message: message,
                        isShowing: true
                    })
                    }
                    else{
                    // const result = await axios.post("http://192.168.0.224:8080/api/user", { name: Name, email: email, password: password, country: country, state: state, contact: contact, address: address, lang: i18n.language });
                    const result = await axios.post(`${url}api/user`, { name: Name, email: email, password: password, country: country, state: state, contact: contact, address: address, lang: i18n.language ,role:selectedRole});
                    console.log(result)
                    if (result.data.response.type) {
                        setsettings({
                            type: 'success',
                            message: result.data.response.msg,
                            isShowing: true
                        })
                        navigate("/login")
                    } else {
                        setsettings({
                            type: 'error',
                            message: result.data.response.msg,
                            isShowing: true
                        })
                    }
                }

                }
            }
        }
        setLoading(false);
    }
    const [nextpage, setNextpage] = useState(false)
    const [country, setCountry] = useState("");
    const [state, setState] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    return (
        <>
            {
                loading && <div style={{ width: "100vw", position: "fixed", top: "0", zIndex: "20", backgroundColor: `rgba(${0}, ${0}, ${0}, ${0.7}`, display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span
                        >
                    </div>
                </div>
            }
            <div className='flex' style={{ height: "100vh" }}>
                <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", position: "fixed", top: "20px", zIndex: "10" }}>
                    {
                        settings.isShowing ? <CustomAlert settings={settings} /> : <Alert severity="success" style={{ visibility: "hidden" }}>Block space alert</Alert>
                    }

                </div>
                <MDBContainer fluid style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                    <MDBCard className='text-black' style={{ width: "100%", borderRadius: '25px', height: "90%" }}>
                        <MDBCardBody style={{ display: "flex", flexDirection: "row" }}>
                            <MDBRow style={{ alignSelf: "center" }}>
                                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                    <div className='m-5'>
                                        <h1 className=" text-center" style={{ fontWeight: "bolder", fontSize: "5vh" }}>{t("title")}</h1>
                                    </div>
                                    {
                                        !nextpage && <>
                                            <div className="d-flex flex-row align-items-center mb-4 ">
                                                <MDBIcon fas icon="user me-3" size='lg' />
                                                <MDBInput value={Name} onChange={e => setName(e.target.value)} label={t("input_name")} id='form1' type='text' className='w-100' />
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <MDBIcon fas icon="envelope me-3" size='lg' />
                                                <MDBInput value={email} onChange={e => setEmail(e.target.value)} label={t("input_email")} id='form2' type='email' />
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <MDBIcon fas icon="lock me-3" size='lg' />
                                                <MDBInput value={password} onChange={e => setPassword(e.target.value)} label={t("input_password")} id='form3' type='password' />
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <MDBIcon fas icon="key me-3" size='lg' />
                                                <MDBInput value={confirmpassword} onChange={e => setConfirmpassword(e.target.value)} label={t("input_repeat_password")} id='form4' type='password' />
                                            </div>
                                            <MDBBtn onClick={e => { setNextpage(true) }} className='mb-4' size='lg'>{t("next_btn")}</MDBBtn>
                                        </>}
                                    {
                                        nextpage && <>
                                            <div className="d-flex flex-row align-items-center mb-4 ">
                                                <MDBInput value={country} onChange={e => setCountry(e.target.value)} label={t("input_country")} id='form5' type='text' className='w-100' />
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <MDBInput value={state} onChange={e => setState(e.target.value)} label={t("input_state")} id='form6' type='text' />
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <MDBInput value={contact} onChange={e => setContact(e.target.value)} label={t("input_contact")} id='form7' type='number' />
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <MDBInput value={address} onChange={e => setAddress(e.target.value)} label={t("input_address")} id='form8' type='text' />
                                            </div>

                                            <div style={{
                                                width:"100%",
                                                display:"flex",
                                                alignItems:"center",
                                                justifyContent:"center"
                                            }} className="mb-4">
                                                <label style={{
                                                    paddingRight:"1em"
                                                }}>Role : </label>
                                                <select id='select-role' style={{padding:"0.5em 1em"}}>
                                                    <option value={"none"}>None</option>
                                                    <option value={"farmer"}>Farmer</option>
                                                    <option value={"customer"}>Customer</option>
                                                </select>
                                            </div>

                                            <div className='mb-4'>
                                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label={t("agreement_text")} />
                                            </div>
                                            <MDBCol>
                                                <MDBBtn style={{ marginRight: "1em" }} onClick={e => { setNextpage(false) }} className='mb-4' size='lg'>{t("prev_btn")}</MDBBtn>
                                                <MDBBtn onClick={onRegisterHandler} className='mb-4' size='lg'>{t("btn_text")}</MDBBtn>
                                            </MDBCol>
                                        </>}
                                </MDBCol>

                                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                    <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                                </MDBCol>

                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                </MDBContainer>
            </div>
        </>
    );
}

export default Signup;