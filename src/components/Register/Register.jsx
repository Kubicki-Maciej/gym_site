import React, { useState } from 'react';
import axios from 'axios';

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleRegister = async (e) => {
      e.preventDefault();
      client.post('user/register', {
        email:email,
        password:password,
        name:username
      }).then(function (res){
          // add here validation for used emails
          console.log('zarejestrowany');
          console.log(res.data);
      })
    };
  
    return (
      <div>
        <form onSubmit={handleRegister}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    );
}
