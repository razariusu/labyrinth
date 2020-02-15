import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { rotateTile } from '../../store/actions/tileActions.js.js'


const ExtraTile = (props) => {

  // onLoad - change class from 'hidden' to 'show'
  console.log(props.extraTile)

  let degrees = parseInt(props.extraTile.tile.rotation) * 90;
  let background;
  if(props.extraTile.tile.goal) {
    background = `/img/tiles/${props.extraTile.tile.goal}.png`
  }
  else {
    background = `/img/tiles/${props.extraTile.tile.type}.png`
  }

  return(
      <div className='extraDiv' style={props.extraTile.position}>
        <div className={`${props.transformation.transform !== 'none' ? 'toAnimate' : null}`} style={props.transformation}>
          <div className={`tile extraTile`} style={{transform: `rotate(${degrees}deg)`}} onClick={() => props.handleRotation(props.extraTile.tile.rotation)}><img className='tileImg' src={background}></img></div>
        </div>
      </div>


  )
}

export default ExtraTile
