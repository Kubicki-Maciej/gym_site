import React from "react";

export default function NavbarTwoButtons({name, icon}) {
  // ikon + button 
  return <div
    style={{
      color:"red",
      fontFamily: "CustomFont, sans-serif",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: "1.5rem",
      cursor: "pointer",
      textAlign:"center",
      verticalAlign:"middle",
      display:"flex",
      justifyContent:"center",
      flexDirection:"column",
      alignItems: "center"
      
    }}
  >{name}  
    <img style={{width:"35px",height:"35px"}}src={icon}/>
  </div>;
}

