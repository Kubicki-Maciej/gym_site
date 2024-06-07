import React  from "react";

import NavbarBackground from "./NavbarComponents/NavbarBackground";

import './styleNavbar.css'

// import NavBarTwo from "../NavBarTwo/NavBarTwo";

/*
    1. 12 grid
    2. picture on right and fade efect in black  https://bennettfeely.com/clippy/ very good tool
    3. transparent navbar
    4. 2 section of nav 
        a) First for switch sites. 
        b) For login.
*/

export default function Navbar() {
    return (
    
      <div
        className="Navbar"
      >
        <NavbarBackground />
      </div>
    );

}
