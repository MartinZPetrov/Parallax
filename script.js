const logo = document.getElementById('logo');
const button = document.getElementById('button');
const layer1 = document.getElementById('layer1');
const layer2 = document.getElementById('layer2');
const container = document.getElementsByClassName("content")[0];
const containerWidth = container.scrollWidth;
var posScroll = 0, isTouchPadTouched = false, previousScroll = -1;
var xDown = null, yDown = null;
var translateRateX = 2.2; // random rate for x translate
var endPosX = 0;
var lastGamma = 1, timer;

window.addEventListener('touchmove', handleTouchMove, false);
window.addEventListener('touchstart', handleTouchStart, false);
window.addEventListener('deviceorientation', handleOrientation, false);
window.addEventListener("load", () => {
  timer = self.setInterval(() => {
    if (container.scrollLeft !== containerWidth) {
      container.scrollTo(container.scrollLeft + 1, 0);
      posScroll = container.scrollLeft;
      if (previousScroll !== posScroll) {
        previousScroll = posScroll;
        updateLayers();
      } else {
        clearInterval(timer);
      }
    }
  }, 1000 / 60);
})

function updateLayers() {
  if (!isTouchPadTouched) {
    logo.style.transform = 'translate3d(' + posScroll + 'px, 0px, 0px)';
    layer1.style.transform = 'translate3d(' + posScroll + 'px, 0px, 0px)';
    layer2.style.transform = 'translate3d(' + posScroll + 'px, 0px, 0px)';
    requestAnimationFrame(updateLayers);
  }
}
 window.requestAnimationFrame(updateLayers);

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
  clearInterval(timer);
  isTouchPadTouched = true;
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
    updateLayersLeft()
  } else { //swipe right
    updateLayersRight();
  }
}

function updateLayersRight() {
  for (let pos = endPosX; pos > 0; pos--) {
    logo.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
    layer1.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
    layer2.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
  }
}

function updateLayersLeft() {
  if (logo.x > 0 && endPosX <= window.outerWidth) {
    for (let pos = 0; pos < endPosX; pos++) {
      logo.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
      layer1.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
      layer2.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
    }
  }
}

function handleOrientation(event) {
  var gamma = event.gamma; // In degree in the range [-90,90]            
  parallaxAction(gamma);
}

function parallaxAction(gamma) {
  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (gamma > 90) { gamma = 90 };

  if (gamma === 0 || gamma < 0) {
    logo.style.transform = 'translate3d(' + 0 + 'px, 0px, 0px)';
    layer1.style.transform = 'translate3d(' + 0 + 'px, 0px, 0px)';
    layer2.style.transform = 'translate3d(' + 0 + 'px, 0px, 0px)';
  } else {
    for (let pos = 0; pos < Math.abs(gamma) * 1.88; pos++) {
      logo.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
      layer1.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
      layer2.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
    }
  }
}
