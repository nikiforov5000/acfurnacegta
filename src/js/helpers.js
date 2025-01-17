const smoothScrollTo = (selector, offset = 0) => {
  if (!selector) {
    return;
  }

  const scrollTarget = document.querySelector(selector);

  if (scrollTarget) {
    const offset = cumulativeOffset(scrollTarget);

    let isSmoothScrollSupported =
      'scrollBehavior' in document.documentElement.style;

    let scrollTargetY = offset.top - 60;

    console.log('scroll', scrollTargetY);

    if (!isSmoothScrollSupported) {
      window.scrollTo(0, scrollTargetY);
    } else {
      window.scrollTo({ top: scrollTargetY, behavior: 'smooth' });
    }
  }
};





/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const isIE11 = () => {
  return !!window.MSInputMethodContext && !!document.documentMode;
};

const isMobile = () => {
  const w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  return w < 768;
};

export {
  smoothScrollTo,
  shuffle,
  isIE11,
  isMobile,
};
