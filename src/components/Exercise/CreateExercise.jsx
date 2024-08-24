import React, { useState, useEffect } from 'react';
import Searcher from '../Core/Searcher';

import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    Button,
    Checkbox,
    ListItemText,
    Autocomplete
} from '@mui/material';

export default function CreateExercise() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]); 
    const [muscleGroupOptions, setMuscleGroupOptions] = useState([]);
    const [exerciseObject , setExerciseObject] = useState({});
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseDescription, setExerciseDescription] = useState('');
    const [muscleGroups, setMuscleGroups] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchMuscleGroups(){
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://127.0.0.1:8000/exercise/muscles/all'); 
        if (!response.ok) {
          throw new Error('Network error: Failed to download all muscles data');
        }
        const data = await response.json();
        setMuscleGroupOptions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    useEffect(()=>{
      fetchMuscleGroups();
    },[])
    
    function getExerciseFromSercher(exercise){
        if(exercise){
          console.log('exercise.muscle_group');
          console.log(exercise.muscle_group);
          setExerciseObject(exercise)
          setExerciseName(exercise.name)
          setExerciseDescription(exercise.description);
          setMuscleGroups(
            muscleGroupOptions.filter((group) =>
            exercise.muscle_group.includes(group.id)
          ));
        }else{
          setExerciseName('');
          setExerciseDescription('');
          setMuscleGroups([]);
        }
    }

    useEffect(() => {
        console.log('Zaktualizowany obiekt ćwiczenia:', exerciseObject);
    }, [exerciseObject]);
  const handleNameChange = (event) => {
    setExerciseName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setExerciseDescription(event.target.value);
  };

  const handleMuscleGroupsChange = (event, value) => {
    console.log(muscleGroups);
    setMuscleGroups(value);
  };
  async function createNewExercise(){

    if (exerciseName && muscleGroups.length > 0) {

      const muscleGroupsOnlyId = (array) => array.every(Number.isInteger)
      console.log(muscleGroups);
      const object = {
        name: exerciseName,
        description: exerciseDescription,
        muscle_group: muscleGroups.map((group) => group.id), 
      };
      console.log(object);

      try {
        const response = await fetch('http://127.0.0.1:8000/exercise/exercise/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(object),
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
  };

  return (
        <div > 

            <div style={{
                display:"flex",
                flexDirection:"column",
                maxWidth:"400px",
                margin:"auto"
               
            }}>
                <p>Znajdź i zmodyfikuj </p>
                <Searcher dataOutput={getExerciseFromSercher}/>
                <p>Stwórz nowe ćwiczenie </p>
            </div>
            <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 400,
                margin: 'auto',
            }}
            >
                <TextField
                    label="Nazwa ćwiczenia"
                    variant="outlined"
                    value={exerciseName}
                    onChange={handleNameChange}
                    fullWidth
                    required 
                />
                <TextField
                    label="Opis ćwiczenia"
                    variant="outlined"
                    value={exerciseDescription}
                    onChange={handleDescriptionChange}
                    multiline
                    rows={4}
                    fullWidth
                />
                <FormControl fullWidth required>
                  {loading ? (
                    <p>Ładowanie danych...</p>
                  ) : error ? (
                    <p>Błąd: {error}</p>
                  ) : (
                    <Autocomplete
                      multiple
                      onChange={handleMuscleGroupsChange}
                      options={muscleGroupOptions}
                      getOptionLabel={(option) => option.name}
                      value={muscleGroups}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Rodzaj partii mięśni"
                          variant="outlined"
                          placeholder="Wybierz partie mięśni"
                        />
                      )}
                    />
                  )}
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={createNewExercise}
                >
                    Zapisz ćwiczenie
                </Button>
            </Box>    
        </div>
    );
}
