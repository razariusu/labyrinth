

const curved = {type: 'curved', T: true, R: true, B: false, L: false};
const straight = {type: 'straight', T: true, R: false, B: true, L: false};
const open = {type: 'open', T: true, R: true, B: true, L: false};


const initState = {
  rows: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ],
  extraTile: {tileId: 9, rotation: 0, ...open},
  tiles: {
    0: {tileId: 0, rotation: 0, ...curved},
    1: {tileId: 1, rotation: 0, ...straight},
    2: {tileId: 2, rotation: 0, ...curved},
    3: {tileId: 3, rotation: 0, ...curved},
    4: {tileId: 4, rotation: 0, ...open},
    5: {tileId: 5, rotation: 0, ...straight},
    6: {tileId: 6, rotation: 0, ...curved},
    7: {tileId: 7, rotation: 0, ...straight},
    8: {tileId: 8, rotation: 0, ...curved},
    9: {tileId: 9, rotation: 0, ...open}
  }
}

const tilesReducer = (state = initState, action) => {

  switch (action.type) {
    case 'FINISH_ADD':
    console.log(action)
    const newState = Object.assign({}, action.payload)
    return newState
    case 'ROTATE_TILE':
    const rotatedState = Object.assign({}, state);
    if(action.tile.rotation === 3) {
      rotatedState.extraTile.rotation = 0;
      }
     else {
       rotatedState.extraTile.rotation = parseInt(rotatedState.extraTile.rotation) + 1;
      }
    return rotatedState;
    default:
    return state;

  }


}

export default tilesReducer
