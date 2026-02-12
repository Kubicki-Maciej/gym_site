import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSidebarItems } from "./hooks/useSidebarItems";
import MenuButton from "./ui/MenuButton";

export default function MenuSidebar({ sideBarName }) {
  const { getItemById } = useSidebarItems();
  const navigate = useNavigate();

  const currentItem = getItemById(sideBarName);
  const submenu = currentItem?.submenu || [];

  return (
    <Box
      sx={{
        // Ukryj na mobile (xs), pokaż od 'md' w górę
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        gap: 1,
        padding: 2,
        width: 280,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        borderRight: "1px solid #e0e0e0", // Opcjonalnie: granica
      }}
    >
      {submenu.map(item => (
        <MenuButton
          key={item.id}
          name={item.name}
          Icon={item.icon}
          path={item.path}
          onClick={path => navigate(path)}
        />
      ))}
    </Box>
  );
}
