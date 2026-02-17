// components/MenuMobileBottom.jsx
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebarItems } from "../../../hooks/useSidebarItems";

export default function MenuMobileBottom({ sideBarName }) {
  const { getItemById } = useSidebarItems();
  const navigate = useNavigate();
  const location = useLocation();

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
        display: { xs: "block", md: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={location.pathname}
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
        sx={{
          // Kluczowe - pozwól na scroll gdy nie mieści się
          overflowX: "auto",
          justifyContent: "flex-start",

          // Ukryj scrollbar wizualnie
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {submenu.map(item => (
          <BottomNavigationAction
            key={item.id}
            value={item.path}
            icon={<item.icon />}
            sx={{
              // Zmniejsz minimalną szerokość
              minWidth: "auto",
              // Równomiernie rozłóż w dostępnej przestrzeni
              flex: `1 1 ${100 / submenu.length}%`,
              // Zmniejsz padding
              px: 0.5,

              // Zmniejsz ikonę jeśli dużo elementów
              "& .MuiSvgIcon-root": {
                fontSize: submenu.length > 5 ? "1.2rem" : "1.5rem",
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
