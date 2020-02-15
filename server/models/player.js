const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PlayerSchema = new Schema({
    player: Number,
    isNext: Boolean,
    location: Number,
    score: Number,
    missions: Array,
    goal: Array
})

const Player = mongoose.model('player', PlayerSchema)

// const newPlayer = new Player({
//     player: 1,
//     isNext: false,
//     location: 20,
//     score: 0
// })

// newPlayer.save(function(err) {
//     if(err) return err
// })