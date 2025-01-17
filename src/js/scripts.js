import {
  smoothScrollTo,
  getUrlParam,
  getChannelParam,
  isMobile,
  strToHtml,
} from './helpers';

const t = (str) =>
  window.seceTranslationStrings && window.seceTranslationStrings[str]
    ? window.seceTranslationStrings[str]
    : str;

window.addEventListener('DOMContentLoaded', () => {




  const scrollToElements = document.querySelectorAll('.scrollTo');

  [].forEach.call(scrollToElements, (button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      let hashPart = button.href.split('#').pop();
      smoothScrollTo(`#${hashPart}`);
    });
  });


});
