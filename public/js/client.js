const $ = window.jQuery

$.get('/api/status').then(append)

function append (data) {
  console.log(data)

  const nordsOpen = data.trackOpen.nords ? 'Open' : 'Closed'
  const gpOpen = data.trackOpen.gp ? 'Open' : 'Closed'
  const sectionInfo = data.trackInfo.sections
  const trackInfo = data.trackInfo.text || 'Track clear'
  const todaysOpeningHours = data.todayTimes
  const openingTimes = data.openingTimes
  let gpOpenTimes = 'Shut today'
  let nordsOpenTimes = 'Shut today'

  if (data.trackOpen.gp) {
    gpOpenTimes = `Open: ${todaysOpeningHours.gp.open} Close: ${todaysOpeningHours.gp.close}`
    $('.track-status-gp').removeClass('track-status-closed')
    $('.track-status-gp').addClass('track-status-open')
  } else {
    $('.track-status-gp').removeClass('track-status-open')
    $('.track-status-gp').addClass('track-status-closed')
  }

  if (data.trackOpen.nords) {
    nordsOpenTimes = `Open: ${todaysOpeningHours.nords.open} Close: ${todaysOpeningHours.nords.close}`
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
  $('.today-open-hours').html(`<strong>Nordschleife:</strong> ${nordsOpenTimes} | <strong>GP:</strong> ${gpOpenTimes}`)
  $('.track-info').text(`${sectionInfo} ${trackInfo}`)

  $.each(openingTimes, (track, trackDates) => {
    const copy = {
      gp: '',
      nords: ''
    }

    $.each(trackDates, (date, data) => {
      if (data.start === data.end) {
        copy[track] = 'Closed'
      } else {
        copy[track] = `${data.start} - ${data.end}`
      }

      $(`.${track}-open`).append(`<div class="mdl-cell mdl-cell--4-col open-hours"><strong>${date}</strong><br>${copy[track]}</div>`)
    })
  })
}
