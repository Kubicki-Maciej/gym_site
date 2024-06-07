import React, { useContext } from 'react' 
import { Route, Routes } from "react-router-dom";

// import elements
import Login from '../Login/Login';
import Register from '../Register/Register';
import Article from './Article'
import Calendar from '../Calendar/Calendar';

// context
import { UserContext } from '../User/context';

function Section() {
  const [userLogged, setUserLogged] = useContext(UserContext)
  // const user = useUse
  return (
    // <Article />
    <div style={{
      position:"relative",
            // top:"40px"
    }}>
      <Routes>
        <Route
          path=""
          element={<Article />}
        ></Route>
        <Route
          path="about/*"
          element={<div>About me</div>}
        ></Route>
        <Route
          path="bookout/*"
          element={<Calendar/>}
        ></Route>
        <Route
          path="login/*"
          element={<Login/>}
        ></Route>
        <Route
          path="login/*"
          element={<Login/>}
        ></Route>
        <Route
          path="login/register/*"
          element={<Register/>}
        ></Route>
        <Route
          path="logout/*"
          element={<Login/>}
        ></Route>
      </Routes>
      {/* <Article /> */}  
    </div>
  )
}

export default Section