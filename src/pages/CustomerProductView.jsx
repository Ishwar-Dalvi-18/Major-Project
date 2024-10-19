import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NetworkContext } from '../contexts/networkContext'
import { useNavigate } from 'react-router-dom'
import { customerProductContext } from '../contexts/customerProductContext';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function CustomerProductView() {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const { url } = useContext(NetworkContext);
  const { id } = useContext(customerProductContext);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfProductToPurchase, setNoOfProductToPurchase] = useState(0);
  const quantity_ref = useRef(null);
  const [alertInfo, setAlertInfo] = useState({
    type: "",
    show: false,
    msg: ""
  })
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${url}api/product/${id}`, { withCredentials: true }).then(value => {
      console.log(value.data.response)
      if (value.data.response.type) {
        console.log(value.data.response)
        setProductInfo(value.data.response.product);
        axios.get(`${url}api/user/get/${value.data.response.product.owner}`, { withCredentials: true }).then(value => {
          console.log(value.data.response)
          if (value.data.response.type) {
            setUserInfo(value.data.response.user)
            setIsLoading(false)
          } else {
            navigate("/user/buy");
            setIsLoading(false)
          }
        })
      } else {
        navigate("/user/buy");
        setIsLoading(false)
      }
    })
  }, [])
  return (
    <div className="user-universal">
      { alertInfo.show&&
        <div style={{
          position:"absolute",
          display:"flex",
          top:"0",
          left:"0",
          width:"100%",
          height:"100%",
          backgroundColor:"rgba(0, 0, 0, 0.8)"
        }}>
          <div style={alertInfo.type==="s"?{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1em 0em",
            borderRadius: "2em",
            backgroundColor: "#13e30f99",
            border:"0.2em solid #13e30f",
            width: "90%",
            minHeight: "10em",
            top: "50%",
            left: "50%",
            zIndex: "10",
            transform: "translateY(-50%) translateX(-50%)",
            color: "white",
            fontSize:"1.2em",
            flexDirection:"column"
          }:{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1em 0em",
            borderRadius: "2em",
            backgroundColor: "#ff000099",
            border:"0.2em solid #ff0000",
            width: "90%",
            minHeight: "10em",
            top: "50%",
            left: "50%",
            zIndex: "10",
            transform: "translateY(-50%) translateX(-50%)",
            color: "white",
            fontSize:"1.2em",
            flexDirection:"column"
          }}>
            <div>{alertInfo.msg}</div>
            <div style={{
              marginTop:"1em"
            }}><button style={{
              backgroundColor:"blue",
              color:"white",
              padding:"0.5em 2em",
              borderRadius:"0.5em"
            }} onClick={e=>{
              setAlertInfo({
                msg:"",
                show:false,
                type:""
              })
            }}>Ok</button></div>
          </div>
        </div>
      }
      {
        isLoading && <div style={{ height: "90vh", alignItems: "center" }} class="flex gap-4 p-4 flex-wrap justify-center">
          <img className="w-10 h-10 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" />
        </div>
      }
      {!isLoading && <div style={{
        overflow: "auto"
      }} className='main-product-info-container'>
        <div style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }} className='image-container'>
          <img style={{
            objectFit: "cover",
            border: "0.3em solid rgb(44,44,44)",
            borderRadius: "2em",
          }} src={productInfo.image} alt="" />
        </div>
        <div style={{
          color: "white",
          backgroundColor: "rgb(55,55,55)",
          alignSelf: "flex-start",
          margin: "2em 1em 0em 0em",
          fontWeight: "600",
          fontSize: "1.5em",
          userSelect: "none",
          borderTop: "0.1em solid rgb(27, 24, 24)",
          borderLeft: "0.1em solid rgb(27, 24, 24)",
          borderRight: "0.1em solid rgb(27, 24, 24)",
          padding: "0.5em 1em 0em 1em",
          // borderTopLeftRadius:"1em",
          borderTopRightRadius: "1em"
        }}>
          Product Information
        </div>
        <div style={{
          backgroundColor: "rgb(0,0,0)",
          border: "0.1em solid rgb(27, 24, 24)",
          borderTopRightRadius: "1em",
          borderBottomRightRadius: "1em",
          borderBottomLeftRadius: "1em",
          width: "100%",
          padding: "0.5em",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottom: "2px solid whitesmoke",
            borderRadius: "1em",
          }}>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              color: "white",
              borderBottomLeftRadius: "0.5em",
            }}>
              Name
            </div>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              borderBottomLeftRadius: "0.5em",
              color: "rgb(27, 161, 0)"
            }}>
              {productInfo.name}
            </div>

          </div>

          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottom: "2px solid whitesmoke",
            borderRadius: "1em",
          }}>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              color: "white",
              borderBottomLeftRadius: "0.5em",
            }}>
              Price
            </div>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              borderBottomLeftRadius: "0.5em",
              color: "rgb(27, 161, 0)"
            }}>
              {`${productInfo.price.amount} ${productInfo.price.currency} ${productInfo.price.unit}`}
            </div>

          </div>

          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottom: "2px solid whitesmoke",
            borderRadius: "1em",
          }}>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              color: "white",
              borderBottomLeftRadius: "0.5em",
            }}>
              Availability
            </div>
            <div style={productInfo.quantity.count > 0 ? {
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              borderBottomLeftRadius: "0.5em",
              color: "rgb(27, 161, 0)"
            } : {
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              borderBottomLeftRadius: "0.5em",
              color: "red"
            }}>
              {productInfo.quantity.count > 0 ? `Product Available` : `Product Unavailable`}
            </div>

          </div>

        </div>




        <div style={{
          color: "white",
          backgroundColor: "rgb(55,55,55)",
          alignSelf: "flex-start",
          margin: "2em 1em 0em 0em",
          fontWeight: "600",
          fontSize: "1.5em",
          userSelect: "none",
          borderTop: "0.1em solid rgb(27, 24, 24)",
          borderLeft: "0.1em solid rgb(27, 24, 24)",
          borderRight: "0.1em solid rgb(27, 24, 24)",
          padding: "0.5em 1em 0em 1em",
          // borderTopLeftRadius:"1em",
          borderTopRightRadius: "1em"
        }}>
          Seller Information
        </div>
        <div style={{
          backgroundColor: "rgb(0,0,0)",
          border: "0.1em solid rgb(27, 24, 24)",
          borderTopRightRadius: "1em",
          borderBottomRightRadius: "1em",
          borderBottomLeftRadius: "1em",
          width: "100%",
          padding: "0.5em",
          display: "flex",
          flexDirection: "column",

        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <img style={{
              marginTop: "1em",
              height: "6em",
              width: "6em",
              objectFit: "cover",
              borderRadius: "1em",
            }} src={userInfo.image} alt="" />
          </div>
          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            //  borderBottom:"2px solid whitesmoke",
            borderBottom: "2px solid whitesmoke",
            borderRadius: "1em"
          }}>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              color: "white",
              borderBottomLeftRadius: "0.5em",
            }}>
              Name
            </div>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              borderBottomLeftRadius: "0.5em",
              color: "rgb(27, 161, 0)"
            }}>
              {userInfo.name}
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottom: "2px solid whitesmoke",
            borderRadius: "1em"
          }}>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              color: "white",
              borderBottomLeftRadius: "0.5em",
            }}>
              Phone
            </div>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              borderBottomLeftRadius: "0.5em",
              color: "rgb(27, 161, 0)"
            }}>
              {userInfo.contact}
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottom: "2px solid whitesmoke",
            borderRadius: "1em"
          }}>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              color: "white",
              borderBottomLeftRadius: "0.5em",
            }}>
              Email
            </div>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              borderBottomLeftRadius: "0.5em",
              color: "rgb(27, 161, 0)"
            }}>
              {userInfo.email}
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottom: "2px solid whitesmoke",
            borderRadius: "1em"
          }}>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              color: "white",
              borderBottomLeftRadius: "0.5em",
            }}>
              Country
            </div>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              borderBottomLeftRadius: "0.5em",
              color: "rgb(27, 161, 0)"
            }}>
              {userInfo.country}
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottom: "2px solid whitesmoke",
            borderRadius: "1em",
          }}>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              color: "white",
              borderBottomLeftRadius: "0.5em",
            }}>
              State
            </div>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              borderBottomLeftRadius: "0.5em",
              color: "rgb(27, 161, 0)"
            }}>
              {userInfo.state}
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottom: "2px solid whitesmoke",
            borderRadius: "1em",
          }}>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              color: "white",
              borderBottomLeftRadius: "0.5em",
            }}>
              Address
            </div>
            <div style={{
              padding: "1em",
              fontWeight: "bold",
              borderTopLeftRadius: "0.5em",
              borderBottomLeftRadius: "0.5em",
              color: "rgb(27, 161, 0)"
            }}>
              {userInfo.address}
            </div>
          </div>

        </div>

        <div onClick={e => {
          e.preventDefault();
          quantity_ref.current.focus()
        }} style={{
          marginTop: "2em",
          backgroundColor: "rgb(55,55,55)",
          borderRadius: "1em",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5em"
        }}>
          <div style={{
            margin: "1em 0em",

          }}>
            <input onBlur={e => {
              quantity_ref.current.style.fontSize = "1em"
            }} onFocus={e => {
              quantity_ref.current.style.fontSize = "1.7em"
              quantity_ref.current.style.outline = "0px solid transparent"
            }} ref={quantity_ref} value={noOfProductToPurchase} onChange={e => {
              if (e.target.value.length > 0) {
                if (e.target.value === "") {
                  setNoOfProductToPurchase(e.target.value)
                } else {
                  if (!isNaN(Number(e.target.value)) && e.target.value.trim() !== "") {
                    if (e.target.value <= productInfo.quantity.count) {
                      setNoOfProductToPurchase(parseInt(e.target.value))
                    } else {
                      quantity_ref.current.blur()
                      setAlertInfo({
                        msg:`Only ${productInfo.quantity.count} ${productInfo.quantity.unit} are available`,
                        show:true,
                        type:"f"
                      })
                    }
                  } else {
                    setNoOfProductToPurchase(prev => prev)
                  }
                }
                quantity_ref.current.style.width = `${e.target.value.length}ch`
              } else {
                setNoOfProductToPurchase(0);
              }
            }} type='text' disabled={productInfo.quantity.count > 0 ? false : true} style={{
              width: "1ch",
              color: "white",
              padding: "0.5em 0em",
              outline: "0px solid transparent",
              backgroundColor: "transparent"
            }} />
          </div>
          <div style={{
            color: "white",
            userSelect: "none"
          }}>
            {productInfo.price.unit} of {productInfo.name}
          </div>

        </div>
        <div style={{
          marginTop: "1em"
        }}>
          {noOfProductToPurchase > 0 && `Estimated Amount : ${productInfo.price.amount * noOfProductToPurchase} ${productInfo.price.currency}`}
        </div>
        <div style={{
          marginTop: "1em"
        }}>{
            noOfProductToPurchase > 0 &&
            <MDBBtn onClick={async e => {
              const result = await axios.post(`${url}api/user/cart`, { cartItem: { id: productInfo._id, quantity: noOfProductToPurchase } }, { withCredentials: true });
              setNoOfProductToPurchase(0);
              setAlertInfo({
                msg:"Product added to cart",
                type:"s",
                show:true
              })
            }}>Add to cart</MDBBtn>
          }
        </div>
      </div>
      }
    </div>
  )
}

export default CustomerProductView