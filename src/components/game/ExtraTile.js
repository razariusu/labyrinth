import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { rotateTile } from '../../store/actions/tileActions.js'


const ExtraTile = (props) => {

  

  let degrees = parseInt(props.extraTile.tile.rotation) * 90;

  return(
    <div className='extraDiv' style={props.extraTile.position}>
      <div className={`${props.transformation.transform !== 'none' ? 'toAnimate' : null}`} style={props.transformation}>
        <div className={`${props.extraTile.tile.type} tile extraTile `} style={{transform: `rotate(${degrees}deg)  `}} onClick={() => props.handleRotation(props.extraTile.tile)}/>
      </div>
    </div>

  )
}

export default ExtraTile
