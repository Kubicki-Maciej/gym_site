import React from "react";
import "./style.css";
import background from "./background.png";
import NavbarTitle from "./NavbarTitle";
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
      style={{
        position: "static",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          overflow: "hidden",

          right: 0,

          zIndex: 0,

          backgroundImage: `url(${background})`,
          backgroundSize: `120%`,
          boxShadow: "0px 15px 4px rgba(0, 0, 0, 0.25)",
          clipPath: "polygon(0 0, 100% 0, 100% 43%, 0 98%)",
        }}
      ></div>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100%",

          // borderLeft: "130px solid red",
          zIndex: 1,

          background: `linear-gradient(90deg, black 0%, rgba(0, 0, 0, 1) 23%, rgba(0, 0, 0, 0.9) 41%, rgba(0, 0, 0, 0.74) 51%, rgba(0, 0, 0, 0) 100%)`,
          clipPath: "polygon(0 0, 100% 0, 100% 43%, 0 98%)",
        }}
      >
        {/* <p style={{ color: "white", zIndex: 5, position: "relative" }}>LOLO</p> */}
        <NavbarTitle text={"TRAIN LIKE A "} highlightText={"CHEMPION"} />
      </div>
    </div>
  );
}
