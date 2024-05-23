import React from 'react'
import FooterText from './FooterText'
import FooterSocials from './FooterSocials'

import './style.css';


export default function Footer() {
  return (
    <div
      className='footer'
        style={{
            backgroundColor: '#1b1b1b',
            color: '#fff',
            // textAlign: 'center',
            height:"140px",
            // position: 'fixed',
            // left: '0',
            // bottom: '0',
            width: '100%',
            display:'flex',
            flexDirection:'row',
            justifyContent: "space-between",
            
            // marginTop:"120px"
        }}
    >
      <div
        className='footerElement'
        style={{
          width: "100%",
          // padding:"0 120px 0 120px",
          display:'flex',
          // flexDirection:'row',
          justifyContent: "space-between",
          textAlign:"center",
          alignItems: "center"
          // justifyContent:"center"
        }}
      >
        <FooterText/>
        <FooterSocials/>
      </div>
      
    </div>
  )
}
