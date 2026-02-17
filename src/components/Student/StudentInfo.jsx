import { Box, Paper, Typography, Stack } from "@mui/material";

export default function StudentInfo({ studentInfo }) {
  if (!studentInfo) {
    return (
      <Typography variant="body2" color="text.secondary">
        Brak danych studenta
      </Typography>
    );
  }
  const parsed = JSON.parse(studentInfo);

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Informacje o studencie
      </Typography>

      <Stack spacing={1}>
        {parsed.first_name && (
          <Box>
            <Typography variant="caption" color="text.secondary">
              Imię
            </Typography>
            <Typography variant="body1">{parsed.first_name}</Typography>
          </Box>
        )}

        {parsed.last_name && (
          <Box>
            <Typography variant="caption" color="text.secondary">
              Nazwisko
            </Typography>
            <Typography variant="body1">{parsed.last_name}</Typography>
          </Box>
        )}

        {parsed.email && (
          <Box>
            <Typography variant="body1" color="text.secondary">
              Email {parsed.email}
            </Typography>
            <Typography variant="body1"></Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
