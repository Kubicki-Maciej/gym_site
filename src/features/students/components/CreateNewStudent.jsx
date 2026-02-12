import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useStudents } from "../hooks/useStudents";
import { StatusAlertService } from "react-status-alert";

export default function CreateNewStudent({ refetchStudent }) {
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
          `Utworzono studenta: ${form.first_name} ${form.last_name}`,
        );

        if (refetchStudent) {
          refetchStudent();
        }
      },
    );

    if (!result.success && result.error) {
      StatusAlertService.showError(result.error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center", // WAŻNE: To wyśrodkuje elementy wewnątrz, gdy będą węższe niż kontener
        width: "100%", // Opcjonalnie: upewnij się, że kontener zajmuje dostępne miejsce
        margin: "0 auto", // Opcjonalnie: wyśrodkowuje cały formularz na stronie
      }}
    >
      <TextField
        label="Imię"
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        required
        // Responsywna szerokość:
        sx={{ width: { xs: "80%", sm: "50%" } }}
      />

      <TextField
        label="Nazwisko"
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        required
        // To samo tutaj:
        sx={{ width: { xs: "80%", sm: "50%" } }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        // Przycisk też może mieć taką szerokość dla spójności:
        sx={{ width: { xs: "80%", sm: "50%" } }}
      >
        {loading ? "Tworzenie..." : "Dodaj studenta"}
      </Button>
    </Box>
  );
}
