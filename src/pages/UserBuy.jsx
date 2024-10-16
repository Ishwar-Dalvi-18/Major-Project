import { MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import React, { useContext, useEffect, useRef, useState } from 'react'
import close from '../images/close.png'
import { customerNavigationContext } from '../contexts/customerNavigationContext'
import axios from 'axios';
import { NetworkContext } from '../contexts/networkContext';
import Product from '../components/Product';
import CustomerProduct from '../components/CustomerProduct';

function UserBuy() {
  const { info, setInfo } = useContext(customerNavigationContext);
  const showoption_ref = useRef(null);
  const search_ref = useRef(null);
  const { url } = useContext(NetworkContext);
  const [searchProducts, setSearchProducts] = useState([])
  const [continueSearching, setContinueSearching] = useState(true)
  const [selectedSearch, setSelectedSearch] = useState(null)
  const [producttoshow, setProducttoshow] = useState([])
  useEffect(() => {
    document.body.style.backgroundColor = "white"
    setInfo({ currentpage: "buy" })
    const rect = search_ref.current.getBoundingClientRect();
    console.log(rect.top)
    console.log(rect.bottom)
    showoption_ref.current.style.top = `${rect.bottom - rect.top}px`
    axios.get(`${url}api/user/products`, { withCredentials: true }).then(value => {
      if (value.data.response.type) {
        setProducttoshow(value.data.response.products)
      }
    })
  }, [])
  const close_img_ref = useRef(null);
  const [usersearch, setUsersearch] = useState("");
  const [selectedIndex, SetselectedIndex] = useState(null);
  return (
    <div style={{
      overflow: "auto"
    }} className='user-universal'>
      <div className='main-container-buy' style={{ position: "relative", overflow: "auto", width: "100%", minHeight: "fit-content", display: "flex", flexDirection: "column" }}>
        <div ref={search_ref} className='user-buy-search'>
          <div ref={showoption_ref} style={{
            visibility: searchProducts.length > 0 ? "visible" : "hidden",
            position: "absolute",
            backgroundColor: "rgb(90, 90, 90)",
            zIndex: "20",
            borderRadius: "1em"
          }} className='user-search-options'>
            {
              searchProducts.map((value, index) => {
                return (<div key={value._id} onClick={e => {
                  setContinueSearching(prev => false)
                  setUsersearch(value.name)
                  setSearchProducts([])
                  setContinueSearching(prev => true)
                }} className={selectedSearch === value._id ? 'user-search-options-item search-selected' : 'user-search-options-item'}>
                  {
                    value.name
                  }
                </div>)
              })
            }
          </div>
          <MDBInput onKeyDown={async e => {
            if (e.key === "ArrowDown") {
              if (selectedIndex === null) {
                SetselectedIndex(0);
                setSelectedSearch(searchProducts[0]._id);
              } else {
                let index
                SetselectedIndex(prev => {
                  index = (prev + 1) % searchProducts.length
                  if (index === 0) {
                    showoption_ref.current.scrollTop = 0
                  }
                  else if (index < searchProducts.length - 1) {
                    const rect_main = showoption_ref.current.getBoundingClientRect()
                    const rect_sub = document.getElementsByClassName("search-selected")[0].getBoundingClientRect();
                    showoption_ref.current.scrollTop = `${rect_sub.top - rect_main.top}`

                  }
                  setSelectedSearch(searchProducts[index]._id);
                  return index
                })
              }
            }

            if (e.key === "Enter") {
              if (selectedIndex !== null && selectedSearch !== null) {
                setContinueSearching(prev => false)
                setUsersearch(searchProducts[selectedIndex].name)
                setSearchProducts([])
                setContinueSearching(prev => true)
                const result = await axios.get(`${url}api/products/byname/${searchProducts[selectedIndex].name}`, { withCredentials: true })
                console.log(result.data.response)
                if (result.data.response.type) {
                  setProducttoshow(result.data.response.products);
                }
                SetselectedIndex(null);
                setSelectedSearch(null)
              }


            }
          }} value={usersearch} onChange={async e => {
            if (e.target.value === "") {
              axios.get(`${url}api/user/products`, { withCredentials: true }).then(value => {
                if (value.data.response.type) {
                  setProducttoshow(value.data.response.products)
                }
              })
              setUsersearch(e.target.value);
              setSearchProducts([])
            }
            else {
              if (continueSearching || !usersearch) {
                setSelectedSearch(null);
                SetselectedIndex(null)
                setUsersearch(e.target.value);
                const result = await axios.get(`${url}api/products/${e.target.value}`, { withCredentials: true })
                if (result.data.response.products) {
                  setSearchProducts(result.data.response.products)
                }
              }
            }
          }} style={{ display: "flex", position: "relative", color: "white", paddingRight: "3em" }}>
            <img onClick={e => {
              axios.get(`${url}api/user/products`, { withCredentials: true }).then(value => {
                if (value.data.response.type) {
                  setProducttoshow(value.data.response.products)
                }
              })
              setUsersearch("")
              setSearchProducts([])
              close_img_ref.current.style.filter = "invert(70%)"
              setTimeout(() => {
                close_img_ref.current.style.filter = "invert(100%)"
              }, 100)
            }} ref={close_img_ref} style={{ filter: "invert(100%)", height: "1.5em", position: "absolute", right: "1em", top: "50%", transform: "translateY(-50%)" }} src={close} alt="" />
          </MDBInput>
          <MDBBtn onClick={async e => {
            if (usersearch) {
              setSearchProducts([])
              const result = await axios.get(`${url}api/products/byname/${usersearch}`, { withCredentials: true })
              console.log(result.data.response)
              if (result.data.response.type) {
                setProducttoshow(result.data.response.products);
              }
              SetselectedIndex(null);
              setSelectedSearch(null)
            }
          }}>Search</MDBBtn>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2em",
          marginTop: "1em",
          flexWrap: "wrap"
        }}>
          {
            producttoshow.map(value =>
              <CustomerProduct key={value._id} id={value._id} name={value.name} img={value.image} price={value.price} />
            )
          }
        </div>
      </div>
    </div >
  )
}

export default UserBuy