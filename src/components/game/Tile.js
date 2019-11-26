import React, {useState, useLayoutEffect, useRef} from 'react'
import Player from './Player'
import {positions} from '../../functions'

const Tile = (props) => {

  const tileId = props.tile.tileId

  let degrees;
  if(props.tile) {
    degrees = parseInt(props.tile.rotation) * 90;
  }




    return (
      <div className='tileDiv' style={props.style}>
        <div className={`${props.transformation.transform !== 'none' ? 'toAnimate' : null}`} style={props.transformation}>
          <div className={`${props.tile.type} tile`} style={{transform: `rotate(${degrees}deg)`}} onClick={() => props.handleClick(props.tile)}>

          </div>
        </div>

      </div>
    )
  }






export default Tile
