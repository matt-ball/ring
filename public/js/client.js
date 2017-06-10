const $ = window.jQuery

$.get('/api/status').then(append)

function append (data, ringinfo) {
  $('body').prepend(JSON.stringify(data))

  const nordsOpen = data.trackOpen.nords ? 'Open' : 'Closed'
  const gpOpen = data.trackOpen.gp ? 'Open' : 'Closed'
  $('.track-status').text(`Nordschleife: ${nordsOpen} | GP: ${gpOpen}`)

  $('.vehiclesOnTrack').text(`Cars: ${data.carsOnTrack} | Bikes: ${data.bikesOnTrack}`)

  const openingHours = data.nordschleifeDescription.split(' Uhr')[0] || 'Closed'
  $('.open-hours').text(`Nordschleife: ${openingHours}`)
}
