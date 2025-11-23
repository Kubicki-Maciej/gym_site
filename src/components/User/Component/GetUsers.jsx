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
import api from "../../../api/client";
import SnackbarAlert from "../../Alerts/SnackbarAlert";
import useSnackbarAlerts from "../../Alerts/hooks/useSnackbarAlerts";
import { useUserContext } from "../context";
import useUser from "../hooks/useUser";

export default function GetUsers({ onUserSelect }) {
  const { error, loading, getTrainerStudents } = useUser();
  const userId = localStorage.getItem("user");
  const { user } = useUserContext();
  const { statusAlert, showAlert, handleCloseAlert } = useSnackbarAlerts();
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log("use efekt wczytuje");
    console.log(user.id);
    const fetchUsers = async () => {
      try {
        let fetchedUsers = await getTrainerStudents(user.id);
        if (Array.isArray(fetchedUsers.students)) {
          setUsers(fetchedUsers.students);
          showAlert(
            `Załadowano ${fetchedUsers.length} użytkowników`,
            "success",
            2000
          );
        } else {
          console.warn("Dane z API nie są tablicą:", fetchedUsers);
          setUsers([]);
          showAlert("Błąd formatu danych z serwera", "warning");
        }
      } catch (err) {
        console.error("Błąd pobierania użytkowników:", err);
        showAlert("Nie udało się pobrać użytkowników", "error", 5000);
        setUsers([]);
      }
    };
    if (user) {
      fetchUsers();
    }
  }, []);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await api.get(`user/users`);
  //       setUsers(response);
  //       if (Array.isArray(response)) {
  //         setUsers(response);
  //       } else {
  //         console.error("Dane z API nie są tablicą:", response);
  //         console.log(response);
  //         setUsers([]);
  //       }
  //     } catch (err) {
  //       console.error("Błąd pobierania użytkowników:", err);

  //       setUsers([]);
  //     } finally {
  //     }
  //   };

  //   fetchUsers();
  // }, []);

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
