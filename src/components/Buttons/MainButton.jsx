import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function NavigateButton({navigateDir, name}) {
    const navigate = useNavigate();

    const goBack = () => {
    navigate(navigateDir);
  };
  return (
    <Button onClick={goBack}>{name}</Button>
  )
}
