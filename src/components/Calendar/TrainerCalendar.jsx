import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { Box, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import TrainingCard from "./CalendarComponents/TrainingCard";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useUserContext } from "../User/context";
import useUserTraining from "../../hooks/useUserTraining";

export default function TrainerCalendar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // < 960px

  const { logged, user } = useUserContext();
  const { getUpcomingTrainerWorkouts } = useUserTraining();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchUpcoming() {
      if (!logged || !user?.id) return;

      try {
        setLoading(true);
        const data = await getUpcomingTrainerWorkouts(user.id);
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];

        const mapped = list.map((item, idx) => ({
          id: item.id ?? idx,
          title:
            item.user?.spouse_name ||
            `${item.user?.first_name || ""} ${
              item.user?.last_name || ""
            }`.trim() ||
            `Trening ${item.id}`,
          start: item.training_date || item.created_at,
          ...(item.duration &&
            item.training_date && {
              end: new Date(
                new Date(item.training_date).getTime() + item.duration * 60000
              ).toISOString(),
            }),
          extendedProps: {
            userId: item.user?.id,
            duration: item.duration,
          },
        }));

        if (mounted) setEvents(mapped);
      } catch (err) {
        console.error("Błąd:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUpcoming();
    return () => {
      mounted = false;
    };
  }, [logged, user]);

  // Dynamiczna konfiguracja
  const headerToolbar = isMobile
    ? { left: "prev,next", center: "title", right: "listWeek" }
    : isTablet
    ? {
        left: "prev,today,next",
        center: "title",
        right: "timeGridDay,listWeek",
      }
    : {
        left: "prev,today,next",
        center: "title",
        right: "timeGridWeek,timeGridDay,listWeek",
      };

  const initialView = isMobile ? "listWeek" : "timeGridWeek";

  const renderEventContent = arg => {
    const { event, timeText, view } = arg;

    if (view.type === "timeGridWeek" || view.type === "timeGridDay") {
      return (
        <TrainingCard event={event} timeText={timeText} view={view.type} />
      );
    }

    return (
      <Box
        onClick={() => {
          window.location.href = `/training/details/${event.id}`;
        }}
        sx={{
          cursor: "pointer",
          padding: isMobile ? "4px 8px" : "8px 12px",
          backgroundColor: "#1976d2",
          color: "white",
          borderRadius: 1,
          transition: "all 0.2s ease",
          fontSize: isMobile ? "0.75rem" : "0.875rem",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "#1565c0",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          },
        }}
      >
        <strong>{timeText}</strong> {event.title}
      </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 1 : isTablet ? 1.5 : 2 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView={initialView}
        headerToolbar={headerToolbar}
        validRange={{ start: new Date() }}
        events={events}
        eventContent={renderEventContent}
        allDaySlot={!isMobile}
        slotDuration={isMobile ? "01:00" : "00:30"}
        slotLabelInterval={isMobile ? "01:00" : "00:30"}
        height="auto"
        contentHeight="auto"
      />
    </Box>
  );
}
