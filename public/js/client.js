const $ = window.jQuery

$.get('/api/status').then(append)

function append (data, ringinfo) {
  $('body').prepend(JSON.stringify(data))
  $('.track-status').append('Nords:' + (data.trackOpen.nords ? 'Open' : 'Closed'))
  $('.gp-status').append(' GP:' + (data.trackOpen.gp ? 'Open' : 'Closed'))
  $('.carsOnTrack').append('Cars:' + data.carsOnTrack)
  $('.bikesOnTrack').append(' Bikes:' + data.bikesOnTrack)
  $('.vehiclesOnTrack').append(' Vehicles:' + data.vehiclesOnTrack)
  if (data.nordschleifeIsOpenedToday = true) {
  	$('.open-hours').append(data.nordschleifeDescription)
  } else {
  	$('.open-hours').text('Track is not open today.')
  }
}
