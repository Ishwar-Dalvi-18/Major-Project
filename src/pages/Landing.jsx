import React, { useEffect ,useState} from 'react'
import { useOutletContext } from 'react-router-dom';

function Landing() {
    const {iswelcominguser , setIswelcominguser ,currentpage , setCurrentpage} = useOutletContext();
    useEffect(()=>{
        setCurrentpage("landing")
        const elem = document.getElementById("home-popper");
        setTimeout(()=>{
            setIswelcominguser(false);
        },5000);

        setTimeout(()=>{
            elem.style.opacity="0";
        },3000)
    },[])
    return (
        <>{
        iswelcominguser ? <div key={"starter"} className="flex bg-black" style={{height:"100vh" , alignItems:'center', justifyContent:'center'}} >
            <div id='home-popper' className='text-center home-popper font-sans text-black p-10 rounded-xl' style={{ letterSpacing: "1px" }}>
                <h1 className='text-3xl font-bold mb-2' >
                    Welcome To World Of Crops
                </h1>
                <p className='max-w-lg font-semibold'>
                    Effecient || Productive || Understandable
                </p>
            </div>
        </div>:

        <div>
        <div className='flex home-imagedisplay-1 rounded-lg' style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div className='text-center feature font-sans text-black p-10 rounded-lg' style={{ letterSpacing: "1px" }}>
                <h1 className='text-3xl font-bold mb-2' >
                    Crop Disease Detection
                </h1>
                <p className='max-w-lg font-semibold'>
                    You can detect diseases of your crop at early stage and can reduce the chances of facing big losses. Take Good decisions and earn more .
                </p>
            </div>
        </div>
        <div className='flex home-imagedisplay-2 rounded-lg' style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div className='text-center feature font-sans text-black p-10 rounded-lg' style={{ letterSpacing: "1px" }}>
                <h1 className='text-3xl font-bold mb-2' >
                    Daily Irrigation Reminders
                </h1>
                <p className='max-w-lg font-semibold'>
                    Daily irrigation reminders ensuring that crop receives adequate amount of water . This reduces risk of over or under watering .
                </p>
            </div>
        </div>
        <div className='flex home-imagedisplay-3 rounded-lg' style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div className='text-center feature font-sans text-black p-10 rounded-lg' style={{ letterSpacing: "1px" }}>
                <h1 className='text-3xl font-bold mb-2' >
                    Market Insights
                </h1>
                <p className='max-w-lg font-semibold'>
                    Insights into trends and demands of the market . This will help you decide what crop to grow and when to sell them for maximum profit
                </p>
            </div>
        </div>
        <div className='flex home-imagedisplay-4 rounded-lg' style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div className='text-center feature font-sans text-black p-10 rounded-lg' style={{ letterSpacing: "1px" }}>
                <h1 className='text-3xl font-bold mb-2' >
                    Direct Products Sell To Customer
                </h1>
                <p className='max-w-lg font-semibold'>
                    Sell products to customer directly without a middleman . Gain more profits .
                </p>
            </div>
        </div>
        <div className='flex home-imagedisplay-5 rounded-lg' style={{ height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div className='text-center feature font-sans text-black p-10 rounded-lg' style={{ letterSpacing: "1px" }}>
                <h1 className='text-3xl font-bold mb-2' >
                    Weather Forecast
                </h1>
                <p className='max-w-lg font-semibold'>
                    Get wheather forecast at your sitting place . This will help you manage your crops efficently . Less losses more gains .
                </p>
            </div>
        </div>
    </div>
    }</>
        
    )
}

export default Landing