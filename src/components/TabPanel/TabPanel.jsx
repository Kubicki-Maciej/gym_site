import { CenteredRow } from "components/Layout/CentredRow";
import BoxLayout from "components/Layout/BoxLayout";
import React, { useState } from "react";
import { Tab, Tabs, Box } from "@mui/material";

export default function TabPanel({ tabObject = [] }) {
  const [tabValue, setTabValue] = useState(0);

  return (
    <BoxLayout>
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {tabObject.map((tab, index) => (
          <Tab key={index} label={tab.labelName} />
        ))}
      </Tabs>

      <Box sx={{ py: 3 }}>{tabObject[tabValue]?.content}</Box>
    </BoxLayout>
  );
}
