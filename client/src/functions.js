
// board init state
// const curved = {type: 'curved', T: true, R: true, B: false, L: false};
// const straight = {type: 'straight', T: true, R: false, B: true, L: false};
// const open = {type: 'open', T: true, R: true, B: true, L: false};

// const allTiles = [
//   {tileId: 0, fixed: true, goal: null, rotation: 1, ...curved},
//   {tileId: 1, fixed: false, goal: null, rotation: 3, ...straight},
//   {tileId: 2, fixed: true, goal: null, rotation: 1, ...straight},
//   {tileId: 3, fixed: false, goal: null, rotation: 0, ...curved},
//   {tileId: 4, fixed: true, goal: null, rotation: 2, ...curved},
//   {tileId: 5, fixed: false, goal: null, rotation: 2, ...straight},
//   {tileId: 6, fixed: false, goal: null, rotation: 0, ...curved},
//   {tileId: 7, fixed: false, goal: null, rotation: 0, ...straight},
//   {tileId: 8, fixed: false, goal: null, rotation: 0, ...curved},
//   {tileId: 9, fixed: false, goal: null, rotation: 0, ...curved},
//   {tileId: 10, fixed: true, goal: null, rotation: 0, ...straight},
//   {tileId: 11, fixed: false, goal: null, rotation: 0, ...curved},
//   {tileId: 12, fixed: true, goal: null, rotation: 0, ...open},
//   {tileId: 13, fixed: false, goal: 'dragon', rotation: 0, ...open},
//   {tileId: 14, fixed: true, goal: null, rotation: 0, ...straight},
//   {tileId: 15, fixed: false, goal: null, rotation: 0, ...curved},
//   {tileId: 16, fixed: false, goal: null, rotation: 1, ...open},
//   {tileId: 17, fixed: false, goal: null, rotation: 0, ...curved},
//   {tileId: 18, fixed: false, goal: null, rotation: 0, ...curved},
//   {tileId: 19, fixed: false, goal: null, rotation: 0, ...straight},
//   {tileId: 20, fixed: true, goal: null, rotation: 0, ...curved},
//   {tileId: 21, fixed: false, goal: null, rotation: 0, ...curved},
//   {tileId: 22, fixed: true, goal: null, rotation: 1, ...straight},
//   {tileId: 23, fixed: false, goal: null, rotation: 0, ...straight},
//   {tileId: 24, fixed: true, goal: null, rotation: 3, ...curved},
//   {tileId: 25, fixed: false, goal: null, movable: true, rotation: 0, ...open}
//   ]

// function shuffle() {
//   const tileIds = [1, 3, 5, 6, 7, 8, 9, 11, 13, 15, 16, 17, 18, 19, 21, 23, 25]
//   const fixedTileIds = [0, 2, 4, 10, 12, 14, 20, 22, 24]
//   let currentIndex = tileIds.length;
//   let randomIndex;
//   let tempValue;
//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
    
//     tempValue = tileIds[currentIndex];
//     tileIds[currentIndex] = tileIds[randomIndex];
//     tileIds[randomIndex] = tempValue;
//   }
//   fixedTileIds.forEach(id => {
//     tileIds.splice(id, 0, id)
//   })
//   return tileIds;
// }

// const shuffledMissions = shuffle()
// const mappedTiles = shuffledMissions.map((tileId, index) => {
//   return allTiles.find(tile => tile.tileId === tileId)
// })
// export const extraTile = mappedTiles.pop()
// export const tileState = {}
// mappedTiles.forEach((tile, i) => {
//   console.log(tile.fixed)
  
//   tileState[i] = tile;
//   if(tileState[i].fixed === false) {
//     tileState[i].rotation = Math.floor(Math.random() * 4)
//   }
  
// })



// check if clicked tile movable
export const isMovable = (x, onBoard, inRow) => {
  let style = {transform: 'none'};
  let distance = '82px'

  if (x % 2 === 1) {
    if (x < inRow) {
      style.transform = `translateY(${distance})`
      return style
    } else if (x >= onBoard - inRow) {
      style.transform = `translateY(-${distance})`
      return style
    } else if (x % inRow === 0) {
      style.transform = `translateX(${distance})`
      return style
    } else if ((x + 1) % inRow === 0) {
      style.transform = `translateX(-${distance})`
      return style
    } else {
      return false;
    }
  } else {
    return false;
  }
}

const inRow = 7;
const onBoard = 49;
let currentTileIndex;


export function initiateCheck(currentTile, clickedTile, board) {
  let flagged = []
  let goalReached = false;
  let currentTileIndex;
  let currentTileId;
  let toAdd = board.findIndex(el => {return el.tileId === currentTile.tileId})
  let passable = [toAdd]

  if (checkSides(currentTile, clickedTile, passable, board, goalReached, flagged) === false) {
    passable.pop()
  }
  return passable
}

