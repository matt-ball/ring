const status = require('./status')
const calendar = require('./calendar')
let cache = {}

module.exports = async function api (req, res) {
  const { tab } = req.params
  const now = Date.now()

  cache[tab] = cache[tab] || {}
  cache[tab].time = cache[tab].time || 0

  const cacheIsOld = cache[tab].time < (now - 300000)

  const routes = {
    status,
    calendar
  }

  if (cacheIsOld) {
    cache[tab].time = now
    cache[tab].result = await routes[tab]()
  }

  res.send(cache[tab].result)
}
