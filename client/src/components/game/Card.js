import React from 'react'

const Card = (props) => {
    let cardImg = `/img/missionCards/${props.missionName}.png`
    return (
        <div className='missionCard'>
            <img src={cardImg}></img>
        </div>
    )
}

export default Card