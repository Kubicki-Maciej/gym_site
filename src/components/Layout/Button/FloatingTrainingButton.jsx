import { Badge, Fab } from "@mui/material";
import { FitnessCenter } from "@mui/icons-material";
export default function FloatingTrainingButton({ count, onClick }) {
  if (count === 0) return null;

  return (
    <Badge
      badgeContent={count}
      color="secondary"
      sx={{
        position: "fixed",
        bottom: 80,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Fab color="primary" onClick={onClick}>
        <FitnessCenter />
      </Fab>
    </Badge>
  );
}
