import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { UserContext } from '../contexts/userContext'
import axios from 'axios';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import './Profile.css'
import drop_down_arrow from '../images/dropdown-arrow.png'
import nav_bar_img from '../images/navigation-bar.png'
import close_btn from '../images/close.png'
import box_img from '../images/box.png'
import customer_img from '../images/customer.png'
import weather_img from '../images/cloudy-day.png'
import disease_img from '../images/virus.png'
import language_img from '../images/language.png'
import { useTranslation } from 'react-i18next';
import ProductInventory from './ProductInventory';
import { NetworkContext } from '../contexts/networkContext';

function Profile() {
    const [showWideScreenNav, setShowWideScreenNav] = useState(true)
    const { previousPage, setPreviousPage } = useContext(UserContext);
    const imgRef = useRef(null);
    const handleSwipe = (startX, endX) => {
        const diff = startX - endX;
        if (Math.abs(diff) > 100) {
            if (diff > 0) {
                document.body.getElementsByClassName("mobile-nav-opener-container")[0].style.filter = "blur(0px)";
                document.body.getElementsByClassName("mobile-nav-opener-container")[0].style.zIndex = "20"
                document.getElementById("content").style.filter = "blur(0px)"
                mob_nav_ref.current.style.visibility = "hidden"
            } else {
                document.body.getElementsByClassName("mobile-nav-opener-container")[0].style.filter = "blur(5px)";
                document.getElementById("content").style.filter = "blur(5px)"
                mob_nav_ref.current.style.visibility = "visible"
            }
        }
    }
    useEffect(() => {
        setShowSelectionBox(false)
        const result = window.getComputedStyle(document.getElementById("my-profile-nav")).visibility === "hidden"
        result && setShowWideScreenNav(false);
        document.body.style.backgroundColor = "white"
        if (result) {
            let startX;
            document.body.addEventListener("touchstart", (e) => {
                startX = e.touches[0].clientX
            })

            document.body.addEventListener("touchend", (e) => {
                let endX = e.changedTouches[0].clientX;
                handleSwipe(startX, endX)
            })
        }
        return () => {
            document.body.style.backgroundColor = "black"
        }
    }, [])

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [blurNavBar, setBlurNavBar] = useState(false)
    const { url } = useContext(NetworkContext);
    const [image, setImage] = useState("");
    useLayoutEffect(() => {
        if (!user.id) {
            axios.get(`${url}api/get/user`, {
                withCredentials: true,
            }).then(result => {
                console.log(result.data.response.user)
                if (result.data.response.user) {
                    console.log(result.data.response.user)
                    setUser({
                        id: result.data.response.user.emails[0].value,
                    })
                } else {
                    navigate("/login")
                }
            }).catch(err => {
                console.log(err.message)
            })
        }
        axios.get(`${url}api/get/user`, {
            withCredentials: true,
        }).then(result => {
            if (result.data.response.user) {
                setImage(result.data.response.user.image)
            }
        }).catch(err => {
            console.log(err.message)
        })
    }, [])
    const [whatIsHovered, setWhatIsHovered] = useState("")
    const hoverHandler = (nameofcomponent) => {
        setWhatIsHovered(nameofcomponent);
        const element = document.getElementById(`${nameofcomponent}-img`)
        element.style.transform = "rotate(180deg)"
    }
    const mouseRemoveHandler = (nameofcomponent) => {
        setWhatIsHovered("")
        document.getElementById(`${nameofcomponent}-img`).style.transform = "rotate(0deg)"
    }

    const [showSelectionBox, setShowSelectionBox] = useState(false)
    const mob_nav_ref = useRef(null);
    const [expandProducts, setExpandProducts] = useState(false);
    const [expandCustomers, setExpandCustomers] = useState(false);
    const [expandWeather, setExpandWeather] = useState(false);
    const [expandlanguage, setExpandlanguage] = useState(false)
    const { i18n } = useTranslation();
    const { t } = useTranslation(['profile'])
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
    const closeMobileNav = () => {
        document.body.getElementsByClassName("mobile-nav-opener-container")[0].style.filter = "blur(0px)";
        document.getElementById("content").style.filter = "blur(0px)"
        document.body.getElementsByClassName("mobile-nav-opener-container")[0].style.zIndex = "20"
        mob_nav_ref.current.style.visibility = "hidden"
    }
    return (
        <>
            {!showWideScreenNav &&
                <>
                    <div style={{ position: "fixed", width: "100%", zIndex: "20" }} className='mobile-nav-opener-container'>
                        <img onClick={e => {
                            document.body.getElementsByClassName("mobile-nav-opener-container")[0].style.filter = "blur(5px)";
                            document.getElementById("content").style.filter = "blur(5px)"
                            mob_nav_ref.current.style.visibility = "visible"
                        }} className={"mobile-nav-opener"} style={{
                            height: "2.5em"
                        }}
                            src={nav_bar_img} alt="" />
                    </div>
                    <div style={{ position: "sticky", visibility: "hidden" }} className='mobile-nav-opener-container'>
                        <img onClick={e => {
                            document.body.getElementsByClassName("mobile-nav-opener-container")[0].style.filter = "blur(5px)";
                            document.getElementById("content").style.filter = "blur(5px)"
                            mob_nav_ref.current.style.visibility = "visible"
                        }} className={"mobile-nav-opener"} style={{
                            height: "2.5em"
                        }}
                            src={nav_bar_img} alt="" />
                    </div>
                </>
            }

            <input onChange={e => {
                const file = e.target.files[0];
                if (file) {

                    const fr = new FileReader()
                    fr.onload = (event) => {
                        console.log(event.target.result)
                        if (showWideScreenNav) {
                            document.getElementById("profile-img").src = event.target.result;

                        }
                        if (window.getComputedStyle(document.body.getElementsByClassName("mobile-nav")[0]).visibility !== "hidden") {
                            document.getElementById("mob-nav-input-img").src = event.target.result;
                        }

                    }
                    fr.readAsDataURL(file);
                }

            }} type="file" id="profile-image-input" accept='image/*' />
            <div ref={mob_nav_ref} className='mobile-nav'>
                <div style={{
                    marginBottom: "3em",
                    padding: "2em",
                    paddingRight: "1em",
                    display: "flex",
                    alignContent: "flex-end",
                    justifyContent: "flex-end"
                }}>
                    <img onClick={e => {
                        document.body.getElementsByClassName("mobile-nav-opener-container")[0].style.filter = "blur(0px)";
                        document.body.getElementsByClassName("mobile-nav-opener-container")[0].style.zIndex = "20"
                        document.getElementById("content").style.filter = "blur(0px)"
                        mob_nav_ref.current.style.visibility = "hidden"
                    }} style={{
                        height: "2.5em",
                        filter: "invert()"
                    }} src={close_btn} alt="" />
                </div>
                <div className='mob-nav-item'>
                    <div onClick={e => {
                        expandProducts ? document.getElementById("arrow-products").style.transform = "rotate(0deg)" : document.getElementById("arrow-products").style.transform = "rotate(180deg)"
                        setExpandProducts(prev => !prev)
                    }} id="product_fe" className={"mob-nav-feature"} >
                        <img style={{ filter: "invert(100%)", marginRight: "0.3em" }} className={"mobile-nav-img"} src={box_img} alt="" />
                        <p>{t("feature1")}</p>
                        <img style={{ filter: "invert(100%)", transform: "rotate(0deg)" }} id='arrow-products' className={"drop-down-arrow-img"} src={drop_down_arrow} alt="" />
                    </div>
                    {
                        expandProducts && <div className='mob-nav-subfeature'>
                            <ul>
                                <li onClick={e => {
                                    setPreviousPage("/profile/productinventory")
                                    navigate("productinventory")
                                    closeMobileNav()
                                }}>
                                    {t("feature1_route1")}
                                </li>
                                <li onClick={e => {
                                    setPreviousPage("/profile/productinventory")
                                    navigate("productsselled")
                                    closeMobileNav()
                                }}>{t("feature1_route2")}</li>
                                {/* <li>{t("feature1_route3")}</li> */}
                            </ul>
                        </div>
                    }

                </div>
                <div className='mob-nav-item'>
                    <div onClick={e => {
                        expandCustomers ? document.getElementById("arrow-customers").style.transform = "rotate(0deg)" : document.getElementById("arrow-customers").style.transform = "rotate(180deg)"
                        setExpandCustomers(prev => !prev)

                    }} id="customer_fe" className='mob-nav-feature'>
                        <img style={{ filter: "invert(100%)", marginRight: "0.3em" }} className={"mobile-nav-img"} src={customer_img} alt="" />
                        <p>{t("feature2")}</p>
                        <img style={{ filter: "invert(100%)", transform: "rotate(0deg)" }} id='arrow-customers' className={"drop-down-arrow-img"} src={drop_down_arrow} alt="" />
                    </div>
                    {
                        expandCustomers && <div className='mob-nav-subfeature'>
                            <ul>
                                <li onClick={e => {
                                    setPreviousPage("/profile/cutomerorders")
                                    navigate("cutomerorders")
                                    closeMobileNav()
                                }}>
                                    {t("feature2_route1")}
                                </li>
                                <li>{t("feature2_route2")}</li>
                            </ul>
                        </div>
                    }
                </div>
                <div id="weather_fe" className='mob-nav-item'>
                    <div onClick={e => {
                        expandWeather ? document.getElementById("arrow-weather").style.transform = "rotate(0deg)" : document.getElementById("arrow-weather").style.transform = "rotate(180deg)"
                        setExpandWeather(prev => !prev)
                    }} className='mob-nav-feature'>
                        <img style={{ filter: "invert(100%)", marginRight: "0.3em" }} className={"mobile-nav-img"} src={weather_img} alt="No image" />
                        <p>{t("feature3")}</p>
                        <img style={{ filter: "invert(100%)", transform: "rotate(0deg)" }} id='arrow-weather' className={"drop-down-arrow-img"} src={drop_down_arrow} alt="" />
                    </div>
                    {
                        expandWeather && <div className='mob-nav-subfeature'>
                            <ul>
                                <li onClick={e => {
                                    setPreviousPage("/profile/weather")
                                    navigate("weather")
                                    closeMobileNav()
                                }}>
                                    {t("feature3_route1")}
                                </li>
                            </ul>
                        </div>
                    }

                </div>
                <div className='mob-nav-item'>
                    <div onClick={e => {
                        expandlanguage ? document.getElementById("arrow-languages").style.transform = "rotate(0deg)" : document.getElementById("arrow-languages").style.transform = "rotate(180deg)"
                        setExpandlanguage(prev => !prev)
                    }} id="product_fe" className={"mob-nav-feature"} >
                        <img style={{ filter: "invert(100%)", marginRight: "0.3em" }} className={"mobile-nav-img"} src={language_img} alt="" />
                        <p>{t("feature4")}</p>
                        <img style={{ filter: "invert(100%)", transform: "rotate(0deg)" }} id='arrow-languages' className={"drop-down-arrow-img"} src={drop_down_arrow} alt="" />
                    </div>
                    {
                        expandlanguage && <div className='mob-nav-subfeature'>
                            <ul>
                                <li onClick={e => {
                                    i18n.changeLanguage("en");
                                    setCurrentLanguage("en");
                                    setExpandlanguage(false);
                                    document.getElementById("arrow-languages").style.transform = "rotate(0deg)"
                                }} style={currentLanguage === "en" ? { color: "black", backgroundColor: "blueviolet" } : {}}>
                                    {t("lang_1")}
                                </li>
                                <li onClick={e => {
                                    i18n.changeLanguage("mr");
                                    setCurrentLanguage("mr");
                                    setExpandlanguage(false);
                                    document.getElementById("arrow-languages").style.transform = "rotate(0deg)"
                                }} style={currentLanguage === "mr" ? { color: "black", backgroundColor: "blueviolet" } : {}}>{t("lang_2")}</li>
                                <li onClick={e => {
                                    i18n.changeLanguage("hi");
                                    setCurrentLanguage("hi");
                                    setExpandlanguage(false);
                                    document.getElementById("arrow-languages").style.transform = "rotate(0deg)"
                                }} style={currentLanguage === "hi" ? { color: "black", backgroundColor: "blueviolet" } : {}}>{t("lang_3")}</li>
                            </ul>
                        </div>
                    }

                </div>
                <div className='mob-nav-item'>
                    <div className='mob-nav-feature'>
                        <img style={{ marginRight: "0.3em" }} className={"mobile-nav-img"} src={disease_img} alt="" />
                        <p>{t("mob_feature5")}</p>
                    </div>
                </div>
                <div style={{
                    flexDirection: "column",
                    gap: "1em",
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    marginTop: "1em",
                    marginBottom: "1em",
                }}>
                    <div style={{ fontSize: "1.5em", fontWeight: "500" }}>
                        <p>{t("account")}</p>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1em"
                    }
                    }>
                        <img id='mob-nav-input-img' onClick={e => {
                            try {
                                setShowSelectionBox(true);
                                document.getElementsByClassName("mobile-nav")[0].style.filter = "blur(2px)"
                            }
                            catch (err) {
                                console.log(err.message)
                            }
                        }} style={
                            {
                                height: "5em",
                                width: "5em",
                                borderRadius: "50%",
                                borderStyle: "solid",
                                borderWidth: "2px",
                                borderColor: "blueviolet",
                                objectFit: "cover",
                            }
                        } src={image} alt="" />
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5em"
                        }}>
                            <p>Ishwar Dalvi</p>
                            <p>dalviishwar1817@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mynavbar-selection-box' style={{ visibility: showSelectionBox ? `visible` : "hidden" }}>
                <button onClick={e => {
                    setShowSelectionBox(false);
                    document.getElementById("content").style.filter = "blur(0px)"
                    if (showWideScreenNav) {
                        document.getElementById("my-profile-nav").style.filter = "blur(0px)"
                    }
                    if (window.getComputedStyle(document.getElementsByClassName("mobile-nav")[0]).visibility !== "hidden") {
                        document.getElementsByClassName("mobile-nav")[0].style.filter = "blur(0px)"
                        mob_nav_ref.current.style.visibility = "hidden"
                    }
                    navigate("/myinfo")
                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Profile
                </button>
                <img onClick={e => {
                    setShowSelectionBox(false)
                    if (showWideScreenNav) {
                        document.getElementById("my-profile-nav").style.filter = "blur(0px)"
                        document.getElementById("content").style.filter = "blur(0px)"
                    }
                    if (window.getComputedStyle(document.getElementsByClassName("mobile-nav")[0]).visibility !== "hidden") {
                        document.getElementsByClassName("mobile-nav")[0].style.filter = "blur(0px)"
                    }
                }} style={{
                    alignSelf: "center",
                    width: "2.5em",
                    height: "2.5em",
                    filter: "invert()"
                }} src={close_btn} alt="" />
            </div>
            {showWideScreenNav &&
                <div className='my-profile-nav' id='my-profile-nav'>
                    <ul className='my-profile-nav-item' onMouseOver={e => hoverHandler("products")} onMouseLeave={e => mouseRemoveHandler("products")}>
                        <li style={{ margin: "1em", fontWeight: "bolder", display: "flex", gap: "0.5em", alignItems: "center", justifyContent: "space-evenly" }}>{t("feature1")} <img style={{ filter: "invert(100%)" }} id="products-img" className={"drop-down-arrow-img-f"} src={drop_down_arrow} alt="" /></li>
                        {
                            whatIsHovered === "products" && <ul className='sub-ul'>
                                <li onClick={e => {
                                    navigate("productinventory")
                                }} className='sub-ul-item'>{t("feature1_route1")}</li>
                                <li onClick={e => {
                                    navigate("productsselled")
                                }} className='sub-ul-item'>{t("feature1_route2")}</li>
                                {/* <li className='sub-ul-item'>{t("feature1_route3")}</li> */}
                            </ul>
                        }
                    </ul>
                    <ul className='my-profile-nav-item' onMouseOver={e => hoverHandler("customers")} onMouseLeave={e => mouseRemoveHandler("customers")}>
                        <li style={{ margin: "1em", fontWeight: "bolder", display: "flex", gap: "0.5em", alignItems: "center", justifyContent: "space-evenly" }}>{t("feature2")}<img style={{ filter: "invert(100%)" }} id='customers-img' className={"drop-down-arrow-img-f"} src={drop_down_arrow} alt="" /></li>
                        {
                            whatIsHovered === "customers" && <ul className='sub-ul'>
                                <li onClick={e => {
                                    navigate("cutomerorders")
                                }} className='sub-ul-item'>{t("feature2_route1")}</li>
                                <li className='sub-ul-item'>{t("feature2_route2")}</li>
                            </ul>
                        }
                    </ul>
                    <ul className='my-profile-nav-item' onMouseOver={e => hoverHandler("weather")} onMouseLeave={e => mouseRemoveHandler("weather")}>
                        <li style={{ margin: "1em", fontWeight: "bolder", display: "flex", gap: "0.5em", alignItems: "center", justifyContent: "space-evenly" }}>{t("feature3")}<img style={{ filter: "invert(100%)" }} id="weather-img" className={"drop-down-arrow-img-f"} src={drop_down_arrow} alt="" /></li>
                        {
                            whatIsHovered === "weather" && <ul className='sub-ul'>
                                <li onClick={e => {
                                    navigate("weather")
                                }} className='sub-ul-item'>{t("feature3_route1")}</li>
                            </ul>
                        }
                    </ul>
                    <ul className='my-profile-nav-item'>
                        <li style={{ fontWeight: "bolder" }}>{t("feature5")}</li>
                    </ul>
                    <ul className='my-profile-nav-item' onMouseOver={e => hoverHandler("languages")} onMouseLeave={e => mouseRemoveHandler("languages")}>
                        <li style={{ margin: "1em", fontWeight: "bolder", display: "flex", gap: "0.5em", alignItems: "center", justifyContent: "space-evenly" }}>{t("feature4")}<img style={{ filter: "invert(100%)" }} id="languages-img" className={"drop-down-arrow-img-f"} src={drop_down_arrow} alt="" /></li>
                        {
                            whatIsHovered === "languages" && <ul className='sub-ul'>
                                <li onClick={e => {
                                    i18n.changeLanguage("en")
                                }} style={i18n.language === "en" ? { color: "greenyellow" } : {}} className='sub-ul-item'>{t("lang_1")}</li>
                                <li onClick={e => {
                                    i18n.changeLanguage("mr")
                                }} style={i18n.language === "mr" ? { color: "greenyellow" } : {}} className='sub-ul-item'>{t("lang_2")}</li>
                                <li onClick={e => {
                                    i18n.changeLanguage("hi")
                                }} style={i18n.language === "hi" ? { color: "greenyellow" } : {}} className='sub-ul-item'>{t("lang_3")}</li>
                            </ul>
                        }
                    </ul>
                    <ul style={
                        {
                            position: "fixed",
                            bottom: "0",
                            right: "0"
                        }
                    } className='my-profile-nav-item'>
                        <div onClick={e => {
                            try {
                                navigate("/myinfo")
                            }
                            catch (err) {
                                console.log(err.message)
                            }
                        }} style={{
                            display: "flex",
                            gap: "0.4em",
                            backgroundColor: "#000000d6",
                            color: "white",
                            paddingTop: "1em",
                            paddingBottom: "1em",
                            paddingRight: "2em",
                            paddingLeft: "2em",
                            borderRadius: "1em",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <img id='profile-img' className='profile-img' src={image} alt="" style={
                                {
                                    border: "2px solid white",
                                    borderRadius: "50%",
                                    height: "3em",
                                    width: "3em",
                                    objectFit: "cover"
                                }
                            } />
                            <p>{t("profile")}</p>
                        </div>
                    </ul>
                </div>
            }
            <div id='content' className='content'>
                {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe hic quia ex necessitatibus aspernatur, illum, consequuntur nihil voluptates, voluptatum veritatis odio error alias possimus? Nulla culpa iure, cumque qui reiciendis expedita quisquam consectetur, explicabo labore, quam mollitia ea odio velit similique quas non minima consequatur quaerat. Nobis eos iure quod adipisci earum, temporibus molestiae eveniet facilis! Temporibus soluta quidem atque adipisci esse magni doloribus aperiam sunt, in facilis excepturi beatae libero doloremque voluptate ad odio, at suscipit! Eaque culpa sapiente dolorum? Quia, corporis. Iste dolorum atque aperiam tempora quos magni, a animi beatae commodi, consectetur quisquam? Esse inventore sit amet in unde exercitationem fugit quas nihil debitis quaerat qui quasi ipsum recusandae dolorem, minima quae, aliquid, aperiam et odio officiis doloribus? Rem vel voluptatum officia sapiente numquam, cupiditate quo nam iusto dignissimos natus omnis sequi totam id unde! Sed nostrum veniam commodi voluptatum modi sunt corrupti voluptatibus illo eligendi, fugit quis, nihil, pariatur delectus eveniet nemo consequatur odio. In facere quidem obcaecati est quas omnis ad minus, quisquam magni vero voluptas dolore mollitia cum! Distinctio accusantium dolores, ut consequuntur, aperiam optio officia perferendis consectetur tempore, ratione reprehenderit mollitia voluptas obcaecati vitae quibusdam nisi repellendus hic ducimus deleniti architecto eos! Eveniet, deleniti quos nihil cupiditate sit quas minima quae. Quia, sit corporis ex molestias nisi quam est sequi aut quisquam ducimus repellat saepe ab dolores, odio eaque fuga dolorum. Voluptates alias repudiandae maxime ipsum voluptatum quis? Ex debitis inventore molestias ut dignissimos iste sint modi sed, architecto ab enim laboriosam assumenda eius cum delectus consequuntur vitae dolores iusto officiis expedita facilis, facere, porro et eveniet. Beatae, velit quaerat quas, magni cupiditate illo voluptatem explicabo, qui sunt aliquam inventore eos fuga itaque ut! Culpa doloribus quod obcaecati debitis exercitationem et tempora harum eum velit fugit, dolorem, odio fugiat sed repellendus! Est, iusto! Repellat exercitationem dignissimos eligendi distinctio est enim dolore quasi velit laborum labore, saepe itaque, veniam error nihil alias? Iusto ducimus explicabo dignissimos ex aut provident nesciunt consequatur. Vel consequatur id beatae sit distinctio assumenda doloremque ipsum obcaecati voluptas velit nostrum odit ad nihil excepturi, accusamus eaque explicabo repellendus dolore itaque veritatis maxime quo alias? Incidunt, temporibus omnis, repellendus fugiat beatae dolor explicabo animi, perspiciatis dignissimos odit accusantium harum dicta eum repellat nam. Autem alias laboriosam, nam similique voluptas consequatur nesciunt dolorem, incidunt ipsam error fuga atque deleniti placeat accusantium asperiores. Explicabo illo laudantium autem voluptates recusandae alias cum assumenda quasi illum consequatur! Ipsum voluptates sint doloribus culpa ab accusantium libero sequi recusandae dolore quae? Laudantium vel, excepturi modi laborum nulla, esse accusamus, debitis iusto voluptatum laboriosam sit? Repellat, enim unde rerum provident dignissimos debitis mollitia porro obcaecati amet vel nisi voluptatibus commodi sit ad quisquam quos consequuntur reprehenderit. Asperiores dolores ipsum impedit aliquam tenetur ea voluptatibus, eum iure. Eaque consequatur dignissimos pariatur, dolorum perspiciatis natus rerum nulla fuga recusandae aut sit ab est quaerat veritatis, corporis quod quis iure laboriosam architecto quas enim praesentium soluta reiciendis. Odio expedita quidem iure dolorum tempore culpa, facilis sed doloremque inventore quas, fugiat voluptates omnis incidunt beatae dolorem aliquam enim iste nostrum! Inventore impedit quas beatae libero dolores! Harum minima esse laborum beatae eos odio eligendi dolores ipsa corrupti quis, porro doloribus itaque? Distinctio voluptatum recusandae odio? Laboriosam, nulla. Dolores repellat, reprehenderit maxime dicta vel porro vitae incidunt illum maiores unde, delectus dolorum repudiandae laborum! Nulla, error? Rerum, impedit, nam corrupti maxime facilis ducimus deserunt expedita labore, atque veritatis vitae quae quisquam sapiente id est velit a nisi. Saepe animi eos ipsa ab blanditiis ullam nisi quod tempora itaque fugiat! Placeat inventore quibusdam officia fuga rerum blanditiis asperiores. Labore deleniti non sequi, incidunt consequuntur repellendus sed in amet eligendi eos iure cumque, earum accusantium harum laboriosam minus! Adipisci corrupti soluta ducimus impedit incidunt quibusdam magni repudiandae eveniet quos, omnis autem fugit quidem ipsa quam, nihil vitae hic amet alias laboriosam maxime totam architecto dignissimos dolor similique. Culpa id dolores molestias impedit dolorem qui nam aut itaque tenetur alias enim non tempore excepturi eius nostrum rerum dolore, optio similique, officiis ea at quo velit error. Quod a ipsam saepe tenetur neque tempore blanditiis deleniti. Voluptate quis eveniet, commodi quisquam voluptatem cum quasi necessitatibus nisi at cumque labore laborum magni deserunt numquam excepturi impedit voluptas, pariatur officia dignissimos, repellendus sapiente. Debitis explicabo, quo id reiciendis qui, ratione nihil dolorem dolor laudantium corrupti aperiam ipsum a neque dolorum veritatis, ex reprehenderit. Eveniet tempora, voluptatibus quos aperiam sunt odit possimus distinctio quo assumenda voluptatem? Sint, illo earum facilis molestias numquam hic quo eligendi similique dicta harum facere, consequatur expedita nobis ut corrupti ipsum at provident alias architecto a! Fugiat animi quam ab, magni laboriosam eius culpa dolorum quasi id earum voluptatem nam hic delectus consectetur eos eveniet amet. Doloremque quis ea et a accusantium hic ipsam inventore unde itaque cupiditate vero deleniti sed similique recusandae nemo aut, saepe sapiente ad perferendis, quidem maxime odio. Incidunt repellat ratione, quam ipsum itaque quibusdam ducimus id perspiciatis voluptates officiis tenetur quos quod, blanditiis ab totam alias aliquid laboriosam vitae recusandae. Quia nostrum ratione optio odit consequatur earum unde quod culpa quis numquam commodi excepturi amet similique magni sed ipsum dignissimos, dolorum quo repudiandae, nihil quidem! Sapiente autem aperiam nesciunt placeat repudiandae id incidunt, aspernatur neque, quae consequatur facilis dolorum dolores ipsum? Eaque voluptatum non ut facere temporibus possimus cumque ducimus! Quia, officiis sequi. Officiis nisi magnam sequi enim sit perferendis in id? Quo provident reprehenderit fugit asperiores repellat facilis veritatis! Molestias harum veniam dolore minus, explicabo commodi atque deleniti perspiciatis dolor error magni laboriosam est ipsa, culpa repellat. Eum esse exercitationem nobis sequi voluptates. Possimus illum aspernatur beatae doloribus ex fuga minus, vero harum nostrum inventore, error consequuntur reiciendis quas, nam dolorum ipsum eius aliquid. Rem animi eligendi dolore qui mollitia, pariatur quibusdam. Perspiciatis maxime minus qui. Illo voluptas rem dolorum ad quas corrupti, exercitationem repudiandae assumenda quia temporibus commodi maxime laborum explicabo porro sequi adipisci neque qui fuga magni animi voluptate corporis ullam veniam. Temporibus quia rem veniam sint eos magnam quam? Recusandae asperiores minima quam ipsam pariatur at quo. */}
                <Outlet />
            </div>

        </>

    )
}

{/* <div className='text-white'>{`Welcome ${user.id}`}</div> */ }
export default Profile