const $ = window.jQuery

$.get('/api/status').then(append)

function append (data, ringinfo) {
  $('body').prepend(JSON.stringify(data))

  const nordsOpen = data.trackOpen.nords ? 'Open' : 'Closed'
  const gpOpen = data.trackOpen.gp ? 'Open' : 'Closed'
  $('.track-status').text(`Nordschleife: ${nordsOpen} | GP: ${gpOpen}`)

  $('.vehiclesOnTrack').append(`Cars: ${data.carsOnTrack} | Bikes: ${data.bikesOnTrack}`)

  if (data.nordschleifeIsOpenedToday) {
    $('.open-hours').text(`Nordschleife: ${data.nordschleifeDescription}`)
  } else {
    $('.open-hours').text('Nordschleife: Closed')
  }
}
