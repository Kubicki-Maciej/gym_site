import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Paper } from '@mui/material';

// Pomocniczy komponent do wyświetlania zawartości zakładki
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`folder-tabpanel-${index}`}
      aria-labelledby={`folder-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `folder-tab-${index}`,
    'aria-controls': `folder-tabpanel-${index}`,
  };
}

export default function FolderTabsMui({ tabs }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
  value={value} 
  onChange={handleChange} 
  aria-label="folder tabs"
  
  // --- ZMIANY TUTAJ ---
  variant="scrollable"        // Włącza tryb przewijania
  scrollButtons="auto"        // Strzałki pojawią się tylko gdy są potrzebne
  allowScrollButtonsMobile    // Pozwala na przewijanie dotykiem i pokazuje strzałki na mobile
  // --------------------

  TabIndicatorProps={{ sx: { display: 'none' } }}
  sx={{
    minHeight: '48px', // Zapewnia odpowiednią wysokość
    '& .MuiTabs-scrollButtons': { // Stylizacja strzałek przewijania (opcjonalne)
        width: 'auto',
        '&.Mui-disabled': { opacity: 0.3 }
    },
    '& .MuiTabs-flexContainer': {
      gap: 1 
    }
  }}
>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              {...a11yProps(index)}
              sx={{
                textTransform: 'none', // Wyłączamy CAPS LOCK
                fontWeight: 'bold',
                borderRadius: '10px 10px 0 0', // Zaokrąglenie góry
                border: '1px solid #e0e0e0',
                borderBottom: 'none', // Dół otwarty, żeby łączył się z treścią
                backgroundColor: value === index ? '#fff' : '#f5f5f5', // Aktywny biały, nieaktywny szary
                color: value === index ? 'primary.main' : 'text.secondary',
                top: '1px', // Przesunięcie o 1px w dół, by przykryć linię kontenera
                zIndex: value === index ? 2 : 1, // Aktywny na wierzchu
                '&:hover': {
                  backgroundColor: value === index ? '#fff' : '#eeeeee',
                },
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Kontener treści - "Kartka w teczce" */}
      <Paper 
        elevation={3} // Cień pod spodem
        sx={{ 
          borderTopLeftRadius: 0, // Lewy górny róg ostry (łączy się z pierwszą zakładką)
          borderRadius: '0 0 8px 8px', // Dół zaokrąglony
          border: '1px solid #e0e0e0',
          borderTop: '1px solid #e0e0e0', // Linia góry (tam gdzie nie ma aktywnej zakładki)
          position: 'relative',
          zIndex: 1
        }}
      >
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Paper>
    </Box>
  );
}