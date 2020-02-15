import { combineReducers } from 'redux'
import tilesReducer from './tilesReducer'
import gameReducer from './gameReducer'
import extraReducer from './extraReducer'
import redditReducer from './redditReducer'

const rootReducer = combineReducers({
  tiles: combineReducers({
    extraTile: extraReducer,
    board: tilesReducer
  }),
  game: gameReducer,
  reddit: redditReducer
})

export default rootReducer
