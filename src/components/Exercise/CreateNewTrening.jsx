import React, { useState } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Autocomplete,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateButton from '../Buttons/MainButton';
import Searcher from '../Core/Searcher';
import Notification from '../Core/Messager'

// http://127.0.0.1:8000/training/all

export default function CreateNewTraining() {
  const [openNotification, setOpenNotification] = useState(false)

  function handleNotification(){
    console.log(openNotification);
    setOpenNotification(!openNotification)
  }

  const [trainingName, setTrainingName] = useState('');
  const [trainingComment, setTrainingComment] = useState('');
  const [exercises, setExercises] = useState([]);
  const [exerciseObject, setExerciseObject] = useState(null);
  const [muscleGroups, setMuscleGroups] = useState([]);

  const [selectedTraining, setSelectedTraining] = useState(null);
  const [muscleGroupOptions, setMuscleGroupOptions] = useState([
    { id: 1, name: 'Biceps' },
    { id: 2, name: 'Triceps' },
    { id: 3, name: 'Back' },
    // Dodaj więcej grup mięśniowych w razie potrzeby
  ]);

  async function sendTreningToApi(dataToSend) {
    console.log('dataToSend');
    console.log(dataToSend);
    

    if (dataToSend.name && dataToSend.exercise_groups.length > 0 && dataToSend.description) {
  
      const muscleGroupsOnlyId = (array) => array.every(Number.isInteger)
      
      console.log(dataToSend);

      try {
        const response = await fetch('http://127.0.0.1:8000/training/create_training', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
          throw new Error('Nie udało się wysłać danych na serwer');
        }

        const data = await response.json();
        console.log('Dane wysłane pomyślnie:', data);
        alert('Formularz został pomyślnie wysłany!');
      } catch (error) {
        console.error('Błąd podczas wysyłania danych:', error);
        alert('Wystąpił błąd podczas wysyłania formularza.');
      }
    } else {
      alert('Proszę uzupełnić wszystkie wymagane pola.');
    }
  }

  function getExerciseFromSearcher(exercise){
    if (exercise) {
      setExerciseObject(exercise);
      setMuscleGroups(
        muscleGroupOptions.filter((group) =>
          exercise.muscle_group.includes(group.id)
        )
      );
    } else {
      setExerciseObject(null);
      setMuscleGroups([]);
    }
  };

  function handleAddExercise(){
    if (exerciseObject) {
      
      const isDuplicate = exercises.some(exercise => exercise.id === exerciseObject.id);
  
      if (!isDuplicate) {
        setExercises([...exercises, exerciseObject]);
      } else {
        handleNotification()
        console.log('To ćwiczenie już istnieje na liście.');
      }
  
      // Resetuj stan po próbie dodania ćwiczenia
      setExerciseObject(null);
      setMuscleGroups([]);
    }
  };

  function handleDeleteExercise(index){
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  async function handleSaveTraining(){
    if (selectedTraining) {
      // Logika aktualizacji istniejącego treningu
      console.log('Trening zaktualizowany:', trainingName, exercises, trainingComment);
    } else {
      // Logika tworzenia nowego treningu
      console.log('Nowy trening utworzony:', trainingName, exercises, trainingComment);
      const treningObject = {
        name: trainingName,
        description: trainingComment,
        exercise_groups: exercises.map((exercise)=> exercise.id)
      }
      sendTreningToApi(treningObject)
    }
  };

  function showMessage(){

  }



  const handleSelectTraining = (traning) => {
    if (traning) {
      console.log(traning);
      console.log(traning);
      setSelectedTraining(traning);
      setTrainingName(traning.name);
      // Tutaj pobierasz ćwiczenia i komentarz z istniejącego treningu (z backendu)
      setExercises(
        traning.exercise_groups      
      );
      setTrainingComment(traning.description);
    } else {
      setSelectedTraining(null);
      setTrainingName('');
      setExercises([]);
      setTrainingComment('');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Notification
       text={'To cwiczenie juz jest na liscie'}   
       openNotification={openNotification}
       setOpenNotification={setOpenNotification}
       />
      {/* <Autocomplete
        options={existingTrainings}
        getOptionLabel={(option) => option.name}
        onChange={handleSelectTraining}
        renderInput={(params) => <TextField {...params} label="Wybierz trening" variant="outlined" />}
        fullWidth
      /> */}
      <Searcher dataOutput={handleSelectTraining} labelName={'Szukaj treningu'} apiAdress={'http://127.0.0.1:8000/training/all'}/>
      <TextField
        label="Nazwa treningu"
        variant="outlined"
        value={trainingName}
        onChange={(e) => setTrainingName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Komentarz do treningu"
        variant="outlined"
        value={trainingComment}
        onChange={(e) => setTrainingComment(e.target.value)}
        fullWidth
        multiline
        rows={3}
      />
      <List>
        {exercises.map((exercise, index) => (
          <ListItem key={index}>
            <ListItemText primary={exercise.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDeleteExercise(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Searcher dataOutput={getExerciseFromSearcher}  apiAdress={'http://127.0.0.1:8000/exercise/exercise/all'} labelName={"Szukaj ćwiczenia"} />
      <Button variant="contained" color="primary" onClick={handleAddExercise}>
        Dodaj ćwiczenie do treningu
      </Button>
      <Button variant="contained" color="secondary" onClick={handleSaveTraining}>
        {selectedTraining ? 'Modyfikuj trening' : 'Utwórz trening'}
      </Button>
      <NavigateButton navigateDir={'createexercise/'} name={"Stwórz nowe ćwiczenie"} />
    </Box>
  );
}
