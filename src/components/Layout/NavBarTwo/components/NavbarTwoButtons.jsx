import React from "react";
import { useNavigate } from 'react-router-dom';
export default function NavbarTwoButtons({name, icon, srcPath}) {
  const navigate = useNavigate();

  const goTo = () => {
  navigate(srcPath);
};
  // ikon + button 
  return <button
    onClick={goTo}
    className="buttonNavbarTwo"
    style={{   
      border:"none",
      backgroundColor:"transparent"
    }}
  >{name}  
    <img 
    src={icon}
    />
  </button>;
}

