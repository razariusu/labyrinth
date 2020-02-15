import actionTypes from '../constants/actionTypes'

export const rotateTile = (rotation) => {
  return {
    type: actionTypes.ROTATE_TILE,
    rotation
  }
}

// export const changeExtra = (newExtraTile) => {
//   return {
//     type: actionTypes.CHANGE_EXTRA,
//     newExtraTile
//   }
// }

export const positionExtra = (newExtraPosition, rotation) => {
  return {
    type: actionTypes.POSITION_EXTRA,
    newExtraPosition,
    rotation
  }
}
