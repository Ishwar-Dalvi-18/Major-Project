import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { UserContext } from '../contexts/userContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const {user,setUser}= useContext(UserContext);
    const navigate = useNavigate();
    useLayoutEffect(()=>{
        if(!user.id){
            axios.get('http://192.168.0.224:8080/api/user',{
                withCredentials : true,
            }).then(result=>{
                if(result.data.response.user){
                    console.log(result.data.response.user)
                   setUser({
                    id : result.data.response.user.emails[0].value,
                   }) 
                }else{
                    navigate("/login")
                }
            }).catch(err=>{
                console.log(err.message)
            })
        }
    },[])
  return (
    <div className='text-white'>{`Welcome ${user.id}`}</div>
  )
}

export default Profile