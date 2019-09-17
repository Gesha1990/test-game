import React from 'react';
import style from './StartGameReduxForm.module.css'
import {Field, reduxForm} from "redux-form";
const  StartGameReduxForm  = (props) => {




  return (
    <form onSubmit={props.handleSubmit} className={style.form}>
      <Field name="gameMode" component="select" className={style.gameMode}>
        <option>Pick game mode</option>
        <option >Hard</option>
        <option>Medium</option>
        <option>Easy</option>
      </Field>
      <Field component={'input'}  placeholder={'Please write your name'} name={'name'} className={style.name}/>
      {props.restart?   <button className={style.playBtn} >PLAY AGAIN</button> : <button className={style.playBtn}>PLAY</button>}
    </form>
  )
}

export default reduxForm({form: 'Game'})(StartGameReduxForm)