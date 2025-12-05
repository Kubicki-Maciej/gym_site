import { useState } from 'react';
import { 
  Card, CardContent, CardMedia, Typography, Button, Box, Chip, 
  Collapse, IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MotionCard = motion(Card);

const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'Łatwe':
      return 'success';
    case 'Średnie':
      return 'warning';
    case 'Trudne':
      return 'error';
    case 'Bardzo trudne':
      return 'error';
    default:
      return 'default';
  }
};

export default function CardExercise({ 
  exercise, 
  onSelect, 
  onDelete,
  expandedId,
  setExpandedId
}) {
  const isExpanded = expandedId === exercise?.id;

  const handleExpandClick = () => {
    if (isExpanded) {
      setExpandedId(null);
    } else {
      setExpandedId(exercise?.id);
    }
  };

  return (
    <MotionCard
      whileHover={{ y: -8, boxShadow: '0px 15px 40px rgba(0,0,0,0.3)' }}
      whileTap={{ scale: 0.97 }}
      sx={{ 
        width: '100%',
        height: '100%',
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.3s ease' // ← Animacja przy zmianie wysokości
      }}
    >
      {/* Zdjęcie na górze */}
      <CardMedia
        component="img"
        height="200"
        image={exercise?.image}
        alt={exercise?.name}
        sx={{ 
          objectFit: 'cover',
          flexShrink: 0
        }}
      />

      {/* Zawartość */}
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        p: 2,
        overflow: 'hidden' // ← Zapobiega przepełnieniu
      }}>
        {/* Header z nazwą i przyciskiem rozwijającym */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          mb: 1,
          flexShrink: 0
        }}>
          {/* Nazwa - gruba czcionka */}
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: '#333',
              flex: 1
            }}
          >
            {exercise?.name}
          </Typography>

          {/* Przycisk rozwijający */}
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            sx={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              ml: 1,
              flexShrink: 0
            }}
            size="small"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        {/* Opis - mała czcionka */}
        <Typography 
          variant="body2" 
          color="textSecondary"
          sx={{ 
            mb: 2,
            fontSize: '0.875rem',
            lineHeight: 1.5
          }}
        >
          {exercise?.description}
        </Typography>

        {/* Poziom trudności */}
        <Box sx={{ mb: 2 }}>
          <Chip
            label={exercise?.difficulty}
            color={getDifficultyColor(exercise?.difficulty)}
            size="small"
            variant="outlined"
          />
        </Box>

        {/* Zawartość rozwijająca się */}
        <Collapse 
          in={isExpanded} 
          timeout="auto" 
          unmountOnExit
          sx={{ flex: 1, overflowY: 'auto' }}
        >
          <Box sx={{ 
            mt: 1, 
            pt: 2, 
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              📋 Szczegóły:
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block">
              • Liczba powtórzeń: 3 x 15
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block">
              • Czas odpoczynku: 60 sekund
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block">
              • Obszar treningu: Górna część ciała
            </Typography>

            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2 }}>
              💡 Wskazówki:
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Utrzymuj prawidłową pozycję, oddychaj regularnie i nie śpiesz się z wykonaniem ćwiczenia.
            </Typography>
          </Box>
        </Collapse>
      </CardContent>

      {/* Przyciski na dole */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        gap: 1, 
        borderTop: '1px solid #e0e0e0',
        flexShrink: 0
      }}>
        <Button 
          size="small" 
          variant="contained"
          fullWidth
          onClick={() => onSelect?.(exercise)}
        >
          Edytuj
        </Button>
        <Button 
          size="small" 
          color="error"
          variant="outlined"
          fullWidth
          onClick={() => onDelete?.(exercise?.id)}
        >
          Usuń
        </Button>
      </Box>
    </MotionCard>
  );
}