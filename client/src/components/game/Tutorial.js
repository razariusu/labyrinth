import React from 'react'

const Tutorial = ({showModal, handleClose}) => {
    const showHideClassName = showModal ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                <div className='modal-section'>
                    <h1>Rules</h1>
                    <p>There are 7x7 (49) tiles on the board, plus one extra tile.</p>
                    <p>Game is played by pushing walls and moving your player.</p>
                    <p>Extra tile is used to push walls, thereby creating paths.</p>
                    <p>Earn points by reaching tiles that contain your goal.</p>
                    <p>After scoring, you receive a new goal.</p>
                    <p>When there are no more unique goals to draw, the game ends. Player with most points wins the game.</p>
                </div>
                <div className='modal-section'>
                    <h1>How to play</h1>
                    <p>Click on the extra tile to rotate it. Then, click on an edge tile where you want to insert the extra tile.</p>
                    <p>After moving a wall, click on a reachable tile to move your player. Tile is reachable if there is an open path to it from your location. If you wish to remain where you are, click on your current location.</p>
                    <p>Every EVEN wall is movable - tiles you can push will be indicated on hover.</p>
                    <p>You cannot return a move - it is not possible to push back the wall pushed by the previous player and undo their move.</p>
                    <p>Square around players' circles indicates whose turn it is.</p>
                    <p>Messages on the dashboard will provide useful information.</p>
                </div>
                <div className='modalButton' onClick={handleClose}></div>
            </section>
        </div>
    )
}

export default Tutorial;