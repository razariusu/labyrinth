import actionTypes from '../constants/actionTypes'
// import {extraTile} from '../../functions'

const initState = {tile: 0,
                  position: {top: '1000px', left: '320px'}}

const extraReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ROTATE_TILE:
    let rotatedState = Object.assign({}, state)
    if(action.extraTile.rotation === 3) {
      rotatedState.tile.rotation = 0;
      }
     else {
      rotatedState.tile.rotation = parseInt(rotatedState.tile.rotation) + 1;
      }
    return rotatedState;

    case actionTypes.CHANGE_EXTRA:
    let newTileState = Object.assign({}, state);
    newTileState.tile = action.newExtraTile
    newTileState.position = {
    top: '1000px',
    left: '320px'
    }
    return newTileState;
    case actionTypes.DO_ALL:
    let doAllState = Object.assign({}, state)
    doAllState.tile = action.newExtra
    console.log(doAllState.tile)
    doAllState.position = {
      top: '1000px',
      left: '320px'
    }
    return doAllState
    case actionTypes.POSITION_EXTRA:
    let newExtraState = Object.assign({}, state)
    console.log(newExtraState)
    newExtraState.position = action.newExtraPosition
    console.log(newExtraState)
    return newExtraState
    case actionTypes.SET_EXTRA:
      const newestState = Object.assign({}, state)
      newestState.tile = action.extraTile
      return newestState
    default:
    return state
  }
}

export default extraReducer
