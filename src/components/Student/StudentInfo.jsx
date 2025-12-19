import { Box, Card, CardContent, Typography, Stack } from "@mui/material";

export default function StudentInfo({ studentInfo }) {
  if (!studentInfo) {
    return (
      <Typography variant="body2" color="text.secondary">
        Brak danych studenta
      </Typography>
    );
  }

  const { first_name, last_name, email } = studentInfo;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Informacje o studencie
      </Typography>

      <Stack spacing={1}>
        {first_name && (
          <Box>
            <Typography variant="caption" color="text.secondary">
              Imię
            </Typography>
            <Typography variant="body1">{first_name}</Typography>
          </Box>
        )}

        {last_name && (
          <Box>
            <Typography variant="caption" color="text.secondary">
              Nazwisko
            </Typography>
            <Typography variant="body1">{last_name}</Typography>
          </Box>
        )}

        {email && (
          <Box>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1">{email}</Typography>
          </Box>
        )}
      </Stack>
    </>
  );
}
