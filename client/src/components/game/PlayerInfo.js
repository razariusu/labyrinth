import React, {useState} from 'react'

const PlayerInfo = (props) => {
    const [modalInfoName, setModalInfoName] = useState({display: 'none'})
    const player = props.player
    let style = {backgroundColor: `${player.color}`, opacity: `${player.player === props.playerNumber ? '1' : '0.6'}`}
    return (
        <div className='playerInfo'>
            <div className={player.player === props.toPlay ? 'infoSquare infoSquareActive' : 'infoSquare'}><div className='infoCircle' style={style}><div className='infoScore'>{player.score}</div></div></div>
            <div className='infoName' onMouseOver={() => setModalInfoName({display: 'block'})} onMouseOut={() => setModalInfoName({display: 'none'})}>{player.name ? player.name.length > 7 ? `${player.name.substring(0, 7)}...` : player.name : `Player ${player.player}`}</div>
            {player.name && player.name.length > 7 ? <div className='modalInfoName' style={modalInfoName}>{player.name}</div> : null}
            
            
        </div>
    )
}

export default PlayerInfo