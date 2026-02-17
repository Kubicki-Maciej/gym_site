import { TextField, MenuItem } from "@mui/material";

const MEASUREMENT_OPTIONS = [
  { value: "weight", label: "Waga" },
  { value: "waist", label: "Talia" },
  { value: "chest", label: "Klatka" },
  { value: "biceps", label: "Biceps" },
  { value: "thigh", label: "Udo" },
  { value: "calf", label: "Łydka" },
];

export default function MeasurementSelect({
  value,
  onChange,
  label = "Parametr",
}) {
  return (
    <TextField select fullWidth label={label} value={value} onChange={onChange}>
      {MEASUREMENT_OPTIONS.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

// Eksportuj też opcje gdybyś potrzebował w innym miejscu
export { MEASUREMENT_OPTIONS };
