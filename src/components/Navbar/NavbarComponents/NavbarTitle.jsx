import React from "react";
import { useState, useEffect } from "react";

export default function NavbarTitle({ text, highlightText }) {
  // const [widthSite, setWidthSite] = useState(window.innerWidth);
  const [widthSite, setWidthSite] = useState(window.innerHeight);

  function handleResize() {
    // setWidthSite(window.innerWidth);
    setWidthSite(window.innerWidth);
    
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div 
    className="navbarTitle"
    // style={{ position: "relative", top: 160, left: 160 }}
    >
      <h1
        // style={{
        //   color: "white",
        //   zIndex: 2,
        //   margin: 4,
        //   fontWeight: 400,
        //   fontSize: 90,
        //   lineHeight: "90%",
        // }}
      >
        {text}
        <br />
      </h1>
      <h1
        style={{
          color: "red",
          // zIndex: 2,
          // margin: 4,
          // fontWeight: 400,
          // fontSize: 90,
          // lineHeight: "90%",
        }}
      >
        {highlightText}
      </h1>
    </div>
  );
}
