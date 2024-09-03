import React, { useContext, useEffect, useState, useTransition } from 'react'
import './Login.css'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Alert } from '@material-tailwind/react';
import { useAlert } from '../hooks/useAlert';
import CustomAlert from '../components/CustomAlert';
import emailExistence from 'email-existence';
import axios from 'axios'
import { UserContext } from '../contexts/userContext';
import googlelogo from '../images/google.png'
import { Button } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

function Login() {
    const {i18n} = useTranslation();
    const { currentpage, setCurrentpage } = useOutletContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { settings, setsettings } = useAlert(4000);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        setCurrentpage("login");
    }, [])
    const {t} = useTranslation(["login"]);
    const onLoginHandler = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            let errmessage
            if (i18n.language === "en") {
                errmessage = "Fill all credentials"
            }
            else if (i18n.language === "mr") {
                errmessage = "सर्व तपशील भरा"
            } else if (i18n.language === "hi") {
                errmessage = "सभी विवरण भरें"
            }
            return setsettings({
                type: "error",
                message: errmessage,
                isShowing: true
            })

        }
        const result = await axios.post("http://192.168.0.224:8080/api/user/login", { email: email, password: password ,lang:i18n.language }, {
            withCredentials: true,
        })

        if (result.data.response.type) {
            setsettings({
                type: "success",
                message: result.data.response.msg,
                isShowing: true,
            })
            setUser({
                id: result.data.response.user.email
            })
            navigate("/profile");
        } else {
            setsettings({
                type: "error",
                message: result.data.response.msg,
                isShowing: true
            })
        }
    }
    return (
        <div className='flex' style={{ alignItems: "center", justifyContent: "center", maxWidth: "100%" }}>
            <div className="shape" style={{ position: "fixed", top: "0", left: "-50px" }}></div>
            <div className="shape" style={{ position: "fixed", bottom: "20px", right: "-50px" }}></div>
            <div className="shape" style={{ position: "fixed", bottom: "300px", right: "66vw" }}></div>
            <div className="shape" style={{ position: "fixed", top: "300px", left: "66vw" }}></div>
            <form className='my-form' id='my-form-1'>
                <h3>{t("title")}</h3>

                <label htmlFor="username " className='my-label'>{t("label-1")}</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className=' my-input' placeholder={t("input_email")} id="username" />

                <label htmlFor="password" className='my-label'>{t("label-2")}</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className=' my-input' placeholder={t("input_password")} id="password" />

                <button className='my-button' style={{ fontFamily: "monospace", fontWeight: "bolder" }} onClick={onLoginHandler}>{t("login_btn")}</button>
                <div className='px-2 py-4' onClick={e => {
                    window.open("http://localhost:8080/api/auth/google", "_self")
                }} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button
                        size="lg"
                        variant="outlined"
                        color="blue-gray"
                        className="flex items-center gap-3"
                    >
                        <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
                        {t("google_btn")}
                    </Button>
                </div>
                <label onClick={e => {
                    e.preventDefault();
                    navigate("/signup");
                }} style={{ alignSelf: "center", color: 'lightblue' }}>{t("navigator_text")}&rarr;</label>
            </form>
            {
                settings.isShowing ? <CustomAlert settings={settings} /> : <Alert severity="success" style={{ visibility: "hidden" }}>Block space alert</Alert>
            }

        </div>
    )
}

export default Login

