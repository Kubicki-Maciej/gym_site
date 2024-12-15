import React from 'react'
import NavigateButton from '../Buttons/MainButton'

export default function ExerciseScreen() {
  
    return (
    <div style={{
      display:"flex",
      alignItems:"center",
      justifyContent: "center",
      paddingBottom:"1.5rem"

    }}>
      <div>
        ExerciseScreen

        <br/>
        <NavigateButton navigateDir={'createnewtrening/'} name={"Create Trening"}/>
        <br/>

        <br/>
        <NavigateButton navigateDir={'createnewtrening/createexercise'} name={"Create Exercise"}/>
        <br/>

        Trening with student
        <br/>
        <NavigateButton navigateDir={'/'} name={"Go to Home"}/>
      </div>
     



    </div>
  )
}
