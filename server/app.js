const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path')
const cors = require('cors')
const session = require('express-session')

const port = process.env.PORT || 5000;
let app = express();
let server = http.createServer(app)
let io = socketIO(server)
app.use(express.urlencoded({
  extended: true
}));
// express.json() is required to receive data from axios
app.use(express.json());
let cookieParser = require('cookie-parser')
const missionsFile = require('./missions')

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}))

app.get('/getState', (req, res) => {
  let jsonState = JSON.stringify(tileState)
  let jsonExtra = JSON.stringify(extraTile)
  let filteredPlayers = players.map(pl => {
    return {
      player: pl.player,
      name: pl.name,
      color: pl.color,
      location: pl.location,
      score: pl.score,
      doneGoals: pl.doneGoals
    }
  })
  let jsonPlayers = JSON.stringify(filteredPlayers)
  let jsonWinner = JSON.stringify(winner)
  // check if cookie exists, if connected to player
  if (req.headers.cookie && req.headers.cookie.includes('playerNumberAndName')) {
    let cookieValue = req.headers.cookie.split('playerNumberAndName=')[1].substring(0, 32);
    let player = Object.values(players).find(pl => {
      console.log(pl.cookieValue, cookieValue);
      return pl.cookieValue === cookieValue
    })
    let jsonToPlay = JSON.stringify(toPlay)
    if (hasStarted === true) {

    }
    if (player) {
      let playerNumber = player.player
      let playerName = player.name
      let firstGoal = {
        goalTileId: player.goalTileId,
        goal: player.goal
      }
      let jsonPlayerNumber = JSON.stringify(playerNumber)
      let jsonPlayerName = JSON.stringify(playerName)
      let jsonFirstGoal = JSON.stringify(firstGoal)
      let jsonI = JSON.stringify(i)
      let jsonGamePhase = JSON.stringify(gamePhase)
      jsonState = JSON.stringify(tileState)
      jsonExtra = JSON.stringify(extraTile)
      console.log(tileState)
      res.json({
        jsonState: jsonState,
        jsonExtra: jsonExtra,
        jsonPlayers: jsonPlayers,
        jsonPlayerNumber: jsonPlayerNumber,
        jsonPlayerName: jsonPlayerName,
        jsonFirstGoal: jsonFirstGoal,
        jsonI,
        jsonI,
        jsonToPlay: jsonToPlay,
        jsonGamePhase: jsonGamePhase,
        jsonWinner: jsonWinner
      })

    } else {
      console.log('there is no player like that')
      res.json({
        jsonState: jsonState,
        jsonExtra: jsonExtra,
        jsonPlayers: jsonPlayers,
        jsonWinner: jsonWinner
      })
    }
  } else {
    res.json({
      jsonState: jsonState,
      jsonExtra: jsonExtra,
      jsonPlayers: jsonPlayers,
      jsonWinner
    })
  }
})

app.post('/joinGame', (req, res) => {
  let firstGoal = null
  let playerNumber = null;
  let playerName = '';

  if (!req.headers.cookie) {
    if (joined < 4) {
      console.log('joined less than 4')
      res.cookie('playerNumberAndName', req.sessionID)
      let playerToChange = players[i]
      joined++
      playerToChange.name = req.body.name
      playerToChange.cookieValue = req.sessionID;
      firstGoal = missionsFile.shuffledMissions.pop()
      playerToChange.goalTileId = firstGoal.goalTileId
      playerToChange.goal = firstGoal.goal
      playerNumber = playerToChange.player
      playerName = playerToChange.name
      i++
      res.json({
        playerNumber,
        firstGoal,
        playerName
      })

      io.emit('updatePlayersObject', {
        playerNumber,
        playerName
      })
      io.emit('updatePlayerCounter', i)
      if (i === 4) {
        hasStarted = true;
        toPlay = Math.floor(Math.random() * 4 + 1)
        io.sockets.emit('startGame', toPlay)
      }
    }
  } else if (req.headers.cookie && req.headers.cookie.includes('playerNumberAndName') === false) {
    console.log('there is no such cookie')
    if (joined < 4) {
      console.log('joined less than 4')
      res.cookie('playerNumberAndName', req.sessionID)
      let playerToChange = players[i]
      joined++
      playerToChange.name = req.body.name
      playerToChange.cookieValue = req.sessionID;
      firstGoal = missionsFile.shuffledMissions.pop()
      playerToChange.goalTileId = firstGoal.goalTileId
      playerToChange.goal = firstGoal.goal
      playerNumber = playerToChange.player
      playerName = playerToChange.name
      i++
      res.json({
        playerNumber,
        firstGoal,
        playerName
      })

      io.emit('updatePlayersObject', {
        playerNumber,
        playerName
      })
      io.emit('updatePlayerCounter', i)
      if (i === 4) {

        hasStarted = true;
        toPlay = Math.floor(Math.random() * 4 + 1)

        io.sockets.emit('startGame', toPlay)
      }
    }
  }
})

