import React, { useState } from "react";
import Model from "react-body-highlighter";
import ModalMuscle from "components/Modal/ModalMuscle";

const colorsListty = [
  "#90caf9",
  "#90caf9",
  "#1976d2",
  "#1976d2",
  "#0d47a1",
  "#0d47a1",
  "#a5d6a7",
  "#a5d6a7",
  "#a5d6a7",
  "#a5d6a7",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#1b5e20",
  "#1b5e20",
  "#1b5e20",
  "#1b5e20",
  "#1b5e20",
  "#ffcc80",
  "#ffcc80",
  "#ed6c02",
  "#ed6c02",
  "#ed6c02",
  "#e65100",
  "#e65100",
  "#e65100",
];

export default function BodyMuscle({ muscleData, colorsList, isFront = true }) {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const checkFront = isFront => (isFront ? "anterior" : "posterior");

  const findMuscle = engName => {
    return muscleData.find(muscle => muscle.name === engName);
  };

  const handleMuscleClick = ({ muscle, data }) => {
    if (data.frequency) {
      setSelectedMuscle(muscle);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMuscle(null);
  };

  return (
    <>
      <Model
        data={muscleData}
        style={{ height: "400px", width: "200px", cursor: "pointer" }}
        onClick={handleMuscleClick}
        type={checkFront(isFront)}
        highlightedColors={colorsListty}
      />
      <ModalMuscle
        open={modalOpen}
        onClose={handleCloseModal}
        muscle={findMuscle(selectedMuscle)}
      />
    </>
  );
}
