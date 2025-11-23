import React, { useState } from "react";
import SingleTraining from "./SingleTraining";
import EventTypeSelector from "../Calendar/EventTypeSelector";

export default function PlanTraining({
  userSelected,
  onTrainingChange,
  onEventDataChange,
}) {
  const [trainingData, setTrainingData] = useState([]);
  const [trainingType, setTrainingType] = useState("single");

  {
    /* Połaczenie event type seletor z single training  
      a) dla pojedynczego tylko jeden trening format danych 
        -> user, data_training, training or new training jeżeli zostałe dodane ćwiczenia których wcześniej nie było wtedy nazwa treningu to training_user_data
      b) dla formatu tygodnia wybranie danych dni, ustawienie godziny rozpoczecia treningu w danych dniach.
        -> user, wybrane dni 
        opcja:
          - dodanie treningu w konkretny dzień
          - dodanie cykliczne treningow czyli 2 dni wybrane a treningów 3 ...
      */
  }
  return (
    <div>
      <EventTypeSelector
        onChange={onEventDataChange}
        setTrainigType={setTrainingType}
      />
    </div>
  );
}
