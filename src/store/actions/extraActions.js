export const rotateTile = (extraTile) => {
  return {
    type: 'ROTATE_TILE',
    extraTile
  }
}

// export const changeExtra = (newExtraTile) => {
//   return {
//     type: 'CHANGE_EXTRA',
//     newExtraTile
//   }
// }

export const positionExtra = (newExtraPosition) => {
  return {
    type: 'POSITION_EXTRA',
    newExtraPosition
  }
}
