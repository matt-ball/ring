const express = require('express')
const app = express()
const server = require('http').createServer(app)
const api = require('./api/index')

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules'))

app.get('/', (request, response) => response.render('index.html'))
app.get('/api/:tab', api)

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}
