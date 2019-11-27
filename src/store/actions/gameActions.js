export const updatePlayer = (newPlayerLocs) => {
  return {
    type: 'UPDATE_PLAYER',
    newPlayerLocs
  }
}

export const movePlayer = (goalTileId, player, path) => {
  return (dispatch, getState) => {
    if(path.length > 0) {
      
      // also lock board
      dispatch(updatePath(path))
        setTimeout(() => {
          dispatch(finishMove(goalTileId, player))
          dispatch(resetPath())
          dispatch(changePhase())
          if(player.goal.includes(goalTileId)) {
            dispatch(missionDone(player, goalTileId))
          }
        }, (path.length + 1) * 300 + 50)
      }
      else {
        alert('Illegal move')
      }
    }
  }

export const updatePath = (path) => {
  return {
    type: 'UPDATE_PATH',
    path
  }
}

export const finishMove = (goalTileId, player) => {
  return {
    type: 'FINISH_MOVE',
    goalTileId,
    player
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

export const missionDone = (player, goalTileId) => {
  return {
    type: 'MISSION_DONE',
    player,
    goalTileId
  }
}