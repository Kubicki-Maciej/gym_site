// NewNavBar.jsx

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

import { MobileNavBar } from "./MobileNavBar";
import { DesktopNavBar } from "./DesktopNavBar";
import { styled } from "@mui/material/styles";

import { useNavItems } from "../../../hooks/navigation/useNavItems";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)`,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(0, 212, 255, 0.1)",
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 24px",
});

const LogoBox = styled(Box)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: 700,
  background: `linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  letterSpacing: "1px",

  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  color: "#00d4ff",
  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: "rgba(0, 212, 255, 0.1)",
  },

  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const NewNavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navItems = useNavItems();
  const navigate = useNavigate();
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleNavClick = href => {
    navigate(href);
    setMobileOpen(false);
  };

  return (
    <>
      <StyledAppBar position="sticky">
        <StyledToolbar>
          <LogoBox>Brand</LogoBox>

          {!isMobile && (
            <DesktopNavBar navItems={navItems} onNavClick={handleNavClick} />
          )}

          {isMobile && (
            <MobileMenuButton onClick={handleDrawerToggle}>
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </MobileMenuButton>
          )}
        </StyledToolbar>
      </StyledAppBar>

      <MobileNavBar
        navItems={navItems}
        mobileOpen={mobileOpen}
        onToggle={handleDrawerToggle}
        onNavClick={handleNavClick}
      />
    </>
  );
};
