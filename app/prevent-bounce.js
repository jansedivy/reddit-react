var prevent = false;

var getParent = function (element, className) {
  while (true) {
    if (element.classList.contains(className)) {
      return element;
    }

    if (element = element.parentElement) {
      continue;
    }

    break;
  }
};

var canScroll = function (element) {
  return element.scrollHeight > element.offsetHeight;
};

var scrollToEnd = function (element) {
  var position = element.scrollTop;

  var height = element.offsetHeight;
  var scrollHeight = element.scrollHeight;

  if (position <= 0) {
    // element.scrollTop = 1;
  }

  if (position + height >= scrollHeight) {
    element.scrollTop = scrollHeight - height - 1;
  }
};

var touchstart = function(e) {
  var element = getParent(e.target, 'scrollable');

  if (element && canScroll(element)) {
    prevent = false;
    scrollToEnd(element);
  } else {
    prevent = true;
  }
};

var touchmove = function(e) {
  if (prevent) { e.preventDefault(); }
};

module.exports = function() {
  document.addEventListener('touchstart', touchstart);
  document.addEventListener('touchmove', touchmove);
};
