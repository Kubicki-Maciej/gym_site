import React, { useState, useContext } from "react";
import NavBarButtons from "./NavBarButtons";
import LoginButton from "../../Buttons/LoginButton";
import { UserContext } from "../../User/context";
import Logout from "../../Login/Logout";

export default function NavBarButtonBar() {
  const [email, setEmail] = useState(localStorage.getItem("userLogged"));
  const [userLogged, setUserLogged] = useContext(UserContext);

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

      {userLogged.logged ? <Logout /> : <LoginButton />}
    </div>
  );
}
