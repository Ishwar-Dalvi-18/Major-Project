import React, { useEffect, useState } from 'react';
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

function Signup() {
    const {currentpage, setCurrentpage} =useOutletContext()
    const navigate = useNavigate();
    const { settings, setsettings } = useAlert(3000);
    const [Name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setCurrentpage("signup")
    },[])
    const onRegisterHandler = async (e) => {
        setLoading(true)
        e.preventDefault();
        console.log("Clicked button")
        if (!Name || !email || !password || !confirmpassword) {
            setsettings({
                type: 'error',
                message: "Must fill all the fields",
                isShowing: true,
            })
        } else {
            if (confirmpassword !== password) {
                setsettings({
                    type: 'error',
                    message: "Password and confirm password are not same",
                    isShowing: true
                })
            } else {
                const result = await axios.post("http://192.168.0.224:8080/api/user", { name: Name, email: email, password: password });
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
        setLoading(false);
    }
    return (
        <>
            {
                loading && <div style={{ width:"100vw",position : "fixed",top:"0",zIndex:"20",backgroundColor: `rgba(${0}, ${0}, ${0}, ${0.7}`, display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
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
                                        <h1 className=" text-center" style={{ fontWeight: "bolder", fontSize: "5vh" }}>Sign up</h1>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4 ">
                                        <MDBIcon fas icon="user me-3" size='lg' />
                                        <MDBInput value={Name} onChange={e => setName(e.target.value)} label='Your Name' id='form1' type='text' className='w-100' />
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="envelope me-3" size='lg' />
                                        <MDBInput value={email} onChange={e => setEmail(e.target.value)} label='Your Email' id='form2' type='email' />
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="lock me-3" size='lg' />
                                        <MDBInput value={password} onChange={e => setPassword(e.target.value)} label='Password' id='form3' type='password' />
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="key me-3" size='lg' />
                                        <MDBInput value={confirmpassword} onChange={e => setConfirmpassword(e.target.value)} label='Repeat your password' id='form4' type='password' />
                                    </div>

                                    <div className='mb-4'>
                                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Agreed to our terms and conditions' />
                                    </div>

                                    <MDBBtn onClick={onRegisterHandler} className='mb-4' size='lg'>Register</MDBBtn>

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