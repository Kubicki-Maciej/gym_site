import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

import { useUserContext } from "../context";
import useUser from "../../../hooks/useUser";

export default function GetUsers({ onUserSelect }) {
  const { error, loading, getTrainerStudents } = useUser();
  const userId = localStorage.getItem("user");
  const { user } = useUserContext();

  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let fetchedUsers = await getTrainerStudents(user.id);
        if (Array.isArray(fetchedUsers.students)) {
          setUsers(fetchedUsers.students);
        } else {
          console.warn("Dane z API nie są tablicą:", fetchedUsers);
          setUsers([]);
        }
      } catch (err) {
        console.error("Błąd pobierania użytkowników:", err);

        setUsers([]);
      }
    };
    if (user) {
      fetchUsers();
    }
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
  if (loading) {
    return <CircularProgress size={20} />;
  }

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
