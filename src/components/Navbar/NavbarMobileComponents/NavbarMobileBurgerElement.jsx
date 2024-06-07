import React from 'react'
import { useState } from 'react';
import NavbarBurgerButton from './NavbarBurgerButton';
import NavbarMobileMenu from './NavbarMobileMenu';

export default function NavbarMobileBurgerElement() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log('cliked');
    console.log(isOpen);
  };
  return (
    <div
        className='burgerMenuContainerElement'
    >
        <NavbarBurgerButton onClick={toggleMenu}/>
        {isOpen && (
            <NavbarMobileMenu/>
        )}
        </div>
  )
}