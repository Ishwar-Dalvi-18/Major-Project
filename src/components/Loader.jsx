import React from 'react'

function Loader() {
    return (
        <div style={{ width: "100vw", position: "fixed", top: "0", zIndex: "20", backgroundColor: `rgba(${0}, ${0}, ${0}, ${0.7}`, display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span
                >
            </div>
        </div>
    )
}

export default Loader