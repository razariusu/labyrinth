import React, {useState, useEffect} from 'react'
import Tile from './Tile'
import Player from './Player'
import ExtraTile from './ExtraTile'
import {positions} from '../../functions'

const Board = (props) => {
  const {board, game, transformation} = props
  const [transformationState, settransformationState] = useState(null)
  useEffect(() => {
    settransformationState(transformation)
  }, [transformation])
  
  let playerLocations = game.players.map(player => {
    return player.location
  })
  
  let allTiles = Object.values(board)
  const players = game.players.map(player => {
    let occupiedArray = playerLocations.filter(loc => {
      return player.location === loc 
    })
    let plIndex = allTiles.findIndex(el => {return el.tileId === player.location})
    return <Player player={player} key={player.player} occupied={occupiedArray.length > 1 ? `occupied${player.player}` : null} style={plIndex === -1 ? player.location : plIndex} transformation={game.toTransform.includes(plIndex) ? transformationState : {transform: 'none'}} path={player.player === game.toPlay ? game.path : []}/>
  })
  const tiles = allTiles.map((tile, i) => {
    return <Tile hover={game.locked ? null : 'tileHover'} tile={tile} key={tile.tileId} clickable={props.movable.includes(i) && game.toPlay === game.playerNumber && game.phase === 0 ? 'clickable' : null} handleClick={props.handleClick} style={positions[i]} transformation={game.toTransform.includes(i) ? transformationState : {transform: 'none'}}/>
  })
  const extraTile = <ExtraTile extraTile={props.extraTile} handleRotation={props.handleRotation} transformation={transformation}/>

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
