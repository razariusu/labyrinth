import React from 'react'

const Card = ({missionName}) => {
    let cardImg = `/img/missionCards/${missionName}.png`
    return (
        <div className='missionCard'>
            <img src={cardImg} alt={missionName}></img>
        </div>
    )
}

export default Card