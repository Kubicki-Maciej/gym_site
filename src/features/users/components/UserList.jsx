import React from "react";
import { useState, useEffect } from "react";
import userApi from "../api/userApi";
import UserCard from "./UserCard";
import { useCarousel } from "../../../hooks/useCarousel";

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
  //   const [users, setUsers] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, spouse_name: "Anna", last_name: "Kowalski" },
    { id: 2, spouse_name: "Maria", last_name: "Nowak" },
    { id: 3, spouse_name: "Katarzyna", last_name: "Wiśniewski" },
    { id: 4, spouse_name: "Tomasz", last_name: "Wójcik" },
    { id: 5, spouse_name: "Piotr", last_name: "Kowalczyk" },
    { id: 6, spouse_name: "Agnieszka", last_name: "Kamiński" },
    { id: 7, spouse_name: "Monika", last_name: "Lewandowski" },
    { id: 8, spouse_name: "Marta", last_name: "Zieliński" },
    { id: 9, spouse_name: "Paweł", last_name: "Szymański" },
    { id: 10, spouse_name: "Krzysztof", last_name: "Woźniak" },
    { id: 11, spouse_name: "Joanna", last_name: "Dąbrowski" },
    { id: 12, spouse_name: "Ewa", last_name: "Kozłowski" },
    { id: 13, spouse_name: "Beata", last_name: "Jankowski" },
    { id: 14, spouse_name: "Magdalena", last_name: "Mazur" },
    { id: 15, spouse_name: "Dorota", last_name: "Krawczyk" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getTrainerUsers } = userApi();
  const carousel = useCarousel(users, 3);

  useEffect(() => {
    // const fetchUsers = async () => {
    //   setLoading(true);
    //   try {
    //     const data = await getTrainerUsers(10);
    //     setUsers(data.students);
    //   } catch (error) {
    //     console.error("Error fetching trainer users:", error);
    //     setError(error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchUsers();
  }, []);

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
