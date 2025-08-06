import React from "react";
import NavBarLogo from "./NavBarLogo";
import NavBarButtonBar from "./NavBarButtonBar";
import svgImage from "../../../../assets/Icons/trophy-solid.svg";

export default function NavbarLogoButtons() {
  return (
    <div className="navbarTopContainer">
      <NavBarLogo image={svgImage} />
      <NavBarButtonBar />
    </div>
  );
}
