import React from 'react'

import instagram from "../Icons/instagram.png"
import facebook from "../Icons/facebook.png"
import youtube from "../Icons/youtube.png"

export default function FooterSocials() {
  return (
    <div
        style={{
            display:"flex",
            
            justifyContent:"center",
            height:"140px",
            alignItems: "center"
            
        }}
    >
        <h1>
            CHECK US ON:
        </h1>
        <a href="https://instagram.com">   
            <img
            style={{
              height: "45px",
              width: "45px",
              marginLeft:"35px"
            }}
            src={instagram}
            alt="Instagram Social"
             />
        </a>
        <a href="https://instagram.com">   
            <img
            style={{
            
              height: "45px",
              width: "45px",
              marginLeft:"35px"
            }}
            src={facebook}
            alt="Facebook Social"
             />
        </a>
        <a href="https://youtube.com">   
            <img
            style={{
              height: "45px",
              width: "45px",
              marginLeft:"35px"
            }}
            src={youtube}
            alt="Youtube Social"
             />
        </a>
    </div>
  )
}
