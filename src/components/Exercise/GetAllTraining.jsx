import React from 'react'

export default function GetAllTraining() {
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    async function fetchExercises(){
        setLoading(true);
        setError(null);
    
        try {
          const response = await fetch('http://127.0.0.1:8000/exercise/exercise/all '); 
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
        fetchExercises()
      }, []);
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
                <TextField {...params} label="Szukaj" variant="outlined" fullWidth />
              )}
            />
          )}
        </>
      )
}
