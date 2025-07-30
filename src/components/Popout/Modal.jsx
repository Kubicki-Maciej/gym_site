import React, { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function Modal({ onClose, component, setWindowProperty }) {
  function closeWindowFunc() {
    setWindowProperty(false);
  }
  const modalRef = useRef;

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
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <div
        className="mt-10 flex flex-col gap-5 text-white"
        style={{
          display: "flex",
          flexDirection: "column",

          color: "black",
        }}
      >
        <IconButton
          style={{
            placeSelf: "start",
            color: "white",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        {React.cloneElement(component, {
          closeWindowFunc: closeWindowFunc,
        })}
      </div>
    </div>
  );
}
