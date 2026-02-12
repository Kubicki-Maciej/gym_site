import { Box, styled } from "@mui/material";

// Tworzymy komponent, który ma już "wbite" style
export const CenteredRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
