import React from 'react'
import './square.css'

export default function Square (props) {
  const onClick = () => {
    props.clickedSquaresAC(props.id)
  }

  return (
    <button className={`square${props.clicked ? 'click' : ''}`} disabled={props.color === undefined || props.timeIsOver} onClick={onClick} style={{ backgroundColor: props.color }} >

    </button>
  )
}
