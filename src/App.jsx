import { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import './App.css'
import { Navbardefault } from './components/Navbardefault'
import Landing from './pages/Landing'
import { Outlet } from 'react-router-dom';
import { io } from 'socket.io-client';
import { SocketContext } from './contexts/socketContext';
import Error from './pages/Error';
import { UserContext } from './contexts/userContext';
import './i18n.js'
import Loader from './components/Loader.jsx';
import { NetworkContext } from './contexts/networkContext.js';
import { ProductContext } from './contexts/product.js';
import axios from 'axios';
import { data } from 'autoprefixer';

// starting point of app
function App() {
  const [iswelcominguser, setIswelcominguser] = useState(true);
  const [currentpage, setCurrentpage] = useState("landing");
  const [socket, setSocket] = useState({});
  const [user, setUser] = useState({});
  const [url, setUrl] = useState("http://192.168.0.224:8080/")
  const [ti, setti] = useState(null)
  const [otp, setOtp] = useState({
    otp: null,
    timeremaining: 0
  })
  useLayoutEffect(() => {
    try {
      axios.get(`${url}api/get/user`, {
        withCredentials: true,
      }).then(result => {
        if (result.data.response.user) {
          const socket_temp = io(url);
          console.log(socket_temp)
          setSocket(prev => socket_temp);
          socket_temp.on("connect", () => {
            socket_temp.emit("sending-id", { id: result.data.response.user._id })
            socket_temp.on("id-confirmed", () => { })
            socket_temp.on("otp", ({ OTP }) => {
              let seconds = 30
              setOtp(prev => {
                return {
                  otp: OTP,
                  timeremaining: 120
                }
              })
              const ti = setInterval(() => {
                console.log(seconds - 1)
                seconds = seconds - 1
                if (seconds === 0) {
                  clearInterval(ti);
                  setOtp(prev => {
                    return {
                      otp: null,
                      timeremaining: 0
                    }
                  })
                } else {
                  setOtp(prev => {
                    return {
                      ...prev,
                      timeremaining: seconds - 1
                    }
                  })
                }
              }, 1000)
              socket_temp.on("send-otp", () => {
                socket_temp.emit("take-otp", { otp: OTP })
              })
              setti(prev => {
                if (prev) {
                  clearInterval(prev)
                  return ti
                } else {
                  return ti
                }
              })
            })
          })
        } else {
          const socket_temp = io(url);
          console.log(socket_temp)
          setSocket(prev => socket_temp);
          socket_temp.on("connect", () => {
            socket_temp.on("otp", ({ OTP }) => {
              let seconds = 30
              setOtp(prev => {
                return {
                  otp: OTP,
                  timeremaining: 120
                }
              })
              const ti = setInterval(() => {
                console.log(seconds - 1)
                seconds = seconds - 1
                if (seconds === 0) {
                  clearInterval(ti);
                  setOtp(prev => {
                    return {
                      otp: null,
                      timeremaining: 0
                    }
                  })
                } else {
                  setOtp(prev => {
                    return {
                      ...prev,
                      timeremaining: seconds - 1
                    }
                  })
                }
              }, 1000)
              socket_temp.on("send-otp", () => {
                socket_temp.emit("take-otp", { otp: OTP })
              })
              setti(prev => {
                if (prev) {
                  clearInterval(prev)
                  return ti
                } else {
                  return ti
                }
              })
            })
            socket_temp.on("disconnect",(data)=>{
              setSocket({})
            })
          })
        }
      }).catch(err => {
        console.log(err.message)
        setSocket({})
      })
      // socket_temp = io("http://192.168.0.224:8080/");

    } catch (err) {
      console.log(err.message)
      setSocket({});
    }

    return () => {
      setSocket({})
    }
  }, [])
  const value = {
    url: url,
    setUrl: setUrl
  }
  const [product, setProduct] = useState({})
  const [previousPage, setPreviousPage] = useState("");
  return (
    <Suspense fallback={<Loader />}>
      <NetworkContext.Provider value={value}>
        <ProductContext.Provider value={{ product: product, setProduct: setProduct }}>
          <SocketContext.Provider value={{ socket: socket, setSocket: setSocket }}>
            <UserContext.Provider value={{ user, setUser, previousPage, setPreviousPage }}>
              <>
                {
                  <>{!iswelcominguser && currentpage !== "login" && currentpage !== "signup" && <Navbardefault />}
                    {
                      otp.otp && <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        position: "fixed",
                        zIndex: "100",
                        top: "0",
                        left: "0",
                        width: "100%",
                        padding: "2em",
                        backgroundColor: "black",
                        color: "white"
                      }}>
                        <p style={{
                          textAlign: "center",
                          fontWeight: "bold",
                        }}>{`Your OTP : ${otp.otp}`}</p>
                        <p style={{
                          textAlign: "center",
                          fontWeight: "bold"
                        }}>Time Remaining</p>
                        <p style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "red"
                        }}>
                          {otp.timeremaining}
                        </p>
                      </div>
                    }
                    <Outlet context={{ iswelcominguser, setIswelcominguser, currentpage, setCurrentpage, }} /></>
                }
              </>
            </UserContext.Provider>
          </SocketContext.Provider>
        </ProductContext.Provider>
      </NetworkContext.Provider>
    </Suspense>
  )
}

export default App
