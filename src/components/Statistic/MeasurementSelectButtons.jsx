// components/MeasurementSelect.jsx
import { ToggleButtonGroup, ToggleButton, Box, Tooltip } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StraightenIcon from "@mui/icons-material/Straighten";

const MEASUREMENT_OPTIONS = [
  { value: "weight", label: "Waga", icon: FitnessCenterIcon },
  { value: "waist", label: "Talia", icon: StraightenIcon },
  { value: "chest", label: "Klatka", icon: StraightenIcon },
  { value: "biceps", label: "Biceps", icon: StraightenIcon },
  { value: "thigh", label: "Udo", icon: StraightenIcon },
  { value: "calf", label: "Łydka", icon: StraightenIcon },
];

export default function MeasurementSelectButtons({ value, onChange }) {
  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      orientation="vertical"
      sx={{
        "& .MuiToggleButton-root": {
          py: 1.5,
          px: 2,
          justifyContent: "flex-start",
          gap: 1,
        },
      }}
    >
      {MEASUREMENT_OPTIONS.map(option => (
        <ToggleButton key={option.value} value={option.value}>
          <option.icon fontSize="small" />
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export { MEASUREMENT_OPTIONS };
