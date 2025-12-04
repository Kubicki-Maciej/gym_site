import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';

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

export default function CardExercise({ exercise, onSelect, onDelete }) {
  return (
    <MotionCard
      whileHover={{ y: -8, boxShadow: '0px 15px 40px rgba(0,0,0,0.3)' }}
      whileTap={{ scale: 0.97 }}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        overflow: 'hidden'
      }}
    >
      {/* Zdjęcie na górze */}
      <CardMedia
        component="img"
        height="200"
        image={exercise?.image}
        alt={exercise?.name}
        sx={{ objectFit: 'cover' }}
      />

      {/* Zawartość */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Nazwa - gruba czcionka */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            mb: 1,
            color: '#333'
          }}
        >
          {exercise?.name}
        </Typography>

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
      </CardContent>

      {/* Przyciski na dole */}
      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
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