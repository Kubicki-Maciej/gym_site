import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ExerciseTrainingCard({ exercise, onAdd }) {
  const image = exercise.image || null;

  return (
    <Card
      sx={{
        height: "100%", // 🔥 równa wysokość
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* IMAGE */}
      <CardMedia
        component="img"
        height="120"
        image={image || "https://picsum.photos/300/200"}
      />

      {/* CONTENT */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="subtitle1">{exercise.name}</Typography>

          <Typography variant="body2">{exercise.description}</Typography>
        </Box>

        <IconButton onClick={() => onAdd(exercise)}>
          <AddIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
