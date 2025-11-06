import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function EventCalendar() {
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = selected => {
    const title = prompt("Plese enter a new title for new event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = selected => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="50vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,timeGridDay,listMonth",
            }}
            allDaySlot={false}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            slotMinTime={"8:00:00"}
            slotMaxTime={"22:00:00"}
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={events => setCurrentEvents(events)}
            initialEvents={[
              { id: "12345", title: "TestEvent 1", date: "2025-04-01" },
              { id: "1234", title: "TestEvent 1", date: "2025-04-15" },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
}
