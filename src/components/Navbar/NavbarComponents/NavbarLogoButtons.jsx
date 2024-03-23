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
        padding: "0 140px 0 140px ",
      }}
    >
      <NavBarLogo style={{}} />
      <NavBarButtonBar />
    </div>
  );
  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexDirection: "row",
  //       justifyContent: "space-between",
  //       padding: "0 100 0  100",
  //     }}
  //   >
  //     <div style={{ color: "red" }}>LOGO</div>
  //     <div style={{ color: "red" }}>BUTTON</div>
  //   </div>
  // );
}
