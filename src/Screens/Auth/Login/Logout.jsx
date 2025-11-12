import React, { useState } from "react";
import axios from "axios";
import NavBarButtons from "../../../components/Layout/Navbar/NavbarComponents/NavBarButtons";
// import NavBarButtons from "../Navbar/NavbarComponents/NavBarButtons";
import { useUserContext } from "../../../components/User/context";
import { redirect } from "react-router-dom";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export default function Logout() {
  const { logout } = useUserContext();

  const handleLogout = async e => {
    e.preventDefault();
    client.post("user/logout", {}).then(function (res) {
      logout();
      localStorage.setItem("loginExpAt", 0);
    });
    redirect("/");
  };
  return (
    <a>
      <button className="navbarButton redElementButton" onClick={handleLogout}>
        Logout
      </button>
    </a>
  );
}
