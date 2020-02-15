const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TileSchema = new Schema({
    tileId: Number,
    rotation: Number,
    type: String,
    fixed: Boolean,
    T: Boolean,
    R: Boolean,
    B: Boolean,
    L: Boolean
})



const Tile = mongoose.model('tile', TileSchema)

module.exports = Tile

