import React, { useState } from "react";
import Modal from "./Modal";
export default function Poput({
  component,
  setWindowProperty,
  windowProperty,
}) {

  return (
    <div className="h=screen flex flex-col items-center gap-6 bg-[#14161b]">
      {windowProperty && (
        <Modal
          component={component}
          onClose={() => setWindowProperty(false)}
          setWindowProperty={setWindowProperty}
        />
      )}
    </div>
  );
}
