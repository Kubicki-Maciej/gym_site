import React from "react";
import NavBarLogo from "./NavBarLogo";
import NavBarButtonBar from "./NavBarButtonBar";

export default function NavbarLogoButtons() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        
        padding: "0 100 0  100",
        color: "red",
        padding: "20px 140px 0 140px ",
      }}
    >

      <NavBarLogo />
      <NavBarButtonBar />
    </div>
  );
}
