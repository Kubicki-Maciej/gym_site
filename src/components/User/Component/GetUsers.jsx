import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../../config";

export default function GetUsers({ onUserSelect }) {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}user/all_users`);

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Dane z API nie są tablicą:", response.data);
          console.log(response.data);
          setUsers([]);
          setError("Błąd formatu danych z serwera");
        }
      } catch (err) {
        console.error("Błąd pobierania użytkowników:", err);
        setError("Nie udało się pobrać użytkowników.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedUser(newValue);
    if (onUserSelect) {
      onUserSelect(newValue);
    }
  };

  const filterUsers = (options, state) => {
    const input = state.inputValue.toLowerCase();

    return options.filter(user => {
      const first = user.first_name?.toLowerCase() || "";
      const last = user.last_name?.toLowerCase() || "";
      return first.includes(input) || last.includes(input);
    });
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
        options={users}
        getOptionLabel={user => {
          const first = user.first_name?.trim() || "";
          const last = user.last_name?.trim() || "";
          const fullName = `${first} ${last}`.trim();
          return fullName || user.email || "Nieznany użytkownik";
        }}
        loading={loading}
        value={selectedUser}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
        filterOptions={filterUsers}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        noOptionsText="Brak wyników"
        renderInput={params => (
          <TextField
            {...params}
            label="Wybierz użytkownika"
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
