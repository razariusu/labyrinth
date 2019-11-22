import React, { Component } from 'react'
import Board from './Board'
import ExtraTile from './ExtraTile'
import Player from './Player'
import Card from './Card'
import {connect} from 'react-redux'
import { addToBoard, test, beginPositioning } from '../../store/actions/tileActions'
import { rotateTile } from '../../store/actions/extraActions'
import { movePlayer, resetPath, setTransformation } from '../../store/actions/gameActions'
import {isMovable, initiateCheck, checkSides, isGoalReached, updateTileWithRealSides, positions} from '../../functions'
import {board, onBoard, inRow} from '../../store/reducers/tilesReducer'


class Game extends Component {

  // if socketId === currentPlayer
  handleClick = (clickedTile) => {
    if(this.props.game.phase === 0) {
      const board = this.props.board
      const boardAr = Object.values(board)
      const x = parseInt(boardAr.findIndex(el => {return el.tileId === clickedTile.tileId}))
      let style = isMovable(clickedTile, x, onBoard, inRow)
      let nextTo = positions[x]
      if(style) {
        this.props.beginPositioning(x, nextTo, style)
        // this.props.setTransformation(style)
        this.props.addToBoard(clickedTile, style)

        console.log('isMovable')
        console.log(style)
      }
    }





    else if(this.props.game.phase === 1) {
      // grab socket Id and add to player state
      // for now, simulate with playerId
      // if socketId === playerId and if that player isNext === true
      const board = Object.values(this.props.board)
      const player = this.props.game.players[0]
      const currentTileId = player.location
      const currentTile = Object.values(this.props.board).find(obj => {return obj.tileId === currentTileId})
      const path = initiateCheck(currentTile, clickedTile, board)
      const goalTileId = path.length > 0 ? board[path[path.length - 1]].tileId : null
      console.log(player)
      this.props.movePlayer(goalTileId, player, path)

    }
  }
  handleRotation = (tile) => {
    // if socketId === currentPlayer
    if(this.props.game.phase === 0) {
      this.props.rotateTile(tile)
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
    return(
      <div className='container'>
        <Board board={this.props.board} extraTile={this.props.extraTile} handleRotation={this.handleRotation} game={this.props.game} handleClick={this.handleClick} resetPath={this.resetPath} transformation={this.props.game.transformation}/>
        <Card />
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
    addToBoard: (clickedTile, style) => dispatch(addToBoard(clickedTile, style)),
    rotateTile: (tile) => dispatch(rotateTile(tile)),
    movePlayer: (goalTileId, player, path) => dispatch(movePlayer(goalTileId, player, path)),
    resetPath: () => dispatch(resetPath()),
    setTransformation: (style) => dispatch(setTransformation(style)),
    beginPositioning: (x, nextTo, style) => dispatch(beginPositioning(x, nextTo, style))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game)
