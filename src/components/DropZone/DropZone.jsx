import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";

const DropZone = ({ children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "selected-training",
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        minHeight: 200,
        bgcolor: isOver ? "grey.200" : "transparent",
        transition: "0.2s",
      }}
    >
      {children}
    </Box>
  );
};

export default DropZone;
