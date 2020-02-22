import actionTypes from '../constants/actionTypes'
import socket from '../../socket'
import store from '../store'
import {positionExtra} from './extraActions'
import {onBoard, inRow} from '../../functions'
import {updatePlayer, changePhase, setTransformation} from './gameActions'



export const addToBoard = (clickedTile, style) => {
  return (dispatch, getState) => {
    const toChange = []
    const state = getState()
    const board = Object.assign({}, state.tiles.board);
    const oldExtraTile = state.tiles.extraTile.tile
    const clickedIndex = parseInt(Object.keys(board).find(key => board[key].tileId === clickedTile.tileId))
    if(clickedIndex < inRow) {
      for(let y = clickedIndex; y < onBoard; y += inRow) {
        toChange.push(y)
      }
    }
    else if(clickedIndex >= onBoard-inRow) {
      for(let y = clickedIndex; y > 0; y -= inRow) {
        toChange.push(y)
      }
    }
    else if(clickedIndex % inRow === 0){
      for(let y = clickedIndex; y < clickedIndex + inRow; y++) {
        toChange.push(y)
      }
    }
    else {
      for(let y = clickedIndex; y > clickedIndex - inRow; y--) {
        toChange.push(y)
      }
    }
    // also lock the board and make undo impossible
    socket.emit('setTransformation', {style, clickedTile, oldExtraTile, toChange})
  }
}

export const beginPositioning = (x, nextTo, style) => {
  return (dispatch, getState) => {
    const state = getState()
    const rotation = state.tiles.extraTile.tile.rotation
    let newExtraPosition = {}
    if(x < inRow) {
      let changedValue = '-82px'
      newExtraPosition = {...nextTo, top: changedValue}
      console.log(newExtraPosition)
    }
    else if(x >= onBoard-inRow) {
      let changedValue = '574px'
      newExtraPosition = {...nextTo, top: changedValue}
      console.log(newExtraPosition)
    }
    else if(x % inRow === 0){
      let changedValue = '-82px'
      newExtraPosition = {...nextTo, left: changedValue}
      console.log(newExtraPosition)
    }
    else {
      let changedValue = '574px'
      newExtraPosition = {...nextTo, left: changedValue}
      console.log(newExtraPosition)
    }
    socket.emit('positionExtra', {newExtraPosition, rotation})
  }
}

const doAll = (newBoard, newExtra) => {
  return {
    type: actionTypes.DO_ALL,
    newBoard,
    newExtra
  }
}

socket.on('setTransformation', ({style, toChange}) => {
  store.dispatch(setTransformation(style, toChange))
})

socket.on('doAll', ({toChange, extraTile, oldExtraTile}) => {
  let newBoard = Object.assign({}, store.getState().tiles.board)
  let newExtra = extraTile
  const toChangeObjects = toChange.map(tileI => {
    return newBoard[tileI]
  })
  toChangeObjects.pop()
  toChangeObjects.unshift(oldExtraTile)

  for(var i = 0; i < toChange.length; i++) {
    newBoard[toChange[i]] = toChangeObjects[i]
  }
  store.dispatch(doAll(newBoard, newExtra))
  store.dispatch(changePhase(1))
})

socket.on('updatePlayer', newPlayerLocs => {
  store.dispatch(updatePlayer(newPlayerLocs))
})

socket.on('positionExtra', ({newExtraPosition, rotation}) => {
  store.dispatch(positionExtra(newExtraPosition, rotation))
})