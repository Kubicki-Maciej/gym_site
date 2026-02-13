// components/MenuMobileBottom.jsx
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebarItems } from "../../../hooks/useSidebarItems";

export default function MenuMobileBottom({ sideBarName }) {
  const { getItemById } = useSidebarItems();
  const navigate = useNavigate();
  const location = useLocation(); // Do podświetlania aktywnego elementu

  const currentItem = getItemById(sideBarName);
  const submenu = currentItem?.submenu || [];

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        // Pokaż na mobile (xs), ukryj od 'md' w górę
        display: { xs: "block", md: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={location.pathname} // Podświetlenie na bazie URL
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
      >
        {submenu.map(item => (
          <BottomNavigationAction
            key={item.id}
            label={item.name}
            value={item.path}
            icon={<item.icon />} // Zakładam, że icon to komponent Reacta
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
