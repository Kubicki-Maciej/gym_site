// components/LoginButton.jsx
// import { useUserContext } from "../context/UserContext";
import { useUserContext } from "../../../components/User/context";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const StyledLoginButton = styled(Button)(({ theme }) => ({
  color: "#00d4ff",
  border: "2px solid #00d4ff",
  borderRadius: "8px",
  padding: "8px 20px",
  fontWeight: 600,
  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: "rgba(0, 212, 255, 0.1)",
    boxShadow: "0 0 15px rgba(0, 212, 255, 0.4)",
  },
}));

export const LoginButton = ({ onNavClick }) => {
  const { user, logout } = useUserContext();

  const handleLogout = () => {
    logout();
    onNavClick?.();
  };

  if (user) {
    return (
      <StyledLoginButton variant="outlined" onClick={handleLogout}>
        {user.name && `${user.name} - `}Wyloguj
      </StyledLoginButton>
    );
  }

  return (
    <StyledLoginButton
      variant="outlined"
      onClick={() => onNavClick?.("/login")}
    >
      Zaloguj
    </StyledLoginButton>
  );
};
