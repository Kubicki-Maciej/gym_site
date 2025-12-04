import { Route, Routes } from "react-router-dom";
import { useUserContext } from "../User/context.jsx";

import LoginPage from "../../Screens/Auth/Login/LoginPage.jsx";
import RegisterPage from "../../Screens/Auth/Register/RegisterPage.jsx";
import Article from "./Article.jsx";
import TrainingScreen from "../../Screens/Training/TrainingScreen.jsx";
import TrainerCalendar from "../Calendar/TrainerCalendar.jsx";
import MenuScreen from "../Menu/MenuScreen.jsx";

import StudentProfileScreen from "../../Screens/StudentProfileScreen.jsx";
import WorkoutDetail from "../Workout/WorkoutDetail.jsx";
import ExercisesPage from "../../Screens/ExercisePage.jsx";

import { useState } from 'react';
// import CardContainer from "../Cards/CardContainer"
import CardContainer from "../Cards/CardContainer.jsx";
import CardElement from "../Cards/CardElement";
function Section() {
  const { logged } = useUserContext();
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Routes>
        <Route path="" element={<Article />}></Route>
        <Route path="about/*" element={<div>About me</div>}></Route>
        <Route path="login/*" element={<LoginPage />}></Route>
        <Route path="register/*" element={<RegisterPage />}></Route>
        <Route path="logout/*" element={<LoginPage />}></Route>

        <Route path="training/*" element={<TrainingScreen />}></Route>
        <Route path="schedule/" element={<TrainerCalendar />}></Route>
        <Route path="training/details/:id" element={<WorkoutDetail />}></Route>
        <Route
          path="trainingmenu/*"
          element={<MenuScreen sideBarName={"training"} />}
        />
        <Route
          path="clientsmenu/*"
          element={<MenuScreen sideBarName={"clients"} />}
        />
        <Route
          path="student/*"
          element={<MenuScreen sideBarName={"student"} />}
        />
       <Route
        path="test/"
        element={<ExercisesPage />}
        />
      </Routes>
    </div>
  );
}

// Mock data
export const MOCK_EXERCISES = [
  {
    id: 1,
    name: 'Pompki',
    description: 'Ćwiczenie na mięśnie klatki piersiowej i ramion',
    image: 'https://via.placeholder.com/300x200?text=Pompki',
    difficulty: 'Łatwe'
  },
  {
    id: 2,
    name: 'Przysiady',
    description: 'Ćwiczenie na mięśnie nóg i pośladków',
    image: 'https://via.placeholder.com/300x200?text=Przysiady',
    difficulty: 'Średnie'
  },
  {
    id: 3,
    name: 'Wspinaczka górska',
    description: 'Dynamiczne ćwiczenie na wydolność i mięśnie brzucha',
    image: 'https://via.placeholder.com/300x200?text=Wspinaczka',
    difficulty: 'Trudne'
  },
  {
    id: 4,
    name: 'Deska',
    description: 'Statyczne ćwiczenie na mięśnie rdzenia',
    image: 'https://via.placeholder.com/300x200?text=Deska',
    difficulty: 'Średnie'
  },
  {
    id: 5,
    name: 'Burpees',
    description: 'Intensywne ćwiczenie pełnociałowe',
    image: 'https://via.placeholder.com/300x200?text=Burpees',
    difficulty: 'Bardzo trudne'
  },
  {
    id: 6,
    name: 'Skłony boczne',
    description: 'Ćwiczenie na boczne mięśnie brzucha',
    image: 'https://via.placeholder.com/300x200?text=Sklony',
    difficulty: 'Łatwe'
  },
];
// Testowa lista studentów
const MOCK_STUDENTS = [
  {
    id: 1,
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    age: 25
  },
  {
    id: 2,
    name: 'Maria Nowak',
    email: 'maria.nowak@example.com',
    age: 23
  },
  {
    id: 3,
    name: 'Piotr Lewandowski',
    email: 'piotr.lewandowski@example.com',
    age: 24
  },
  {
    id: 4,
    name: 'Anna Wiśniewska',
    email: 'anna.wisniewska@example.com',
    age: 22
  },
  {
    id: 5,
    name: 'Krzysztof Dąbrowski',
    email: 'krzysztof.dabrowski@example.com',
    age: 26
  },
  {
    id: 6,
    name: 'Katarzyna Szymańska',
    email: 'katarzyna.szymanska@example.com',
    age: 21
  },
];

// Komponent strony test
function TestPage() {
  const [students, setStudents] = useState(MOCK_STUDENTS);

  const handleSelectStudent = (student) => {
    console.log('Wybrany student:', student);
    alert(`Edytuj: ${student.name}`);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    console.log(`Usunięty student o ID: ${id}`);
  };

  return (
    <CardContainer
      items={students}
      columns={3}
      spacing={2}
      renderCard={(student) => (
        <CardElement
          student={student}
          onSelect={handleSelectStudent}
          onDelete={handleDeleteStudent}
        />
      )}
    />
  );
}

export default Section;
