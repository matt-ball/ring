const $ = window.jQuery

$.get('/api/status').then(append)

function append (data) {
  $('body').prepend(JSON.stringify(data))

  const nordsOpen = data.trackOpen.nords ? 'Open' : 'Closed'
  const gpOpen = data.trackOpen.gp ? 'Open' : 'Closed'
  $('.track-status').text(`Nordschleife: ${nordsOpen} | GP: ${gpOpen}`)

  $('.vehiclesOnTrack').text(`Cars: ${data.carsOnTrack} | Bikes: ${data.bikesOnTrack}`)

  const openingHours = data.nordschleifeDescription.split(' Uhr')[0] || 'Closed'
  $('.open-hours').text(`Nordschleife: ${openingHours}`)

  const trackInfo = data.trackInfo.text
  $('.track-info').text(`Track Info: ${trackInfo}`)
  if ($('.track-info').val().indexOf('null')) {
  	$('.track-info').text('Track is Clear')
  }

  const sectionInfo = data.trackInfo.sections
  if (sectionInfo.indexof() > -1) {
  	  $('.section-info').text(`Sections: ${sectionInfo}`)
  }
}
