
const curved = {type: 'curved', T: true, R: true, B: false, L: false};
const straight = {type: 'straight', T: true, R: false, B: true, L: false};
const open = {type: 'open', T: true, R: true, B: true, L: false};

const initState = {
    0: {tileId: 0, goal: null, rotation: 2, ...curved},
    1: {tileId: 1, goal: null, rotation: 3, ...straight},
    2: {tileId: 2, goal: null, rotation: 1, ...curved},
    3: {tileId: 3, goal: null, rotation: 0, ...curved},
    4: {tileId: 4, goal: 'dragon', rotation: 0, ...open},
    5: {tileId: 5, goal: null, rotation: 2, ...straight},
    6: {tileId: 6, goal: null, rotation: 0, ...curved},
    7: {tileId: 7, goal: null, rotation: 0, ...straight},
    8: {tileId: 8, goal: null, rotation: 0, ...curved},
    9: {tileId: 9, goal: null, rotation: 0, ...curved},
    10: {tileId: 10, goal: null, rotation: 0, ...straight},
    11: {tileId: 11, goal: null, rotation: 0, ...curved},
    12: {tileId: 12, goal: null, rotation: 0, ...curved},
    13: {tileId: 13, goal: 'dragon', rotation: 0, ...open},
    14: {tileId: 14, goal: null, rotation: 0, ...straight},
    15: {tileId: 15, goal: null, rotation: 0, ...curved},
    16: {tileId: 16, goal: null, rotation: 1, ...open},
    17: {tileId: 17, goal: null, rotation: 0, ...curved},
    18: {tileId: 18, goal: null, rotation: 0, ...curved},
    19: {tileId: 19, goal: null, rotation: 0, ...straight},
    20: {tileId: 20, goal: null, rotation: 0, ...curved},
    21: {tileId: 21, goal: null, rotation: 0, ...curved},
    22: {tileId: 22, goal: 'dragon', rotation: 0, ...open},
    23: {tileId: 23, goal: null, rotation: 0, ...straight},
    24: {tileId: 24, goal: null, rotation: 0, ...curved}
  }


const tilesReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FINISH_ADD':
    console.log(action)
    const newState = Object.assign({}, action.newBoard)
    return newState
    case 'DO_ALL':
    let doAllState = Object.assign({}, action.newBoard)
    return doAllState
    default:
    return state
  }
}

// function getKeyByValue(object, value) {
//   return Object.keys(object).find(key => object[key] === value);
// }

export const board = Object.assign({}, initState)
export const onBoard = parseInt(Object.keys(initState).length)
export const inRow = parseInt(Math.sqrt(onBoard))



export default tilesReducer
