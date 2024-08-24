import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function NavigateButton({navigateDir, name}) {
    const navigate = useNavigate();

    const goBack = () => {
    navigate(navigateDir);
  };
  return (
    <button onClick={goBack}>{name}</button>
  )
}
