const $ = window.jQuery

$.get('/api/status').then(append)

function append (data) {
  console.log(data)

  const nordsOpen = data.trackOpen.nords ? 'Open' : 'Closed'
  const gpOpen = data.trackOpen.gp ? 'Open' : 'Closed'
  const sectionInfo = data.trackInfo.sections
  const trackInfo = data.trackInfo.text || 'Track clear'
  const openingHours = data.times
  let gpOpenTimes = 'Shut today'
  let nordsOpenTimes = 'Shut today'

  if (data.trackOpen.gp) {
    gpOpenTimes = `Open: ${openingHours.gp.open} Close: ${openingHours.gp.close}`
    $('.track-status-gp').removeClass('track-status-closed')
    $('.track-status-gp').addClass('track-status-open')
  } else {
    $('.track-status-gp').removeClass('track-status-open')
    $('.track-status-gp').addClass('track-status-closed')
  }

  if (data.trackOpen.nords) {
    nordsOpenTimes = `Open: ${openingHours.nords.open} Close: ${openingHours.nords.close}`
    $('.track-status-nords').removeClass('track-status-closed')
    $('.track-status-nords').addClass('track-status-open')
  } else {
    $('.track-status-nords').removeClass('track-status-open')
    $('.track-status-nords').addClass('track-status-closed')
  }

  $('.track-status-nords span').text(nordsOpen)
  $('.track-status-gp span').text(gpOpen)
  $('.cars').text(data.carsOnTrack)
  $('.bikes').text(data.bikesOnTrack)
  $('.open-hours').html(`<strong>Nordschleife:</strong> ${nordsOpenTimes} | <strong>GP:</strong> ${gpOpenTimes}`)
  $('.track-info').text(`${sectionInfo} ${trackInfo}`)
}
