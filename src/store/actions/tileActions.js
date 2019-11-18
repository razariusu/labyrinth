import {movePlayer} from './gameActions'
import {changeExtra, positionExtra} from './extraActions'
import {onBoard, inRow} from '../reducers/tilesReducer'
import {updatePlayer, changePhase, setTransformation, animateTiles, restoreAnimation} from './gameActions'



export const addToBoard = (clickedTile, style) => {
  return (dispatch, getState) => {
    const toChange = []
    const state = getState()
    const board = Object.assign({}, state.tiles.board);
    const players = Array.from(state.game.players)
    const playerLocs = players.map(player => {
      return player.location
    })
    const newBoard = Object.assign(board)
    const extraTile = state.tiles.extraTile.tile
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

    const toChangeObjects = toChange.map(tileI => {
      return board[tileI]
    })
    const toChangeIds = toChange.map(index => {
      return board[index].tileId
    })
    const newExtra = toChangeObjects.pop()
    toChangeObjects.unshift(extraTile)

    for(var i = 0; i < toChange.length; i++) {
      newBoard[toChange[i]] = toChangeObjects[i]
    }

    if(playerLocs.includes(newExtra.tileId)) {
      const newPlayerObjects = players.map((player, i) => {
        if(player.location === newExtra.tileId) {
          player.location = extraTile.tileId
        }
        return player
      })
      console.log(newPlayerObjects)
      dispatch(updatePlayer(newPlayerObjects))
    }
    console.log(style)
    setTimeout(() => {
      dispatch(setTransformation(style, toChange))
    }, 200)
    setTimeout(() => {
      dispatch(doAll(newBoard, newExtra))
    }, 1000)
    // setTimeout(() => {
    //   dispatch(restoreAnimation())
    // }, 900)
    // setTimeout(() => {
    //   dispatch(finishAdd(newBoard))
    // }, 1000)
    // setTimeout(() => {
    //   dispatch(changeExtra(newExtra))
    // }, 1100)
    setTimeout(() => {
      dispatch(changePhase())
    }, 1100)
  }
}


export const finishAdd = (newBoard) => {
  return {
    type: 'FINISH_ADD',
    newBoard
  }
}

export const beginPositioning = (x, nextTo, style) => {
  return (dispatch, getState) => {
    const state = getState()
    let newExtraPosition = {}
    if(x < inRow) {
      let changedValue = '-160px'
      newExtraPosition = {...nextTo, top: changedValue}
      console.log(newExtraPosition)
    }
    else if(x >= onBoard-inRow) {
      let changedValue = '800px'
      newExtraPosition = {...nextTo, top: changedValue}
      console.log(newExtraPosition)
    }
    else if(x % inRow === 0){
      let changedValue = '-160px'
      newExtraPosition = {...nextTo, left: changedValue}
      console.log(newExtraPosition)
    }
    else {
      let changedValue = '800px'
      newExtraPosition = {...nextTo, left: changedValue}
      console.log(newExtraPosition)
    }
    dispatch(positionExtra(newExtraPosition))
  }


}

const doAll = (newBoard, newExtra) => {
  return {
    type: 'DO_ALL',
    newBoard,
    newExtra
  }
}