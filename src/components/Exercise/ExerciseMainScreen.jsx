import React from 'react'
import NavigateButton from '../Buttons/MainButton'

export default function ExerciseScreen() {
  
    return (
    <div>
        ExerciseScreen
        <br/>
        <NavigateButton navigateDir={'createnewtrening/'} name={"Create Trening"}/>
        <br/>

        Trening with student
        <br/>
        <NavigateButton navigateDir={'/'} name={"Go to Home"}/>
    </div>
  )
}
