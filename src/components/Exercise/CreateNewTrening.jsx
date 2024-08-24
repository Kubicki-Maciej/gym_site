import React from 'react'
import NavigateButton from '../Buttons/MainButton'

export default function CreateNewTrening() {
  return (
    <div>
        CreateNewTrening
        <br/>
        <NavigateButton navigateDir={'createexercise/'} name={"Create New Exercise"}/>
        <br/>
        <button>Add exercise to trening</button>
    </div>
  )
}
