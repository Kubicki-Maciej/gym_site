import React from "react";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

import "./style.css";

export default function FooterSocials() {
  return (
    <div className="socialIconBar">
      <h1>CHECK US ON:</h1>
      <a href="https://instagram.com">
        <InstagramIcon
          style={{ color: "white " }}
          sx={{ fontSize: 52, marginLeft: 2 }}
        />
      </a>
      <a href="https://instagram.com">
        <FacebookIcon
          style={{ color: "white " }}
          sx={{ fontSize: 52, marginLeft: 2 }}
        />
      </a>
      <a href="https://youtube.com">
        <YouTubeIcon
          style={{ color: "white " }}
          sx={{ fontSize: 52, marginLeft: 2 }}
        />
      </a>
    </div>
  );
}
