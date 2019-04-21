const _ = require('lodash')
const axios = require('axios')
const months = require('./lib/months')

module.exports = async function status () {
  const trackStatus = await axios.get('https://www.greenhelldriving.nuerburgring.de/api/v1/common/trackInfo')

  if (trackStatus) {
    const todaysOpeningTimes = await getTodaysOpeningTimes()
    const openStatus = trackOpen(todaysOpeningTimes)

    const data = Object.assign({}, trackStatus.data.data, {
      trackOpen: {
        gp: openStatus.gp,
        nords: openStatus.nords
      },
      todayTimes: {
        gp: todaysOpeningTimes.gp,
        nords: todaysOpeningTimes.nords
      },
      openingTimes: await getOpeningTimes(4),
      trackInfo: {
        closure: trackStatus.data.data.trackInfo.closure,
        sections: _.uniqBy(trackStatus.data.data.trackInfo.sections, 'infoText').map((val) => val.infoText)
      }
    })

    return data
  }
}

async function getCalendar () {
  return axios.get('https://www.greenhelldriving.nuerburgring.de/api/v1/common/calendar')
}

async function getOpeningTimes (days) {
  let daysToRetrieve = []
  const calendar = await getCalendar()

  for (let i = 0; i < days; i++) {
    daysToRetrieve.push(addDays(i))
  }

  daysToRetrieve = daysToRetrieve.map((date) => {
    return date.toISOString().split('T')[0]
  })

  if (calendar) {
    const data = calendar.data.data
    const now = new Date()
    const currentMonth = `${months[now.getMonth()]} ${now.getFullYear().toString()}`
    const nextMonth = `${months[now.getMonth() + 1]} ${now.getFullYear().toString()}`
    const gpThisMonth = data[0].months[currentMonth]
    const gpNextMonth = data[0].months[nextMonth]
    const nordsThisMonth = data[1].months[currentMonth]
    const nordsNextMonth = data[1].months[nextMonth]
    const gpTwoMonths = _.merge(gpThisMonth, gpNextMonth)
    const nordsTwoMonths = _.merge(nordsThisMonth, nordsNextMonth)

    const gp = _.pickBy(gpTwoMonths, (data, date) => {
      if (daysToRetrieve.indexOf(date) > -1) {
        return data
      }
    })

    const nords = _.pickBy(nordsTwoMonths, (data, date) => {
      if (daysToRetrieve.indexOf(date) > -1) {
        return data
      }
    })

    return { gp, nords }
  }
}

function addDays (days) {
  const date = new Date()
  date.setDate(date.getDate() + days + 1)
  return date
}

async function getTodaysOpeningTimes () {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const month = months[now.getMonth()] + ' ' + now.getFullYear().toString()
  const calendar = await getCalendar()

  if (calendar) {
    const gp = calendar.data.data[0].months[month][today]
    const nords = calendar.data.data[1].months[month][today]
    const data = createOpeningHours(gp, nords)

    return data
  }
}

function trackOpen (openingTimes) {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const gpOpen = isOpen(today, openingTimes.gp)
  const nordsOpen = isOpen(today, openingTimes.nords)

  return {
    gp: gpOpen,
    nords: nordsOpen
  }
}

function isOpen (today, times) {
  const hour = 60 * 1000 * 60
  const now = Date.now()
  const { open, close } = times
  const openDate = new Date(`${today} ${open}`).getTime() + hour
  const closeDate = new Date(`${today} ${close}`).getTime() + hour

  console.log('now: ', now)
  console.log('open: ', openDate)
  console.log('close: ', closeDate)

  if (now >= openDate && now < closeDate) {
    return true
  } else {
    return false
  }
}

function createOpeningHours (gp, nords) {
  if (gp.start === gp.end) {
    gp.start = ''
    gp.end = ''
  }

  if (nords.start === nords.end) {
    nords.start = ''
    nords.end = ''
  }

  return {
    gp: {
      open: gp.start,
      close: gp.end
    },
    nords: {
      open: nords.start,
      close: nords.end
    }
  }
}
