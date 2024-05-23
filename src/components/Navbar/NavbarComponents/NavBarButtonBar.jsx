import React from "react";
import NavBarButtons from "./NavBarButtons";
export default function NavBarButtonBar() {
  return (
    <div 
      className="navbarButtonBar"
      // style={{ display: "flex", flexDirection: "row" }}
    >
      <NavBarButtons
        isRed={false}
        buttonName={"home"}
        uppercase={"uppercase"}
      />
      <NavBarButtons
        isRed={false}
        buttonName={"about"}
        uppercase={"uppercase"}
      />
      <NavBarButtons
        isRed={false}
        buttonName={"book out"}
        uppercase={"uppercase"}
      />
      <NavBarButtons
        isRed={false}
        buttonName={"contact"}
        uppercase={"uppercase"}
      />
      <NavBarButtons
        isRed={true}
        buttonName={"sign up"}
        uppercase={"uppercase"}
      />
    </div>
  );
}
