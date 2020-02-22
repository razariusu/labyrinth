import React from 'react'


const ExtraTile = (props) => {

  const {extraTile, transformation, handleRotation} = props
  let degrees = parseInt(extraTile.tile.rotation) * 90;
  let background;
  let nameToAppend = `${extraTile.tile.goal ? extraTile.tile.goal : extraTile.tile.type}`
  
  background = `/img/tiles/${nameToAppend}.png`

  return(
      <div className='extraDiv' style={extraTile.position}>
        <div className={`${transformation.transform !== 'none' ? 'toAnimate' : null}`} style={transformation}>
          <div className={`tile extraTile`} style={{transform: `rotate(${degrees}deg)`}} onClick={() => handleRotation(extraTile.tile.rotation)}><img alt={nameToAppend}className='tileImg' src={background}></img></div>
        </div>
      </div>


  )
}

export default ExtraTile
