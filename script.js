window.addEventListener('touchmove', handleTouchMove, false);
window.addEventListener('touchstart', handleTouchStart, false);
var logo = document.getElementById('logo');
var button = document.getElementById('button');
var layer2 = document.getElementById('layer2');

var xDown = null, yDown = null;
var translateRateX = 2.2; // random rate for x translate
var endPosX = 0;

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

  //get cursor movement
  var difference = xDown - xUp;

  //add to the the position to move from start X
  if (difference > endPosX) {
    endPosX += difference;
  } else {
    endPosX = Math.abs(difference)
  }

  //reset if negative
  if (endPosX > window.outerWidth) {
    endPosX -= difference;
  }

  endPosX *= translateRateX;

  // translate the logo by x
  //swipe left
  if (xUp < xDown) {
    if (logo.x > 0 && endPosX <= window.outerWidth) {
      for (let pos = 0; pos < endPosX; pos++) {
        logo.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
        button.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
        layer2.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
      }
    }
  } else { //swipe right
    for (let pos = endPosX; pos > 0; pos--) {
      logo.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
      button.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
      layer2.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
    }
  }
}

