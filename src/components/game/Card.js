import React from 'react'

const Card = (props) => {
    return (
        <div className='mission-card'>
            <h1>Current mission: {props.content.goal}</h1>
            <h2>Score: {props.content.score}</h2>
        </div>
    )
}

export default Card