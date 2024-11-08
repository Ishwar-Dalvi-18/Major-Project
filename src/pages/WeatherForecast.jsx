import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import './WeatherForecast.css'
import reload_image from '../images/reload.jpg'

function WeatherForecast() {
    const rotateComponents = () => {
        Array.from(document.body.getElementsByClassName("weatherinfo-container-component")).forEach(ele => {
            console.log(ele.style)
            ele.style.transform = "rotateX(0deg)"
        })
        document.body.getElementsByClassName("location-container")[0].style.transform = "rotateX(0deg)"
    }
    const [isloading, setIsloading] = useState(false);
    const [location, setLocation] = useState("");
    const [loadingmessage, setLoadingmessage] = useState("");
    const [reload, setReload] = useState(false)
    const [alertmessage, setAlertmessage] = useState({
        message: "",
        toShow: false,
        type: "",
        timeout: 0,
        iscancelable:true
    });
    const [weatherInfo, setWeatherInfo] = useState({
        condition: {
            text: "",
            icon: "",

        },
        temp_c: "",
        humidity: "",
        cloud: "",
        wind_dir: "",
    })
    const reload_img_ref = useRef();
    useEffect(() => {
        if (navigator.geolocation) {
            setIsloading(true)
            setLoadingmessage("Retriving Location")
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                // const result = await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.c6c92cf13671ac3f33475e0153f202ed&lat=${latitude}&lon=${longitude}&format=json&`)
                const result = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=45szRLNnFo3ylQro9fH3Q1ESxebRkPO0hOQvtm41uB4`)
                setLoadingmessage("Retriving Weather Information")
                setLocation(result.data.items[0].address.label);
                const weatherresult = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${'f634d4dcf2b34731988144505242910'}&q=${result.data.items[0].address.city}`);
                setWeatherInfo(weatherresult.data.current);
                console.log(weatherresult.data.current);
                setLoadingmessage("");
                setIsloading(false);
                setAlertmessage({
                    message: `Location And Weather Retrived Successfully`,
                    toShow: true,
                    type: "s",
                    timeout:2000,
                    iscancelable:true
                })
            }, (positionError) => {
                setIsloading(false)
                setAlertmessage({
                    message: `Unable to access location of device`,
                    toShow: true,
                    type: "e",
                    timeout:100,
                    iscancelable:false
                })
            }, {
                enableHighAccuracy: true
            })
        } else {
            setAlertmessage({
                message: "Your browser doesnt support the feature for location",
                toShow: true,
                type: "e",
                iscancelable:false,
                timeout:100
            })
        }
    }, [reload])
    useEffect(() => {
        if (alertmessage.toShow) {
            if (alertmessage.iscancelable) {
                setTimeout(() => {
                    setAlertmessage({
                        message: "",
                        toShow: false
                    })
                    rotateComponents()
                }, alertmessage.timeout)
            }
        }
    }, [alertmessage])
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "black", height: "100%", width: "100%" }}>
            {alertmessage.toShow && <div style={{ zIndex: "10", backgroundColor: "rgba(0, 0, 0, 0.887)", display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", position: "fixed", top: "0", left: "0" }}>
                <div style={{ display: "flex", width: "100%", height: "100vh", justifyContent: "center", alignItems: "center" }}>
                    <div style={{
                        userSelect: "none",
                        width: "100%",
                        maxWidth: "400px",
                        padding: "2em 3em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "lightcyan",
                        borderRadius: "2em",
                        fontWeight: "bold",
                        color: alertmessage.type === "s" ? "rgb(0, 106, 0)" : "red"
                    }}>
                        <p style={{ textAlign: "center" }}> {

                            alertmessage.message
                        }</p>
                    </div>
                </div>
            </div>}
            {isloading && <div style={{ zIndex: "10", backgroundColor: "rgba(0, 0, 0, 0.887)", display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", position: "fixed", top: "0", left: "0" }}>
                <div style={{ height: "90vh", alignItems: "center" }} class="flex gap-4 p-4 flex-wrap justify-center">
                    <img style={{ filter: "invert(100%)" }} className="w-10 h-10 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" />
                </div>
                <div style={{ color: "white" }}>
                    {loadingmessage}
                </div>
            </div>}
            {
                !isloading && <> <div className='location-container' style={{ padding: "1em 1em" }}>
                    <div className='location-container-label' style={{ fontSize: "2em", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center" }}><div>Current</div> <div>Location</div></div>
                    <div style={{ color: "blueviolet", fontWeight: "bold" }}><p style={{ textAlign: "center" }}>{location}</p></div>
                    <div>
                        <img onClick={e => {
                            reload_img_ref.current.style.transform = "rotatez(360deg)"
                            setTimeout(() => {
                                setReload(prev => !prev)
                            }, 500);
                        }
                        } style={{
                            height: "2em",
                            transition: "all 0.5s ease-in-out"
                        }} ref={reload_img_ref} src={reload_image} alt="" />
                    </div>
                </div>
                    <div className='weatherinfo-container' style={{ display: "flex", flexWrap: "wrap" }}>
                        <div className='weatherinfo-container-component'>
                            <div style={{ fontSize: "1.5em", fontWeight: "bold", borderBottom: "0.1em solid blue", marginBottom: "1em" }}><p style={{ textAlign: "center" }}>Condition</p></div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5em" }}>
                                <div>
                                    <img style={{ filter: "invert(100%)", height: "2em" }} src={weatherInfo.condition.icon} alt="" />
                                </div>
                                <div>
                                    <p style={{ textAlign: "center" }}>
                                        {
                                            weatherInfo.condition.text
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='weatherinfo-container-component'>
                            <div style={{ fontSize: "1.5em", fontWeight: "bold", borderBottom: "0.1em solid blue", marginBottom: "1em" }}><p style={{ textAlign: "center" }}>Temprature</p></div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1em" }}>
                                <div>
                                    <p style={{ textAlign: "center" }}>
                                        {
                                            `${weatherInfo.temp_c} celcius`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='weatherinfo-container-component'>
                            <div style={{ fontSize: "1.5em", fontWeight: "bold", borderBottom: "0.1em solid blue", marginBottom: "1em" }}><p style={{ textAlign: "center" }}>Humidity</p></div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1em" }}>
                                <div>
                                    <p style={{ textAlign: "center" }}>
                                        {
                                            `${weatherInfo.humidity}%`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='weatherinfo-container-component'>
                            <div style={{ fontSize: "1.5em", fontWeight: "bold", borderBottom: "0.1em solid blue", marginBottom: "1em" }}><p style={{ textAlign: "center" }}>Clouds</p></div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1em" }}>
                                <div>
                                    <p style={{ textAlign: "center" }}>
                                        {
                                            `${weatherInfo.cloud}%`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='weatherinfo-container-component'>
                            <div style={{ fontSize: "1.5em", fontWeight: "bold", borderBottom: "0.1em solid blue", marginBottom: "1em" }}><p style={{ textAlign: "center" }}>Wind Direction</p></div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1em" }}>
                                <div>
                                    <p style={{ textAlign: "center" }}>
                                        {
                                            `${weatherInfo.wind_dir}`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='weatherinfo-container-component'>
                            <div style={{ fontSize: "1.5em", fontWeight: "bold", borderBottom: "0.1em solid blue", marginBottom: "1em" }}><p style={{ textAlign: "center" }}>Wind Speed</p></div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1em" }}>
                                <div>
                                    <p style={{ textAlign: "center" }}>
                                        {
                                            `${weatherInfo.wind_kph} KMPH`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            }
        </div>
    )
}

export default WeatherForecast