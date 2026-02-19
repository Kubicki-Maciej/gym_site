import React, { useState, useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import ModalCalendarEvent from "components/Modal/ModalCalendarEvent";
import { formatDate } from "utils/scheduleUtils";

export default function EventCalendar({ sendDataTo, dataEvents }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const headerRight = isMobile
    ? "timeGridDay,timeGridWeek,listWeek"
    : "dayGridMonth,timeGridWeek,timeGridDay,listWeek";

  const initialView = isMobile ? "listWeek" : "dayGridMonth";

  const handleDateClick = info => {
    setClickedDate(info.date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    console.log(formData);
    const { date, time, duration, user } = formData;

    const startDate = new Date(date);
    const [hours, minutes] = time.split(":");
    startDate.setHours(Number(hours), Number(minutes), 0, 0);

    const endDate = new Date(startDate.getTime() + duration * 60000);

    const data = {
      idUser: formData.user.id,
      dates: {
        type: formData.isOneTime ? "pojedynczy" : "cykliczne",
        events: generateEventDates(formData),
      },
    };

    console.log(data);
    sendDataTo(data);

    handleCloseModal();
  };

  // const filteredEvents = useMemo(() => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   const endOfWeek = new Date(today);
  //   endOfWeek.setDate(today.getDate() + (7 - today.getDay()));

  //   return events.filter(e => {
  //     const d = new Date(e.start);
  //     return d >= today && d <= endOfWeek;
  //   });
  // }, [events]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView={initialView}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: headerRight,
        }}
        events={dataEvents}
        dateClick={handleDateClick}
        selectable
        navLinks
        height="auto"
        views={{
          listWeek: {
            validRange: {
              start: today,
            },
          },
        }}
      />
      <ModalCalendarEvent
        open={isModalOpen}
        onClose={handleCloseModal}
        initialDate={clickedDate}
        onSave={handleSaveFromModal}
      />
    </div>
  );
}
