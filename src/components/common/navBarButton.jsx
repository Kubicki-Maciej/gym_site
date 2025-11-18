// CustomNavButton.jsx
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledNavButton = styled(Button)(({ theme }) => ({
  position: "relative",
  color: "#e0e0e0",
  fontSize: "1rem",
  fontWeight: 500,
  textTransform: "none",
  padding: "10px 18px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  backgroundColor: "transparent",
  border: "1px solid transparent",

  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "-100%",
    width: "100%",
    height: "2px",
    background: `linear-gradient(90deg, #00d4ff, #0099ff)`,
    transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 212, 255, 0.05)",
    opacity: 0,
    transition: "opacity 0.3s ease",
    borderRadius: "4px",
    pointerEvents: "none",
  },

  "&:hover": {
    backgroundColor: "rgba(0, 212, 255, 0.08)",
    color: "#00d4ff",
    transform: "translateY(-2px)",

    "&::after": {
      opacity: 1,
    },
  },

  "&:hover::before": {
    left: 0,
  },
}));

export const CustomNavButton = ({ children, ...props }) => {
  return (
    <StyledNavButton variant="text" {...props}>
      {children}
    </StyledNavButton>
  );
};
