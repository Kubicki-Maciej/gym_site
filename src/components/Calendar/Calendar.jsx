import React, { useState } from 'react';
import CalendarDates from './CalendarDates';
import CalendarPickedDateHours from './CalendarPickedDateHours';


// calendar for booking trenings
export default function Calendar(){
    const [selectedDate , setSelectedDate] = useState(new Date())
    return (
    <div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <CalendarDates selectedDay={setSelectedDate}/>
            <CalendarPickedDateHours pickedDate={selectedDate.toLocaleDateString()}/>
        </div>
    </div>
    )
};

