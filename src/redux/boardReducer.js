import { winnersAPI } from '../api/api'

const SET_NUMBER_SQUARES = 'SET-NUMBER-SQUARES'
const SET_SQUARES = 'SET-SQUARES'
const RANDOM_SQUARES = 'RANDOM-SQUARES'
const CLICKED_SQUARES = 'CLICKED-SQUARES'
const SET_TIME_IS_OVER = 'SET-TIME-IS-OVER'
const SET_WINNERS = 'SET-WINNERS'
const SET_SETTINGS = 'SET-SETTINGS'
const RESTART_GAME = 'RESTART-GAME'

const initialState = {
  numbersquares: null,
  squares: [],
  numberOfClicking: null,
  numberOfOverTime: null,
  winners: null,
  settings: null,
  restart: false
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NUMBER_SQUARES: {
      return {
        ...state,
        numbersquares: action.numberSquares
      }
    }
    case SET_SQUARES: {
      return {
        ...state,
        squares: (function () {
          const array = []
          for (let i = state.numbersquares; i > 0; i--) {
            array.push({ id: i, active: false, clicked: false, timeIsOver: false })
          }
          return array
        })()
      }
    }
    case RANDOM_SQUARES: {
      return {
        ...state,
        squares: state.squares.map(square => square.id === action.id ? { ...square, active: true } : square)

      }
    }
    case CLICKED_SQUARES: {
      return {
        ...state,
        squares: state.squares.map(square => square.id === action.id ? { ...square, clicked: true } : square),
        numberOfClicking: state.numberOfClicking + 1
      }
    }
    case SET_TIME_IS_OVER: {
      return {
        ...state,
        squares: state.squares.map(square => square.id === action.id ? { ...square, timeIsOver: true } : square),
        numberOfOverTime: ++state.numberOfOverTime
      }
    }
    case SET_WINNERS: {
      return {
        ...state,
        winners: action.winners
      }
    }
    case SET_SETTINGS: {
      return {
        ...state,
        settings: { ...action.settings }
      }
    }
    case RESTART_GAME: {
      return {
        ...state,
        numbersquares: null,
        squares: state.squares.map(square => {
          return { ...square, active: null, clicked: null, timeIsOver: null }
        }),
        numberOfClicking: null,
        numberOfOverTime: null,
        restart: action.restart

      }
    }
    default:
      return state
  }
}

export const setSquaresAC = () => ({ type: SET_SQUARES })
export const setNumberSquaresAC = (numberSquares) => ({ type: SET_NUMBER_SQUARES, numberSquares: numberSquares })
export const randomSquaresAC = (randomSquaresId) => ({ type: RANDOM_SQUARES, id: randomSquaresId })
export const setTimeIsOverAC = (squareId) => ({ type: SET_TIME_IS_OVER, id: squareId })
export const clickedSquaresAC = (squareId) => ({ type: CLICKED_SQUARES, id: squareId })
const setWinnersAC = (winners) => ({ type: SET_WINNERS, winners: winners })
const setSettingsAC = (settings) => ({ type: SET_SETTINGS, settings: settings })
export const restartGameAC = (restart) => ({ type: RESTART_GAME, restart: restart })

export const getWinnersThunkCreator = () => {
  return (dispatch) => {
    winnersAPI.getWinners()
      .then(data => dispatch(setWinnersAC(data)))
  }
}

export const getSettingsThunkCreator = () => {
  return (dispatch) => {
    winnersAPI.getSettings()
      .then(data => dispatch(setSettingsAC(data)))
  }
}

export const putWinnerThunkCreator = (winner, date) => {
  return (dispatch) => {
    winnersAPI.putWinner(winner, date)
      .then(response => {
        if (response.status === 200) {
          dispatch(setWinnersAC(response.data))
        }
      })
  }
}

export default boardReducer
