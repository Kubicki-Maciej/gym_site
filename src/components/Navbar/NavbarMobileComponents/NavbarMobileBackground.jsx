import React from 'react'

import backgroundImage from"../NavbarComponents/background.png"
import NavbarMobileBurgerElement from './NavbarMobileBurgerElement'
import NavBarLogo from '../NavbarComponents/NavBarLogo'
import Logo from '../../Icons/trophy-solid.svg'
import NavBarButtons from '../NavbarComponents/NavBarButtons'
import NavBarTwo from '../../NavBarTwo/NavBarTwo'

export default function NavbarMobileBackground() {
  return (
    <div className='backgroundNavbarMobile'>
        
        <div 
        className='backgroundMobileNavbarImage'
        style={{
            backgroundImage: `url(${backgroundImage})`,
        }}
        >
        </div>
        <div
        className='backgroundMobileNavbarImageShadow'
        >   

        <div className='mobileNavbarTopContainer'>
            {/* <NavbarMobileBurgerElement/> */}
            <div className='mobileLogoWithMenu'>
                <NavBarLogo image={Logo}/>
                <NavBarButtons isRed={false} buttonName={"home"} to={""}/>
                <NavBarButtons isRed={false} buttonName={"about"} to={"about"}/>
                <NavBarButtons isRed={false} buttonName={"book out"} to={"bookout"}/>
                <NavBarButtons isRed={true} buttonName={"login"} to={"login"}/>
            </div>
            <NavBarTwo/>
        </div>
            
        </div>
    </div>
  )
}
