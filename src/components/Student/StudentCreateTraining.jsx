import PlanTraining from "../Trening/PlanTraining";
import { useState, useEffect } from "react";
import useUserTraining from "../../hooks/useUserTraining";
import SnackbarAlert from "../Alerts/SnackbarAlert";
import useSnackbarAlerts from "../../hooks/useSnackbarAlerts";
import useSelectedUser from "hooks/useSelectedUser";
import { Button } from "@mui/material";

export default function StudentCreateTraining() {
  const { createMultipleTrainings, error, loading } = useUserTraining();
  const { statusAlert, showAlert, handleCloseAlert } = useSnackbarAlerts();
  const [eventData, setEventData] = useState(null);
  const [trainingData, setTrainingData] = useState(null);
  const { selectedUser } = useSelectedUser();

  const handleTrainingChange = data => {
    setTrainingData(data);
    // data = { training, exercises }
  };
  const handleEventDataChange = data => {
    setEventData(data);
  };
  function handleDataSend() {
    if (!eventData || eventData.length === 0) {
      showAlert("Brak danych wydarzeń treningowych!");
      return;
    } else {
      const dataToSend = {
        idUser: selectedUser,
        dates: eventData,
      };
      showAlert("Trening dodany");
      createMultipleTrainings(dataToSend);
    }
  }

  return (
    <>
      <PlanTraining
        userSelected={true}
        onTrainingChange={handleTrainingChange}
        onEventDataChange={handleEventDataChange}
      />
      <Button onClick={handleDataSend}>Wyślij trening</Button>
      <SnackbarAlert
        open={statusAlert.open}
        onClose={handleCloseAlert}
        statusAlert={statusAlert.severity}
        message={statusAlert.message}
      />
    </>
  );
}
