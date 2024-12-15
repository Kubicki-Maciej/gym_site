import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff0000', // Kolor tła przycisku
  color: '#fff',              // Kolor tekstu
  padding: '10px 20px',       // Odstęp wokół tekstu
  fontSize: '16px',           // Rozmiar czcionki
  borderRadius: '30px',       // Zaokrąglone rogi
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Cień pod przyciskiem
  transition: 'transform 0.4s ease-in-out',   // Płynna animacja
  '&:hover': {
    backgroundColor: '#ff3751', // Kolor tła po najechaniu
    transform: 'scale(1.05)',   // Powiększenie przycisku po najechaniu
  },
}));


export default function NavigateButton({navigateDir, name}) {
    const navigate = useNavigate();

    const goBack = () => {
    navigate(navigateDir);
  };
  return (
    <StyledButton onClick={goBack}>{name}</StyledButton>
  )
}
