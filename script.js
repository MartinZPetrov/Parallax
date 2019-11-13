window.addEventListener('deviceorientation', deviceOrientationHandler, false);
window.addEventListener('touchmove', handleTouchMove, false);
window.addEventListener('touchstart', handleTouchStart, false);
var xDown = null;
var yDown = null;
var pos = 56;
var logo = document.getElementById('logo');

// handles the movement of the device
function deviceOrientationHandler(event) {
  // portraitVisiblity(true);
}

function getTouches(evt) {
  return (
    evt.touches || evt.originalEvent.touches // browser API
  ); // jQuery
}

function handleTouchStart(event) {
  const firstTouch = getTouches(event)[0];
  xDown = firstTouch.clientX;
}

function handleTouchMove(event) {

  var xUp = event.touches[0].clientX;

  if (xUp < xDown) {
    for (let index = 0; index < 150; index += 0.1) {
      logo.style.transform = 'translate3d(' + index + 'px, 0px, 0px)';
    }
  } else {
    for (let index = 150; index > 0; index -= 0.1) {
      logo.style.transform = 'translate3d(' + index + 'px, 0px, 0px)';
    }
  }
}

