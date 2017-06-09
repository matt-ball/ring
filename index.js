const express = require('express')
const app = express()
const server = require('http').createServer(app)

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.get('/', (request, response) => response.render('index.html'))

server.listen(3000)
