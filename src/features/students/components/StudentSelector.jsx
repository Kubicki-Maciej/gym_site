import { useState } from "react";
import { useMyStudents } from "hooks/useStudents";
import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";
import { getUserLabel } from "utils/userUtils";
import { Autocomplete, TextField } from "@mui/material";

export default function StudentSelector({ setSelectedUser, error, onSelect }) {
  const [pickedStudent, setPickedStudent] = useState(null);
  const { myStudents, isLoading, isError, error: queryError } = useMyStudents();

  return (
    <QueryStateHandler
      isLoading={isLoading}
      isError={isError}
      error={queryError}
    >
      <Autocomplete
        disablePortal
        options={myStudents || []}
        getOptionLabel={option => getUserLabel(option)}
        value={pickedStudent}
        onChange={(e, newValue) => {
          setPickedStudent(newValue);
          setSelectedUser(newValue);
          onSelect?.();
        }}
        renderInput={params => (
          <TextField
            {...params}
            label="Użytkownik"
            fullWidth
            error={error}
            helperText={error ? "Wybierz użytkownika" : ""}
          />
        )}
      />
    </QueryStateHandler>
  );
}
