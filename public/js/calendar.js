$.get('/api/calendar').then(appendCalendar)

function appendCalendar (calendarEvents) {
  $('#calendar')
    .evoCalendar({ calendarEvents, eventHeaderFormat: 'MM d, yyyy' })
    .on('selectDate', function() {
      $('#eventListToggler').click()
    })
  $('.calendar-year p').text('Opening Times')
}
