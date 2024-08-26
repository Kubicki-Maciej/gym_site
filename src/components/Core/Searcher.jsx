import React, { useEffect, useState } from 'react'
import { TextField, Autocomplete } from '@mui/material'

export default function Searcher({dataOutput, apiAdress, labelName}) {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchData(){
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiAdress); 
      // const response = await fetch('http://127.0.0.1:8000/exercise/exercise/all '); 
      if (!response.ok) {
        throw new Error('Network error: Failed to download all exercise data');
      }
      const data = await response.json();
      setExercises(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData()
  }, []);

    function handleChange(event, value){
        dataOutput(value)
        console.log('value');
    }
    return (
      <>
        {loading ? (
          <p>Ładowanie danych...</p>
        ) : error ? (
          <p>Błąd: {error}</p>
        ) : (
          <Autocomplete
            freeSolo
            onChange={handleChange}
            options={exercises}
            getOptionLabel={(option) => option.name}

            renderInput={(params) => (
              <TextField {...params} label={labelName} variant="outlined" fullWidth />
            )}
          />
        )}
      </>
    )
}
