import React from "react";
import NavbarMobileBackground from "./NavbarMobileComponents/NavbarMobileBackground";
import { useState, useEffect } from "react";
import burgerLogo from "../../../assets/Icons/burgerlogo_grey.png";

export default function NavbarMobile() {
  const [isCurled, setIsCurled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 560) {
        setIsCurled(true);
        console.log("jest");
      } else {
        setIsCurled(false);
        console.log("niema");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="NavbarMobile">
      <NavbarMobileBackground />

      <div className={`burgerBar ${isCurled ? "visable" : ""}`} style={{}}>
        <div
          disabled={isCurled ? false : true}
          style={{
            height: "40px",
            width: "40px",
          }}
          onClick={handleBackToTop}
        >
          <img
            style={{
              position: "relative",
              height: "40px",
              width: "40px",
            }}
            src={burgerLogo}
          ></img>
        </div>
      </div>
    </div>
  );
}
