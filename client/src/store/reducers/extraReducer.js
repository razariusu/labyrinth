import actionTypes from '../constants/actionTypes'

const initState = {tile: 0,
                  position: {top: '246px', left: '700px'}}

const extraReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ROTATE_TILE:
      let rotatedTile = Object.assign({}, state.tile)
      rotatedTile.rotation = action.rotation
      console.log(rotatedTile)
      return {...state, tile: rotatedTile}
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
    doAllState.position = {
      top: '246px',
      left: '700px'
    }
    return doAllState
    case actionTypes.POSITION_EXTRA:
    let newExtraState = Object.assign({}, state)
    newExtraState.tile.rotation = action.rotation
    newExtraState.position = action.newExtraPosition
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
