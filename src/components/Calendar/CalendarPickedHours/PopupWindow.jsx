import React from "react";
import { useEffect, useState } from "react";
import { useUserContext } from "../../User/context";
import axios from "axios";

export default function PopupWindow({ date, idElement, closeBtn, hour }) {
  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });

  const [id, setId] = useState(idElement);
  const { logged, user } = useUserContext();
  console.log("user");
  console.log(user);

  async function bookDate() {
    if (logged) {
      console.log(id);
      console.log("rezerwacja terminu");
      console.log(user);
      client
        .post("booked/book_treining", {
          idUser: user,
          idDate: id,
        })
        .then(function (res) {
          console.log(res.data);
        });
    }
  }

  if (logged) {
    return (
      <div className="modal">
        <button className="close" onClick={closeBtn}>
          {" "}
          &times;{" "}
        </button>
        <div className="header">
          {" "}
          Trening {date} o godzinie {hour}
        </div>
        <div className="content">
          <button onClick={bookDate}>zarezerwuj date</button>
          {/* user must be logged */}
        </div>
      </div>
    );
  } else {
    return <div> Potrzebna rejestracja do wybrania terminu </div>;
  }
}
