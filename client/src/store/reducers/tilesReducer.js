import actionTypes from '../constants/actionTypes'

// import {tileState} from '../../functions'

const initState = {}

const tilesReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FINISH_ADD:
      console.log(action)
      const newState = Object.assign({}, action.newBoard)
      return newState
    case actionTypes.DO_ALL:
      let doAllState = Object.assign({}, action.newBoard)
      return doAllState
    case actionTypes.SET_TILES:
      const serverTiles = Object.assign({}, action.data)
      return serverTiles
    default:
    return state
  }
}

export default tilesReducer
