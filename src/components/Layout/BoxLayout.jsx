import { Box } from "@mui/material";

export default function BoxLayout({ children, sx, ...props }) {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 1, md: 2 } }} {...props}>
      {children}
    </Box>
  );
}
