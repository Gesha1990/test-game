import React from 'react';
import  './gameBoard.css'
import Square from "./square/Square";

export default function GameBoard (props) {


  let renderSquares = () => {

    let squares = props.squares.map(square => <Square key={square.id} id={square.id}
                                                           color={props.getSquareColor(square)}
                                                           clicked={square.clicked}
                                                           clickedSquaresAC={props.clickedSquaresAC}
                                                           timeIsOver={square.timeIsOver}/>);

    return squares;
  };

  let getBoardStyle = () => {
    switch (props.numbersquares) {

      case 25 :{

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
  };

  return (
    <div className={getBoardStyle()}>
      {renderSquares()}

    </div>
  )
}