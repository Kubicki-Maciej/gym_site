import React, { useState, useEffect, useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import ModalAddCalendarEvent from "components/Modal/ModalAddCalendarEvent";
import ModalCalendarEvent from "components/Modal/ModalCalendarEvent"; // ✅ Nowy modal

export default function EventCalendar({ sendDataTo, dataEvents = [] }) {
  const calendarRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Stan dla modala dodawania
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState(null);

  // ✅ Stan dla modala szczegółów eventu
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [localEvents, setLocalEvents] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentView, setCurrentView] = useState(
    isMobile ? "listWeek" : "dayGridMonth",
  );

  // --- Funkcje Nawigacji ---

  const handlePrev = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    setCurrentTitle(calendarApi.view.title);
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setCurrentTitle(calendarApi.view.title);
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
    setCurrentTitle(calendarApi.view.title);
  };

  const handleViewChange = viewName => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(viewName);
    setCurrentView(viewName);
    setCurrentTitle(calendarApi.view.title);
  };

  // --- Obsługa Zdarzeń ---

  // ✅ Kliknięcie w event - otwórz modal ze szczegółami
  const handleEventClick = clickInfo => {
    const event = clickInfo.event;

    // Przygotuj dane eventu
    const eventData = {
      id: event.id,
      title: event.title,
      start: event.start?.toISOString(),
      end: event.end?.toISOString(),
      extendedProps: event.extendedProps || {},
    };

    setSelectedEvent(eventData);
    setIsEventModalOpen(true);
  };

  // ✅ Zamknij modal szczegółów
  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  // Kliknięcie w datę - otwórz modal dodawania
  const handleDateClick = info => {
    setClickedDate(info.date);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setClickedDate(null);
  };

  function generateEventDates(formData) {
    if (formData.isOneTime) {
      return [{ date: formData.date, duration: formData.duration }];
    } else {
      if (!formData.date || !formData.repeatCount || formData.repeatCount < 1) {
        return [];
      }
      const dates = [];
      for (let i = 0; i < formData.repeatCount; i++) {
        const newDate = new Date(formData.date);
        newDate.setDate(newDate.getDate() + i * 7);
        dates.push({ date: newDate, duration: formData.duration });
      }
      return dates;
    }
  }

  const handleSaveFromModal = formData => {
    if (!formData?.date || !formData?.time || !formData?.user) return;

    const { date, time, duration, user } = formData;
    const startDate = new Date(date);
    const [hours, minutes] = time.split(":");
    startDate.setHours(Number(hours), Number(minutes), 0, 0);
    const endDate = new Date(startDate.getTime() + duration * 60000);

    setLocalEvents(prev => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        title: user.last_name || user.email,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        extendedProps: {
          userId: user.id,
          duration: duration,
          email: user.email,
        },
      },
    ]);

    sendDataTo({
      idUser: formData.user.id,
      dates: {
        type: formData.isOneTime ? "pojedynczy" : "cykliczne",
        events: generateEventDates(formData),
      },
    });

    handleCloseAddModal();
  };

  const allEvents = useMemo(() => {
    return [...dataEvents, ...localEvents];
  }, [dataEvents, localEvents]);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 1, md: 2 } }}>
      {/* --- CUSTOM TOOLBAR MUI --- */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          bgcolor: "background.default",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={2}>
          {/* Rząd 1: Data i Nawigacja */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton onClick={handlePrev} size="small" aria-label="previous">
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>

            <Typography
              variant={isMobile ? "h6" : "h5"}
              component="div"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              {currentTitle}
            </Typography>

            <IconButton onClick={handleNext} size="small" aria-label="next">
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Stack>

          {/* Rząd 2: Przyciski Widoków */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            flexWrap="wrap"
          >
            <Button
              variant="outlined"
              size="small"
              onClick={handleToday}
              startIcon={!isMobile && <CalendarTodayIcon />}
              sx={{ mr: isMobile ? 0 : 2 }}
            >
              Dziś
            </Button>

            <ButtonGroup
              variant="outlined"
              size="small"
              aria-label="view switcher"
            >
              {!isMobile && (
                <>
                  <Button
                    onClick={() => handleViewChange("dayGridMonth")}
                    variant={
                      currentView === "dayGridMonth" ? "contained" : "outlined"
                    }
                  >
                    Miesiąc
                  </Button>
                  <Button
                    onClick={() => handleViewChange("timeGridWeek")}
                    variant={
                      currentView === "timeGridWeek" ? "contained" : "outlined"
                    }
                  >
                    Tydzień
                  </Button>
                </>
              )}

              <Button
                onClick={() => handleViewChange("timeGridDay")}
                variant={
                  currentView === "timeGridDay" ? "contained" : "outlined"
                }
              >
                Dzień
              </Button>

              <Button
                onClick={() => handleViewChange("listWeek")}
                variant={currentView === "listWeek" ? "contained" : "outlined"}
              >
                Lista
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Paper>

      {/* --- KALENDARZ --- */}
      <Box
        sx={{
          "& .fc": { fontFamily: "inherit" },
          "& .fc-list-event": { cursor: "pointer" },
          "& .fc-event": { cursor: "pointer" },
          "& .fc-col-header-cell-cushion": {
            color: theme.palette.text.primary,
            textDecoration: "none",
          },
          "& .fc-daygrid-day-number": {
            color: theme.palette.text.secondary,
            textDecoration: "none",
          },
        }}
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView={isMobile ? "listWeek" : "dayGridMonth"}
          headerToolbar={false}
          events={allEvents}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          datesSet={dateInfo => {
            setCurrentTitle(dateInfo.view.title);
            setCurrentView(dateInfo.view.type);
          }}
          selectable
          navLinks
          height="auto"
          locale="pl"
          buttonText={{
            today: "Dziś",
            month: "Miesiąc",
            week: "Tydzień",
            day: "Dzień",
            list: "Lista",
          }}
        />
      </Box>

      {/* ✅ Modal dodawania eventu */}
      <ModalAddCalendarEvent
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        initialDate={clickedDate}
        onSave={handleSaveFromModal}
      />

      {/* ✅ Modal szczegółów eventu */}
      <ModalCalendarEvent
        open={isEventModalOpen}
        onClose={handleCloseEventModal}
        eventData={selectedEvent}
      />
    </Box>
  );
}
