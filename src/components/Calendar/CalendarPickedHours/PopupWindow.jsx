import React from 'react'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../User/context';


export default function PopupWindow({date, idElement ,closeBtn, hour}) {
    const [id, setId] = useState(idElement)
    const [userData, setUserData] = useContext(UserContext)
    console.log('userData');
    console.log(userData);

    function bookDate(){
        console.log(id);
        console.log('rezerwacja terminu');
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
            <div> zaloguj sie pierw </div>
        )
    }

}
