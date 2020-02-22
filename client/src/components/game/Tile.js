import React from 'react'

const Tile = (props) => {
  const {tile, transformation, style, clickable, hover, handleClick} = props
  let background;
  let nameToAppend = `${tile.goal ? tile.goal : tile.type}`
  
  background = `/img/tiles/${nameToAppend}.png`
  let degrees;
  if(tile) {
    degrees = parseInt(tile.rotation) * 90;
  }

  return (
    <div className={`${transformation.transform !== 'none' ? 'toAnimate' : null} tileDiv`} style={Object.assign({}, style, transformation)}>
        <div className={` ${transformation.transform === 'none' ? clickable : null}  ${hover} tile `}  onClick={() => handleClick(tile)}><img className='tileImg' alt={nameToAppend} src={background} style={{transform: `rotate(${degrees}deg)`}}></img>
      </div>
    </div>
  )
}
  
export default Tile