app.use(cookieParser)
io.origins(['*:*']);

let i = 0
let joined = 0
let winner = null

const players = [{
    player: 1,
    cookieValue: '',
    name: '',
    color: 'blue',
    location: 0,
    goalTileId: null,
    goal: '',
    score: 0,
    doneGoals: []
  },
  {
    player: 2,
    cookieValue: '',
    name: '',
    color: 'green',
    location: 6,
    goalTileId: null,
    goal: '',
    score: 0,
    doneGoals: []
  },
  {
    player: 3,
    cookieValue: '',
    name: '',
    color: 'red',
    location: 48,
    goalTileId: null,
    goal: '',
    score: 0,
    doneGoals: []
  },
  {
    player: 4,
    cookieValue: '',
    name: '',
    color: 'black',
    location: 42,
    goalTileId: null,
    goal: '',
    score: 0,
    doneGoals: []
  }
]

let toPlay = null;

// Initial board create
const curved = {
  type: 'curved',
  T: true,
  R: true,
  B: false,
  L: false
};
const straight = {
  type: 'straight',
  T: true,
  R: false,
  B: true,
  L: false
};
const open = {
  type: 'open',
  T: true,
  R: true,
  B: true,
  L: false
};

const allTiles = [{
    tileId: 0,
    fixed: true,
    goal: 'blue',
    rotation: 1,
    ...curved
  },
  {
    tileId: 1,
    fixed: false,
    goal: 'owl',
    rotation: 0,
    ...curved
  },
  {
    tileId: 2,
    fixed: true,
    goal: 'bat',
    rotation: 1,
    ...open
  },
  {
    tileId: 3,
    fixed: false,
    goal: 'spider',
    rotation: 0,
    ...curved
  },
  {
    tileId: 4,
    fixed: true,
    goal: 'genie',
    rotation: 1,
    ...open
  },
  {
    tileId: 5,
    fixed: false,
    goal: 'rat',
    rotation: 0,
    ...curved
  },
  {
    tileId: 6,
    fixed: true,
    goal: 'green',
    rotation: 2,
    ...curved
  },


  {
    tileId: 7,
    fixed: false,
    goal: 'snake',
    rotation: 0,
    ...curved
  },
  {
    tileId: 8,
    fixed: false,
    goal: 'bug',
    rotation: 0,
    ...curved
  },
  {
    tileId: 9,
    fixed: false,
    goal: 'moth',
    rotation: 0,
    ...curved
  },
  {
    tileId: 10,
    fixed: false,
    goal: null,
    rotation: 0,
    ...curved
  },
  {
    tileId: 11,
    fixed: false,
    goal: null,
    rotation: 0,
    ...curved
  },
  {
    tileId: 12,
    fixed: false,
    goal: null,
    rotation: 0,
    ...curved
  },
  {
    tileId: 13,
    fixed: false,
    goal: null,
    rotation: 0,
    ...curved
  },

  {
    tileId: 14,
    fixed: true,
    goal: 'pharaoh',
    rotation: 0,
    ...open
  },
  {
    tileId: 15,
    fixed: false,
    goal: null,
    rotation: 0,
    ...curved
  },
  {
    tileId: 16,
    fixed: true,
    goal: 'crown',
    rotation: 0,
    ...open
  },
  {
    tileId: 17,
    fixed: false,
    goal: null,
    rotation: 0,
    ...curved
  },
  {
    tileId: 18,
    fixed: true,
    goal: 'chest',
    rotation: 1,
    ...open
  },
  {
    tileId: 19,
    fixed: false,
    goal: null,
    rotation: 0,
    ...curved
  },
  {
    tileId: 20,
    fixed: true,
    goal: 'book',
    rotation: 2,
    ...open
  },

  {
    tileId: 21,
    fixed: false,
    goal: null,
    rotation: 0,
    ...curved
  },
  {
    tileId: 22,
    fixed: false,
    goal: null,
    rotation: 0,
    ...curved
  },
  {
    tileId: 23,
    fixed: false,
    goal: null,
    rotation: 0,
    ...curved
  },
  {
    tileId: 24,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },
  {
    tileId: 25,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },
  {
    tileId: 26,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },
  {
    tileId: 27,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },

  {
    tileId: 28,
    fixed: true,
    goal: 'sword',
    rotation: 0,
    ...open
  },
  {
    tileId: 29,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },
  {
    tileId: 30,
    fixed: true,
    goal: 'key',
    rotation: 3,
    ...open
  },
  {
    tileId: 31,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },
  {
    tileId: 32,
    fixed: true,
    goal: 'unicorn',
    rotation: 2,
    ...open
  },
  {
    tileId: 33,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },
  {
    tileId: 34,
    fixed: true,
    goal: 'skull',
    rotation: 2,
    ...open
  },

  {
    tileId: 35,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },
  {
    tileId: 36,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },
  {
    tileId: 37,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },
  {
    tileId: 38,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },
  {
    tileId: 39,
    fixed: false,
    goal: null,
    rotation: 0,
    ...straight
  },
  {
    tileId: 40,
    fixed: false,
    goal: 'ring',
    rotation: 0,
    ...open
  },
  {
    tileId: 41,
    fixed: false,
    goal: 'ghost',
    rotation: 0,
    ...open
  },

  {
    tileId: 42,
    fixed: true,
    goal: 'black',
    rotation: 0,
    ...curved
  },
  {
    tileId: 43,
    fixed: false,
    goal: 'map',
    rotation: 0,
    ...open
  },
  {
    tileId: 44,
    fixed: true,
    goal: 'torch',
    rotation: 3,
    ...open
  },
  {
    tileId: 45,
    fixed: false,
    goal: 'diamond',
    rotation: 0,
    ...open
  },
  {
    tileId: 46,
    fixed: true,
    goal: 'money',
    rotation: 3,
    ...open
  },
  {
    tileId: 47,
    fixed: false,
    goal: 'dragon',
    rotation: 0,
    ...open
  },
  {
    tileId: 48,
    fixed: true,
    goal: 'red',
    rotation: 3,
    ...curved
  },

  {
    tileId: 49,
    fixed: false,
    goal: 'helmet',
    rotation: 0,
    ...open
  },
]

