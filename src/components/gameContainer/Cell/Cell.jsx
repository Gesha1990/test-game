import React, { useState } from "react";
import { WHITE, BLUE } from "./const";
import {connect} from 'react-redux';
import {
    setSquareAC,
    resetSquareAC
  } from "../../../redux/boardReducer";
import "./Cell.css";

const Cell = ({ rowNumber, column,setSquareAC,resetSquareAC }) => {
  const [color, setColor] = useState(WHITE);
  const hoverHandler = () => {
    
    setColor((prevColor) => {
      if (prevColor === WHITE) {
        setSquareAC(`Row:${rowNumber} Column:${column}`)
        return BLUE;
      } else {
        resetSquareAC(`Row:${rowNumber} Column:${column}`)
        return WHITE;
      }
    });
  };
  return (
    <td
      key={`${rowNumber}-${column}`}
      className={`cell ${color}`}
      onMouseEnter={hoverHandler}
    >
    </td>
  );
};


const mapDispatchToProps = {
    setSquareAC,
    resetSquareAC
  };

export default connect(null, mapDispatchToProps)(Cell);
