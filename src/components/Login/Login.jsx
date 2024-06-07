import React, { useContext, useState } from 'react';
import axios from 'axios';
import NavBarButtons from '../Navbar/NavbarComponents/NavBarButtons';
import { UserContext } from '../User/context';
import { Navigate, useNavigate } from "react-router-dom";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useContext(UserContext)
    const navigate = useNavigate()

   
    
    const handleLogin = async (e) => {
      e.preventDefault();
        client.post('user/login', {
          username:email,
          password:password,
        }).then(function (res){
            console.log('zalogowany');
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify(res.data))
            localStorage.setItem('userLogged', true)
            localStorage.setItem('loginExpAt', Date.now()+ 30*24*60*60*1000)
            setUserData({
                logged: true,
                userData: res.data
            })
            console.log('userLogged');
            console.log(userData);
            navigate("/");
        })
    };
    
    return (
      <div>
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit">Login</button>
        </form>
        <NavBarButtons isRed={true} buttonName={"register"} to="register"></NavBarButtons>
      </div>
    );
} 


