import React from "react";
import { Card, CardMedia, CardContent, Stack } from "@mui/material";
import img_stock from "../../mocks/img_stock.jpg";

export default function CardExerciseWithPicture({
  image = img_stock,
  imageAlt = "exercise image",
  children,
}) {
  return (
    <Card sx={{ borderRadius: 3, overflow: "hidden", m: 2 }}>
      <CardMedia component="img" height="240" image={image} alt={imageAlt} />

      <CardContent>
        <Stack spacing={2}>{children}</Stack>
      </CardContent>
    </Card>
  );
}
