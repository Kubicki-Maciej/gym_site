import React, { useState, useEffect } from 'react';

export default function Notification({ text ,openNotification,  setOpenNotification}){
  
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {    
    if (openNotification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setOpenNotification(false)
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [openNotification, setOpenNotification]);

  return isVisible ? <p>{text}</p> : null;
};
