const $ = window.jQuery

$.get('/api/status').then(append)

function append (data) {
  $('body').prepend(JSON.stringify(data))

  const nordsOpen = data.trackOpen.nords ? 'Open' : 'Closed'
  const gpOpen = data.trackOpen.gp ? 'Open' : 'Closed'
  const sectionInfo = data.trackInfo.sections
  const trackInfo = data.trackInfo.text
  let openingHours = data.nordschleifeDescription.split(' Uhr')[0]

  if (openingHours === 'geschlossen') {
    openingHours = 'Closed'
  }

  $('.track-status').text(`Nordschleife: ${nordsOpen} | GP: ${gpOpen}`)
  $('.vehiclesOnTrack').text(`Cars: ${data.carsOnTrack} | Bikes: ${data.bikesOnTrack}`)
  $('.open-hours').text(`Nordschleife: ${openingHours}`)
  $('.track-info').text(`Track Info: ${trackInfo}`)
}
