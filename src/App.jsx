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

// starting point of app
function App() {
  const [iswelcominguser, setIswelcominguser] = useState(true);
  const [currentpage, setCurrentpage] = useState("landing");
  const [socket, setSocket] = useState({});
  const [user,setUser] = useState({});
  useState(() => {
    let socket_temp;
    try{
    socket_temp = io("http://192.168.0.224:8080/");
    socket_temp.on("connect",()=>{
      setSocket(socket_temp);
      socket_temp.on("disconnect",()=>{
        setSocket({});
      })
    })
  }catch(err){
    setSocket({});
  }
  }, [])
  return (
    <Suspense fallback={<Loader/>}>
    <SocketContext.Provider value={{socket}}>
      <UserContext.Provider value={{user,setUser}}>
      <>
      {
        !Object.keys(socket).length>0? <Error/> :
        <>{!iswelcominguser && currentpage !== "login" && currentpage!=="signup" && <Navbardefault />}
        <Outlet context={{ iswelcominguser, setIswelcominguser, currentpage, setCurrentpage }} /></>

      }
      </>
      </UserContext.Provider> 
    </SocketContext.Provider>
    </Suspense>
  )
}

export default App
