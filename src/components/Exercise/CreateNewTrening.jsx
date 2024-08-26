import React, { useState, useEffect } from 'react';
import NavigateButton from '../Buttons/MainButton'

import Searcher from '../Core/Searcher';

export default function CreateNewTrening() {
  const [exerciseObject , setExerciseObject] = useState({});
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [muscleGroupOptions, setMuscleGroupOptions] = useState([]);



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
  

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      maxWidth:"400px",
      margin:"auto"
  }}>
        <div>
          {/* WYBIERZ TRENING LUB STWORZ NOWY  */}
        </div>
        <div>
        {/* NAZWA NOWEGO TRENINGU */}
        </div>
        
        <div>
          {/* #LISTA CWICZEN */}
        </div>
        
        <div>
          {/* ELEMENT ODPOWIADA ZA SZUKANIE CWICZEN */}
          <Searcher dataOutput={getExerciseFromSercher}/>
        </div>
        <button>PRZYCISK DO DODANIA CWICZENIA DO TRENINGU</button>
        <div>
          {/* NAVIGACYJNY PRZYCISK BY ZROBIC NOWE CWICZENIE  */}
          <NavigateButton navigateDir={'createexercise/'} name={"Create New Exercise"}/>
        </div>
    </div>

  )
}
