const axios = require('axios')
const months = require('./lib/months')

module.exports = async function status () {
  const trackStatus = await axios.get('https://www.greenhelldriving.nuerburgring.de/api/v1/common/trackInfo')

  if (trackStatus) {
    const openStatus = await trackOpen()

    const data = Object.assign({}, trackStatus.data.data, {
      trackOpen: {
        gp: openStatus.gp,
        nords: openStatus.nords && !trackStatus.data.data.trackInfo.closure
      }
    })
    return data
  }
}

async function trackOpen () {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const month = months[now.getMonth()] + ' ' + now.getFullYear().toString()
  const calendar = await axios.get('https://www.greenhelldriving.nuerburgring.de/api/v1/common/calendar')

  if (calendar) {
    const gp = calendar.data.data[0].months[month][today]
    const nords = calendar.data.data[1].months[month][today]
    const data = {
      gp: {
        open: gp.start + ':00',
        close: gp.end + ':00'
      },
      nords: {
        open: nords.start + ':00',
        close: nords.end + ':00'
      }
    }

    const gpOpen = isOpen(today, data.gp)
    const nordsOpen = isOpen(today, data.nords)

    return {
      gp: gpOpen,
      nords: nordsOpen
    }
  }
}

function isOpen (today, times) {
  const hour = 60 * 1000 * 60
  const now = Date.now()
  const { open, close } = times
  const openDate = new Date(`${today} ${open}`).getTime() - hour
  const closeDate = new Date(`${today} ${close}`).getTime() - hour

  if (now >= openDate && now < closeDate) {
    return true
  } else {
    return false
  }
}

