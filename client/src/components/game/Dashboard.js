import React, {useState, useEffect} from 'react'
import Card from './Card'
import JoinGame from './JoinGame'
import PlayerInfo from './PlayerInfo'
import Tutorial from './Tutorial'


const Dashboard = (props) => {
    // todo: cookies, flexbox for dashboard
    const game = props.game
    console.log(props)
    const [modal, setModal] = useState(false)
    const [msg, setMsg] = useState(game.message)

    const showModal = () => {
        setModal(true)
    }

    const hideModal = () => {
        setModal(false)
    }

    useEffect(() => {
        if(game.message === `${game.name}'s turn` && game.phase === 0) {
            if(game.phase === 0) {
                setMsg('Your turn! Rotate and push extra tile')
            }
            else if(game.phase === 1) {
                setMsg('Now move the player.')
            }
        }
        
        else {
            setMsg(game.message)
        }
    }, [game.message])
    
    let message;
    if(game.playerNumber) {
        if(game.started) {
            message = <div className='message'>{msg}</div>
        }

        else {
            message = <div className='message'>Waiting for {4 - game.joined} more players...</div>
        }
    }
    else {
        if(game.started) {
            message = <div className='message'>Game in progress</div>
        }
        else if (game.started === false){
            message = <JoinGame />
        }
    }
    return (
        // colored circle with name
        // backend - send player objects on connect
        <div className='dashboard'>
            <h1>Labyrinth Game</h1>
            <Tutorial showModal={modal} handleClose={hideModal}/>
            <a className='tutorialLink' onClick={showModal}>How to play</a>
            <div className='scoreboard'>
                {game.players.map(player => {
                    return <PlayerInfo player={player} toPlay={game.toPlay} playerNumber={game.playerNumber}/>
                })}
             </div>
            {/* TO DO - show 'blue won'  */}

            <div class='messageDiv'>{message}</div>
            <div className='dashboardCards'>
                <div className='dashboardSide dashboardLeft'>
                    <div className='currentGoal'>
                        <p className='cardsHeader'>CURRENT GOAL</p>
                        {game.playerNumber && game.started && game.toPlay ? <Card missionName={props.mission.goal}/> : <div className='missionCard' style={{backgroundColor: 'white'}}></div>}
                    </div>
                </div>
                <div className='dashboardSide dashboardRight'>
                    <div className='previousGoals'>
                        <p className='cardsHeader'>REACHED GOALS</p>
                        {game.completed.length > 0 ? game.completed.map(goal => {
                        return <img className='missionThumbnail' src={`/img/missionCards/${goal.goal}.png`}></img> }) : null}
                    </div>
                </div>
            </div>

    
        </div>
    )
}


export default Dashboard