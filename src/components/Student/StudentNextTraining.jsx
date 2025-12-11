import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserUpcomingTraining from "../../features/users/hooks/useUserUpcomingTraining";
import { useUserContext } from "../User/context";

import { CircularProgress, Alert, Box } from "@mui/material";

export default function StudentNextTraining() {
  const navigate = useNavigate();
  const { selectedUser } = useUserContext();
  const { loading, trainingList } = useUserUpcomingTraining(selectedUser?.id);

  useEffect(() => {
    if (trainingList && trainingList.length > 0) {
      navigate(`/training/details/${trainingList[0].id}?source=profileUser`);
    }
  }, [trainingList, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!trainingList || trainingList.length === 0) {
    return <Alert severity="info">Brak zaplanowanych treningów</Alert>;
  }

  return null;
}
