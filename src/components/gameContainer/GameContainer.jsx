import React, { useEffect, useState } from "react";
import "./GameContainer.css";
import { connect } from "react-redux";
import { getSettingsThunkCreator } from "../../redux/boardReducer";
import Row from "./Row/Row";
import HoverSquaresBoard from "./HoverSquaresBoard/HoverSquaresBoard";
import Loader from "../common/Loader";
import GameMenu from "./GameMenu/GameMenu";
import { NOT_SELECTED_MODE } from "./const";

function GameContainer({ getSettingsThunkCreator, settings }) {
  const [tableSize, setTableSize] = useState(null);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    getSettingsThunkCreator();
  }, []);

  const startGameHandler = ({ gameMode }) => {
    if (gameMode === NOT_SELECTED_MODE) {
      alert("Please choose game mode");
      return;
    }
    setTableSize(gameMode);
    setStartGame(true);
  };

  if (!settings) {
    return <Loader />;
  }
  const renderTable = [];
  for (let i = 1; i <= tableSize; i++) {
    renderTable.push(<Row rowNumber={i} tableSize={tableSize} key={i}/>);
  }
  return (
    <div className="gameContainerWrapper">
      <div className="menuAndBoardWrapper">
        <div>
          <GameMenu onSubmit={startGameHandler} setStartGame={setStartGame} />
          {startGame && (
            <table>
              <tbody>{renderTable}</tbody>
            </table>
          )}
        </div>
        <HoverSquaresBoard  />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  settings: state.board.settings,
});

const mapDispatchToProps = {
  getSettingsThunkCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
