import React from "react";
import "./style.css";
import background from "./background.png";
import NavbarTitle from "./NavbarTitle";
import NavbarLogoButtons from "./NavbarLogoButtons";
// import { View, Image, Text, StyleSheet } from "";
// import Image from "react";

// const background = {
//     fill: linear-gradient(90deg, #000 0.08%, rgba(0, 0, 0, 0.97) 23.05%, rgba(0, 0, 0, 0.77) 40.52%, rgba(0, 0, 0, 0.74) 51.01%, rgba(0, 0, 0, 0.00) 99.94%), url(<path-to-image>), lightgray 239.685px -139.918px / 100% 132.719% no-repeat;
// filter: drop-shadow(0px 15px 4px rgba(0, 0, 0, 0.25));
// };

// border-bottom: 75px solid transparent;
// 	border-left: 130px solid #F34A53;
// 	margin: 40px auto 0;

export default function NavbarBackground() {
  return (
    // <div className="layout">
    //   <div className="bacgroundNavbar"></div>
    // </div>
    <div
      className="backgroundNavbar"
    >
      <div
        className="backgroundNavbarImage"
        style={{
          backgroundImage: `url(${background})`,
        }}
      ></div>
      <div
        className="backgorundNavbarShadowbox"
      >
        <NavbarLogoButtons />
        <NavbarTitle text={"TRAIN LIKE A "} highlightText={"CHEMPION"} />
      </div>
    </div>
  );
}
