import { useState, useEffect } from "react";
import GetUsers from "../../../components/User/Component/GetUsers";
import PlanTraining from "../../../components/Trening/PlanTraining";
import { Button } from "@mui/material";
import useUserTraining from "../../../components/Trening/hooks/useTraining";
import SnackbarAlert from "../../../components/Alerts/SnackbarAlert";
import useSnackbarAlerts from "../../../components/Alerts/hooks/useSnackbarAlerts";

// dodajesz trening/i użytkownikowi
export default function UserAddTraining() {
  const { statusAlert, showAlert, handleCloseAlert } = useSnackbarAlerts();

  const [selectedUser, setSelectedUser] = useState(null);
  const [boolUserSelected, setBoolUserSelected] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [trainingData, setTrainingData] = useState(null);

  const { createMultipleTrainings, error, loading } = useUserTraining();

  useEffect(() => {}, [boolUserSelected]);

  const handleUserSelect = user => {
    setSelectedUser(user);
    if (user == null) {
      setBoolUserSelected(false);
    } else {
      setBoolUserSelected(true);
    }
  };

  // Odbierasz dane z PlanTraining po walidacji i kliknięciu "Zapisz trening"
  const handlePlanSave = data => {
    // Tu możesz wysłać dane do API
    alert("Dane poprawne! Możesz wysłać do API.");
  };

  // Odbierasz dane z SingleTraining
  const handleTrainingChange = data => {
    setTrainingData(data);
    // data = { training, exercises }
  };
  const handleEventDataChange = data => {
    setEventData(data);
  };

  // zrobienie walidacji
  // stwórz mi validacje przed wysłaniem
  function handleDataSend() {
    if (!selectedUser) {
      alert("Wybierz użytkownika!");
      return;
    } else if (!eventData || eventData.length === 0) {
      alert("Brak danych wydarzeń treningowych!");
      return;
    } else {
      const dataToSend = {
        idUser: selectedUser.id,
        dates: eventData,
      };

      createMultipleTrainings(dataToSend);
    }
  }

  return (
    <>
      <GetUsers onUserSelect={handleUserSelect} />
      <PlanTraining
        userSelected={boolUserSelected}
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
      {/* <EventCalendar /> */}
    </>
  );
}
