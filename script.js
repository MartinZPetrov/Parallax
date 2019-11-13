window.addEventListener('touchmove', handleTouchMove, false);
window.addEventListener('touchstart', handleTouchStart, false);
var logo = document.getElementById('logo');
var button = document.getElementById('button');

var xDown = null;
var yDown = null;
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

  // translate the logo by x
  //swipe left
  if (xUp < xDown) {
    if (endPosX <= window.outerWidth) {
      for (let pos = 0; pos < endPosX; pos += 0.1) {
        logo.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
        button.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
      }
    }
  } else { //swipe right
    for (let pos = endPosX; pos > 0; pos -= 0.1) {
      logo.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
      button.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
    }
  }
}

