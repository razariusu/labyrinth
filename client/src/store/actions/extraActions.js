import actionTypes from '../constants/actionTypes'

export const rotateTile = (rotation) => {
  return {
    type: actionTypes.ROTATE_TILE,
    rotation
  }
}

export const positionExtra = (newExtraPosition, rotation) => {
  return {
    type: actionTypes.POSITION_EXTRA,
    newExtraPosition,
    rotation
  }
}
