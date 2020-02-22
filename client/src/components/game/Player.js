import React, {useState, useEffect} from 'react'
import {positions} from '../../functions'

const Player = (props) => {
  
  const {player, occupied, style, transformation, path} = props
  const [styleState, setStyleState] = useState(style)
  const [playerClass, setPlayerClass] = useState('playerDiv')

  useEffect(() => {
    
    if(path.length > 0) {
      setPlayerClass('playerDivTransition')
      let i = 0
      const loop = () => {
        setTimeout(() => {
          setStyleState(path[i])
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
      setStyleState(style)
      console.log('style changed')
    }
    return
  }, [style])


  return(
      <div className={playerClass} style={positions[styleState]}>
        <div className={`${transformation.transform !== 'none' ? 'toAnimate' : null}`} style={transformation}>
          <div className={`player player${player.player} ${occupied}`} style={{backgroundColor: `${player.color}`}}></div>
        </div>
      </div>
    )
  }



export default Player
