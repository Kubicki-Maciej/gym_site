import React, { useState } from "react";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";

export default function PopOutWindow({ elementInside, windowOpen }) {
  const [windowOpenState, setWindowOpenState] = useState(windowOpen);

  function closeWindowFunc() {
    ("closeWindowFunc");
    windowOpen;
  }

  ("Jaki jest State okna");
  windowOpen;
  return (
    <Popup
      trigger={<button className="navbarButton redElementButton">Login</button>}
      modal
      nested
      open={windowOpen}
      arrow={false}
      onClose={() => closeWindowFunc()}
    >
      {close => (
        <div className="modal" style={{ width: "50vw", height: "50vh" }}>
          {" "}
          <button
            onClick={() => {
              close();
            }}
          >
            close
          </button>
          <button onClick={closeWindowFunc()}></button>
          {React.cloneElement(elementInside, { windowOpen })}
        </div>
      )}
    </Popup>
  );
}
