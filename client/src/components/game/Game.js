import React, { Component } from 'react'
import Board from './Board'
import Dashboard from './Dashboard'
import {connect} from 'react-redux'
import axios from 'axios'
import { addToBoard, beginPositioning } from '../../store/actions/tileActions'
import { rotateTile } from '../../store/actions/extraActions'
import { movePlayer, resetPath, setTransformation, setTiles, setExtra, setGoal, changePlayer, connectNewPlayer, updatePlayerNumber, updatePlayerName, updatePlayerCounter, startGame, updateMessage, updatePlayersObject, changePhase, updateReachedGoals, gameOver } from '../../store/actions/gameActions'
import {isMovable, initiateCheck, checkSides, isGoalReached, updateTileWithRealSides, positions, missions} from '../../functions'
import {onBoard, inRow} from '../../store/reducers/tilesReducer'


class Game extends Component {
  constructor(props) {
    super(props)
    
    
  }

  componentDidMount(){   
    // get tiles from server
    // update store
    axios.get('http://192.168.0.2:3000/getState').then(res => {
      let parsedPlayers = JSON.parse(res.data.jsonPlayers)
      let parsedState = JSON.parse(res.data.jsonState)
      let parsedExtra = JSON.parse(res.data.jsonExtra)
      console.log(res.data.jsonWinner)
      let parsedWinner = JSON.parse(res.data.jsonWinner)
      this.props.setTiles(parsedState)
      this.props.setExtra(parsedExtra)
      this.props.updatePlayersObject(parsedPlayers)
      if(res.data.jsonPlayerNumber && res.data.jsonPlayerName && res.data.jsonFirstGoal) {
        let parsedGoal = JSON.parse(res.data.jsonFirstGoal)
        let parsedPlayerName = JSON.parse(res.data.jsonPlayerName)
        let parsedPlayerNumber = JSON.parse(res.data.jsonPlayerNumber)
        let parsedPlayerCounter = JSON.parse(res.data.jsonI)
        let parsedGamePhase = JSON.parse(res.data.jsonGamePhase)
        console.log(parsedGoal, parsedPlayerName, parsedPlayerNumber, parsedPlayerCounter)
        this.props.setGoal(parsedGoal)
        this.props.updatePlayerName(parsedPlayerName)
        this.props.updatePlayerNumber(parsedPlayerNumber)
        this.props.updatePlayerCounter(parsedPlayerCounter)
        this.props.changePhase(parsedGamePhase)
        if(res.data.jsonToPlay !== null) {
          let parsedToPlay = JSON.parse(res.data.jsonToPlay)
          this.props.changePlayer(parsedToPlay)
          if(parsedToPlay === parsedPlayerNumber) {
            if(parsedGamePhase === 1) {
              this.props.updateMessage('Now move the player.')
            }
            else if(parsedGamePhase === 0) {
              this.props.updateMessage('Your turn. Rotate and push extra tile.')
            }
          }
          else {
            this.props.updateMessage(`${Object.values(parsedPlayers).find(pl => pl.player === parsedToPlay).name}'s turn`)
          }
        }
      }
      for(var i = 0; i < parsedPlayers.length; i++) {
        if(parsedPlayers[i].player === this.props.game.playerNumber) {
          console.log('found the right player')
          if(parsedPlayers[i].doneGoals.length > 0) {
            console.log('at least one goal')
            console.log(parsedPlayers[i].doneGoals)
            this.props.updateReachedGoals(parsedPlayers[i].doneGoals)
          }
        }
      }
      if(parsedWinner) {
        this.props.gameOver(parsedWinner)
      }
    }).catch(err => {
      console.log(err)
    })
      // this.props.setTiles(data.tileState)
      // this.props.setExtra(data.extraTile)
    // })
  
}
  // if socketId === currentPlayer
  handleClick = (clickedTile) => {
    if(this.props.game.started) {

      if(this.props.game.toPlay === this.props.game.playerNumber) {
        if(this.props.game.phase === 0 && this.props.game.locked === false) {
          const board = this.props.board
          const boardAr = Object.values(board)
          const x = parseInt(boardAr.findIndex(el => {return el.tileId === clickedTile.tileId}))
          if(this.props.game.unclickable === x) {
            this.props.updateMessage('Cannot return move!')
            return
        }
        let style = isMovable(x, onBoard, inRow)
        let nextTo = positions[x]
        if(style) {
          this.props.beginPositioning(x, nextTo, style)
          // this.props.setTransformation(style)
          this.props.addToBoard(clickedTile, style)
          this.props.updateMessage('Now move the player.')
        }
        else {
          this.props.updateMessage('Cannot push this tile. Every second line is movable.')
        }
        
      }
  
      else if(this.props.game.phase === 1 && this.props.game.locked === false) {
        const board = Object.values(this.props.board)
        if(this.props.game.playerNumber) {
          const player = Object.values(this.props.game.players).find(obj => obj.player == this.props.game.playerNumber)
          const playerNumber = player.player
          const currentTileId = player.location
          const currentTile = Object.values(this.props.board).find(obj => {return obj.tileId === currentTileId})
          const path = initiateCheck(currentTile, clickedTile, board)
          const goalTileId = path.length > 0 ? board[path[path.length - 1]].tileId : null
          this.props.movePlayer(goalTileId, playerNumber, path)
        }
      }
    }
  }
    
  }
  handleRotation = (rotation) => {
    if(this.props.game.started && this.props.game.phase === 0 && this.props.game.toPlay === this.props.game.playerNumber && this.props.game.locked === false) {
      let newRotation;
      if(rotation === 3) {
        console.log('rotation was 3')
        newRotation = 0
        this.props.rotateTile(newRotation)
      }
      else {
        console.log('rotation wass less than 3')
        newRotation = rotation + 1
        this.props.rotateTile(newRotation)
      }
    }
  }
  resetPath = () => {
    this.props.resetPath()
  }

