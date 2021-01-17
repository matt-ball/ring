document.addEventListener('swiped-right', function () {
  setTimeout(function () {
    $('.pane-one')[0].scrollIntoView({ behavior: "smooth" })
    $('.pane-marker span:last').removeClass('active');
    $('.pane-marker span:first').addClass('active');
  }, 100)
});

document.addEventListener('swiped-left', function (e) {
  setTimeout(function () {
    $('.pane-two')[0].scrollIntoView({ behavior: "smooth" })
    $('.pane-marker span:first').removeClass('active');
    $('.pane-marker span:last').addClass('active');
  }, 100)
});