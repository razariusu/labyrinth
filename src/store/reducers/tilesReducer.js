import {tileState} from '../../functions'

const initState = tileState


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
