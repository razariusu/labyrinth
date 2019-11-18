const initState = {tile: {tileId: 25, goal: 'monster', movable: true, rotation: 0, type: 'open', T: true, R: true, B: true, L: false},
                  position: {top: '1000px', left: '320px'}}

const extraReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ROTATE_TILE':
    let rotatedState = Object.assign({}, state)
    if(action.extraTile.rotation === 3) {
      rotatedState.tile.rotation = 0;
      }
     else {
      rotatedState.tile.rotation = parseInt(rotatedState.tile.rotation) + 1;
      }
    return rotatedState;

    case 'CHANGE_EXTRA':
    let newTileState = Object.assign({}, state);
    newTileState.tile = action.newExtraTile
    newTileState.position = {
    top: '1000px',
    left: '320px'
    }
    return newTileState;
    case 'DO_ALL':
    let doAllState = Object.assign({}, state)
    doAllState.tile = action.newExtra
    doAllState.position = {
      top: '1000px',
      left: '320px'
    }
    return doAllState
    case 'POSITION_EXTRA':
    let newExtraState = Object.assign({}, state)
    console.log(action.newExtraPosition)
    newExtraState.position = action.newExtraPosition
    console.log(newExtraState)
    return newExtraState
    default:
    return state
  }
}

export default extraReducer
