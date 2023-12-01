// Create web server 
// Create database connection
// Create database schema
// Create database model
// Create routes
// Start web server
// Test

// Import modules
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Comment = require('./models/comment')

// Create web server
const app = express()

// Create database connection
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true })
const db = mongoose.connection

// Create database schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
})

// Create database model
const Comment = mongoose.model('Comment', commentSchema)

// Create routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.send(err)
        } else {
            res.json(comments)
        }
    })
})

app.post('/comments', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    })
    comment.save((err, comment) => {
        if (err) {
            res.send(err)
        } else {
            res.json(comment)
        }
    })
})

// Start web server
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

// Test
// GET http://localhost:3000/comments
// POST http://localhost:3000/comments
// {
//     "name": "John Doe",
//     "comment": "This is a comment"
// }
