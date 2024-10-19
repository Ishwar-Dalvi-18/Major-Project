import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NetworkContext } from '../contexts/networkContext';
import { MDBBtn } from 'mdb-react-ui-kit';
import { customerProductContext } from '../contexts/customerProductContext';
import { useNavigate } from 'react-router-dom';

function CartItem({
    id,
    quantity,
    reload,
    setReload,
    index,
}) {
    const { url } = useContext(NetworkContext)
    const [productInfo, setProductInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { setId } = useContext(customerProductContext);
    const [firstLoad, setFirstLoad] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${url}api/product/${id}`, { withCredentials: true }).then(value => {
            if (value.data.response.type) {
                setProductInfo(value.data.response.product)
                setIsLoading(false);
                setFirstLoad(false);
            }
        })
        
    }, [reload])
    return (
        <> {
            isLoading ? <div style={{ height: "90vh", alignItems: "center" }} class="flex gap-4 p-4 flex-wrap justify-center">
                <img className="w-10 h-10 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" />
            </div> :
                <div style={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#212121",
                    padding: "1em 2em",
                    borderRadius: "1em",
                    gap: "1em"
                }}>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "2em"
                    }}>
                        <img style={{
                            height: "4em",
                            width: "4em",
                            borderRadius: "50%",
                            objectFit: "cover"
                        }} src={productInfo.image} alt="" />
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start"
                        }}>
                            <div>Name :  {productInfo.name}</div>
                            <div>Quantity :  {`${quantity} ${productInfo.price.unit}`}</div>
                            <div>Cost :  {`${quantity * productInfo.price.amount} ${productInfo.price.currency}`}</div>
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1em"
                    }}>
                        <MDBBtn onClick={async e => {
                            e.preventDefault()
                            const result = await axios.delete(`${url}api/user/cart/${index}`, { withCredentials: true });
                            if (result.data.response.type) {
                                console.log(result.data.response)
                                setReload(true)
                            }
                        }}>Delete</MDBBtn>
                        <MDBBtn onClick={e => {
                            setId(id);
                            navigate("/user/viewproduct")
                        }}>View</MDBBtn>
                    </div>
                </div>
        }
        </>
    )
}

export default CartItem