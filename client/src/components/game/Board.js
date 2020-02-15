import React, {useState, useEffect} from 'react'
import Tile from './Tile'
import Player from './Player'
import ExtraTile from './ExtraTile'
import {positions} from '../../functions'

const Board = (props) => {
  const [transformation, setTransformation] = useState(null)
  useEffect(() => {
    setTransformation(props.transformation)
  }, [props.transformation])

  let board = props.board;
  let game = props.game
  let playerLocations = game.players.map(player => {
    return player.location
  })
  
  let allTiles = Object.values(board)
  const players = game.players.map(player => {
    let testArray = playerLocations.filter((loc, index) => {
      return player.location === loc 
    })
    let plIndex = allTiles.findIndex(el => {return el.tileId === player.location})
    return <Player player={player} key={player.player} occupied={testArray.length > 1 ? `occupied${player.player}` : null} style={plIndex === -1 ? player.location : plIndex} transformation={props.game.toTransform.includes(plIndex) ? transformation : {transform: 'none'}} resetPath={props.resetPath} path={player.player === game.toPlay ? game.path : []}/>
  })
  const tiles = allTiles.map((tile, i) => {
    return <Tile hover={game.locked ? null : 'tileHover'} tile={tile} key={tile.tileId} clickable={props.movable.includes(i) && game.toPlay === game.playerNumber && game.phase === 0 ? 'clickable' : null} handleClick={props.handleClick} style={positions[i]} transformation={props.game.toTransform.includes(i) ? transformation : {transform: 'none'}}/>
  })
  const extraTile = <ExtraTile extraTile={props.extraTile} handleRotation={props.handleRotation} transformation={props.transformation}/>

  return (
    <div className='board'>
      {tiles}
      {players}
      <div className={`divFrame ${game.toPlay === game.playerNumber && game.playerNumber ? 'divFrameActive' : null}`}></div>
      {extraTile}
    </div>
  )
}

export default Board
