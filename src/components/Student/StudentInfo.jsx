import React from "react";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../User/context";

// context czy localstorage ?
// context + nauka
// localstorage upraszcza ?
export default function StudentInfo() {

  const location = useLocation();
  const student = location.state?.student;

  const {selectedUser} = useUserContext()
  console.log(selectedUser)
  return (
    <div>
      Student name : {student?.id}
      {JSON.stringify(selectedUser, null, 2)}
    </div>
  );
}
