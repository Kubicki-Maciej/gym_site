import React from 'react'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../User/context';
import axios from 'axios';



export default function PopupWindow({date, idElement ,closeBtn, hour}) {
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000/",
    });
    
    const [id, setId] = useState(idElement)
    const [userData, setUserData] = useContext(UserContext)
    console.log('userData');
    console.log(userData);


    async function bookDate(){

        if(userData){
            console.log(id);
            console.log('rezerwacja terminu');
            console.log(userData);
            client.post('booked/book_treining',{
                idUser: userData.userData,
                idDate:id
            }).then(function (res){
                console.log(res.data);
                
            })

        }
        
    }
    
    if(userData.logged){
        return (
            <div className="modal">        
                <button className="close" onClick={closeBtn}> &times; </button>  
                <div className="header"> Trening {date} o godzinie {hour}</div> 
                <div className="content">     

                    <button onClick={bookDate}>zarezerwuj date</button> 
                    {/* user must be logged */}
                </div>
            </div>    
        )
    }else{
        return(
            <div> Potrzebna rejestracja do wybrania terminu </div>
        )
    }

}
