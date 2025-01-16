const strToHtml = function (str) {
  let d = document.createElement('div');
  d.innerHTML = str;
  return d.children.length > 1 ? d.children : d.children[0];
};

const cumulativeOffset = function (element) {
  var top = 0,
    left = 0;
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top: top,
    left: left,
  };
};

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

const getUrlParam = (e) => {
  let i;
  let n;
  const p = window.location.search.substring(1).split('&');

  for (i = 0; i < p.length; i++) {
    n = p[i].split('=');
    if (n[0] === e) {
      return typeof n[1] === undefined ? true : decodeURIComponent(n[1]);
    }
  }
  return false;
};

const getChannelParam = (e) => {
  const cid = getUrlParam('cid');
  if (cid) {
    if (cid.indexOf('kz_pd_display_google') > -1) {
      return 'Display';
    }
    if (cid.indexOf('kz_pd_social_instagram') > -1) {
      return 'Social';
    } else if (cid.indexOf('kz_pd_social_youtube') > -1) {
      return 'OLV';
    } else if (cid.indexOf('kz_ow_email') > -1) {
      return 'Email';
    } else if (cid.indexOf('kz_ow_push') > -1) {
      return 'Push';
    } else if (cid.indexOf('sms') > -1 || cid.indexOf('Sms') > -1) {
      return 'SMS';
    } else {
      return 'Others';
    }
  } else {
    return 'COM';
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
  getUrlParam,
  getChannelParam,
  shuffle,
  strToHtml,
  isIE11,
  isMobile,
};
