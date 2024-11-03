import React from 'react'
import review_img from '../images/product-rating.png'
import './CustomerReview.css'

const CustomerReview = () => {
    return (
        <div style={{
            letterSpacing: "0.1em",
            fontWeight: "bold"
        }} className='user-universal'>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <div className='header-main-container' style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "monospace",
                }}>
                    <div style={{
                    }}>
                        <img style={{
                            height: "3em"
                        }} src={review_img} alt="" />
                    </div>
                    <div style={{
                    }}>
                        <p style={{
                            textAlign: "center",
                            fontSize: "2em",
                            userSelect: "none"
                        }} className='header-text'>
                            Product Review
                        </p>
                    </div>
                    <div style={{
                    }}>
                        <img style={{
                            height: "3em"
                        }} src={review_img} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerReview