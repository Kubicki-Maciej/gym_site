// WeekStrip.jsx
import { Box, Typography, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
// import DayBall from "./DayBall";
import DayBall from "./DayBall";
import useWeekStrip from "hooks/useWeekStrip";

export default function WeekStrip(props) {
  const { days, monthLabel, goPrev, goNext, goToday, selectDate } =
    useWeekStrip(props);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: { xs: 3, sm: 4 },
        px: { xs: 0.5, sm: 1.5 },
        pt: { xs: 1.5, sm: 2 },
        pb: { xs: 1.5, sm: 2.5 },
        // boxShadow: 3,
        width: "100%",
        maxWidth: 550,
        mx: "auto",
        overflow: "hidden",
      }}
    >
      <Typography
        onClick={goToday}
        align="center"
        sx={{
          fontWeight: 600,
          fontSize: { xs: 13, sm: 15 },
          mb: { xs: 1, sm: 2 },
          cursor: "pointer",
          borderRadius: 2,
          py: 0.5,
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: "action.hover",
            color: "primary.main",
          },
        }}
      >
        {monthLabel}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 0, sm: 0.5 }}
        sx={{ width: "100%" }}
      >
        <IconButton
          onClick={goPrev}
          size="small"
          sx={{
            p: { xs: 0.25, sm: 0.5 },
            flexShrink: 0,
          }}
          aria-label="Poprzedni tydzień"
        >
          <ChevronLeft fontSize="small" />
        </IconButton>

        <Stack
          direction="row"
          flex={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            minWidth: 0,
            px: { xs: 0.25, sm: 0.5 },
          }}
        >
          {days.map(day => (
            <DayBall key={day.key} day={day} onSelect={selectDate} />
          ))}
        </Stack>

        <IconButton
          onClick={goNext}
          size="small"
          sx={{
            p: { xs: 0.25, sm: 0.5 },
            flexShrink: 0,
          }}
          aria-label="Następny tydzień"
        >
          <ChevronRight fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}
