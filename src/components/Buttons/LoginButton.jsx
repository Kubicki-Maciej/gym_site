import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Login from "../Login/Login";
import PopOutWindow from "../PopOutContainer/PopOutWindow";
import { use } from "react";

export default function LoginButton() {
  const [windowOpen, setWindowOpen] = useState(false);

  function closeWindow() {
    setWindowOpen(false);
  }
  function openPopup() {
    setWindowOpen(true);
  }

  return (
    <PopOutWindow
      elementInside={<Login closeWindow={closeWindow} />}
      windowOpen={windowOpen}
    />
  );
}
