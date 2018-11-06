const path = require('path')
const express = require('express')
const app = express()
const api = require('./api/index')

app.use(express.static(path.join(__dirname, '/public')))
app.get('/', (request, response) => response.render('index.html'))
app.get('/api/:tab', api)

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port
  console.log(`App listening on port ${port}`)
})
