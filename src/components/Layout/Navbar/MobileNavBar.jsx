// components/MobileNav.jsx
import { LoginButton } from "../../../Screens/Auth/Login/LoginButton";
import {
  Box,
  IconButton,
  List,
  ListItemText,
  ListItemButton,
  Drawer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

export const MobileNavBar = ({
  navItems,
  mobileOpen,
  onToggle,
  onNavClick,
}) => (
  <StyledDrawer anchor="right" open={mobileOpen} onClose={onToggle}>
    <DrawerHeader>
      <DrawerLogo>Brand</DrawerLogo>
      <IconButton onClick={onToggle}>
        <CloseIcon />
      </IconButton>
    </DrawerHeader>

    <List sx={{ padding: "12px 0" }}>
      {navItems.map(item => (
        <StyledListItemButton
          key={item.label}
          onClick={() => onNavClick(item.href)}
        >
          <ListItemText primary={item.label} />
        </StyledListItemButton>
      ))}
      {/* login button */}
      <StyledListItemButton
        onClick={() => {
          onNavClick("/login");
          onToggle();
        }}
      >
        <ListItemText>
          <LoginButton onNavClick={() => onToggle()} />
        </ListItemText>
      </StyledListItemButton>
    </List>
  </StyledDrawer>
);

const DrawerLogo = styled(Box)({
  fontSize: "1.5rem",
  fontWeight: 700,
  background: `linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  letterSpacing: "1px",
});

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    background: `linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)`,
    width: "280px",
    borderLeft: "1px solid rgba(0, 212, 255, 0.1)",
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: "8px 12px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  color: "#e0e0e0",
  backgroundColor: "transparent",
  border: "1px solid transparent",

  "&:hover": {
    backgroundColor: "rgba(0, 212, 255, 0.1)",
    borderColor: "rgba(0, 212, 255, 0.3)",
    color: "#00d4ff",
    transform: "translateX(8px)",
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  borderBottom: "1px solid rgba(0, 212, 255, 0.1)",
}));
