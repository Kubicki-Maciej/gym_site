import React, { useState } from 'react'
import Calendar from 'react-calendar';


import 'react-calendar/dist/Calendar.css';


export default function CalendarDates({selectedDay}) {
    const [pickedDate, setPickedDate] = useState(new Date())
    
    
    
    const handleDateChange = (date) => {
    selectedDay(date);
    };

    return (
    <div style={{
        display:"flex",
        alignItems:"center"
    }}>
        <Calendar value={pickedDate}   onChange={handleDateChange}/>
    </div>
    )
}
