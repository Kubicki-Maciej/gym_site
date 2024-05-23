import React from 'react'

import instagram from "../Icons/instagram.png"
import facebook from "../Icons/facebook.png"
import youtube from "../Icons/youtube.png"

import './style.css';

export default function FooterSocials() {
  return (
    <div className='socialIconBar'
    >
        <h1>
            CHECK US ON:
        </h1>
        <a href="https://instagram.com">   
            <img

            src={instagram}
            alt="Instagram Social"
             />
        </a>
        <a href="https://instagram.com">   
            <img

            src={facebook}
            alt="Facebook Social"
             />
        </a>
        <a href="https://youtube.com">   
            <img

            src={youtube}
            alt="Youtube Social"
             />
        </a>
    </div>
  )
}
