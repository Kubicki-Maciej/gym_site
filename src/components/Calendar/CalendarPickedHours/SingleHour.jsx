import React from 'react'
import Popup from 'reactjs-popup';
import "./style.css";
import PopupWindow from './PopupWindow';

const contentStyle = { background: '#f7efef' };
const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { color: '#000' }; // style for an svg element


export default function SingleHour({hour, isPicked, date, idElement}) {


    if(isPicked){
        return (
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                // alignItems:"center",
                padding: "10px",
                borderBottom:"1px solid #ccc",
                pointerEvents: 'none', 
                opacity: "0.5"
                
            }}>
                {hour}
            </div>
          )
    }else{
        return (
            <Popup trigger={
            // {userData.logged ?
            (<div style={{
                display:"flex",
                justifyContent:"space-between",
                // alignItems:"center",
                padding: "10px",
                borderBottom:"1px solid #ccc",      
            }}>
                {hour}
            </div>)

            } 
            modal contentStyle={contentStyle} overlayStyle={overlayStyle} arrowStyle={arrowStyle}>
                {/* <div style={{height:"200px", width:"200px", backgroundColor:"red"}}>
                </div> */}
                 {close => (    
                    <PopupWindow idElement={idElement} date={date} closeBtn={close} hour={hour} />  
                    
            )}
            </Popup>
          )
    }


}
