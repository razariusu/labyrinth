import React, {Component} from 'react'
import Tile from './Tile'
import ExtraTile from './ExtraTile'
import { connect } from 'react-redux'
import { addToBoard } from '../../store/actions/tileActions.js'


class Board extends Component {


  handleClick = (clickedTile) => {
    const gamePhase = this.props.game.phase
    let payload;
    const extraTile = this.props.tiles.extraTile;
    if(gamePhase === 0) {
      payload = {clickedTile, extraTile}
      this.props.addToBoard(payload)
    }
    else {
      return
    }
  }

  render() {
    // undo to here


    const tiles = this.props.tiles.tiles;
    const addToBoard = this.props.addToBoard;
    console.log(this.props)
    const allTilesId = [...this.props.tiles.rows[0], ...this.props.tiles.rows[1], ...this.props.tiles.rows[2]]
    console.log(allTilesId)
    const allTilesOrdered = allTilesId.map(tileId => {
      return tiles[tileId]
    })
    console.log(allTilesOrdered)

    return (
      <div className='board'>

        {allTilesOrdered.map((tileI, i) => {
          return <Tile tile={tileI}  handleClick={i === 1 || i=== 3 || i === 5 || i === 7 ? this.handleClick: null} />
        })}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return ({
    tiles: state.tiles,
    game: state.game,
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToBoard: (payload) => dispatch(addToBoard(payload)),

  }
}
// {tiles.map((tile, i) => {
//   return <Tile tile={tile} key={i} handleClick={handleClick}/>
// })}


export default connect(mapStateToProps, mapDispatchToProps)(Board)
