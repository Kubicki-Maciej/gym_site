import React from "react";
import { Box } from "@mui/system";
import MenuMobileButton from "./ui/MenuMobileButton";

export default function MenuNavbarMobile({ submenu, onNavigate }) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "2rem", // 2rem nad footerami/dnem
        left: "2rem",
        right: "2rem",
        height: "80px",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {submenu.map(item => (
        <MenuMobileButton
          key={item.id}
          name={item.name}
          Icon={item.icon}
          path={item.path}
          onClick={onNavigate}
        />
      ))}
    </Box>
  );
}
