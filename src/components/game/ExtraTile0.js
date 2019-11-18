import React from 'react'
import { connect } from 'react-redux'
import { rotateTile } from '../../store/actions/tileActions.js'


const ExtraTile = (props) => {
  var degrees;

  const handleRotation = (tile) => {

    props.rotateTile(tile)

    }



  degrees = parseInt(props.tiles.extraTile.rotation) * 90;
  return(

    <div className={props.tiles.extraTile.type + ' tile extraTile'} style={{transform: 'rotate(' + degrees + 'deg)'}} onClick={() => handleRotation(props.tiles.extraTile)}/>
  )

}

const mapStateToProps = (state) => {
  return ({
    tiles: state.tiles
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    rotateTile: (tile) => dispatch(rotateTile(tile))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ExtraTile)
