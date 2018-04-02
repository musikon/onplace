const monthName = {
  ru: [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
};

const formatDate = (dateUTC, lang) => {
  const date = new Date(dateUTC);
  const dayNumber = date.getDate();
  const month = monthName[lang][date.getMonth()];
  
  return `${ dayNumber } ${ month }`;
};

export default formatDate;
