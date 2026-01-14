import React, { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import api from "../../api/client";

export default function Searcher({ dataOutput, apiAdress, labelName }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      // 👇 Zastąp fetch na api.get
      const data = await api.get(apiAdress);
      setExercises(data || []);
    } catch (err) {
      setError(err.message || "Błąd pobierania danych");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [apiAdress]); // 👈 Dodaj apiAdress do dependency array

  function handleChange(event, value) {
    dataOutput(value);
  }
  return (
    <>
      {loading ? (
        <p>Ładowanie danych...</p>
      ) : error ? (
        <p>Błąd: {error}</p>
      ) : (
        <Autocomplete
          freeSolo
          onChange={handleChange}
          options={exercises}
          getOptionLabel={option => option.name}
          renderInput={params => (
            <TextField
              {...params}
              label={labelName}
              variant="outlined"
              fullWidth
            />
          )}
        />
      )}
    </>
  );
}
