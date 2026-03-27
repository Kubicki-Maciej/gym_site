import React from "react";
import { Box, CardMedia, CardContent, Stack } from "@mui/material";
export default function CardExerciseWithPicture({
  image,
  imageAlt = "exercise image",
  children,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 550,
        mx: "auto",
        flexGrow: 1,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "",
      }}
    >
      {image ? (
        <CardMedia
          component="img"
          image={image}
          alt={imageAlt}
          sx={{
            width: "100%",
            height: 180, // 🔥 stała wysokość → ładniejszy grid
            objectFit: "cover",
          }}
        />
      ) : (
        ""
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>{children}</Stack>
      </CardContent>
    </Box>
  );
}
