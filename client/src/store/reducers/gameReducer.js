import actionTypes from '../constants/actionTypes'

const initState = {
  started: 0,
  joined: 0,
  playerNumber: null,
  name: '',
  toPlay: null,
  phase: 0,
  path: [],
  unclickable: null,
  transformation: {transform: 'none'},
  toTransform: [],
  locked: true,
  goal: null,
  completed: [],
  goalReached: null,
  players: [
    {player: 1, location: 0, score: 0, color: 'blue'},
    {player: 2, location: 6, score: 0, color: 'green'},
    {player: 3, location: 48, score: 0, color: 'red'},
    {player: 4, location: 42, score: 0, color: 'black'}
  ],
  message: '',
  winner: null
}
const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_STARTED:
      return {...state, started: action.hasStarted}
    case actionTypes.UPDATE_PLAYERS_OBJECT:
      return {...state, players: action.playersNew}
    case actionTypes.INCREASE_SCORE:
      let newPlayersObjs = state.players.map(playerObj => {
        return playerObj.player === action.player ? {...playerObj, score: (playerObj.score+1)} : playerObj
      })
      return {...state, players: newPlayersObjs}
    case actionTypes.SET_GOAL_REACHED:
      let playerReached = Object.values(state.players).find(obj => obj.player === action.player)
      let playerColor = playerReached.color
      return {...state, goalReached: {playerColor: playerColor, goalReached: action.previousGoal}}
    case actionTypes.RESET_GOAL_REACHED:
      return {...state, goalReached: null}
    case actionTypes.SET_GOAL:
      return {...state, goal: action.newGoal}
    case actionTypes.UPDATE_REACHED_GOALS:
      let newCompleted
      if(Array.isArray(action.reachedGoal) === true) {
        newCompleted = [...state.completed, ...action.reachedGoal]
      }
      else {
        newCompleted = [...state.completed, action.reachedGoal]
      }
      return {...state, completed: newCompleted}
    case actionTypes.UPDATE_PLAYER_COUNTER:
      return {...state, joined: action.playerCounter}
    case actionTypes.UPDATE_PLAYER_NUMBER:
      return {...state, playerNumber: action.ordinalNumber}
    case actionTypes.START_GAME:
      let anotherState = Object.assign({}, state)
      anotherState.toPlay = action.toPlay
      anotherState.started = true
      return anotherState
    case actionTypes.UNLOCK_BOARD: 
      return {...state, locked: false}
    case actionTypes.MOVE_PLAYER:
      const newState = Object.assign({}, action.newGameState);
      return newState
    case actionTypes.UPDATE_PLAYER:
      const newPlayers = Object.assign({}, state)
      newPlayers.players.map((player, i) => {
        return player.location = action.newPlayerLocs[i]
      })
      return newPlayers;
    case actionTypes.UPDATE_PATH:
      const newPathState = Object.assign({}, state)
      newPathState.path = action.path
      newPathState.locked = true
      return newPathState
    case actionTypes.FINISH_MOVE:
      let player = action.player
      let playerToUpdate = Object.values(state.players).find(obj => obj.player === player)
      playerToUpdate.location = action.goalTileId
      let players = Object.assign(state.players)
      let newestPlayers = players.map(each => {
        return each.player === player.player ? player : each
      })
      const movedState = {...state, players: newestPlayers}
      return movedState;
    case actionTypes.CHANGE_PLAYER:
      return {...state, toPlay: action.toPlayName}
    case actionTypes.MISSION_DONE:
      let newPlayer = action.player
      let newPlayerMissions = newPlayer.goal.filter(id => {return id !== action.goalTileId })
      newPlayer.score += 1
      let oldGoalIndex = newPlayer.missions.findIndex((value) => value === action.goalTileId)
      newPlayerMissions.unshift(newPlayer.missions[oldGoalIndex + 1])
      newPlayer.goal = newPlayerMissions
      let newestPlayers1 = state.players.map(player => {
        return player.player === newPlayer.player ? newPlayer : player
      })
      const playersNewState = {...state, players: newestPlayers1}
      return playersNewState
    case actionTypes.CHANGE_PHASE:
      let phaseState = Object.assign({}, state)
      phaseState.phase = action.gamePhase
      phaseState.locked = false
      return phaseState
    case actionTypes.RESET_PATH:
      let resetState = Object.assign({}, state)
      resetState.path = []
      return resetState
    case actionTypes.SET_TRANSFORMATION:
      const newTransformation = Object.assign({}, state)
      newTransformation.transformation = action.style
      newTransformation.toTransform = action.toChange
      newTransformation.unclickable = action.toChange[action.toChange.length - 1]
      newTransformation.locked = true
      return newTransformation
    case actionTypes.ANIMATE_TILES:
      let animatedState = Object.assign({}, state)
      animatedState.toTransform = action.toChange
      return animatedState
    case actionTypes.RESTORE_ANIMATION:
      let restoredState = Object.assign({}, state)
      restoredState.transformation = {transform: 'none'}
      restoredState.toTransform = []
      return restoredState
    case actionTypes.DO_ALL:
      let doAllState = Object.assign({}, state)
      doAllState.transformation = {transform: 'none'}
      doAllState.toTransform = []
      return doAllState
    case actionTypes.UPDATE_MESSAGE:
      return {...state, message: action.message}
    case actionTypes.UPDATE_PLAYER_NAME:
      return {...state, name: action.name }
    case actionTypes.GAME_OVER:
      return {...state, winner: action.winners, locked: true}
    default:
      return state;
  };
}

export default gameReducer