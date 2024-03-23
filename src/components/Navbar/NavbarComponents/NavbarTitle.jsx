import React from "react";

export default function NavbarTitle({ text, highlightText }) {
  return (
    <div style={{ position: "relative", top: 40, left: 20 }}>
      <h1
        style={{
          color: "white",
          zIndex: 2,
          margin: 4,
          fontWeight: 400,
          fontSize: 90,
          lineHeight: "90%",
        }}
      >
        {text}
        <br />
      </h1>
      <h1
        style={{
          color: "red",
          zIndex: 2,
          margin: 4,
          fontWeight: 400,
          fontSize: 90,
          lineHeight: "90%",
        }}
      >
        {highlightText}
      </h1>
    </div>
  );
}
