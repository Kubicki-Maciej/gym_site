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
  Divider,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const stats = [
  {
    value: "8+",
    label: "Lat doświadczenia",
  },
  {
    value: "2500+",
    label: "Zadowolonych klientów",
  },
  {
    value: "12",
    label: "Certyfikowanych trenerów",
  },
  {
    value: "50k+",
    label: "Przeprowadzonych treningów",
  },
];

const values = [
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 28 }} />,
    title: "Profesjonalizm",
    description:
      "Nasi trenerzy to certyfikowani specjaliści z wieloletnim doświadczeniem. Regularnie poszerzają wiedzę na szkoleniach i konferencjach branżowych.",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 28 }} />,
    title: "Jakość",
    description:
      "Stawiamy na najwyższej klasy sprzęt i komfortowe warunki treningowe. Każdy detal ma znaczenie — od maszyn po atmosferę w klubie.",
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 28 }} />,
    title: "Pasja",
    description:
      "Fitness to nie tylko nasza praca — to styl życia. Dzielimy się energią i motywacją, bo wierzymy, że ruch zmienia życie na lepsze.",
  },
];

function AboutUsArticle() {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        {/* ───────── NAGŁÓWEK ───────── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            gap: 4,
            mb: { xs: 8, md: 10 },
          }}
        >
          <Box sx={{ maxWidth: 600 }}>
            <Chip
              label="O nas"
              sx={{
                mb: 3,
                bgcolor: "#f5f5f5",
                color: "#0a0a0a",
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
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#0a0a0a",
                mb: 3,
              }}
            >
              Tworzymy przestrzeń,
              <br />w której rosną mistrzowie.
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.75,
                color: "#555",
              }}
            >
              Od 2016 roku pomagamy ludziom osiągać cele, o których wcześniej
              tylko marzyli. Zaczynaliśmy jako mały klub z wielką misją — dziś
              jesteśmy jednym z najbardziej rozpoznawalnych studiów fitness w
              regionie. Ale jedno się nie zmieniło: stawiamy człowieka na
              pierwszym miejscu.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: "#0a0a0a",
              color: "#0a0a0a",
              fontWeight: 600,
              fontSize: "0.9rem",
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.25,
              whiteSpace: "nowrap",
              "&:hover": {
                bgcolor: "#0a0a0a",
                color: "#fff",
                borderColor: "#0a0a0a",
              },
            }}
          >
            Nasza historia
          </Button>
        </Box>

        {/* ───────── STATYSTYKI ───────── */}
        <Box
          sx={{
            bgcolor: "#fafafa",
            borderRadius: "20px",
            p: { xs: 4, md: 6 },
            mb: { xs: 8, md: 10 },
          }}
        >
          <Grid container spacing={4}>
            {stats.map(function (stat, index) {
              return (
                <Grid item xs={6} md={3} key={index}>
                  <Box
                    sx={{
                      textAlign: { xs: "left", md: "center" },
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "2.5rem", md: "3.5rem" },
                        lineHeight: 1,
                        color: "#0a0a0a",
                        letterSpacing: "-0.03em",
                        mb: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#888",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* ───────── NASZE WARTOŚCI ───────── */}
        <Box sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#999",
              mb: 4,
            }}
          >
            Nasze wartości
          </Typography>

          <Grid container spacing={3}>
            {values.map(function (item, index) {
              return (
                <Grid item size={{ xs: 12, lg: 4 }} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      bgcolor: "transparent",
                      border: "1px solid",
                      borderColor: "#eee",
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#fafafa",
                        borderColor: "#ddd",
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
                          width: 48,
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "10px",
                          bgcolor: "#0a0a0a",
                          color: "#fff",
                          mb: 3,
                        }}
                      >
                        {item.icon}
                      </Box>

                      {/* tytuł */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: "1.15rem",
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
        </Box>

        {/* ───────── CYTAT / MISJA ───────── */}
        <Box
          sx={{
            borderLeft: "4px solid #0a0a0a",
            pl: { xs: 3, md: 5 },
            py: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              fontWeight: 500,
              fontStyle: "italic",
              color: "#333",
              lineHeight: 1.6,
              mb: 2,
              maxWidth: 700,
            }}
          >
            "Wierzymy, że każdy ma w sobie siłę do zmiany. Naszą rolą jest pomóc
            ją odkryć i rozwinąć."
          </Typography>
          <Typography
            sx={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#999",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          ></Typography>
        </Box>

        <Divider sx={{ my: { xs: 6, md: 8 }, borderColor: "#eee" }} />

        {/* ───────── CTA POZNAJ ZESPÓŁ ───────── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 3,
          }}
        ></Box>
      </Container>
    </Box>
  );
}

export default AboutUsArticle;
