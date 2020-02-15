import React, {useState, useLayoutEffect, useRef} from 'react'
import Player from './Player'
import {positions} from '../../functions'

const Tile = (props) => {

  const tileId = props.tile.tileId

  let degrees;
  if(props.tile) {
    degrees = parseInt(props.tile.rotation) * 90;
  }
  let background;
  if(props.tile.goal) {
    background = `/img/tiles/${props.tile.goal}.png`
  }
  else {
    background = `/img/tiles/${props.tile.type}.png`
  }


    return (
      <div className={`${props.transformation.transform !== 'none' ? 'toAnimate' : null} tileDiv`} style={Object.assign({}, props.style, props.transformation)}>
          <div className={` ${props.transformation.transform === 'none' ? props.clickable : null}  ${props.hover} tile `}  onClick={() => props.handleClick(props.tile)}><img className='tileImg' src={background} style={{transform: `rotate(${degrees}deg)`}}></img>
        </div>
      </div>
    )
  }
  






export default Tile
