const express = require('express')
const app = express()
const server = require('http').createServer(app)
const api = require('./api/index')

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules'))

app.get('/', (request, response) => response.render('index.html'))
app.get('/api/:tab', api)

server.listen(3000)

