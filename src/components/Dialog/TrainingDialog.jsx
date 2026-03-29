export function TrainingDialog({ open, onClose, selectedExercises, onSave }) {
  const [name, setName] = useState("");

  const handleSave = () => {
    onSave({
      name,
      exercises: selectedExercises,
    });
    setName("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Twój trening</DialogTitle>

      <DialogContent>
        {/* NAME */}
        <TextField
          fullWidth
          label="Nazwa treningu"
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* LIST */}
        <List>
          {selectedExercises.map(ex => (
            <ListItem key={ex.id}>
              <Typography>{ex.name}</Typography>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button variant="contained" onClick={handleSave} disabled={!name}>
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
}
