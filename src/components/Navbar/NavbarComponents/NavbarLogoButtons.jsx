import React from "react";
import NavBarLogo from "./NavBarLogo";
import NavBarButtonBar from "./NavBarButtonBar";

export default function NavbarLogoButtons() {
  return (
    <div
      className="navbarTopContainer"
      style={{
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "space-between",
        
       
        // color: "red",
        // padding: "20px 140px 0 140px ",
      }}
    >

      <NavBarLogo />
      <NavBarButtonBar />
    </div>
  );
}
