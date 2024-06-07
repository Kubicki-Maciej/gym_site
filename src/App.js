import "./App.css";
import Footer from "./components/Footer/Footer";
import Section from "./components/Section/Section";
import NavBarTwo from "./components/NavBarTwo/NavBarTwo.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { useEffect, useState } from "react";
import NavbarMobile from "./components/Navbar/NavbarMobile.jsx";
import { UserContext } from "./components/User/context.jsx";


function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [userLogin, setUserLogin] = useState(false)
  
  
  useEffect(()=>{
      const handleResize = () =>{
        setWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
      return () =>{
        window.removeEventListener("resize", handleResize);
      }
    },[])

  useEffect(()=>{
    if(localStorage.getItem('userLogged')=='true'){
      setUserLogin({
        logged : true,
        userData : localStorage.getItem('user')
      })
    }
  },[])

  if(width > 764){
    return (
      <UserContext.Provider value={[userLogin, setUserLogin]}>
      <div className="App">

        <Navbar />
        {
         localStorage.getItem('userLogged')=='true' ? <NavBarTwo />: <div  style={{ height: "50px"}}></div>
        }
        <Section />
        <Footer />
      </div>
      </UserContext.Provider>
    );
  }else{
    return (
      <UserContext.Provider value={[userLogin, setUserLogin]}>
      <div className="App">
        <NavbarMobile/>
        {
         localStorage.getItem('userLogged')=='true' ? <NavBarTwo />: <div  style={{ height: "50px"}}></div>
        }
        <Section />
        <Footer />
      </div>
      </UserContext.Provider>
    );
  } 
}
export default App;

