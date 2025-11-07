import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function TrainingCard({ eventInfo }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ margin: "0" }}>
          {eventInfo.timeText} {eventInfo.event.extendedProps.user_i}
        </p>
        <p style={{ margin: "0" }}>{eventInfo.event.title} </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
    </div>
  );
}
