import { IconButton } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../User/context";

export default function StudentButton({student}){
    const navigate = useNavigate();
    const { setSelectedUserData } = useUserContext();

    const handleViewProfile = () => {
    
        setSelectedUserData(student)
        navigate(`/student/profile`, {
      state: { student: student },
      
    });
  };
    
    return  <IconButton
                size="small"
                color="primary"
                onClick={handleViewProfile}
                title="Wyświetl profil"
              >
                <PersonIcon />
              </IconButton> 
}