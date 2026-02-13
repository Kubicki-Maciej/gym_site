import React from "react";
import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { useCarousel } from "../../../hooks/useCarousel";

import useUser from "../../../hooks/useUser";

// MUI imports
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  Container,
  Stack,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const { loading, error, getTrainerStudents } = useUser();

  const user = JSON.parse(localStorage.getItem("user"));
  const trainerId = user?.id;

  useEffect(() => {
    const fetchUser = async id => {
      const result = await getTrainerStudents(id);
      if (result) {
        setUsers(result.students);
      }
    };
    if (trainerId) {
      fetchUser(trainerId);
    }
    if (!trainerId) {
      console.warn("TrainerId nie znaleziony w localStorage");
      return;
    }
  }, [getTrainerStudents]);

  const carousel = useCarousel(users, 2);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Błąd: {error}</Alert>;
  if (users.length === 0)
    return <Alert severity="info">Brak użytkowników</Alert>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Przycisk Previous */}
        <Button
          variant="contained"
          startIcon={<ChevronLeft />}
          onClick={carousel.goPrev}
          disabled={!carousel.hasPrev}
          size="large"
        ></Button>

        {/* Karty */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flex: 1,
          }}
        >
          {carousel.visibleItems.map(user => (
            <UserCard
              key={user.id}
              id={user.id}
              spouse_name={user.spouse_name}
              last_name={user.last_name}
            />
          ))}
        </Box>

        {/* Przycisk Next */}
        <Button
          variant="contained"
          endIcon={<ChevronRight />}
          onClick={carousel.goNext}
          disabled={!carousel.hasNext}
          size="large"
        ></Button>
      </Stack>
    </Container>
  );
}
