import React, { useState, useEffect } from "react";
import axios from "axios";
import GetUsers from "../../../components/User/Component/GetUsers";
import GetTraining from "../../../components/Trening/GetTraining";
import ExerciseList from "../../../components/Exercise/ExerciseList";
import ExerciseMuscleCounter from "../../../components/Exercise/ExerciseMuscleCounter";
import EventTypeSelector from "../../../components/Calendar/EventTypeSelector";
import SingleTraining from "../../../components/Trening/SingleTraining";
import PlanTraining from "../../../components/Trening/PlanTraining";
import { API_URL } from "../../../config";
import EventCalendar from "../../../components/Calendar/EventCalendar";
import { Button } from "@mui/material";
import { el } from "date-fns/locale";
// import useUserTraining from "../../../hooks/useUserTraining";
import useUserTraining from "../../../components/Trening/hooks/useTraining";

// dodajesz trening/i użytkownikowi
export default function UserAddTraining() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [boolUserSelected, setBoolUserSelected] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [trainingData, setTrainingData] = useState(null);

  const { createTreningsToUserApi, error, loading } = useUserTraining();

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
      createTreningsToUserApi(dataToSend);
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

      {/* <EventCalendar /> */}
    </>
  );
}
