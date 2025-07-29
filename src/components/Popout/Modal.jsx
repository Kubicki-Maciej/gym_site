import React, { useRef } from "react";

export default function Modal({ onClose, component, setWindowProperty }) {
  function closeWindowFunc() {
    setWindowProperty(false);
  }
  const modalRef = useRef;
  console.log("modal on");

  const closeModal = e => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
      }}
      //   className="fixed insent-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <button
        style={{
          marginTop: "2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          color: "white",
        }}
        onClick={onClose}
      >
        X
      </button>
      {React.cloneElement(component, {
        closeWindowFunc: closeWindowFunc,
      })}
    </div>
  );
}
