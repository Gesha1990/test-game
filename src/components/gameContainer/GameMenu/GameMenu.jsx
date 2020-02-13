import React from 'react'
import './GameMenu.css'
import { Field, reduxForm } from 'redux-form'
const GameMenu = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="menu">
      <Field name="gameMode" component="select" className="menu__gameMode">
        <option>Pick game mode</option>
        <option>Hard</option>
        <option>Medium</option>
        <option>Easy</option>
      </Field>
      <Field component={'input'} placeholder={'Please write your name'} name={'name'} className="memu__playerName"/>
      {props.restart ? <button className="menu__playBtn" >PLAY AGAIN</button> : <button className="menu__playBtn">PLAY</button>}
    </form>
  )
}

export default reduxForm({ form: 'Game' })(GameMenu)
