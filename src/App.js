import "./App.css";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Footer from "./components/Layout/Footer/Footer";
import Section from "./components/Section/Section.jsx";

import { useUserContext } from "./components/User/context.jsx";
import { NewNavBar } from "./components/Layout/Navbar/NewNavBar.jsx";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const queryClient = new QueryClient();

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
});

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const { logged } = useUserContext();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div
          className="App"
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            justifyContent: "space-between",
          }}
        >
          <NewNavBar />

          <div
            style={{
              flexGrow: 1,
            }}
          >
            <Section />
          </div>

          <Footer />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
