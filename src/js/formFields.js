const privacyLink = 'https://www.samsung.com/kz_ru/info/privacy/';
const rulesLink = 'rules';
const agreement = `FORM_INPUT_AGREEMENT`;

const formFields = [
  {
    label: 'FORM_INPUT_NAME',
    name: 'name',
    placeholder: 'FORM_INPUT_NAME',
    type: 'text',
    required: 'required',
    step: 0,
    constraint: {
      presence: {
        allowEmpty: false,
        message: 'FORM_INPUT_ERROR_REQUIRED',
      },
    },
  },
  {
    name: 'phone',
    label: 'FORM_INPUT_PHONE',
    placeholder: 'FORM_INPUT_PHONE_FORMAT',
    type: 'tel',
    mask: 'FORM_INPUT_PHONE_FORMAT_MASK',
    required: 'required',
    step: 0,
    value: '+7',
    constraint: {
      presence: {
        allowEmpty: false,
        message: 'FORM_INPUT_ERROR_REQUIRED',
      },
      format: {
        pattern: 'FORM_INPUT_PHONE_FORMAT_PATTERN',
        flags: 'i',
        message: 'FORM_INPUT_ERROR_REQUIRED',
      },
    },
  },
  {
    name: 'email',
    label: 'FORM_INPUT_EMAIL',
    placeholder: 'FORM_INPUT_EMAIL_PLACEHOLDER',
    type: 'email',
    required: 'required',
    step: 0,
    constraint: {
      presence: {
        allowEmpty: false,
        message: 'FORM_INPUT_ERROR_REQUIRED',
      },
      email: {
        message: 'FORM_ERROR_EMAIL',
      },
    },
  },
  {
    name: 'city',
    label: 'FORM_INPUT_CITY',
    placeholder: 'FORM_INPUT_CITY_PLACEHOLDER',
    type: 'select',
    required: 'required',
    step: 0,
    options: [
      {
        label: 'Алматы',
        value: 'Алматы',
      },
      {
        label: 'Астана',
        value: 'Астана',
      },
      {
        label: 'Шымкент',
        value: 'Шымкент',
      },
      {
        label: 'Актау',
        value: 'Актау',
      },
      {
        label: 'Актобе',
        value: 'Актобе',
      },
      {
        label: 'Атырау',
        value: 'Атырау',
      },
      {
        label: 'Караганда',
        value: 'Караганда',
      },
      {
        label: 'Кокшетау',
        value: 'Кокшетау',
      },
      {
        label: 'Костанай',
        value: 'Костанай',
      },
      {
        label: 'Кызылорда',
        value: 'Кызылорда',
      },
      {
        label: 'Павлодар',
        value: 'Павлодар',
      },
      {
        label: 'Петропавловск',
        value: 'Петропавловск',
      },
      {
        label: 'Семей',
        value: 'Семей',
      },
      {
        label: 'Талдыкорган',
        value: 'Талдыкорган',
      },
      {
        label: 'Тараз',
        value: 'Тараз',
      },
      {
        label: 'Туркестан',
        value: 'Туркестан',
      },
      {
        label: 'Уральск',
        value: 'Уральск',
      },
      {
        label: 'УстьКаменогорск',
        value: 'УстьКаменогорск',
      },
    ],
    constraint: {
      presence: {
        allowEmpty: false,
        message: 'FORM_INPUT_ERROR_REQUIRED',
      },
    },
  },
  {
    name: 'nda',
    placeholder: 'file',
    type: 'file',
    label: 'BT_SELECT_FILE',
    required: 'required',
    step: 0,
    constraint: {
      presence: {
        allowEmpty: false,
        message: 'FORM_INPUT_ERROR_REQUIRED',
      },
    },
  },
  {
    name: 'agreement1',
    label: `FORM_AGREEMENT_LABEL`,
    value: false,
    type: 'checkbox',
    required: 'required',
    step: 0,
    constraint: {
      numericality: {
        greaterThan: 0,
        message: 'FORM_ERROR_AGREEMENT',
      },
    },
  },
  {
    name: 'agreement2',
    label: `FORM_RULES_LABEL`,
    value: false,
    type: 'checkbox',
    required: 'required',
    step: 0,
    constraint: {
      numericality: {
        greaterThan: 0,
        message: 'FORM_ERROR_AGREEMENT',
      },
    },
  },

  {
    name: 'brand',
    label: 'FORM_INPUT_BRAND',
    placeholder: 'FORM_INPUT_BRAND',
    type: 'radio',
    required: 'required',
    step: 1,
    options: [
      {
        label: 'FORM_INPUT_BRAND_SAMSUNG',
        value: 'Samsung',
      },
      {
        label: 'FORM_INPUT_BRAND_LG',
        value: 'LG',
      },
      {
        label: 'FORM_INPUT_BRAND_SONY',
        value: 'Sony',
      },
      {
        label: 'FORM_INPUT_BRAND_OTHER',
        value: 'Другое',
      },
    ],
    constraint: {
      presence: {
        allowEmpty: false,
        message: 'FORM_INPUT_ERROR_REQUIRED',
      },
    },
  },
  {
    name: 'diagonal',
    label: 'FORM_INPUT_DIAGONAL',
    placeholder: 'FORM_INPUT_DIAGONAL',
    type: 'radio',
    required: 'required',
    step: 1,
    options: [
      {
        label: 'FORM_INPUT_DIAGONAL_32',
        value: 'Меньше 32”',
      },
      {
        label: 'FORM_INPUT_DIAGONAL_43',
        value: '32”-43”',
      },
      {
        label: 'FORM_INPUT_DIAGONAL_55',
        value: '43”-55',
      },
      {
        label: 'FORM_INPUT_DIAGONAL_55+',
        value: 'Больше 55”',
      },
    ],
    constraint: {
      presence: {
        allowEmpty: false,
        message: 'FORM_INPUT_ERROR_REQUIRED',
      },
    },
  },
  {
    name: 'reason',
    label: 'FORM_INPUT_REASONS',
    placeholder: 'FORM_INPUT_REASONS',
    type: 'checkboxes',
    required: 'required',
    step: 1,
    options: [
      {
        label: 'FORM_INPUT_REASONS_1',
        value: 'Прежний телевизор устарел',
      },
      {
        label: 'FORM_INPUT_REASONS_2',
        value: 'Не устраивал размер прежнего телевизора',
      },
      {
        label: 'FORM_INPUT_REASONS_3',
        value: 'Прежний телевизор сломался',
      },
      {
        label: 'FORM_INPUT_REASONS_4',
        value: 'Ремонт, обновление интерьера',
      },
      {
        label: 'FORM_INPUT_REASONS_5',
        value: 'Переезд',
      },
      {
        label: 'FORM_INPUT_REASONS_6',
        value: ' Выгодная скидка',
      },
      {
        label: 'FORM_INPUT_REASONS_7',
        value: 'Заинтересовала конкретная модель телевизора',
      },
      {
        label: 'FORM_INPUT_REASONS_8',
        value: 'Появилась финансовая возможность для обновления',
      },
      {
        label: 'FORM_INPUT_REASONS_9',
        value: 'Желание сделать подарок себе и/или своей семье',
      },
    ],
    constraint: {
      presence: {
        allowEmpty: false,
        message: 'FORM_INPUT_ERROR_REQUIRED',
      },
    },
  },
];

module.exports = formFields;
