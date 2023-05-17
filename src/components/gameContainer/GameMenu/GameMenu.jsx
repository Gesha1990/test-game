import React from "react";
import { connect } from "react-redux";
import { clearSquaresAC } from "../../../redux/boardReducer";
import { Field, reduxForm } from "redux-form";
import "./GameMenu.css";


const GameMenu = ({ handleSubmit, settings,setStartGame,clearSquaresAC }) => {
  const settingsArr = Object.keys(settings);
  const handlerSelect = ()=>{
    setStartGame(false)
    clearSquaresAC()
  }
  return (
    <form onSubmit={handleSubmit} className="menu">
      <Field name="gameMode" component="select" className="gameMode" onChange={handlerSelect}>
        <option>Pick game mode</option>
        {settingsArr.map((option) => {
          return <option key={settings[option].field}value={settings[option].field}>{settings[option].name}</option>;
        })}
      </Field>
       <button className="playBtn">PLAY</button>
    </form>
  );
};
const mapStateToProps = (state) => ({
  settings: state.board.settings,
});
const mapDispatchToProps = {
  clearSquaresAC
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "Game" })(GameMenu));
