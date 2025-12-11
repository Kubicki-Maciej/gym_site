import { Box, useMediaQuery, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { pl } from "date-fns/locale";

import { useTrainingSchedule } from "../../hooks/useTrainingSchedule";

import ScheduleTypeSelector from "./ScheduleTypeSelector";
import CyclicScheduleForm from "./CyclicScheduleForm";
import SingleEventForm from "./SingleEventForm";

export default function TrainingSchedulePicker({
  onChange,
  setTrainigType,
  viewMode = "auto",
}) {
  const theme = useTheme();
  const isScreenMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile =
    viewMode === "mobile" || (viewMode === "auto" && isScreenMobile);

  const {
    eventType,
    selectedDays,
    cycles,
    singleDate,
    singleTime,
    singleDuration,
    validationError,
    setEventType,
    setCycles,
    setSingleDate,
    setSingleDuration,
    handleDayToggle,
    handleCyclicTimeChange,
    handleCyclicDurationChange,
    handleSingleTimeChange,
  } = useTrainingSchedule({ onChange, setTrainigType });

  return (
    <Box sx={{ mb: 2 }}>
      <ScheduleTypeSelector
        value={eventType}
        onChange={setEventType}
        isMobile={isMobile}
      />

      {/* Jeden LocalizationProvider dla całego formularza */}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
        {eventType === "cykliczne" ? (
          <CyclicScheduleForm
            isMobile={isMobile}
            selectedDays={selectedDays}
            cycles={cycles}
            validationError={validationError}
            onDayToggle={handleDayToggle}
            onTimeChange={handleCyclicTimeChange}
            onDurationChange={handleCyclicDurationChange}
            onCyclesChange={setCycles}
          />
        ) : (
          <SingleEventForm
            isMobile={isMobile}
            singleDate={singleDate}
            singleTime={singleTime}
            singleDuration={singleDuration}
            onDateChange={setSingleDate}
            onTimeChange={handleSingleTimeChange}
            onDurationChange={setSingleDuration}
          />
        )}
      </LocalizationProvider>
    </Box>
  );
}
