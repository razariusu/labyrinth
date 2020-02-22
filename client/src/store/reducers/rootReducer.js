import { combineReducers } from 'redux'
import tilesReducer from './tilesReducer'
import gameReducer from './gameReducer'
import extraReducer from './extraReducer'

const rootReducer = combineReducers({
  tiles: combineReducers({
    extraTile: extraReducer,
    board: tilesReducer
  }),
  game: gameReducer
})

export default rootReducer
