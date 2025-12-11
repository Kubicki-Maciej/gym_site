// src/components/trainingSchedule/ScheduleTypeSelector.jsx
import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function ScheduleTypeSelector({ value, onChange, isMobile }) {
  return (
    <FormControl>
      <FormLabel>Typ wydarzenia</FormLabel>
      <RadioGroup
        row={!isMobile} // na mobile w kolumnie, na desktopie w wierszu
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <FormControlLabel
          value="cykliczne"
          control={<Radio />}
          label="Cykliczne"
        />
        <FormControlLabel
          value="jednorazowe"
          control={<Radio />}
          label="Jednorazowe"
        />
      </RadioGroup>
    </FormControl>
  );
}
