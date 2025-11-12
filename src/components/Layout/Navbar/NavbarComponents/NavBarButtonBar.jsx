import React, { useState } from "react";
import NavBarButtons from "./NavBarButtons";
import LoginButton from "../../../Buttons/LoginButton";
import { useUserContext } from "../../../User/context";
// import Logout from "../../Login/Logout";
import Logout from "../../../../Screens/Auth/Login/Logout";

export default function NavBarButtonBar() {
  const [email, setEmail] = useState(localStorage.getItem("userLogged"));
  const { logged } = useUserContext();

  return (
    <div
      className="navbarButtonBar"
      // style={{ display: "flex", flexDirection: "row" }}
    >
      <NavBarButtons
        isRed={false}
        buttonName={"home"}
        uppercase={"uppercase"}
        to={""}
      />
      <NavBarButtons
        isRed={false}
        buttonName={"about"}
        uppercase={"uppercase"}
        to={"about"}
      />
      <NavBarButtons
        isRed={false}
        buttonName={"book out"}
        uppercase={"uppercase"}
        to={"bookout"}
      />

      {logged ? <Logout /> : <LoginButton />}
    </div>
  );
}
