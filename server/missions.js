const express = require('express')
const app = express()


// Game missions
const missions = [
  {goalTileId: 1, goal: 'owl'},
  {goalTileId: 2, goal: 'bat'},
  {goalTileId: 3, goal: 'spider'},
  {goalTileId: 4, goal: 'genie'},
  {goalTileId: 5, goal: 'rat'},
  {goalTileId: 7, goal: 'snake'},
  {goalTileId: 8, goal: 'bug'},
  {goalTileId: 9, goal: 'moth'},
  {goalTileId: 14, goal: 'pharaoh'},
  {goalTileId: 16, goal: 'crown'},
  {goalTileId: 18, goal: 'chest'},
  {goalTileId: 20, goal: 'book'},
  {goalTileId: 28, goal: 'sword'},
  {goalTileId: 30, goal: 'key'},
  {goalTileId: 32, goal: 'unicorn'},
  {goalTileId: 34, goal: 'skull'},
  {goalTileId: 40, goal: 'ring'},
  {goalTileId: 41, goal: 'ghost'},
  {goalTileId: 43, goal: 'map'},
  {goalTileId: 44, goal: 'torch'},
  {goalTileId: 45, goal: 'diamond'},
  {goalTileId: 46, goal: 'money'},
  {goalTileId: 47, goal: 'dragon'},
  {goalTileId: 49, goal: 'helmet'}
]

const missionsToShuffle = [...missions]

function shuffle() {
  let currentIndex = missionsToShuffle.length;
  let randomIndex;
  let tempValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = missionsToShuffle[currentIndex];
    missionsToShuffle[currentIndex] = missionsToShuffle[randomIndex];
    missionsToShuffle[randomIndex] = tempValue;
  }
  return missionsToShuffle;
}

const shuffledMissions = shuffle()

module.exports = {shuffledMissions, missions}