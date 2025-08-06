import React from 'react'
import NavBarTwo from '../../NavBarTwo/NavBarTwo'
import NavBarButtons from '../NavbarComponents/NavBarButtons'

export default function NavbarMobileMenu() {
  return (
    <div className='menu-links'>
        <div style={{display:'flex' , flexDirection:"column"}}>
            <NavBarButtons isRed={false} buttonName={"Home"} to={"q"}/>
            <NavBarButtons isRed={false} buttonName={"about"} to={"aboaut"}/>
            <NavBarButtons isRed={false} buttonName={"book out"} to={"bookout"}/>
            
            
        </div>
        
        <div // first element on bigger screen is -200px top, so it's counter for element
            style={{
                position: "relative",
                top:"200px",
            }}
        >
            {/* <NavBarTwo/> */}
            <NavBarButtons isRed={true} buttonName={"login"} to={"login"}/>
        </div>
        
    </div>
  )
}
