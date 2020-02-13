import { applyMiddleware, combineReducers, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'
import boardReducer from './boardReducer'

const reducers = combineReducers({
  form: formReducer,
  board: boardReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store
