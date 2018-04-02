/* eslint-disable no-param-reassign */
export const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp(`(^| )${ className }( |$)`, 'gi').test(el.className);
  }
};

export const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ` ${ className }`;
  }
};

export const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp(`(^|\\b)${ className.split(' ').join('|') }(\\b|$)`, 'gi'), ' ');
  }
};

export const filterByClassName = (arrayOfElements, className) => (
    Array.prototype.filter.call(arrayOfElements, (element) => hasClass(element, className))
);

export const closest = (element, matchFunction) => {
  let currentElement = element;
  
  while (currentElement) {
    if (matchFunction(currentElement)) return currentElement;
    currentElement = currentElement.parentNode;
  }
};
