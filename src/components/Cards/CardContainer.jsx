import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function CardContainer({ 
  items = [],
  spacing = 2, 
  columns = 3,
  renderCard,
  isOneColumn = false, 
  sx = {}
}){
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

  const spacingValue = spacing * 8;

  // Dynamiczny gridTemplateColumns
  const getGridColumns = () => {
    if (isOneColumn) {
      return '1fr'; // ← Zawsze 1 kolumna
    }
    return {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: `repeat(${columns}, 1fr)`,
    };
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <MotionBox
        variants={container}
        initial="hidden"
        animate="show"
        sx={{
          display: 'grid',
          gridTemplateColumns: getGridColumns(),
          gap: `${spacingValue}px`,
          alignItems: 'start',
          justifyItems: 'center',
          ...sx
        }}
      >
        {items.map((data, index) => (
          <motion.div
            key={data.id || index}
            variants={item}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <Box sx={{ 
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: isOneColumn ? '600px' : {
                xs: '100%',
                sm: '350px',
                md: '100%'
              },
              margin: '0 auto'
            }}>
              {renderCard(data)}
            </Box>
          </motion.div>
        ))}
      </MotionBox>
    </Container>
  );
}