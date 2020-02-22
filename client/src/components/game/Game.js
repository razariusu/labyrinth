import React, {
  Component
} from 'react'
import Board from './Board'
import Dashboard from './Dashboard'
import {
  connect
} from 'react-redux'
import axios from 'axios'
import {
  addToBoard,
  beginPositioning
} from '../../store/actions/tileActions'
import {
  rotateTile
} from '../../store/actions/extraActions'
import {
  movePlayer,
  setTransformation,
  setTiles,
  setExtra,
  setGoal,
  changePlayer,
  updatePlayerNumber,
  updatePlayerName,
  updatePlayerCounter,
  startGame,
  updateMessage,
  updatePlayersObject,
  changePhase,
  updateReachedGoals,
  gameOver
} from '../../store/actions/gameActions'
import {
  isMovable,
  initiateCheck,
  positions,
  onBoard,
  inRow
} from '../../functions'



class Game extends Component {

  componentDidMount() {
    // get tiles and players from server
    // update store
    axios.get('/getState').then(res => {
      let parsedPlayers = JSON.parse(res.data.jsonPlayers)
      let parsedState = JSON.parse(res.data.jsonState)
      let parsedExtra = JSON.parse(res.data.jsonExtra)
      let parsedWinner = JSON.parse(res.data.jsonWinner)
      this.props.setTiles(parsedState)
      this.props.setExtra(parsedExtra)
      this.props.updatePlayersObject(parsedPlayers)
      // if player already connected / on refresh
      if (res.data.jsonPlayerNumber && res.data.jsonPlayerName && res.data.jsonFirstGoal) {
        let parsedGoal = JSON.parse(res.data.jsonFirstGoal)
        let parsedPlayerName = JSON.parse(res.data.jsonPlayerName)
        let parsedPlayerNumber = JSON.parse(res.data.jsonPlayerNumber)
        let parsedPlayerCounter = JSON.parse(res.data.jsonI)
        let parsedGamePhase = JSON.parse(res.data.jsonGamePhase)
        this.props.setGoal(parsedGoal)
        this.props.updatePlayerName(parsedPlayerName)
        this.props.updatePlayerNumber(parsedPlayerNumber)
        this.props.updatePlayerCounter(parsedPlayerCounter)
        this.props.changePhase(parsedGamePhase)
        // if game started, update nextPlayer and message
        if (res.data.jsonToPlay !== null) {
          let parsedToPlay = JSON.parse(res.data.jsonToPlay)
          this.props.changePlayer(parsedToPlay)
          if (parsedToPlay === parsedPlayerNumber) {
            if (parsedGamePhase === 1) {
              this.props.updateMessage('Now move the player.')
            } else if (parsedGamePhase === 0) {
              this.props.updateMessage('Your turn. Rotate and push extra tile.')
            }
          } else {
            this.props.updateMessage(`${Object.values(parsedPlayers).find(pl => pl.player === parsedToPlay).name}'s turn`)
          }
        }
      }
      // update reached goals for my player...
      for (var i = 0; i < parsedPlayers.length; i++) {
        if (parsedPlayers[i].player === this.props.game.playerNumber) {
          // ...if there are goals to update
          if (parsedPlayers[i].doneGoals.length > 0) {
            this.props.updateReachedGoals(parsedPlayers[i].doneGoals)
          }
        }
      }
      // if game over / winner
      if (parsedWinner) {
        this.props.gameOver(parsedWinner)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  handleClick = (clickedTile) => {
    if (this.props.game.started) {
      if (this.props.game.toPlay === this.props.game.playerNumber) {
        // if game phase is 0 (pushing phase) and board is not locked (= your turn)
        if (this.props.game.phase === 0 && this.props.game.locked === false) {
          const board = Object.values(this.props.board)
          const clickedIndex = parseInt(board.findIndex(el => {
            return el.tileId === clickedTile.tileId
          }))
          // disable returning move
          if (this.props.game.unclickable === clickedIndex) {
            this.props.updateMessage('Cannot return move!')
            return
          }
          // check if tile is pushable
          let styleToApply = isMovable(clickedIndex, onBoard, inRow)
          let nextTo = positions[clickedIndex]
          if (styleToApply) {
            this.props.beginPositioning(clickedIndex, nextTo, styleToApply)
            this.props.addToBoard(clickedTile, styleToApply)
            this.props.updateMessage('Now move the player.')
          } else {
            this.props.updateMessage('Cannot push this tile. Only even rows are movable.')
          }
        }
        // if game phase is 1 (moving phase) and board is not locked (= your turn)
        else if (this.props.game.phase === 1 && this.props.game.locked === false) {
          const board = Object.values(this.props.board)
          // if client is a player
          if (this.props.game.playerNumber) {
            const player = Object.values(this.props.game.players).find(obj => obj.player === this.props.game.playerNumber)
            const playerNumber = player.player
            const currentTileId = player.location
            const currentTile = Object.values(this.props.board).find(obj => {
              return obj.tileId === currentTileId
            })
            // check if path exists
            const path = initiateCheck(currentTile, clickedTile, board)
            // send path and goal tile id anyway, handle logic in action creator
            const goalTileId = path.length > 0 ? board[path[path.length - 1]].tileId : null
            this.props.movePlayer(goalTileId, playerNumber, path)
          }
        }
      }
    }
  }
  // receive current rotation on click
  handleRotation = (rotation) => {
    if (this.props.game.started && this.props.game.phase === 0 && this.props.game.toPlay === this.props.game.playerNumber && this.props.game.locked === false) {
      let newRotation;
      if (rotation === 3) {
        newRotation = 0
      } else {
        newRotation = rotation + 1
      }
      this.props.rotateTile(newRotation)
    }
  }

  render() {
    const board = this.props.board
    const onBoard = parseInt(Object.keys(board).length)
    const inRow = parseInt(Math.sqrt(onBoard))
    const extraTile = this.props.extraTile
    if (this.props.game.joined === 4 && !this.props.game.started) {
      this.props.startGame()
    }
    let dashboard = <Dashboard game={this.props.game} />
    // if player has a goal
    
    let winners = this.props.game.winner ? [...this.props.game.winner] : null
    if (winners) {
      if (winners.length === 1) {
        return
      } else if (winners.length === 2) {
        winners = winners.join(' and ')
      } else if (winners.length > 2) {
        winners.forEach((winner, index) => {
          if (index === winners.length - 1) {
            winner = 'and ' + winner
          } else {
            winner = winner + ','
          }
        })
        winners = winners.join(' ')
      }
    }
    let movable = []
    for (var i = 0; i < 49; i++) {
      if (isMovable(i, onBoard, inRow) !== false) {
        if (i !== this.props.game.unclickable)
          movable.push(i)
      }
    }

    return (
      <div className='container'>
        {this.props.game.goalReached ? 
          <div className='darkOverlay'>
            <div className='goalOverlay' style={Object.assign({}, {border: `10px solid ${this.props.game.goalReached.playerColor}`})}>
              <img style={{width: '100%', height: '100%'}} src={`/img/missionCards/${this.props.game.goalReached.goalReached.goal}.png`} alt={this.props.game.goalReached.goalReached.goal}></img>
            </div>
          </div> 
        : null}  
        {winners ? 
          <div className='darkOverlay'>
            <div className='goalOverlay'>No more goals. {winners} won!</div>
          </div> 
        : null}

        <Board movable={movable} extraTile={extraTile} board={board} handleRotation={this.handleRotation} game={this.props.game} handleClick={this.handleClick} transformation={this.props.game.transformation} />
        {dashboard}
      </div>
    )
  }
}

  const mapStateToProps = (state) => {
    return {
      board: state.tiles.board,
      extraTile: state.tiles.extraTile,
      game: state.game
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      updatePlayersObject: (jsonPlayers) => dispatch(updatePlayersObject(jsonPlayers)),
      startGame: () => dispatch(startGame()),
      addToBoard: (clickedTile, style) => dispatch(addToBoard(clickedTile, style)),
      rotateTile: (rotation) => dispatch(rotateTile(rotation)),
      movePlayer: (goalTileId, player, path) => dispatch(movePlayer(goalTileId, player, path)),
      setTransformation: (style) => dispatch(setTransformation(style)),
      beginPositioning: (x, nextTo, style) => dispatch(beginPositioning(x, nextTo, style)),
      setTiles: (data) => dispatch(setTiles(data)),
      setExtra: (extraTile) => dispatch(setExtra(extraTile)),
      updateMessage: (message) => dispatch(updateMessage(message)),
      setGoal: (firstGoal) => dispatch(setGoal(firstGoal)),
      updatePlayerNumber: (playerNumber) => dispatch(updatePlayerNumber(playerNumber)),
      updatePlayerName: (playerName) => dispatch(updatePlayerName(playerName)),
      updatePlayerCounter: (i) => dispatch(updatePlayerCounter(i)),
      changePlayer: (toPlay) => dispatch(changePlayer(toPlay)),
      changePhase: (gamePhase) => dispatch(changePhase(gamePhase)),
      updateReachedGoals: (reachedGoals) => dispatch(updateReachedGoals(reachedGoals)),
      gameOver: (winners) => dispatch(gameOver(winners))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Game)