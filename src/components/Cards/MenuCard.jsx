import React from "react";
import { Grid, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MenuCard({
  Icon,
  text,
  btnText,
  colorFullBoolean,
  path,
}) {
  const navigate = useNavigate();
  const goPath = () => {
    navigate(path);
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          "&:hover": {
            boxShadow: 6,
            transform: "scale(1.05)",
            transition: "all 0.3s ease",
          },
        }}
      >
        <Icon sx={{ fontSize: 50, color: "error.main", mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          {text}
        </Typography>
        <Button
          variant={colorFullBoolean ? "contained" : "outlined"}
          color="error"
          fullWidth
          onClick={goPath}
        >
          {btnText}
        </Button>
      </Paper>
    </Grid>
  );
}
