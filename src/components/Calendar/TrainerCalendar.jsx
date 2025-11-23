import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import TrainingCard from "./CalendarComponents/TrainingCard";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../User/context";
import useUserTraining from "../Trening/hooks/useTraining";

export default function TrainerCalendar() {
  const navigate = useNavigate();
  const { logged, user } = useUserContext();
  const {
    getUpcomingTrainerWorkouts,
    loading: hookLoading,
    error: hookError,
  } = useUserTraining();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchUpcoming() {
      if (!logged || !user?.id) {
        return;
      }

      try {
        setLoading(true);
        const data = await getUpcomingTrainerWorkouts(user.id);

        // normalize response: handle { results: [...] } or array
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];
        const mapped = list.map((item, idx) => {
          // map your new API shape:
          // { id, user: { id, first_name, last_name, spouse_name, email },
          //   user_exercises, created_at, training_date, duration }

          // build title from user name or exercises
          const userName =
            item.user?.spouse_name ||
            `${item.user?.first_name || ""} ${
              item.user?.last_name || ""
            }`.trim() ||
            (Array.isArray(item.user_exercises) && item.user_exercises.length
              ? item.user_exercises.join(", ")
              : `Trening ${item.id}`);

          const eventObj = {
            id: item.id ?? idx,
            title: userName,
            // Use training_date (when the training is scheduled)
            start: item.training_date || item.created_at || undefined,
            // If duration is provided, calculate end time
            ...(item.duration &&
              item.training_date && {
                end: new Date(
                  new Date(item.training_date).getTime() + item.duration * 60000
                ).toISOString(),
              }),
            // preserve user id
            user_i: item.user?.id ?? item.user ?? undefined,
            // attach navigation handler (created inside Router context)
            goToTraining: publicId => navigate(`/training/details/${publicId}`),
            duration: item.duration,
          };

          return eventObj;
        });

        if (mounted) setEvents(mapped);
      } catch (err) {
        console.error("Błąd pobierania nadchodzących treningów:", err);
        // keep defaults on error
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUpcoming();

    return () => {
      mounted = false;
    };
  }, [logged, user]);

  const handleEventClick = selected => {
    // redirect to training card or open details
    console.log("Event clicked:", selected.event);
  };

  return (
    <Box>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,today,next ",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        validRange={{
          start: new Date(),
        }}
        events={events}
        allDaySlot={false}
        eventContent={({ event, timeText }) => (
          <TrainingCard event={event} timeText={timeText} />
        )}
        eventClick={handleEventClick}
      />
    </Box>
  );
}
