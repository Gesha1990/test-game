import React from 'react';
import style from './BoardContainer.module.css';
import {connect} from 'react-redux';
import {
  setSquaresAC, randomSquaresAC, clickedSquaresAC, setTimeIsOverAC, getWinnersThunkCreator,
  getSettingsThunkCreator, setNumberSquaresAC, putWinnerThunkCreator, restartGameAC
} from "../../redux/boardReducer";
import StartGameReduxForm from "./StartGameReduxForm/StartGameReduxForm";
import GameBoard from "./BoardGame/GameBoard";
import LeaderBord from "./LeaderBoard/LeaderBoard";
import Loader from "../common/Loader";
import moment from "moment";


class BoardContainer extends React.Component {
  constructor() {
    super();
    this.intervalIds = [];
  }

  componentDidMount() {
    this.props.getWinnersThunkCreator();
    this.props.getSettingsThunkCreator();
  }

  startGame = (startingData) => {
    this.props.restartGameAC(true)
    let prevId;
    let delay;
    let numberSquares;

    if (startingData.name === undefined) {
      alert('Please write your name');
      return
    }

    switch (startingData.gameMode) {
      case "Easy":
        delay = this.props.settings.easyMode.delay;
        numberSquares = this.props.settings.easyMode.field * this.props.settings.easyMode.field;
        this.props.setNumberSquaresAC(numberSquares);
        break;
      case  "Medium":
        delay = this.props.settings.normalMode.delay;
        numberSquares = this.props.settings.normalMode.field * this.props.settings.normalMode.field;
        this.props.setNumberSquaresAC(numberSquares);
        break;
      case  "Hard":
        delay = this.props.settings.hardMode.delay;
        numberSquares = this.props.settings.hardMode.field * this.props.settings.hardMode.field;
        this.props.setNumberSquaresAC(numberSquares);
        break;
      default:
        alert('Please choose game mode');
        return
    }
    this.props.setSquaresAC();

    let intervalId;

    let goAhead = () => {

      if (this.props.restart === true) {
        this.intervalIds.forEach(intervalId => clearInterval(intervalId))
      }

      intervalId = setInterval(() => {

        let myWinning = Math.ceil(this.props.squares.length / 2) === this.props.numberOfClicking;
        let computerWinning = Math.ceil(this.props.squares.length / 2) === this.props.numberOfOverTime - this.props.numberOfClicking;

        if (myWinning) {
          let now = moment().format('HH:mm; DD MMMM  YYYY');
          this.props.putWinnerThunkCreator(startingData.name, now);
          alert('You have won')
          clearInterval(intervalId)
          return;
        } else if (computerWinning) {
          let now = moment().format('HH:mm; DD MMMM  YYYY');
          this.props.putWinnerThunkCreator('Computer', now);
          alert('Computer have won')
          clearInterval(intervalId)
          return;
        }

        const randomId = this.getRandomId();
        this.props.randomSquaresAC(randomId);

        if (prevId) {
          this.props.setTimeIsOverAC(prevId);
        }
        prevId = randomId;
      }, delay);

      this.intervalIds.push(intervalId)
    };
    goAhead();
  };


  getRandomId() {
    const emptyIds = this.props.squares.filter(square => square.active === false).map(square => square.id);
    const uniqId = emptyIds[Math.floor(Math.random() * emptyIds.length)];
    return uniqId;
  }

  getSquareColor({active, clicked, timeIsOver}) {
    let color;

    if (active && !clicked && !timeIsOver) {
      color = 'blue';
    }
    else if (active && !clicked && timeIsOver) {
      color = 'red';
    }
    return color
  };


  render() {

    if (!this.props.winners) {
      return <Loader/>
    }

    return (
      <div className={style.main}>
        <StartGameReduxForm onSubmit={this.startGame} restart={this.props.restart}/>
        <GameBoard squares={this.props.squares} getSquareColor={this.getSquareColor}
                   clickedSquaresAC={this.props.clickedSquaresAC} numbersquares={this.props.numbersquares}/>
        <LeaderBord winners={this.props.winners}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  numbersquares: state.board.numbersquares,
  squares: state.board.squares,
  numberOfClicking: state.board.numberOfClicking,
  numberOfOverTime: state.board.numberOfOverTime,
  winners: state.board.winners,
  settings: state.board.settings,
  restart: state.board.restart
});

const mapDispatchToProps = {
  setNumberSquaresAC,
  setSquaresAC,
  randomSquaresAC,
  setTimeIsOverAC,
  clickedSquaresAC,
  getWinnersThunkCreator,
  getSettingsThunkCreator,
  putWinnerThunkCreator,
  restartGameAC
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)