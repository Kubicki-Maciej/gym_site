import { Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';

const MotionGrid = motion(Grid);

export default function CardContainer({ 
  items = [],
  spacing = 2, 
  columns = 3,
  renderCard,
  sx = {}
}){
  const mdValue = 12 / columns;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <MotionGrid 
      container 
      spacing={spacing}
      variants={container}
      initial="hidden"
      animate="show"
      sx={{ p: 2, ...sx }}
    >
      {items.map((data, index) => (
        <MotionGrid 
          item 
          xs={12} 
          sm={6} 
          md={mdValue}
          key={data.id || index}
          variants={item}
        >
          <Box sx={{ height: '100%' }}>
            {renderCard?.(data)}
          </Box>
        </MotionGrid>
      ))}
    </MotionGrid>
  );
}