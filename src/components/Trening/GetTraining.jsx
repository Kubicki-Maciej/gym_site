import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import axios from "axios";

export default function GetTraining({ onTrainingSelect }) {
  const [training, setTraining] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/training/all");

        if (Array.isArray(response.data)) {
          setTraining(response.data);
        } else {
          console.error("Dane z API nie są tablicą:", response.data);
          console.log(response.data);
          setTraining([]);
          setError("Błąd formatu danych z serwera");
        }
      } catch (err) {
        console.error("Błąd pobierania użytkowników:", err);
        setError("Nie udało się pobrać użytkowników.");
        setTraining([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTraining(newValue);
    if (onTrainingSelect) {
      onTrainingSelect(newValue);
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Autocomplete
        fullWidth
        options={training}
        getOptionLabel={training => {
          const name = training.name?.trim() || "";
          const description = training.last_name?.trim() || "";
          return name || description || "bez nazwy";
          //   return fullName || user.email || "Nieznany użytkownik";
        }}
        loading={loading}
        value={selectedTraining}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        noOptionsText="Brak wyników"
        renderInput={params => (
          <TextField
            {...params}
            label="Wybierz trening"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}
