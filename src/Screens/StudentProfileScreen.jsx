import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Card, CardContent, Typography, Stack } from "@mui/material";

import { useUserContext } from "../components/User/context";

import StudentInfo from "../components/Student/StudentInfo";
import useTraining from "../hooks/useTraining";
import useUserUpcomingTraining from "../features/users/hooks/useUserUpcomingTraining";
import StudentTrainingListItem from "../components/Student/StudentTrainingListItem";
export default function StudentProfileScreen({ userObject }) {
  const location = useLocation();
  const student = location.state?.student;
  const { selectedUser } = useUserContext();

  const { loading, error, trainingList } = useUserUpcomingTraining(
    selectedUser.id,
  );

  if (selectedUser) {
    return (
      <>
        <StudentInfo studentInfo={selectedUser} />

        <Typography variant="h6" gutterBottom>
          Najbliższy trening
        </Typography>

        {trainingList[0] ? (
          <StudentTrainingListItem training={trainingList[0]} />
        ) : (
          ""
        )}
        <Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur quia
          aperiam adipisci aut, amet dolore veritatis, omnis, nemo porro dicta
          similique odit itaque ab aspernatur cumque non in minus? Vel.
        </Box>
      </>
    );
  }
}
