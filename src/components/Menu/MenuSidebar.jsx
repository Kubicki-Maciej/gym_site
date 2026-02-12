import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSidebarItems } from "./hooks/useSidebarItems";
import MenuButton from "./ui/MenuButton";
import { useTheme, useMediaQuery } from "@mui/material";

import MenuNavbarMobile from "./MenuNavbarMobile";

export default function MenuSidebar({ sideBarName }) {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { getItemById } = useSidebarItems();
  const navigate = useNavigate();
  const handleNavigate = path => {
    navigate(path);
  };
  const currentItem = getItemById(sideBarName);
  const submenu = currentItem?.submenu || [];
  // if (isMobile) {
  //   return <MenuNavbarMobile submenu={submenu} onNavigate={handleNavigate} />;
  // }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: 2,
        width: 280,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {submenu.map(item => (
        <MenuButton
          key={item.id}
          name={item.name}
          Icon={item.icon}
          path={item.path}
          onClick={handleNavigate}
        />
      ))}
    </Box>
  );
}
