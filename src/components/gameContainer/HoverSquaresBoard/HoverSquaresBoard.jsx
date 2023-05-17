import React from "react";
import { connect } from "react-redux";

const HoverSquaresBoard = ({ squares }) => {
  return (
    <div>
      <h1>Hover Squeres</h1>
      
      {squares.map((square) => (
        <div key={square}>{square}</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  squares: state.board.squares,
});

export default connect(mapStateToProps, null)(HoverSquaresBoard);
