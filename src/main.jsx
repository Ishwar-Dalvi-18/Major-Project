import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { createBrowserRouter, createRoutesFromChildren, Navigate, replace, Route, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import MyInfo from './pages/MyInfo.jsx';
import ViewProduct from './pages/ViewProduct.jsx';
import ProductInventory from './pages/ProductInventory.jsx';
import User from './pages/User.jsx';
import UserBuy from './pages/UserBuy.jsx';
import UserPurchased from './pages/UserPurchased.jsx';
import UserCart from './pages/UserCart.jsx';

const router = createBrowserRouter(createRoutesFromChildren(
  <Route path='/' element={<App />}>
    <Route index element={<Navigate to={`/landingpage`} replace />} />
    <Route path='landingpage' element={<Landing />} />
    <Route path='login' element={<Login />} />
    <Route path='profile' element={<Profile />} >
      <Route path='productinventory' element={<ProductInventory />} />
    </Route>
    <Route path='user' element={<User />}>
      <Route index element={<Navigate to={"/user/buy"} />} />
      <Route path='buy' element={<UserBuy />} replace />
      <Route path='purchased' element={<UserPurchased/>}/>
      <Route path='cart' element={<UserCart/>}/>
      <Route path='profile' element={<MyInfo/>}/>
    </Route>
    <Route path='signup' element={<Signup />} />
    <Route path='home' element={<Home />} />
    <Route path='myinfo' element={<MyInfo />} />
    <Route path='viewproduct' element={<ViewProduct />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)