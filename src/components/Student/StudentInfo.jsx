import React from "react";
import { useLocation } from "react-router-dom";

// context czy localstorage ?
// context + nauka
// localstorage upraszcza ?
export default function StudentInfo() {
  const location = useLocation();
  const student = location.state?.student;
  return (
    <div>
      Student name : {student?.id}
      {JSON.stringify(student, null, 2)}
    </div>
  );
}
