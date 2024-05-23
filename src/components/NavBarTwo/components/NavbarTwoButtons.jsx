import React from "react";

export default function NavbarTwoButtons({name, icon}) {
  // ikon + button 
  return <div
    className="buttonNavbarTwo"
    style={{   
      
    }}
  >{name}  
    <img 
    src={icon}
    />
  </div>;
}

