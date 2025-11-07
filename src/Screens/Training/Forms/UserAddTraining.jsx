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

// dodajesz trening/i użytkownikowi
export default function UserAddTraining() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [boolUserSelected, setBoolUserSelected] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [trainingData, setTrainingData] = useState(null);

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

  const sendTrainingToApi = async dataToSend => {
    try {
      const response = await fetch(`${API_URL}/training/create_training`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Błąd wysyłania na serwer");
      await response.json();
      // successMessage("Trening utworzony pomyślnie!");
    } catch (error) {
      console.error(error);
      // errorMessage("Nie udało się utworzyć treningu.");
    }
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
  const handleDataSend = () => {
    console.log("eventData");
    console.log(eventData);
    console.log("trainingData");
    console.log(trainingData);
    console.log("selectedUser");
    console.log(selectedUser);
  };

  return (
    <div>
      <ExerciseMuscleCounter exercises={exercises} />
      <GetUsers onUserSelect={handleUserSelect} />
      <PlanTraining
        userSelected={boolUserSelected}
        onTrainingChange={handleTrainingChange}
        onEventDataChange={handleEventDataChange}
      />
      <Button onClick={handleDataSend}>Wyślij trening</Button>

      <EventCalendar />

      <pre>{JSON.stringify(boolUserSelected, null, 2)}</pre>
      <pre>{JSON.stringify(eventData, null, 2)}</pre>
      <pre>{JSON.stringify(trainingData, null, 2)}</pre>
    </div>
  );
}
