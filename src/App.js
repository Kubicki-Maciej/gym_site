import "./App.css";
import Footer from "./components/Footer/Footer";
import Section from "./components/Section/Section";
import NavBarTwo from "./components/NavBarTwo/NavBarTwo.jsx";

import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <NavBarTwo />
      <Section />
      <Footer />
    </div>
  );
}

export default App;

