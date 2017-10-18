const $ = window.jQuery

$.get('/api/status').then(append)

function append (data) {
  $('body').prepend(JSON.stringify(data))

  const nordsOpen = data.trackOpen.nords ? 'Open' : 'Closed'
  const gpOpen = data.trackOpen.gp ? 'Open' : 'Closed'
  const sectionInfo = data.trackInfo.sections
  const trackInfo = data.trackInfo.text || 'Closed'
  const openingHours = data.times
  let gpOpenTimes = 'Closed'
  let nordsOpenTimes = 'Closed'

  if (data.trackOpen.gp) {
    gpOpenTimes = `Open: ${openingHours.gp.open} Close: ${openingHours.gp.close}`
  }

  if (data.trackOpen.nords) {
    nordsOpenTimes = `Open: ${openingHours.nords.open} Close: ${openingHours.nords.close}`
  }

  $('.track-status').text(`Nordschleife: ${nordsOpen} | GP: ${gpOpen}`)
  $('.vehiclesOnTrack').text(`Cars: ${data.carsOnTrack} | Bikes: ${data.bikesOnTrack}`)
  $('.open-hours').text(`Nordschleife: ${nordsOpenTimes} | GP: ${gpOpenTimes}`)
  $('.track-info').text(`${trackInfo}`)
}
