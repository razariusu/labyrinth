import actionTypes from '../constants/actionTypes'
import socket from '../../socket'
import store from '../store'
import {movePlayer} from './gameActions'
import {changeExtra, positionExtra, rotateTile} from './extraActions'
import {onBoard, inRow} from '../reducers/tilesReducer'
import {updatePlayer, changePhase, setTransformation, animateTiles, restoreAnimation} from './gameActions'



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

    // const toChangeObjects = toChange.map(tileI => {
    //   return board[tileI]
    // })

    // const newExtra = toChangeObjects.pop()
    // toChangeObjects.unshift(extraTile)

    // for(var i = 0; i < toChange.length; i++) {
    //   newBoard[toChange[i]] = toChangeObjects[i]
    // }

    
    // also lock the board and make undo impossible
    socket.emit('setTransformation', {style, clickedTile, oldExtraTile, toChange})
    // dispatch(setTransformation(style, toChange))
    // restoreAnimation, finishAdd, changeExtra
    // setTimeout(() => {
    //   if(playerLocs.includes(newExtra.tileId)) {
    //     newPlayerLocs = playerLocs.map((loc) => {
    //       return loc === newExtra.tileId ? extraTile.tileId : loc
    //     })


      //   dispatch(updatePlayer(newPlayerLocs))
      // }
      
      // also unlock the board
      // socket.emit('changePhase')
      // dispatch(changePhase())
    // }, 1000)
    
    
  }
}


socket.on('setTransformation', ({style, toChange}) => {
  store.dispatch(setTransformation(style, toChange))
})

socket.on('setRotation', rotation => {
  
})

socket.on('doAll', ({toChange, extraTile, oldExtraTile}) => {
  console.log(toChange)
  let newBoard = Object.assign({}, store.getState().tiles.board)
  let newExtra = extraTile
  // const players = [...store.getState().game.players]
  // let newPlayerLocs = []
  // const playerLocs = players.map(player => {
  //     return player.location
  //   })
  // if(playerLocs.includes(extraTile.tileId)) {
  //   newPlayerLocs = playerLocs.map((loc) => {
  //     return loc === newExtra.tileId ? oldExtraTile.tileId : loc
  //   })
  // }
  const toChangeObjects = toChange.map(tileI => {
    return newBoard[tileI]
  })
  console.log(toChangeObjects)

  toChangeObjects.pop()
  toChangeObjects.unshift(oldExtraTile)

  for(var i = 0; i < toChange.length; i++) {
    newBoard[toChange[i]] = toChangeObjects[i]
  }
  console.log('new board:')
  console.log(newBoard)
  console.log('new extra:')
  console.log(newExtra)
  store.dispatch(doAll(newBoard, newExtra))

    // dispatch(updatePlayer(newPlayerLocs))
  // if(newPlayerLocs.length > 0) {
  //   store.dispatch(updatePlayer(newPlayerLocs))
  // }
  
  store.dispatch(changePhase(1))
})

socket.on('updatePlayer', newPlayerLocs => {
  store.dispatch(updatePlayer(newPlayerLocs))
})

// socket.on('changePhase', () => {
//   store.dispatch(changePhase())
// })





// export const finishAdd = (newBoard) => {
//   return {
//     type: actionTypes.FINISH_ADD,
//     newBoard
//   }
// }

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
    // dispatch(positionExtra(newExtraPosition))
  }

  


}

socket.on('positionExtra', ({newExtraPosition, rotation}) => {
  store.dispatch(positionExtra(newExtraPosition, rotation))
})

// const initiateDoAll = (toChange, extraTile) => {
//   return (dispatch, getState) => {
//     let newBoard = Object.assign({}, getState().tiles.board)
//     const players = [...getState().game.players]
//     let newPlayerLocs
//     const playerLocs = players.map(player => {
//         return player.location
//       })
//     if(playerLocs.includes(extraTile.tileId)) {
//       newPlayerLocs = playerLocs.map((loc) => {
//         return loc === newExtra.tileId ? store.getState().tiles.extraTile.tileId : loc
//       })
//     }
//     const toChangeObjects = toChange.map(tileI => {
//       return newBoard[tileI]
//     })

//     const newExtra = toChangeObjects.pop()
//     toChangeObjects.unshift(extraTile)

//     for(var i = 0; i < toChange.length; i++) {
//       newBoard[toChange[i]] = toChangeObjects[i]
//     }
//     setTimeout(() => {
//       dispatch(doAll(newBoard, newExtra))

//       dispatch('updatePlayer', newPlayerLocs)
//         // dispatch(updatePlayer(newPlayerLocs))
      
//       dispatch(changePhase(1))
//     }, 1000)
  
//   }
// }

const doAll = (newBoard, newExtra) => {
  return {
    type: actionTypes.DO_ALL,
    newBoard,
    newExtra
  }
}
