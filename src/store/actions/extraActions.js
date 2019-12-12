import actionTypes from '../constants/actionTypes'

export const rotateTile = (extraTile) => {
  return {
    type: actionTypes.ROTATE_TILE,
    extraTile
  }
}

// export const changeExtra = (newExtraTile) => {
//   return {
//     type: actionTypes.CHANGE_EXTRA,
//     newExtraTile
//   }
// }

export const positionExtra = (newExtraPosition) => {
  return {
    type: actionTypes.POSITION_EXTRA,
    newExtraPosition
  }
}
