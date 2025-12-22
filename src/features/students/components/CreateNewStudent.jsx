import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useStudents } from "../hooks/useStudents";
import { StatusAlertService } from "react-status-alert";

export default function CreateNewStudent({ onStudentCreated }) {
  const { error, loading, createStudentToTrainer } = useStudents();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const result = await createStudentToTrainer(
      {
        first_name: form.first_name,
        last_name: form.last_name,
        email: `${form.first_name}_${form.last_name}@${Date.now()}.com`,
      },
      () => {
        // Po pomyślnym utworzeniu
        setForm({ first_name: "", last_name: "" });
        StatusAlertService.showSuccess(
          `Utworzono studenta: ${form.first_name} ${form.last_name}`
        );

        // Wywołaj callback z parent komponentu
        if (onStudentCreated) {
          onStudentCreated();
        }
      }
    );

    // Obsługa błędów
    if (!result.success && result.error) {
      StatusAlertService.showError(result.error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Imię"
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        required
      />

      <TextField
        label="Nazwisko"
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Tworzenie..." : "Dodaj studenta"}
      </Button>
    </Box>
  );
}
