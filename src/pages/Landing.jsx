import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';

function Landing() {
    const { iswelcominguser, setIswelcominguser, currentpage, setCurrentpage } = useOutletContext();
    useEffect(() => {
        setCurrentpage("landing")
        const elem = document.getElementById("home-popper");
        setTimeout(() => {
            setIswelcominguser(false);
        }, 5000);

        setTimeout(() => {
            elem.style.opacity = "0";
        }, 3000)
    }, [])
    const { t } = useTranslation();
    return (
        <>{
            iswelcominguser ? <div key={"starter"} className="flex bg-black" style={{ height: "100vh", alignItems: 'center', justifyContent: 'center' }} >
                <div id='home-popper' className='text-center home-popper font-sans text-black p-10 rounded-xl' style={{ letterSpacing: "1px" }}>
                    <h1 className='text-3xl font-bold mb-2' >
                        Welcome To World Of Crops
                    </h1>
                    <p className='max-w-lg font-semibold'>
                        Effecient || Productive || Understandable
                    </p>
                </div>
            </div> :

                <div>
                    <div className='flex home-imagedisplay-1 rounded-lg' style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div className='text-center feature font-sans text-black p-10 rounded-lg' style={{ letterSpacing: "1px" }}>
                            <h1 className='text-3xl font-bold mb-2' >
                                {t("feature-1").title}
                            </h1>
                            <p className='max-w-lg font-semibold'>
                                {t("feature-1").description}
                            </p>
                        </div>
                    </div>
                    <div className='flex home-imagedisplay-2 rounded-lg' style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div className='text-center feature font-sans text-black p-10 rounded-lg' style={{ letterSpacing: "1px" }}>
                            <h1 className='text-3xl font-bold mb-2' >
                            {t("feature-2").title}
                            </h1>
                            <p className='max-w-lg font-semibold'>
                            {t("feature-2").description}                            </p>
                        </div>
                    </div>
                    <div className='flex home-imagedisplay-3 rounded-lg' style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div className='text-center feature font-sans text-black p-10 rounded-lg' style={{ letterSpacing: "1px" }}>
                            <h1 className='text-3xl font-bold mb-2' >
                            {t("feature-3").title}
                            </h1>
                            <p className='max-w-lg font-semibold'>
                            {t("feature-3").description}                            </p>
                        </div>
                    </div>
                    <div className='flex home-imagedisplay-4 rounded-lg' style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div className='text-center feature font-sans text-black p-10 rounded-lg' style={{ letterSpacing: "1px" }}>
                            <h1 className='text-3xl font-bold mb-2' >
                            {t("feature-4").title}
                            </h1>
                            <p className='max-w-lg font-semibold'>
                            {t("feature-4").description}                            </p>
                        </div>
                    </div>
                    <div className='flex home-imagedisplay-5 rounded-lg' style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div className='text-center feature font-sans text-black p-10 rounded-lg' style={{ letterSpacing: "1px" }}>
                            <h1 className='text-3xl font-bold mb-2' >
                            {t("feature-5").title}
                            </h1>
                            <p className='max-w-lg font-semibold'>
                            {t("feature-5").description}                            </p>
                        </div>
                    </div>
                </div>
        }</>

    )
}

export default Landing