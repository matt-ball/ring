const $ = window.jQuery

$.get('/api/status').then(append)

function append (data) {
  $('body').prepend(JSON.stringify(data))
}
