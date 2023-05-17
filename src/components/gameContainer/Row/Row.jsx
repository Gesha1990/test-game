import React from "react";
import Cell from "../Cell/Cell";

const Row = ({ rowNumber, tableSize }) => {
  const cells = [];
  for (let i = 1; i <= tableSize; i++) {
    cells.push(<Cell rowNumber={rowNumber} column={i} key={i} />);
  }
  return <tr key={rowNumber}>{cells}</tr>;
};

export default Row;