function shuffle() {
  const tileIds = [1, 3, 5, 7, 8, 9, 10, 11, 12, 13, 15, 17, 19, 21, 22, 23, 24, 25, 26, 27, 29, 31, 33, 35, 36, 37, 38, 39, 40, 41, 43, 45, 47, 49]
  const fixedTileIds = [0, 2, 4, 6, 14, 16, 18, 20, 28, 30, 32, 34, 42, 44, 46, 48]
  let currentIndex = tileIds.length;
  let randomIndex;
  let tempValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = tileIds[currentIndex];
    tileIds[currentIndex] = tileIds[randomIndex];
    tileIds[randomIndex] = tempValue;
  }
  fixedTileIds.forEach(id => {
    tileIds.splice(id, 0, id)
  })
  return tileIds;
}

const shuffledTiles = shuffle()
const mappedTiles = shuffledTiles.map((tileId, index) => {
  return allTiles.find(tile => tile.tileId === tileId)
})
let extraTile = mappedTiles.pop()
let tileState = {}
mappedTiles.forEach((tile, i) => {
  tileState[i] = tile;
  if (tileState[i].fixed === false) {
    tileState[i].rotation = Math.floor(Math.random() * 4)
  }
})

const inRow = 7
const onBoard = 49
let toChange
let oldExtraTile
let gamePhase = 0
var playerCounter = 0
let hasStarted = false

