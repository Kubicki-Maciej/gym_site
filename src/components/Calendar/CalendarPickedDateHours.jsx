import React,  { useState , useEffect} from 'react'
import SingleHour from './CalendarPickedHours/SingleHour';
import axios from 'axios';


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
});

export default function CalendarPickedDateHours({pickedDate}) {

    const [pickedHours , setPickedHours] = useState({ date:"",objectsHours:[]})
    
    useEffect(()=>{
        console.log('zmiana');
        getHoursByDate()
    },[pickedDate])

    async function getHoursByDate(){
        if(pickedDate){
            const newDateString = pickedDate.replace(/\./g, '-');
            console.log(newDateString);
        }else{

        }
        // e.preventDefault()
        client.post('booked/day',{
            day:pickedDate
            // day:'2024-06-07'
        }).then(function (res){
            console.log(res.data);
            setPickedHours({date:pickedDate, objectsHours:res.data})
        })
    }




    return (
        <div style={{
            display:'flex',
            flexDirection: "column",
            listStyle: "none",
            padding:"0",
            margin:"20px"
        }}>
            <p>{pickedDate}</p>
        {pickedHours.objectsHours.map((element) => (
            <SingleHour hour={element.hour} isPicked={element.isBooked} date={pickedDate} idElement={element.id} />
        )
        )}
        </div>
    )
}
