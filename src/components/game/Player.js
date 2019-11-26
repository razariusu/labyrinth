import React, {PureComponent, useState, useEffect, useLayoutEffect} from 'react'
import {positions} from '../../functions'

const Player = (props) => {
  
  const path = props.path;
  const [style, setStyle] = useState(props.style)
  const [playerClass, setPlayerClass] = useState('playerDiv')

  console.log(props.style)


  useEffect(() => {
    
    if(path.length > 0) {
      setPlayerClass('playerDivTransition')
      let i = 0
      const loop = () => {
        setTimeout(() => {
          setStyle(path[i])
          i++
          if(i < path.length) {
            loop()
          }
        }, 300)
      }
      loop()
      
    }
    
    return (() => {
      setPlayerClass('playerDiv')
    })
  }, [path])

  // when player is on moved tile
  useEffect(() => {
    if(path.length < 1) {
      setStyle(props.style)
      console.log('style changed')
    }
    return
  }, [props.style])

  

  return(
      <div className={playerClass} style={positions[style]}>
        <div className={`${props.transformation.transform !== 'none' ? 'toAnimate' : null}`} style={props.transformation}>
          <div className={`player player${props.player.player}`} >Hei</div>
        </div>
      </div>
    )
  }



export default Player
