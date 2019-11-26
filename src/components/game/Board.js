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
    let plIndex = allTiles.findIndex(el => {return el.tileId === player.location})
    return <Player player={player} key={player.player} style={plIndex} transformation={props.game.toTransform.includes(plIndex) ? transformation : {transform: 'none'}} resetPath={props.resetPath} path={player.isNext ? game.path : []}/>
  })
  const tiles = allTiles.map((tile, i) => {
    return <Tile tile={tile} key={tile.tileId} handleClick={props.handleClick} style={positions[i]} transformation={props.game.toTransform.includes(i) ? transformation : {transform: 'none'}}/>
  })
  const extraTile = <ExtraTile extraTile={props.extraTile} handleRotation={props.handleRotation} transformation={props.transformation}/>

  return (
    <div className='board'>
      {tiles}
      {players}
      {extraTile}
    </div>
  )
}

export default Board
