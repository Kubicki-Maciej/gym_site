import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const benefits = [
  {
    icon: <FitnessCenterIcon sx={{ fontSize: 32 }} />,
    title: "Spersonalizowany plan",
    description:
      "Każdy trening jest dopasowany do Twoich celów, poziomu zaawansowania i możliwości. Żadnych gotowych schematów — tylko to, co działa dla Ciebie.",
    tag: "Indywidualne podejście",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
    title: "Szybsze rezultaty",
    description:
      "Z trenerem unikasz błędów, które spowalniają progres. Poprawna technika i odpowiednie obciążenia przyspieszają efekty nawet o 60%.",
    tag: "Efektywność",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 32 }} />,
    title: "Motywacja i wsparcie",
    description:
      "Trener to nie tylko wiedza — to osoba, która nie pozwoli Ci się poddać. Regularne spotkania budują nawyk i dyscyplinę treningową.",
    tag: "Konsekwencja",
  },
];

function TrainingSection() {
  return (
    <Box
      sx={{
        bgcolor: "#fafafa",
        minHeight: "100vh",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        {/* ───────── HERO / ARTYKUŁ ───────── */}
        <Box sx={{ mb: { xs: 10, md: 14 }, maxWidth: 720 }}>
          <Chip
            label="Trening personalny"
            sx={{
              mb: 3,
              bgcolor: "#000",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: 1,
              borderRadius: "6px",
              height: 28,
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.75rem", md: "3.25rem" },
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#0a0a0a",
              mb: 3,
            }}
          >
            Trenuj mądrzej,
            <br />
            nie ciężej.
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              lineHeight: 1.75,
              color: "#555",
              maxWidth: 560,
            }}
          >
            Współpraca z doświadczonym trenerem personalnym to najkrótsza droga
            do wymarzonych efektów. Niezależnie, czy dopiero zaczynasz, czy
            trenujesz od lat — profesjonalne oko zmienia wszystko. Poprawna
            technika, progresja obciążeń i dopasowana regeneracja sprawiają, że
            każda minuta na siłowni ma sens.
          </Typography>
        </Box>

        {/* ───────── GRID — 3 KORZYŚCI ───────── */}
        <Grid container spacing={3} sx={{ mb: { xs: 10, md: 14 } }}>
          {benefits.map(function (item, index) {
            return (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    bgcolor: "#fff",
                    border: "1px solid",
                    borderColor: "#ebebeb",
                    borderRadius: "16px",
                    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
                    "&:hover": {
                      borderColor: "#000",
                      transform: "translateY(-4px)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    {/* ikona */}
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "12px",
                        bgcolor: "#f5f5f5",
                        color: "#0a0a0a",
                        mb: 3,
                      }}
                    >
                      {item.icon}
                    </Box>

                    {/* tag */}
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        color: "#999",
                        mb: 1.5,
                      }}
                    >
                      {item.tag}
                    </Typography>

                    {/* tytuł */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        color: "#0a0a0a",
                        mb: 1.5,
                      }}
                    >
                      {item.title}
                    </Typography>

                    {/* opis */}
                    <Typography
                      sx={{
                        fontSize: "0.925rem",
                        lineHeight: 1.7,
                        color: "#666",
                        flexGrow: 1,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* ───────── DOŁĄCZ DO NAS ───────── */}
        <Box
          sx={{
            bgcolor: "#0a0a0a",
            borderRadius: "20px",
            px: { xs: 4, md: 8 },
            py: { xs: 5, md: 7 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Box sx={{ maxWidth: 480 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.5rem", md: "2rem" },
                color: "#fff",
                lineHeight: 1.25,
                mb: 1.5,
              }}
            >
              Dołącz do nas
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
              }}
            >
              Pierwszy trening z trenerem gratis. Przekonaj się, jak
              profesjonalne wsparcie zmienia podejście do ćwiczeń.
            </Typography>
          </Box>

          <Button
            variant="contained"
            disableElevation
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: "#fff",
              color: "#0a0a0a",
              fontWeight: 700,
              fontSize: "0.95rem",
              textTransform: "none",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              whiteSpace: "nowrap",
              "&:hover": {
                bgcolor: "#e0e0e0",
              },
            }}
          >
            Umów się teraz
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default TrainingSection;
