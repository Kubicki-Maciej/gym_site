import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Paper,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import CardStatisticElement from "components/Cards/CardStatisticElement";

import useSelectedUser from "hooks/useSelectedUser";
import StudentInfo from "../../components/Student/StudentInfo";
import useUserUpcomingTraining from "../../features/users/hooks/useUserUpcomingTraining";
import StudentTrainingListItem from "../../components/Student/StudentTrainingListItem";
import BodyMeasurementSection from "features/statistics/Bodymeasurement/BodyMeasurementSection";
import BodySummaryCard from "features/statistics/cards/BodySummaryCard";
export default function StudentProfileScreen({ userObject }) {
  const { selectedUser, getObjectUser } = useSelectedUser();

  // const { selectedUser } = useUserContext();

  const { loading, error, trainingList } =
    useUserUpcomingTraining(selectedUser);
  const { getSelectedUserFromLocalStorage } = useSelectedUser();
  const userId = getSelectedUserFromLocalStorage();
  if (selectedUser) {
    return (
      <>
        <StudentInfo studentInfo={getObjectUser()} />
        <Box sx={{ p: 1 }}>
          <Paper sx={{ p: 1 }}>
            {trainingList[0] ? (
              <StudentTrainingListItem training={trainingList[0]} />
            ) : (
              ""
            )}
          </Paper>
        </Box>
        <Grid container>
          <Grid size={{ xs: 12, lg: 9 }}>
            <CardStatisticElement>
              <BodyMeasurementSection userId={userId} />
            </CardStatisticElement>
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <CardStatisticElement>
              <BodySummaryCard userId={userId} />
            </CardStatisticElement>
          </Grid>
        </Grid>
      </>
    );
  }
}
