const initState = {
  phase: 0,
  path: [],
  transformation: {transform: 'none'},
  toTransform: [],
  players: [
    {player: 1, isNext: true, location: 0, goal: 21},
    {player: 2, isNext: false, location: 1, goal: 23},
    {player: 3, isNext: false, location: 2, goal: 5},
    {player: 4, isNext: false, location: 3, goal: 15}
  ]
}
const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case 'MOVE_PLAYER':
      const newState = Object.assign({}, action.newGameState);
      return newState
    case 'UPDATE_PLAYER':
      const newPlayers = {...state, players: action.newPlayers}
      return newPlayers;
    case 'FINISH_MOVE':
    console.log(action)
      let player = action.player
      player.location = action.goalTileId
      const path = action.path
      let players = Object.assign(state.players)
      let newestPlayers = players.map(each => {
        return each.player === player.player ? player : each
      })
      const movedState = {...state, players: newestPlayers, path}
      console.log(movedState)
      return movedState;
    case 'CHANGE_PHASE':
      let phaseState = Object.assign({}, state)
      if(phaseState.phase === 1) {
        phaseState.phase = 0;
      }
      else {
        phaseState.phase++
      }
      return phaseState
    case 'RESET_PATH':
      let resetState = Object.assign({}, state)
      resetState.path = []
      return resetState
    case 'SET_TRANSFORMATION':
      const newTransformation = Object.assign({}, state)
      newTransformation.transformation = action.style
      newTransformation.toTransform = action.toChange
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
