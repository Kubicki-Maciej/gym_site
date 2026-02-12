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
import { CenteredRow } from "../../../components/Layout/CentredRow";
import { Add as AddIcon } from "@mui/icons-material";
import { useStudents } from "../hooks/useStudents";
import { StudentList } from "../components/StudentList";
// import { AddStudentModal } from "../components/AddStudentModal";
import CreateNewStudent from "../components/CreateNewStudent";

import { AvailableStudentsList } from "../components/AvailableStudentsList";

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

  const {
    myStudents,
    availableStudents,
    loading,
    error,
    addStudentToTrainer,
    removeStudentFromTrainer,
    refetch,
  } = useStudents();

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
        sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label={`Moi studenci (${myStudents.length})`} />
        <Tab label={`Dostępni do dodania (${availableStudents.length})`} />
        <Tab label={"Dodaj studenta"} />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <StudentList
          students={myStudents}
          loading={loading}
          onRemoveStudent={handleRemoveStudent}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <AvailableStudentsList
          students={availableStudents}
          loading={loading}
          onAddStudent={handleAddStudent}
          myStudentIds={myStudentIds}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {/* <AddStudentModal
          availableStudents={availableStudents}
          loading={loading}
          onAddStudent={handleAddStudent}
          myStudentIds={myStudentIds}
          onStudentCreated={refetch}
        /> */}
        <CenteredRow>
          <CreateNewStudent refetchStudent={refetch} />
        </CenteredRow>
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
