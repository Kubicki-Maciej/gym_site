import { CustomNavButton } from "../../common/navBarButton";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { LoginButton } from "../../../Screens/Auth/Login/LoginButton";

export const DesktopNavBar = ({ navItems, onNavClick }) => (
  <NavLinks>
    {navItems.map(item => (
      <CustomNavButton key={item.label} onClick={() => onNavClick(item.href)}>
        {item.label}
      </CustomNavButton>
    ))}
    <LoginButton onNavClick={onNavClick} />
  </NavLinks>
);

const NavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
