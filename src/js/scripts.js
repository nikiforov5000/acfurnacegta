import {
  smoothScrollTo,
  getUrlParam,
  getChannelParam,
  isMobile,
  strToHtml,
} from './helpers';
import OrderForm from './OrderForm';
const axios = require('axios');

const t = (str) =>
  window.seceTranslationStrings && window.seceTranslationStrings[str]
    ? window.seceTranslationStrings[str]
    : str;

window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hostname == 'p6-ap-author.samsung.com') {
    console.log('AEM edit mode');
  } else {
    //$(".of-g-offers-kv").hide();
  }

  const siteWrap = document.querySelector('.sece-main-wrap');
  const apiUrl = siteWrap.dataset.baseUrl;
  const language = siteWrap.dataset.language;

  //pPopup initialisation

  const popupElement = siteWrap.querySelector('.popup-wrap');
  const popupTriggers = siteWrap.querySelectorAll('.popup-trigger');

  if (popupElement) {
    const popupContent = popupElement.querySelector('.popup-content');
    const popupCloseTrigger = popupElement.querySelectorAll(
      '.popup-close, .popup-close-trigger'
    );

    [].forEach.call(popupCloseTrigger, (button) => {
      button.addEventListener('click', (e) => {
        popupElement.classList.add('is_hidden');
      });
    });

    [].forEach.call(popupTriggers, (button) => {
      button.addEventListener('click', (e) => {
        popupElement.classList.remove('is_hidden');
      });
    });
  }

  if (window.location.href.indexOf('success') >= 0) {
    // history.pushState("", document.title, window.location.pathname);
    popupElement.classList.remove('is_hidden');
  }

  //Scroll to elements

  const scrollToElements = siteWrap.querySelectorAll('.scrollTo');

  [].forEach.call(scrollToElements, (button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      let hashPart = button.href.split('#').pop();
      smoothScrollTo(`#${hashPart}`);
    });
  });

  //Expandable items

  const expandableItems = document.querySelectorAll('.item-expandable');

  [].forEach.call(expandableItems, (el) => {
    el.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('is_collapsed');
    });
  });

  //Partners
  const partnersElement = document.querySelector('.partners');

  if (partnersElement) {
    for (let i = partnersElement.children.length; i >= 0; i--) {
      partnersElement.appendChild(
        partnersElement.children[(Math.random() * i) | 0]
      );
    }
  }

  //form

  const formKey = 'pJyficbiXUuP7xoi';
  const submitFormElement = siteWrap.querySelector('#submit-form');
  const responseEl = siteWrap.querySelector('.message-response');

  if (submitFormElement) {
    const formFields = require('./formFields');

    const submitForm = new OrderForm({
      formElement: submitFormElement,
      formFields,
      formKey,
      onFormSubmitHandler: (response) => {
        const { data } = response;
        console.log('Data: ', data);

        if (responseEl) {
          let popupContent = '';

          if (data.success) {
            responseEl.classList.remove('is_hidden');
            fbq('track', 'CompleteRegistration');
          } else {
            if (data.title) {
              popupContent += `<h3 class="popup-title">${t(data.title)}</h3>`;
            }

            if (data.message) {
              popupContent += `<p>${t(data.message)}</p>`;
            }

            responseEl.innerHTML = popupContent;
            responseEl.classList.remove('is_hidden');
          }
        }
      },
    });
  }

  siteWrap.querySelector('input[name="cid"]').value = getUrlParam('cid');
  siteWrap.querySelector('input[name="channel"]').value = getChannelParam();

  const fileupload = document.querySelector('.form-file');
  const fileName = document.querySelector('.form-file-img');
  const btnForm = document.querySelector('.btn-form');

  fileupload.addEventListener('change', () => {
    fileName.innerHTML = fileupload.files[0].name;
    console.log(fileupload.files[0]);
    fileName.classList.remove('error');
  });

  btnForm.addEventListener('click', () => {
    if (!fileupload.files[0]) {
      fileName.innerHTML = t('FORM_ERROR_CHECK');
      fileName.classList.add('error');
    } else {
      fileName.innerHTML = fileupload.files[0].name;
      fileName.classList.remove('error');
    }
  });
});
