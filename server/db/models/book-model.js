const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema(
    {
        name: {type: String, required: true},
        authors: {type: [String], required: true},
        date: {type: Number, required: true},
    },
    {timestamps: true},
)

module.exports = mongoose.model('books', BookSchema)