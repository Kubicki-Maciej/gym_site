import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Paper } from "@mui/material";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    "aria-controls": `folder-tabpanel-${index}`,
  };
}

export default function FolderTabsMui({ tabs }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="Type">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="folder tabs"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          TabIndicatorProps={{ sx: { display: "none" } }}
          sx={{
            minHeight: "48px",
            "& .MuiTabs-scrollButtons": {
              width: "auto",
              "&.Mui-disabled": { opacity: 0.3 },
            },
            "& .MuiTabs-flexContainer": {
              gap: 1,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              {...a11yProps(index)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "10px 10px 0 0",
                border: "1px solid #e0e0e0",
                borderBottom: "none",
                backgroundColor: value === index ? "#fff" : "#f5f5f5",
                color: value === index ? "primary.main" : "text.secondary",
                top: "1px",
                zIndex: value === index ? 2 : 1,
                "&:hover": {
                  backgroundColor: value === index ? "#fff" : "#eeeeee",
                },
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </Tabs>
      </Box>

      <Paper
        elevation={3}
        sx={{
          borderTopLeftRadius: 0,
          borderRadius: "0 0 8px 8px",
          border: "1px solid #e0e0e0",
          borderTop: "1px solid #e0e0e0",
          position: "relative",
          zIndex: 1,
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
