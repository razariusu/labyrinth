const missions = [0, 2, 4, 5, 7, 11, 14, 16, 18, 19, 20, 24]

function shuffle() {
  let currentIndex = missions.length;
  let randomIndex;
  let tempValue;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = missions[currentIndex];
    missions[currentIndex] = missions[randomIndex];
    missions[randomIndex] = tempValue;
  }
  return missions;
}

const shuffledMissions = shuffle()

const missions1 = [...shuffledMissions].splice(0, 3)
const missions2 = [...shuffledMissions].splice(3, 3)
const missions3 = [...shuffledMissions].splice(6, 3)
const missions4 = [...shuffledMissions].splice(9, 3)



const initState = {
  phase: 0,
  path: [],
  transformation: {transform: 'none'},
  toTransform: [],
  locked: false,
  players: [
    {player: 1, isNext: true, location: 0, goal: missions1},
    {player: 2, isNext: false, location: 1, goal: missions2},
    {player: 3, isNext: false, location: 2, goal: missions3},
    {player: 4, isNext: false, location: 3, goal: missions4}
  ]
}
const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case 'MOVE_PLAYER':
      const newState = Object.assign({}, action.newGameState);
      return newState
    case 'UPDATE_PLAYER':
      const newPlayers = Object.assign({}, state)
      newPlayers.players.map((player, i) => {
        return player.location = action.newPlayerLocs[i]
      })
      return newPlayers;
    case 'UPDATE_PATH':
      const newPathState = Object.assign({}, state)
      newPathState.path = action.path
      newPathState.locked = true
      return newPathState
    case 'FINISH_MOVE':
      let player = action.player
      player.location = action.goalTileId
      let players = Object.assign(state.players)
      let newestPlayers = players.map(each => {
        return each.player === player.player ? player : each
      })
      const movedState = {...state, players: newestPlayers}
      return movedState;
    case 'MISSION_DONE':
      let playerNew = action.player
      let playersNew = Object.assign(state.players)
      let newestPlayers1 = playersNew.map(each => {
        if(each.player === playerNew.player) {
          each.goal.filter(id => {
            return id !== action.goalTileId
          })
        }
        return each.player === playerNew.player ? playerNew : each
      })
      let theNewestState = {...state, players: newestPlayers1}
    case 'CHANGE_PHASE':
      let phaseState = Object.assign({}, state)
      if(phaseState.phase === 1) {
        phaseState.phase = 0;
      }
      else {
        phaseState.phase = phaseState.phase + 1
      }
      phaseState.locked = false
      return phaseState
    case 'RESET_PATH':
      let resetState = Object.assign({}, state)
      resetState.path = []
      return resetState
    case 'SET_TRANSFORMATION':
      const newTransformation = Object.assign({}, state)
      newTransformation.transformation = action.style
      newTransformation.toTransform = action.toChange
      newTransformation.locked = true
      return newTransformation
    case 'ANIMATE_TILES':
      let animatedState = Object.assign({}, state)
      animatedState.toTransform = action.toChange
      return animatedState
    case 'RESTORE_ANIMATION':
      let restoredState = Object.assign({}, state)
      restoredState.transformation = {transform: 'none'}
      restoredState.toTransform = []
      return restoredState
    case 'DO_ALL':
      let doAllState = Object.assign({}, state)
      doAllState.transformation = {transform: 'none'}
      doAllState.toTransform = []
      return doAllState
    default:
      return state;
  };
}

export default gameReducer