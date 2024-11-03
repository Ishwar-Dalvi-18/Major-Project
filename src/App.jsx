import { Suspense, useState } from 'react'
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

// starting point of app
function App() {
  const [iswelcominguser, setIswelcominguser] = useState(true);
  const [currentpage, setCurrentpage] = useState("landing");
  const [socket, setSocket] = useState({});
  const [user, setUser] = useState({});
  const [url, setUrl] = useState("http://localhost:8080/")
  useState(() => {
    let socket_temp;
    try {
      // socket_temp = io("http://192.168.0.224:8080/");
      socket_temp = io(url);
      socket_temp.on("connect", () => {
        setSocket(socket_temp);
        socket_temp.on("disconnect", () => {
          setSocket({});
        })
      })
    } catch (err) {
      setSocket({});
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
        <ProductContext.Provider value={{product:product,setProduct:setProduct}}>
        <SocketContext.Provider value={{ socket }}>
          <UserContext.Provider value={{ user, setUser,previousPage,setPreviousPage }}>
            <>
              {
                !Object.keys(socket).length > 0 ? <Error /> :
                  <>{!iswelcominguser && currentpage !== "login" && currentpage !== "signup" && <Navbardefault />}
                    <Outlet context={{ iswelcominguser, setIswelcominguser, currentpage, setCurrentpage ,  }} /></>
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
