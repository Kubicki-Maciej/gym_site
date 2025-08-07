// import React, { useState } from "react";
// import {
//   Box,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   TextField,
//   Checkbox,
//   FormGroup,
//   Button,
//   MenuItem,
// } from "@mui/material";
// import {
//   LocalizationProvider,
//   DatePicker,
//   TimePicker,
// } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// const weekDays = [
//   { label: "Poniedziałek", value: 1 },
//   { label: "Wtorek", value: 2 },
//   { label: "Środa", value: 3 },
//   { label: "Czwartek", value: 4 },
//   { label: "Piątek", value: 5 },
//   { label: "Sobota", value: 6 },
//   { label: "Niedziela", value: 0 },
// ];

// export default function EventTypeSelector({ onChange }) {
//   const [eventType, setEventType] = useState("cykliczne");
//   const [selectedDays, setSelectedDays] = useState([]);
//   const [startTime, setStartTime] = useState(null);
//   const [duration, setDuration] = useState("");
//   const [cycles, setCycles] = useState("");
//   const [singleDate, setSingleDate] = useState(null);

//   const handleDayChange = day => {
//     setSelectedDays(prev =>
//       prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
//     );
//   };

//   // Możesz przekazać dane do rodzica przez onChange
//   React.useEffect(() => {
//     if (eventType === "cykliczne") {
//       onChange?.({
//         type: "cykliczne",
//         days: selectedDays,
//         time: startTime,
//         duration,
//         cycles,
//       });
//     } else {
//       onChange?.({
//         type: "jednorazowe",
//         date: singleDate,
//       });
//     }
//   }, [
//     eventType,
//     selectedDays,
//     startTime,
//     duration,
//     cycles,
//     singleDate,
//     onChange,
//   ]);

//   return (
//     <Box sx={{ mb: 2 }}>
//       <FormControl>
//         <FormLabel>Typ wydarzenia</FormLabel>
//         <RadioGroup
//           row
//           value={eventType}
//           onChange={e => setEventType(e.target.value)}
//         >
//           <FormControlLabel
//             value="cykliczne"
//             control={<Radio />}
//             label="Cykliczne"
//           />
//           <FormControlLabel
//             value="jednorazowe"
//             control={<Radio />}
//             label="Jednorazowe"
//           />
//         </RadioGroup>
//       </FormControl>

//       {eventType === "cykliczne" && (
//         <Box sx={{ mt: 2 }}>
//           <FormLabel>Wybierz dni tygodnia</FormLabel>
//           <FormGroup row>
//             {weekDays.map(day => (
//               <FormControlLabel
//                 key={day.value}
//                 control={
//                   <Checkbox
//                     checked={selectedDays.includes(day.value)}
//                     onChange={() => handleDayChange(day.value)}
//                   />
//                 }
//                 label={day.label}
//               />
//             ))}
//           </FormGroup>
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <TimePicker
//               label="Godzina rozpoczęcia"
//               value={startTime}
//               onChange={setStartTime}
//               renderInput={params => (
//                 <TextField {...params} sx={{ mt: 2, mr: 2 }} />
//               )}
//             />
//           </LocalizationProvider>
//           <TextField
//             label="Czas trwania (minuty)"
//             type="number"
//             value={duration}
//             onChange={e => setDuration(e.target.value)}
//             sx={{ mt: 2, mr: 2 }}
//           />
//           <TextField
//             label="Ilość cykli (tygodni)"
//             type="number"
//             value={cycles}
//             onChange={e => setCycles(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//         </Box>
//       )}

//       {eventType === "jednorazowe" && (
//         <Box sx={{ mt: 2 }}>
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//               label="Data wydarzenia"
//               value={singleDate}
//               onChange={setSingleDate}
//               renderInput={params => <TextField {...params} />}
//             />
//           </LocalizationProvider>
//         </Box>
//       )}
//     </Box>
//   );
// }
