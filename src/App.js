import "./App.css";
import { useEffect, useState } from "react";

import Footer from "./components/Layout/Footer/Footer";
import Section from "./components/Section/AppRoutes.jsx";
import NavBarTwo from "./components/Layout/NavBarTwo/NavBarTwo.jsx";
import Navbar from "./components/Layout/Navbar/Navbar.jsx";
import NavbarMobile from "./components/Layout/Navbar/NavbarMobile.jsx";
import { UserContext } from "./components/User/context.jsx";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userLogged") == "true") {
      setUserLogin({
        logged: true,
        userData: localStorage.getItem("user"),
      });
    }
  }, []);

  if (width > 764) {
    return (
      <UserContext.Provider value={[userLogin, setUserLogin]}>
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
          {localStorage.getItem("userLogged") == "true" ? (
            <NavBarTwo />
          ) : (
            <div style={{ height: "50px" }}></div>
          )}
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
      </UserContext.Provider>
    );
  } else {
    return (
      <UserContext.Provider value={[userLogin, setUserLogin]}>
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
          {localStorage.getItem("userLogged") == "true" ? (
            <NavBarTwo />
          ) : (
            <div style={{ height: "50px" }}></div>
          )}
          <Section />
          <Footer />
        </div>
      </UserContext.Provider>
    );
  }
}
export default App;
