import React, { useState } from "react";
import { Container, Box, Tab, Tabs, Alert, Snackbar } from "@mui/material";
import { CenteredRow } from "../../components/Layout/CentredRow";
import { useStudents } from "../../hooks/useStudents";
import { StudentList } from "../../features/students/components/StudentList";
import CreateNewStudent from "../../features/students/components/CreateNewStudent";
import { AvailableStudentsList } from "../../features/students/components/AvailableStudentsList";
import { useUserContext } from "components/User/context";
import BoxLayout from "components/Layout/BoxLayout";
import AddStudentByCode from "features/students/AddStudentByCode";
import TabPanel from "components/TabPanel/TabPanel";

// function TabPanel({ children, value, index }) {
//   return (
//     <div hidden={value !== index}>
//       {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
//     </div>
//   );
// }

export const TrainerStudentPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { user } = useUserContext();

  const {
    myStudents,
    availableStudents,
    loading,
    error,
    addStudentToTrainer,
    removeStudentFromTrainer,
    refetch,
  } = useStudents(user.id);

  const handleAddStudent = async studentId => {
    const result = await addStudentToTrainer(studentId);
    if (result.success) {
      setSnackbar({
        open: true,
        message: "Student dodany pomyślnie!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: result.error,
        severity: "error",
      });
    }
  };

  const handleRemoveStudent = async studentId => {
    const result = await removeStudentFromTrainer(studentId);
    if (result.success) {
      setSnackbar({
        open: true,
        message: "Student usunięty",
        severity: "info",
      });
    } else {
      setSnackbar({
        open: true,
        message: result.error,
        severity: "error",
      });
    }
  };

  const myStudentIds = myStudents.map(s => s.id);

  return (
    <TabPanel
      tabObject={[
        {
          labelName: `Moi studenci (${myStudents.length})`,
          content: (
            <StudentList
              students={myStudents}
              loading={loading}
              onRemoveStudent={handleRemoveStudent}
            />
          ),
        },
        {
          labelName: `Stwórz Studenta`,
          content: (
            <CenteredRow>
              <CreateNewStudent refetchStudent={refetch} />
            </CenteredRow>
          ),
        },
        {
          labelName: `Dostępni Studenci (${availableStudents.length})`,
          content: (
            <AvailableStudentsList
              students={availableStudents}
              loading={loading}
              onAddStudent={handleAddStudent}
              myStudentIds={myStudentIds}
            />
          ),
        },
        {
          labelName: `Dodaj z kodu `,
          content: <AddStudentByCode />,
        },
      ]}
    />
  );
};
