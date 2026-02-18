import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  Stack,
  Typography,
  Grid,
  Tab,
  Tabs,
  Alert,
  Snackbar,
} from "@mui/material";
import { CenteredRow } from "../../components/Layout/CentredRow";
import { useStudents } from "../../hooks/useStudents";
import { StudentList } from "../../features/students/components/StudentList";
import CreateNewStudent from "../../features/students/components/CreateNewStudent";
import { AvailableStudentsList } from "../../features/students/components/AvailableStudentsList";
import { useUserContext } from "components/User/context";
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export const StudentsPage = () => {
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
    <Container>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        centered={false}
      >
        <Tab label={`Moi studenci (${myStudents.length})`} />
        <Tab label={"Dodaj studenta"} />
        <Tab label={`Dostępni do dodania (${availableStudents.length})`} />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <StudentList
          students={myStudents}
          loading={loading}
          onRemoveStudent={handleRemoveStudent}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <CenteredRow>
          <CreateNewStudent refetchStudent={refetch} />
        </CenteredRow>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <AvailableStudentsList
          students={availableStudents}
          loading={loading}
          onAddStudent={handleAddStudent}
          myStudentIds={myStudentIds}
        />
      </TabPanel>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message={snackbar.message}
      />
    </Container>
  );
};
