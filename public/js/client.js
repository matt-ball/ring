const $ = window.jQuery

$.get('/api/status').then(append)

function append (data) {
  console.log(data)

  let currentStatus = {}

  if (data.trackInfo.closure) {
    currentStatus.class = 'warn'
    currentStatus.text = 'Incident - Closed'
  } else if (data.trackOpen.nords) {
    currentStatus.class = 'open'
    currentStatus.text = 'Open'
  } else {
    currentStatus.class = 'close'
    currentStatus.text = 'Closed for the day'
  }

  const gpOpen = data.trackOpen.gp ? 'Open' : 'Closed for the day'
  const sectionInfo = data.trackInfo.sections
  const todaysOpeningHours = data.todayTimes
  const openingTimes = data.openingTimes

  $('.track-status-gp').addClass(data.trackOpen.gp ? 'open' : 'close')
  $('.track-status-nords').addClass(currentStatus.class)
  $('.track-status-gp span:first').text(gpOpen)
  $('.track-status-nords span:first').text(currentStatus.text)
  $('.track-status-gp span:last').text(`${todaysOpeningHours.gp.open} - ${todaysOpeningHours.gp.close}`)
  $('.track-status-nords span:last').text(`${todaysOpeningHours.nords.open} - ${todaysOpeningHours.nords.close}`)

  if (currentStatus.class !== 'close') {
    $('.vehicle-cell').removeClass('hide')
    $('.bikes').text(data.bikesOnTrack)
    $('.cars').text(data.carsOnTrack)
  }

  if (currentStatus.class === 'warn') {
    $('.track-info').removeClass('hide')
    $('.track-info').append(`<strong>Incidents</strong><br><br>`)
    $('.track-info').append(sectionInfo.join(', '))
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

      $(`.${track}-open`).append(`
        <div class="mdl-cell mdl-cell--4-col open-hours">
          <strong>${date}</strong>
          <br />
          ${copy[track]}
        </div>
      `)
    })
  })
}
