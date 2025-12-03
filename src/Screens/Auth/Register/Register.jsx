import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";

const client = axios.create({
  baseURL: API_URL,
});

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async e => {
    const payload = {
        email: email,
        password: password,
        name: username,
        password_confirm:confirmPassword
    }
    console.log(payload)
    e.preventDefault();
    client
      .post("user/register", payload)
      .then(function (res) {
        // add here validation for used emails
        console.log("zarejestrowany");
        console.log(res.data);
      });
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
