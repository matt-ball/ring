// const _ = require('lodash')
// const axios = require('axios')
const dates = require('./lib/allDates.json')

module.exports = async function calendar () {
  return dates
  // can be used to fetch a new calendar
  // const calendar = await axios.get('https://www.greenhelldriving.nuerburgring.de/api/v1/common/calendar')

  // if (calendar) {
  //   const allDates = []
  //   const tracks = {
  //     'GP': calendar.data.data[0].months,
  //     'Nordschleife': calendar.data.data[1].months
  //   }

  //   _.each(tracks, (track, trackName) => {
  //     _.each(track, (month) => {
  //       _.each(month, (day, date) => {
  //         const mappedDay = {
  //           id: date,
  //           date: date,
  //           name: trackName,
  //           type: trackName,
  //           description: `${day.start} - ${day.end}`,
  //           color: trackName === 'GP' ? '#bfbfbf' : 'black'
  //         }
  
  //         if (day.start !== day.end) {
  //           allDates.push(mappedDay)
  //         }
  //       })
  //     })
  //   })

  //   return allDates
  // }
}
