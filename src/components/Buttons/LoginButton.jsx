import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Login from "../../Screens/Auth/Login/Login";
import PopOutWindow from "../PopOutContainer/PopOutWindow";
import MainButton from "./MainButton";

export default function LoginButton() {
  return <MainButton name={"Login"} navigateDir={"login/"} />;
}
