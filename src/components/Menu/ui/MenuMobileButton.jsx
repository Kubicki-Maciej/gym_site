import { Button } from "@mui/material";

export default function MenuMobileButton({ path, name, Icon, onClick }) {
  return (
    <Button
      startIcon={<Icon />}
      onClick={() => onClick?.(path)}
      sx={{
        // marginTop: 0.5,
        border: "2px solid #1976d2",
        color: "#1976d2",
        backgroundColor: "white",
        margin: "2px",
        padding: "10px 12px",
        borderRadius: "4px",
        fontWeight: 500,
        textTransform: "none",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "transparent",
          borderColor: "#0d47a1",
          boxShadow: "0 8px 16px rgba(13, 71, 161, 0.4)",
        },
        "&:active": {
          boxShadow: "0 4px 8px rgba(13, 71, 161, 0.3)",
        },
      }}
    />
  );
}