  render() {
    const board = this.props.board
    const onBoard = parseInt(Object.keys(board).length)
    const inRow = parseInt(Math.sqrt(onBoard))
    const extraTile = this.props.extraTile
    if(this.props.game.joined === 4 && !this.props.game.started ) {
      this.props.startGame()
    }
    let dashboard;
    if(this.props.game.goal) { 
      dashboard = <Dashboard mission={this.props.game.goal} game={this.props.game} joinButton={this.props.connectNewPlayer} board={board}/>
    }
    else {
      dashboard = <Dashboard game={this.props.game} joinButton={this.props.connectNewPlayer} board={board}/>
    }
    let winners = this.props.game.winner ? [...this.props.game.winner] : null
    if(winners) {
      if(winners.length === 1) {
        winners = winners
      }
      else if(winners.length === 2) {
        winners = winners.join(' and ')
      }
      else if (winners.length > 2) {
        winners.forEach((winner, index) => {
          if(index === winners.length - 1) {
            winner = 'and ' + winner
          }
          else {
            winner = winner + ','
          }
        })
        winners = winners.join(' ')
      }
    }
    let movable = []
    for(var i = 0; i<49; i++) {
      if(isMovable(i, onBoard, inRow) !== false) {
        if(i !== this.props.game.unclickable)
        movable.push(i)
      }
    }
    
    console.log(movable)
  
    return(
      <div className='container'>
        {this.props.game.goalReached ? <div className='darkOverlay'><div className='goalOverlay' style={Object.assign({}, {border: `10px solid ${this.props.game.goalReached.playerColor}`})}><img style={{width: '100%', height: '100%'}}src={`/img/missionCards/${this.props.game.goalReached.goalReached.goal}.png`}></img></div></div> : null}  
        {winners ? <div className='darkOverlay'><div className='goalOverlay'>No more goals. {winners} won!</div></div> : null} 

        <Board movable={movable} extraTile={extraTile} board={this.props.board} handleRotation={this.handleRotation} game={this.props.game} handleClick={this.handleClick} resetPath={this.resetPath} transformation={this.props.game.transformation}/>
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
    connectNewPlayer: (ordinalNumber) => dispatch(connectNewPlayer(ordinalNumber)),
    updatePlayersObject: (jsonPlayers) => dispatch(updatePlayersObject(jsonPlayers)),
    startGame: () => dispatch(startGame()),
    addToBoard: (clickedTile, style) => dispatch(addToBoard(clickedTile, style)),
    rotateTile: (rotation) => dispatch(rotateTile(rotation)),
    movePlayer: (goalTileId, player, path) => dispatch(movePlayer(goalTileId, player, path)),
    resetPath: () => dispatch(resetPath()),
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


        {/* <div class='overlay'>
          <div class='overlayTop'>
            <div class='arrowDown'></div>
            <div class='arrowDown'></div>
            <div class='arrowDown'></div>
          </div>
          <div class='overlayLeft'>
            <div class='arrowRight'></div>
            <div class='arrowRight arrowRight2'></div>
            <div class='arrowRight'></div>
          </div>
          <div class='overlayRight'>
            <div class='arrowLeft'></div>
            <div class='arrowLeft'></div>
            <div class='arrowLeft'></div>
          </div>
          <div class='overlayBottom'>
            <div class='arrowUp'></div>
            <div class='arrowUp'></div>
            <div class='arrowUp'></div>
          </div>
        </div> */}