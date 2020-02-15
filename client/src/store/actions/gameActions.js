import actionTypes from '../constants/actionTypes'
import socket from '../../socket'
import store from '../store'



export function setTiles(data) {
  return {
    type: actionTypes.SET_TILES,
    data
  }
}

export function setExtra(extraTile) {
  return {
    type: actionTypes.SET_EXTRA,
    extraTile
  }
}

socket.on('setStarted', hasStarted => {
  store.dispatch(setStarted(hasStarted))
})

export const setStarted = (hasStarted) => {
  return {
    type: actionTypes.SET_STARTED,
    hasStarted
  }
}

socket.on('goalReachedAnimation', (payload) => {

  store.dispatch(setGoalReached(payload.player, payload.previousGoal))
  let state = store.getState()
  let playerName = Object.values(state.game.players).find(obj => obj.player === payload.player).name
  store.dispatch(updateMessage(`${playerName} reached ${payload.previousGoal.goal}`))
  setTimeout(() => {
    store.dispatch(resetGoalReached())

  }, 2000)
})

const setGoalReached = (player, previousGoal) => {
  return {
    type: actionTypes.SET_GOAL_REACHED,
    player,
    previousGoal
  }
}

const resetGoalReached = () => {
  return {
    type: actionTypes.RESET_GOAL_REACHED
  }
}

socket.on('setGoal', (newGoal) => {
  // also add previousGoal to completed
  store.dispatch(setGoal(newGoal))
})


export function setGoal (newGoal) {
  return {
    type: actionTypes.SET_GOAL,
    newGoal
  }
}

socket.on('increaseScore', player => {
  store.dispatch(increaseScore(player))
})

export const increaseScore = (player) => {
  return {
    type: actionTypes.INCREASE_SCORE,
    player
  }
}

export const connectNewPlayer = (name) => {
  return (dispatch, getState) => {
    const isStarted = getState().game.started
    if(!isStarted) {
      socket.emit('connectPlayer', name)
    }
    else {
      console.log('cannot join, all slots occupieddd')
    }
  }
}

socket.on('updatePlayerCounter', (i) => {
  console.log('socket received updatePlayerCounter event')
  store.dispatch(updatePlayerCounter(i))
})



socket.on('updatePlayerName', name => {
  store.dispatch(updatePlayerName(name))
})

socket.on('updatePlayersObject', ({playerNumber, playerName}) => {
  let players = store.getState().game.players
  let playersNew = players.map(player => {
    return player.player === playerNumber ? {...player, name: playerName} : player
  })
  store.dispatch(updatePlayersObject(playersNew))
})

export const updatePlayersObject = (playersNew) => {
  return {
    type: actionTypes.UPDATE_PLAYERS_OBJECT,
    playersNew
  }
}

export const updatePlayerName = (name) => {
  return {
    type: actionTypes.UPDATE_PLAYER_NAME,
    name
  }
}

socket.on('startGame', (toPlay) => {
  // setTimeout(() => {
  //   store.dispatch(startGame(toPlay))
  // }, 1000)
  store.dispatch(startGame(toPlay))
  console.log(toPlay)
  let playerState = store.getState().game.players
  let nextPlayerName = Object.values(playerState).find(obj => obj.player === toPlay).name
  store.dispatch(updateMessage(`${nextPlayerName}'s turn`))
})

export const updatePlayerCounter = (playerCounter) => {
  return {
    type: actionTypes.UPDATE_PLAYER_COUNTER,
    playerCounter
  }
}

export const updatePlayerNumber = (ordinalNumber) => {
  return {
    type: actionTypes.UPDATE_PLAYER_NUMBER,
    ordinalNumber
  }
}

export const startGame = (toPlay) => {
  return {
    type: actionTypes.START_GAME,
    toPlay
  }
}

export const updatePlayer = (newPlayerLocs) => {
  return {
    type: actionTypes.UPDATE_PLAYER,
    newPlayerLocs
  }
}

export const movePlayer = (goalTileId, player, path) => {
  return (dispatch, getState) => {
    
    if(path.length > 0) {
      
      // also lock board
      socket.emit('movePlayer', {player, path, goalTileId})
      dispatch(updateMessage('Moving player...'))
  }
    else {
      dispatch(updateMessage('Path not found'))
    }
  }
}
  
  socket.on('movePlayer', ({player, path, goalTileId}) => {
    store.dispatch(updatePath(path))
    setTimeout(() => {
      store.dispatch(finishMove(goalTileId, player))
      store.dispatch(resetPath())
      store.dispatch(changePhase(0))
      let state = store.getState()
      if(state.game.playerNumber === player && state.game.goal.goalTileId === goalTileId) {
        socket.emit('missionDone', {player, goalTileId})
      }
      if(store.getState().game.playerNumber === player) {
        socket.emit('changePlayer')
      }
      
    //   let nextPlayer
    //   if(player === 4) {
    //     nextPlayer = 1
    //   }
    //   else {
    //     nextPlayer = player + 1
    //   }
    //  store.dispatch(changePlayer(nextPlayer))
    //  let playerState = store.getState().game.players

      
    }, (path.length + 1) * 300 + 50)
    
    

  })

socket.on('updateReachedGoals', reachedGoal => {
  console.log(reachedGoal)
  store.dispatch(updateReachedGoals(reachedGoal))
})

socket.on('changePlayer', toPlay => {
  let playerState = store.getState().game.players
  let toPlayName = Object.values(playerState).find(obj => obj.player === toPlay).name
  store.dispatch(changePlayer(toPlay))
  store.dispatch(updateMessage(`${toPlayName}'s turn`))
})

export const changePlayer = (toPlayName) => {
  return {
    type: actionTypes.CHANGE_PLAYER,
    toPlayName
  }
}

export const updateReachedGoals = (reachedGoal) => {
  return {
    type: actionTypes.UPDATE_REACHED_GOALS,
    reachedGoal
  }
}

socket.on('gameOver', winner => {
  let players = store.getState().game.players
  let winners = winner.map(winner => {
    return Object.values(players).find(player => player.player === winner).color
  })
  store.dispatch(gameOver(winners))
})

export const gameOver = (winners) => {
  return {
  type: actionTypes.GAME_OVER,
  winners
  }
}

export const updatePath = (path) => {
  return {
    type: actionTypes.UPDATE_PATH,
    path
  }
}

export const finishMove = (goalTileId, player) => {
  return {
    type: actionTypes.FINISH_MOVE,
    goalTileId,
    player
  }
}

export const changePhase = (gamePhase) => {
  return {
    type: actionTypes.CHANGE_PHASE,
    gamePhase
  }
}

export const resetPath = () => {
  return {
    type: actionTypes.RESET_PATH
  }
}

export const setTransformation = (style, toChange) => {
  return {
    type: actionTypes.SET_TRANSFORMATION,
    style,
    toChange
  }
}

export const animateTiles = (toChange) => {
  return {
    type: actionTypes.ANIMATE_TILES,
    toChange
  }
}

export const updateMessage = (message) => {
  return {
    type: actionTypes.UPDATE_MESSAGE,
    message
  }
}