import actionTypes from '../constants/actionTypes'
import socket from '../../socket'

export function fetchNews(){
  return dispatch => {
      return fetch(`/news`)
      .then( (response) => response.json() )
      .then( (data) => dispatch(newsReceived(data)))
      .catch( (e) => console.log(e) );
  }    
}

export function setTiles(data) {
  return {
    type: actionTypes.SET_TILES,
    data
  }
}

export function setExtra(extraTile) {
  return {
    type: actionTypes.SET_EXTRA,
    extraTile
  }
}

function newsReceived(news){
  return {
      type: actionTypes.NEWS_RECEIVED,
      news
  }
}

export const updatePlayer = (newPlayerLocs) => {
  return {
    type: actionTypes.UPDATE_PLAYER,
    newPlayerLocs
  }
}

export const movePlayer = (goalTileId, player, path) => {
  return (dispatch, getState) => {
    if(path.length > 0) {
      
      // also lock board
      dispatch(updatePath(path))
        setTimeout(() => {
          dispatch(finishMove(goalTileId, player))
          dispatch(resetPath())
          dispatch(changePhase())
          if(player.goal.includes(goalTileId)) {
            dispatch(missionDone(player, goalTileId))
          }
        }, (path.length + 1) * 300 + 50)
      }
      else {
        alert('Illegal move')
      }
    }
  }

export const updatePath = (path) => {
  return {
    type: actionTypes.UPDATE_PATH,
    path
  }
}

export const finishMove = (goalTileId, player) => {
  return {
    type: actionTypes.FINISH_MOVE,
    goalTileId,
    player
  }
}

export const changePhase = () => {
  return {
    type: actionTypes.CHANGE_PHASE
  }
}

export const resetPath = () => {
  return {
    type: actionTypes.RESETH_PATH
  }
}

export const setTransformation = (style, toChange) => {
  return {
    type: actionTypes.SET_TRANSFORMATION,
    style,
    toChange
  }
}

export const animateTiles = (toChange) => {
  return {
    type: actionTypes.ANIMATE_TILES,
    toChange
  }
}

export const missionDone = (player, goalTileId) => {
  return {
    type: actionTypes.MISSION_DONE,
    player,
    goalTileId
  }
}