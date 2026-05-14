import React, { useState } from "react";
import TabPanel from "components/TabPanel/TabPanel";
import CreateStudentCodePage from "Screens/Student/CreateStudentCodePage";
import StudentSettings from "Screens/Student/StudentSettings";

export default function UserSettingsScreen() {
  return (
    <TabPanel
      tabObject={[
        // { labelName: "Tab 1", content: <div>Zawartość 1</div> },
        // { labelName: "Tab 2", content: <div>Zawartość 2</div> },
        { labelName: "Kod Studenta", content: <CreateStudentCodePage /> },
        { labelName: "Ustawienia", content: <StudentSettings /> },
      ]}
    />
  );
}
