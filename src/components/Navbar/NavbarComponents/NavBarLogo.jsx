import React from "react";
import FontAwesome from "react-fontawesome";
import NavBarButtons from "./NavBarButtons";
import svgImage from "../../Icons/trophy-solid.svg";
export default function NavBarLogo() {
  return (
    <div
      className="navbarLogo"
      style={{
        // display: "flex",
        // flexDirection: "row",
        // textAlign: "center",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <img
        // style={{
        //   fill: "#00a4d6",
        //   color: "#00a4d6",
        //   height: "45px",
        //   width: "45px",
        //   filter:
        //     "invert(50%) sepia(41%) saturate(3992%) hue-rotate(162deg) brightness(95%) contrast(102%)",
        // }}
        src={svgImage}
        alt="Logo Image"
      />

      <NavBarButtons isRed={false} buttonName={"Progym"} uppercase={"normal"} />
    </div>
  );
}
