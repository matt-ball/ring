const status = require('./status')
let latestCache = 0
let cache = {}

module.exports = async function api (req, res) {
  const { tab } = req.params
  const now = Date.now()
  const cacheIsOld = latestCache < (now - 300000)

  const routes = {
    status
  }

  if (!latestCache || cacheIsOld) {
    latestCache = Date.now()
    cache[tab] = await routes[tab]()
  }

  res.send(cache[tab])
}
