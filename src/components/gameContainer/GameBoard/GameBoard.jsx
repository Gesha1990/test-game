import React from 'react'
import './GameBoard.css'
import Square from './square/Square'

export default function GameBoard (props) {
  const renderSquares = () => {
    const squares = props.squares.map(square => <Square key={square.id} id={square.id}
      color={props.getSquareColor(square)}
      clicked={square.clicked}
      clickedSquaresAC={props.clickedSquaresAC}
      timeIsOver={square.timeIsOver}/>)

    return squares
  }

  const getBoardStyle = () => {
    switch (props.numbersquares) {
      case 25 : {
        return 'boardEasy'
      }
      case 100: {
        return 'boardMedium'
      }
      case 225: {
        return 'boardHard'
      }
      default: {
        return ''
      }
    }
  }

  return (
    <div className={getBoardStyle()}>
      {renderSquares()}

    </div>
  )
}
