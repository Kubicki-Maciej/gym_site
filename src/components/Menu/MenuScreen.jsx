import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import MenuSidebar from "./MenuSidebar";
import MenuSection from "./MenuSection";
export default function MenuScreen({ sideBarName }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box
        sx={{
          padding: 0,
          boxShadow: "2px 0 5px rgba(0,0,0,0.1a)",
        }}
      >
        <MenuSidebar sideBarName={sideBarName} />
      </Box>
      <Box sx={{ flexGrow: 1, padding: isMobile ? 2 : 4 }} className="Section">
        <MenuSection sideBarName={sideBarName} />
      </Box>
    </Box>
  );
}
