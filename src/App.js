import "./App.css";
import { useEffect, useState } from "react";

import Footer from "./components/Layout/Footer/Footer";
import Section from "./components/Section/AppRoutes.jsx";
import NavBarTwo from "./components/Layout/NavBarTwo/NavBarTwo.jsx";
import Navbar from "./components/Layout/Navbar/Navbar.jsx";
import NavbarMobile from "./components/Layout/Navbar/NavbarMobile.jsx";
import { useUserContext } from "./components/User/context.jsx";

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

  if (width > 764) {
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
        <Navbar />
        {logged ? <NavBarTwo /> : <div style={{ height: "50px" }}></div>}
        <div
          style={{
            flexGrow: 1,
          }}
        >
          {" "}
          <Section />
        </div>

        <Footer />
      </div>
    );
  } else {
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
        <NavbarMobile />
        {logged ? <NavBarTwo /> : <div style={{ height: "50px" }}></div>}
        <Section />
        <Footer />
      </div>
    );
  }
}
export default App;
