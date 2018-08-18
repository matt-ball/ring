const $ = window.jQuery

$.get('/api/status').then(append)

function append (data) {
  console.log(data)

  if (data.trackInfo.closure) {
    data.trackOpen.nords = 'Incident - Closed'
  } else {
    data.trackOpen.nords = data.trackOpen.nords ? 'Open' : 'Closed'
  }

  const nordsOpen = data.trackOpen.nords
  const gpOpen = data.trackOpen.gp ? 'Open' : 'Closed'
  const sectionInfo = data.trackInfo.sections
  const trackInfo = data.trackInfo.text || 'Track clear'
  const todaysOpeningHours = data.todayTimes
  const openingTimes = data.openingTimes

  $('.track-status-gp span:first').text(gpOpen)
  $('.track-status-nords span:first').text(nordsOpen)
  $('.track-status-gp span:last').text(`${todaysOpeningHours.gp.open} - ${todaysOpeningHours.gp.close}`)
  $('.track-status-nords span:last').text(`${todaysOpeningHours.nords.open} - ${todaysOpeningHours.nords.close}`)
  $('.cars').text(data.carsOnTrack)
  $('.bikes').text(data.bikesOnTrack)
  $('.track-info').html(`<strong>${trackInfo}</strong>`)

  if (trackInfo !== 'Track clear') {
    $.each(sectionInfo, (i, data) => {
      if (i === 0) {
        $('.track-info').append(`<br><br><strong>Incidents</strong>`)
      }

      $('.track-info').append(`<br>${data.from} - ${data.to}: ${data.infoText}`)
    })
  }

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
