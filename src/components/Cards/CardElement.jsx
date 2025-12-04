import { Card, CardContent, Typography, Button, Box, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

export default function CardElement({ student, onSelect, onDelete }) {
  return (
    <MotionCard
      whileHover={{ y: -5, boxShadow: '0px 10px 30px rgba(0,0,0,0.2)' }}
      whileTap={{ scale: 0.98 }}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer'
      }}
    >
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: '0 auto 16px',
            backgroundColor: '#1976d2',
            fontSize: '32px'
          }}
        >
          {student?.name?.charAt(0).toUpperCase() || '?'}
        </Avatar>
        
        <Typography variant="h6" gutterBottom>
          {student?.name}
        </Typography>
        
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Email: {student?.email}
        </Typography>
        
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Wiek: {student?.age}
        </Typography>

        <Typography variant="caption" color="textSecondary">
          ID: {student?.id}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <Button 
          size="small" 
          variant="contained"
          fullWidth
          onClick={() => onSelect?.(student)}
        >
          Edytuj
        </Button>
        <Button 
          size="small" 
          color="error"
          fullWidth
          onClick={() => onDelete?.(student?.id)}
        >
          Usuń
        </Button>
      </Box>
    </MotionCard>
  );
}