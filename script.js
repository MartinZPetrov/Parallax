const logo = document.getElementById('logo');
const button = document.getElementById('button');
const layer1 = document.getElementById('layer1');
const layer2 = document.getElementById('layer2');
const container = document.getElementsByClassName("content")[0];
const containerWidth = container.scrollWidth;

var posScroll = 0, isTouchPadTouched;
var xDown = null, yDown = null;
var translateRateX = 2.2; // random rate for x translate
var endPosX = 0;

window.addEventListener('touchmove', handleTouchMove, false);
window.addEventListener('touchstart', handleTouchStart, false);

container.addEventListener('scroll', function () {
  posScroll = container.scrollLeft;
  updateLayers();
})

window.addEventListener("load", () => {
  self.setInterval(() => {
    if (!isTouchPadTouched) {
      if (container.scrollLeft !== containerWidth) {
        container.scrollTo(container.scrollLeft + 1, 0);
        posScroll = container.scrollLeft;
      }
    }
  }, 1000 / 60);
})

function updateLayers() {
  logo.style.transform = 'translate3d(' + posScroll + 'px, 0px, 0px)';
  button.style.transform = 'translate3d(' + posScroll + 'px, 0px, 0px)';
  layer2.style.transform = 'translate3d(' + posScroll + 'px, 0px, 0px)';
  requestAnimationFrame(updateLayers);
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
  setTransitionStyle();
  //swipe left
  if (xUp < xDown) {
    updateLayersLeft()
  } else { //swipe right
    updateLayersRight();
  }
}

function setTransitionStyle() {
  if (logo.style.transition === "") {
    logo.style.transition = "all 2s ease 0.1s";
  }
  if (button.style.transition === "") {
    button.style.transition = "all 2s ease 0.1s";
  }
  if (layer2.style.transition === "" ) {
    layer2.style.transition = "all 2s ease 0.1s";
  }

}

function updateLayersRight() {
  /* transition: all 2s ease 0.1s; */
  for (let pos = endPosX; pos > 0; pos--) {
    logo.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
    button.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
    layer2.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
  }
}

function updateLayersLeft() {
  if (logo.x > 0 && endPosX <= window.outerWidth) {
    for (let pos = 0; pos < endPosX; pos++) {
      logo.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
      button.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
      layer2.style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
    }
  }
}

window.requestAnimationFrame(updateLayers);