import React, { useState } from "react";
import axios from "axios";
import NavBarButtons from "../../../components/Layout/Navbar/NavbarComponents/NavBarButtonBar";
import { useUserContext } from "../../../components/User/context";
import { Navigate, useNavigate } from "react-router-dom";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export default function Login({ closeWindow }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    client
      .post("user/login", {
        username: email,
        password: password,
      })
      .then(function (res) {
        console.log("zalogowany");
        console.log(res.data);

        // Użyj funkcji login z contextu - ona automatycznie zapisze do localStorage
        login(res.data);

        // Dodatkowe ustawienia (opcjonalne)
        localStorage.setItem(
          "loginExpAt",
          Date.now() + 30 * 24 * 60 * 60 * 1000
        );

        closeWindow();
        navigate("/");
      });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <NavBarButtons
        isRed={true}
        buttonName={"register"}
        to="register"
      ></NavBarButtons>
    </div>
  );
}