export function checkSides(currentTile, clickedTile, passable, board, goalReached, flagged) {

  if (isGoalReached(currentTile.tileId, clickedTile.tileId)) {
    goalReached = true
    return true
  } else {
    flagged.push(currentTile.tileId)
    let updatedTile = updateTileWithRealSides(currentTile)
    let currentTileIndex = board.indexOf(currentTile)
    let aboveIndex = parseInt(currentTileIndex) - inRow;
    let belowIndex = parseInt(currentTileIndex) + 7;
    let rightIndex = parseInt(currentTileIndex) + 1;
    let leftIndex = parseInt(currentTileIndex) - 1;
    let isPathEnded = true;

    // check if top is true and if there are tiles above
    if (!goalReached && aboveIndex >= 0 && !flagged.includes(board[aboveIndex].tileId) && updatedTile.T) {
      console.log('checking top of tile: ' + currentTile.tileId)

      // if yes, check bordering tile's opposite side
      let toCheck = board[aboveIndex]
      toCheck = updateTileWithRealSides(toCheck)
      if (toCheck.B) {
        isPathEnded = false;
        passable.push(aboveIndex)
        console.log('top has down true')
        if (checkSides(board[aboveIndex], clickedTile, passable, board, goalReached, flagged) === true) {
          return true
        } else {
          passable.pop()
        }
      }
    }
    if (!goalReached && rightIndex < onBoard && !flagged.includes(board[rightIndex].tileId) && updatedTile.R && onBoard % currentTileIndex + 1 !== 0) {
      console.log('checking right of tile: ' + currentTile.tileId)

      let toCheck = board[rightIndex]
      toCheck = updateTileWithRealSides(toCheck)
      if (toCheck.L) {
        isPathEnded = false;
        passable.push(rightIndex)
        console.log('right has left true')
        if (checkSides(board[rightIndex], clickedTile, passable, board, goalReached, flagged) === true) {
          return true
        } else {
          passable.pop()
        }
      }
    }
    if (!goalReached && belowIndex < onBoard && !flagged.includes(board[belowIndex].tileId) && updatedTile.B) {
      console.log('checking bottom of tile: ' + currentTile.tileId)
      
      let toCheck = board[belowIndex]
      toCheck = updateTileWithRealSides(toCheck)
      if (toCheck.T) {
        isPathEnded = false;
        passable.push(belowIndex)

        console.log('bottom has top true')
        if (checkSides(board[belowIndex], clickedTile, passable, board, goalReached, flagged) === true) {
          return true
        } else {
          passable.pop()
        }
      }
    }
    if (!goalReached && leftIndex >= 0 && !flagged.includes(board[leftIndex].tileId) && updatedTile.L && (onBoard % currentTileIndex > 0 || leftIndex === 0)) {
      console.log('checking left of tile: ' + currentTile.tileId)
      let toCheck = board[leftIndex]
      toCheck = updateTileWithRealSides(toCheck)
      if (toCheck.R) {
        isPathEnded = false;
        passable.push(leftIndex)

        console.log('left has right true')
        if (checkSides(board[leftIndex], clickedTile, passable, board, goalReached, flagged) === true) {
          return true
        } else {
          passable.pop()
        }
      }
    }
  }
  return false
}

export function updateTileWithRealSides(tile) {
  let values = []
  let realSides = Object.assign({}, tile)


  for (var x in tile) {
    if (x === 'T' || x === 'R' || x === 'B' || x === 'L') {
      values.push(tile[x])
    }
  }
  for (var i = tile.rotation; i > 0; i--) {
    values.unshift(values.pop())
  }
  realSides.T = values[0]
  realSides.R = values[1]
  realSides.B = values[2]
  realSides.L = values[3]
  return realSides
}

export function isGoalReached(x, y) {
  if (x === y) {
    // movePlayer()
    console.log('movePlayer')
    return true
  } else {
    console.log('nothing')
    return false
  }
}


let distance = '82px'


export const positions = {
  0: {top: '0px', left: '0px'},
  1: {top: '0px', left: '82px'},
  2: {top: '0px', left: '164px'},
  3: {top: '0px', left: '246px'},
  4: {top: '0px', left: '328px'},
  5: {top: '0px', left: '410px'},
  6: {top: '0px', left: '492px'},
  7: {top: '82px', left: '0px'},
  8: {top: '82px', left: '82px'},
  9: {top: '82px', left: '164px'},
  10: {top: '82px', left: '246px'},
  11: {top: '82px', left: '328px'},
  12: {top: '82px', left: '410px'},
  13: {top: '82px', left: '492px'},
  14: {top: '164px', left: '0px'},
  15: {top: '164px', left: '82px'},
  16: {top: '164px', left: '164px'},
  17: {top: '164px', left: '246px'},
  18: {top: '164px', left: '328px'},
  19: {top: '164px', left: '410px'},
  20: {top: '164px', left: '492px'},
  21: {top: '246px', left: '0px'},
  22: {top: '246px', left: '82px'},
  23: {top: '246px', left: '164px'},
  24: {top: '246px', left: '246px'},
  25: {top: '246px', left: '328px'},
  26: {top: '246px', left: '410px'},
  27: {top: '246px', left: '492px'},
  28: {top: '328px', left: '0px'},
  29: {top: '328px', left: '82px'},
  30: {top: '328px', left: '164px'},
  31: {top: '328px', left: '246px'},
  32: {top: '328px', left: '328px'},
  33: {top: '328px', left: '410px'},
  34: {top: '328px', left: '492px'},
  35: {top: '410px', left: '0px'},
  36: {top: '410px', left: '82px'},
  37: {top: '410px', left: '164px'},
  38: {top: '410px', left: '246px'},
  39: {top: '410px', left: '328px'},
  40: {top: '410px', left: '410px'},
  41: {top: '410px', left: '492px'},
  42: {top: '492px', left: '0px'},
  43: {top: '492px', left: '82px'},
  44: {top: '492px', left: '164px'},
  45: {top: '492px', left: '246px'},
  46: {top: '492px', left: '328px'},
  47: {top: '492px', left: '410px'},
  48: {top: '492px', left: '492px'}
}

