import PlanTraining from "../Trening/PlanTraining";
import { useState, useEffect } from "react";
import SnackbarAlert from "../Alerts/SnackbarAlert";
import useSnackbarAlerts from "../../hooks/useSnackbarAlerts";
import useSelectedUser from "hooks/useSelectedUser";
import { Button } from "@mui/material";
import useTraining from "hooks/useTraining";
import BoxLayout from "components/Layout/BoxLayout";

export default function StudentCreateTraining() {
  const { createMultipleTrainings } = useTraining();
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
    <BoxLayout>
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
    </BoxLayout>
  );
}
