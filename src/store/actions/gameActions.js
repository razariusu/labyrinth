export const updatePlayer = (newPlayers) => {
  return {
    type: 'UPDATE_PLAYER',
    newPlayers
  }
}

export const movePlayer = (goalTileId, player, path) => {
  return (dispatch, getState) => {
    if(path.length > 0) {
      console.log(player.location)
      console.log(goalTileId)
      console.log(player)
      if(goalTileId !== player.location) {
        dispatch(finishMove(goalTileId, player, path))
      }

      dispatch(changePhase())
    }
    else {
      alert('Illegal move')
    }

  }
}

export const finishMove = (goalTileId, player, path) => {
  return {
    type: 'FINISH_MOVE',
    goalTileId,
    player,
    path
  }
}

export const changePhase = () => {
  return {
    type: 'CHANGE_PHASE'
  }
}

export const resetPath = () => {
  return {
    type: 'RESET_PATH'
  }
}

export const setTransformation = (style, toChange) => {
  return {
    type: 'SET_TRANSFORMATION',
    style,
    toChange
  }
}

export const animateTiles = (toChange) => {
  return {
    type: 'ANIMATE_TILES',
    toChange
  }
}

// export const restoreAnimation = () => {
//   return {
//     type: 'RESTORE_ANIMATION'
//   }
// }
