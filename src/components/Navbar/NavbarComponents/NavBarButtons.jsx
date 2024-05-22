import React from "react";

export default function NavBarButtons({ isRed, buttonName, uppercase }) {
  if (isRed) {
    return (
      <button
        style={{
          fontSize: "30px",
          padding: "0 8px 0 8px",
          margin: "4px",
          color: "white",
          fontFamily: "CustomFont, sans-serif",
          textTransform: uppercase,
          backgroundColor: "red",
          cursor: "pointer",
          
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        {buttonName}
      </button>
    );
  } else {
    return (
      <button
        style={{
          fontSize: "30px",
          padding: "0 8px 0 8px",
          margin: "4px",
          color: "white",
          fontFamily: "CustomFont, sans-serif",
          textTransform: uppercase,
          border: "none",
          cursor: "pointer",
          backgroundColor: "transparent",
          fontWeight: "bold",
        }}
      >
        {buttonName}
      </button>
    );
  }
}