io.sockets.on('connection', (client) => {
  console.log("New connection");
  client.emit('setStarted', hasStarted)
  client.on('missionDone', ({
    player,
    goalTileId
  }) => {
    let previousGoal = missionsFile.missions.find(mission => {
      return mission.goalTileId === goalTileId
    })
    for (var x = 0; x < players.length; x++) {
      if (players[x].player === player) {
        players[x].score++
        players[x].doneGoals.push(previousGoal)
      }
    }
    io.sockets.emit('goalReachedAnimation', {
      player,
      previousGoal
    })
    io.sockets.emit('increaseScore', player)
    client.emit('updateReachedGoals', previousGoal)
    if (missionsFile.shuffledMissions.length === 0) {
      // math.max() calculate winner
      let winningScore = players.map(player => player.score).reduce((max, current) => {
        return Math.max(max, current)
      })
      winner = players.filter(player => player.score === winningScore).map(player => player.player)
      console.log(winner)
      setTimeout(() => {
        io.sockets.emit('gameOver', winner)
      }, 2000)
    } else {
      let newGoal = missionsFile.shuffledMissions.pop()
      client.emit('setGoal', newGoal)
      for (var x = 0; x < players.length; x++) {
        if (players[x].player === player) {
          players[x].goalTileId = newGoal.goalTileId
          players[x].goal = newGoal.goal
        }
      }
    }
  })
  // set tile transformation
  client.on('positionExtra', ({
    newExtraPosition,
    rotation
  }) => {
    io.sockets.emit('positionExtra', {
      newExtraPosition,
      rotation
    })
  })
  client.on('setTransformation', ({
    style,
    clickedTile,
    oldExtraTile,
    toChange
  }) => {
    toChange = toChange
    oldExtraTile = oldExtraTile
    let toChangeObjects = toChange.map(tileI => {
      return tileState[tileI]
    })

    extraTile = toChangeObjects.pop()

    toChangeObjects.unshift(oldExtraTile)
    for (var i = 0; i < toChange.length; i++) {
      tileState[toChange[i]] = toChangeObjects[i]
    }
    console.log(toChange)
    io.sockets.emit('setTransformation', {
      style,
      toChange
    })
    console.log(oldExtraTile)
    console.log('do all requested')
    console.log(toChange)
    setTimeout(() => {
      io.sockets.emit('doAll', {
        toChange,
        extraTile,
        oldExtraTile
      })
      for (var x = 0; x < players.length; x++) {
        if (extraTile.tileId === players[x].location) {
          players[x].location = oldExtraTile.tileId
        }
      }
      let newPlayerLocs = players.map(pl => {
        return pl.location
      })
      io.sockets.emit('updatePlayer', newPlayerLocs)
      gamePhase = 1
    }, 1000)


  })

  client.on('movePlayer', ({
    player,
    path,
    goalTileId
  }) => {
    Object.values(players).find(obj => obj.player === player).location = goalTileId
    io.sockets.emit('movePlayer', ({
      player,
      path,
      goalTileId
    }))
    gamePhase = 0

  })
  client.on('changePlayer', () => {
    if (toPlay < 4) {
      toPlay++
    } else if (toPlay === 4) {
      toPlay = 1
    }
    console.log(toPlay)
    io.sockets.emit('changePlayer', toPlay)
  })
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});