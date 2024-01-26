const _ = require('lodash')
const axios = require('axios')

// expected format
// {
//   "id": "2021-04-02",
//   "date": "2021-04-02",
//   "name": "GP",
//   "type": "GP",
//   "description": "10:00 - 20:00",
//   "color": "#bfbfbf"
// }
module.exports = async function calendar () {
  const calendar = await axios.get('https://nuerburgring.de/track_status')

  if (calendar && calendar.data) {
    const allDates = []
    const tracks = {
      'GP': calendar.data.ring_kartbahn.year_schedule,
      'Nordschleife': calendar.data.nordschleife.year_schedule
    }

    _.each(tracks, (track, trackName) => {
      _.each(track, (day, date) => {
        if (!day.opened && !day.exclusion?.opened) return

        const open = day.exclusion.periods[0].start
        const close = day.exclusion.periods[0].end

        const mappedDay = {
          id: date,
          date: date,
          name: trackName,
          type: trackName,
          description: `${open} - ${close}`,
          color: trackName === 'GP' ? '#bfbfbf' : 'black'
        }

        allDates.push(mappedDay)
      })
    })

    console.log(allDates)
    return allDates
  }
}
