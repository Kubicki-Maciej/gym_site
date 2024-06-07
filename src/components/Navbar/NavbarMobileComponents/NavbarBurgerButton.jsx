import React from 'react'
import burgerLogo from '../../Icons/burgerlogo_grey.png'


export default function NavbarBurgerButton({onClick}) {
  return (
    <img
        onClick={onClick}
        style={{
          fill: "#00a4d6",
          color: "#00a4d6",
          height: "45px",
          width: "45px",
        //   filter:
            // "invert(50%) sepia(41%) saturate(3992%) hue-rotate(162deg) brightness(95%) contrast(102%)",
        }}
        src={burgerLogo}
        alt="Logo Image"
      />
  )
}
