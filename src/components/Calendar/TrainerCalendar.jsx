import React, { useState } from "react";
import { Box } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import TrainingCard from "./CalendarComponents/TrainingCard";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { createRoot } from "react-dom/client";

export default function TrainerCalendar() {
  const handleEventClick = selected => {
    // console.log(selected);
    console.log(selected.event.extendedProps.user_i);
    // redirect to training card
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
        events={[
          { title: "trening", date: "2025-11-04T12:00:00", user_i: "12" },
          { title: "trening 1", date: "2025-11-05T12:00:00", user_i: "13" },
          { title: "trening 1", date: "2025-11-05T13:00:00", user_i: "14" },
          { title: "trening 2", date: "2025-11-10T12:00:00", user_i: "15" },
          { title: "trening 3", date: "2025-11-12T12:00:00", user_i: "16" },
          { title: "trening 3", date: "2025-11-30T12:00:00", user_i: "17" },
        ]}
        allDaySlot={false}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
    </Box>
  );
}
function renderEventContent(eventInfo) {
  const container = document.createElement("div");
  const root = createRoot(container);
  root.render(<TrainingCard eventInfo={eventInfo} />);
  return { domNodes: [container] };
}
