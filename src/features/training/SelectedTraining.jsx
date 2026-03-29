import { Box, Typography, IconButton, List, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SelectedTraining = ({ exercises, onRemove }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Wybrane ćwiczenia
      </Typography>

      <List>
        {exercises.map(ex => (
          <ListItem
            key={ex.id}
            secondaryAction={
              <IconButton onClick={() => onRemove(ex.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            {ex.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SelectedTraining;
