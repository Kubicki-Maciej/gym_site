import "./App.css";
import { useEffect, useState } from "react";

import Footer from "./components/Layout/Footer/Footer";
import Section from "./components/Section/AppRoutes.jsx";

import { useUserContext } from "./components/User/context.jsx";
import { NewNavBar } from "./components/Layout/Navbar/NewNavBar.jsx";

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
  );
}
export default App;
