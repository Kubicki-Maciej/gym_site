import React from "react";
import useUserTraining from "../../../hooks/useUserTraining";
import Searcher from "../../../components/Core/Searcher";
import { API_URL } from "../../../config";
import { useState } from "react";

export default function UserProfile() {
  const [training, setTraining] = useState(null);
  return (
    <div>
      dodaj trening do danego treningu 1 dodaj treing
      <Searcher
        dataOutput={setTraining}
        labelName={"Wybierz Trening"}
        apiAdress={`${API_URL}training/all`}
      />
    </div>
  );
}
