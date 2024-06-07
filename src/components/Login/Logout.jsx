import React, { useContext, useState } from 'react';
import axios from 'axios';
import NavBarButtons from '../Navbar/NavbarComponents/NavBarButtons';
import { UserContext } from '../User/context';
import { redirect } from "react-router-dom";


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });


export default function Logout() {
    const [userData, setUserData] = useContext(UserContext)

    const handleLogout = async (e) => {
        e.preventDefault();
          client.post('user/logout', {
            
          }).then(function (res){
            setUserData({
                logged: false,
                userData: {}
                
            })
            localStorage.setItem('user', {})
            localStorage.setItem('userLogged', false)
            localStorage.setItem('loginExpAt', 0 )
            console.log('userData WYLOGUJ');
            console.log(userData);
            // console.log(userData);
          })
          redirect("/")
        }
    return (
    <a><button className="navbarButton redElementButton" onClick={handleLogout}>Logout</button></a>
    )
}
