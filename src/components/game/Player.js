import React, {PureComponent, useState, useEffect, useLayoutEffect} from 'react'
import {positions} from '../../functions'

const Player = (props) => {
  const path = Object.assign(props.path)
  const [style, setStyle] = useState(props.style)
    const [transformation, setTransformation] = useState(props.transformation)
  console.log(props.player)


  useLayoutEffect(() => {
    if(path.length > 0) {
      let i = 1
      const loop = () => {
        setTimeout(() => {
          setStyle(path[i])
          i++
          if(i < path.length) {
            loop()
          }
        }, 500)
      }
      loop()
      props.resetPath()
    }

    return
  }, [path])

  useLayoutEffect(() => {
    if(path.length < 1) {
      setStyle(props.style)
      console.log('style changed')
    }


    return
  }, [props.style])

  // useEffect(() => {
  //   setTransformation(props.transformation)
  //   return
  // }, [props.transformation])
  return(
      <div className='playerDiv' style={Object.assign({}, positions[style])}>
        <div className={`player player${props.player.player}`} style={transformation} >Hei</div>
      </div>
    )
  }



export default Player
