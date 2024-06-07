import React from "react";
import { Link } from "react-router-dom";
export default function NavBarButtons({ isRed, buttonName, uppercase , to}) {
  if (isRed) {
    return (
      <Link to={`./${to}`}>
      <button className="navbarButton redElementButton"

      >
        {buttonName}
      </button>
      </Link>
    );
  } else {
    return (
      <Link to={`./${to}`}>
      <button
        className="navbarButton"
      >
        {buttonName}
      </button>
      </Link>
    );
  }
}
