import React from "react";
import FooterText from "./FooterText";
import FooterSocials from "./FooterSocials";

import "./style.css";

export default function Footer() {
  return (
    <div
      className="footer"
      style={{
        backgroundColor: "#1b1b1b",
        color: "#fff",
        height: "140px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <div
        className="footerElement"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <FooterText />
        <FooterSocials />
      </div>
    </div>
  );
}
