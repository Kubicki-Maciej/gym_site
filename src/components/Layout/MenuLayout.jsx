import { Box } from "@mui/material";
import MenuSidebar from "../../components/Menu/MenuSidebar";
import MenuMobileBottom from "../../components/Layout/Navbar/MenuMobileButton";
import MenuRoutes from "../../router/MenuRoutes";

export default function MenuLayout({ sideBarName }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <MenuSidebar sideBarName={sideBarName} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 0, md: 3 },
          pb: { xs: "56px", md: 3 },
          width: { md: `calc(100% - 280px)` },
        }}
      >
        <MenuRoutes sideBarName={sideBarName} />
      </Box>
      <MenuMobileBottom sideBarName={sideBarName} />
    </Box>
  );
}
