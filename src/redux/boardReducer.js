import { gameAPI } from '../api/api'

const SET_SQUARE = 'SET-SQUARE'
const SET_SETTINGS = 'SET-SETTINGS'
const RESET_SQUARE = 'RESET-SQUARE'
const CLEAR_SQUARES = 'CLEAR-SQUARES'

const initialState = {
  squares: [],
  settings: null,
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SQUARE: {
      return {
        ...state,
        squares:[...state.squares, action.payload]
      }
    }
    case RESET_SQUARE: {
      return {
        ...state,
        squares:state.squares.filter(square =>square !== action.payload)
      }
    }
    case CLEAR_SQUARES: {
      return {
        ...state,
        squares:[]
      }
    }
    case SET_SETTINGS: {
      return {
        ...state,
        settings: { ...action.settings }
      }
    }
    default:
      return state
  }
}

export const setSquareAC = (payload) => ({ type: SET_SQUARE, payload: payload })
export const clearSquaresAC = () => ({ type: CLEAR_SQUARES })
export const resetSquareAC = (payload) => ({ type: RESET_SQUARE, payload: payload })
const setSettingsAC = (settings) => ({ type: SET_SETTINGS, settings: settings })

export const getSettingsThunkCreator = () => {
  return (dispatch) => {
    gameAPI.getSettings()
      .then(data => dispatch(setSettingsAC(data)))
  }
}


export default boardReducer
