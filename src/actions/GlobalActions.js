import * as actionTypes from '../constants/GlobalConstants';
import { browserHistory } from 'react-router';
import { apiCall } from '../utils';

export function setActiveMenuItemIndex(activeMenuItemIndex) {
  return {
    type: actionTypes.SET_ACTIVE_MENU_ITEM_INDEX,
    activeMenuItemIndex
  };
}

export function langSwitch(lang, pathname) {
  const path = pathname.replace(/(ru|en)/, lang);

  browserHistory.push(path);
  return {
    type: actionTypes.SET_SITE_LANG,
    lang
  };
}

export function goToMainPage(sectionName) {
  browserHistory.push('/');

  return {
    type: actionTypes.SET_MAIN_PAGE_SECTION,
    mainPageActiveSection: sectionName
  };
}

export function disableGoToMainPage() {
  return {
    type: actionTypes.SET_MAIN_PAGE_SECTION_TO_FALSE,
    mainPageActiveSection: false
  };
}

export function fetchNews(numberOfNews, lang) {
  return function (dispatch) {
    return apiCall({
      method: 'GET',
      host: 'http://148.251.153.226:4787',
      path: '/news',
      query: {
        skip: 0,
        limit: numberOfNews,
        lang
      }
    }).then(response => {
      dispatch({
        type: actionTypes.GET_ALL_NEWS,
        isFetched: true,
        newsLang: lang,
        newsArray: response.data.response,
      });
    });
  };
}

export function fetchPublications(lang) {
  return function (dispatch) {
    return apiCall({
      method: 'GET',
      host: 'http://148.251.153.226:4787',
      path: '/mentions',
      query: {
        lang
      }
    })
    .then(({ data: { response } }) => {
      dispatch({
        type: actionTypes.SET_PUBLICATIONS,
        publicationsLang: lang,
        publications: response
      });
    })
    .catch((error) => {
      console.error(' ==>', error);
    });
  };
}

export function fetchStaticPageData(id) {
  return function (dispatch) {
    return apiCall({
      method: 'GET',
      host: 'http://148.251.153.226:4787',
      path: `/pages/${ id }`,
    })
    .then(({ data: { response } }) => {
      dispatch({
        type: actionTypes.SET_STATIC_PAGE_DATA,
        staticPageData: response
      });
    })
    .catch((error) => {
      console.error(' ==>', error);
    });
  };
}

export function resetStaticPageData() {
  return {
    type: actionTypes.RESET_STATIC_PAGE_DATA
  };
}

export function setMediaQueryId() {
  return function (dispatch) {
    const width = document.documentElement.clientWidth;
    if (width < 768) {
      // small
      dispatch({
        type: actionTypes.SET_MEDIA_QUERY_ID,
        mediaQueryId: 'small'
      });
    } else if (width >= 768 && width <= 1023) {
      // medium
      dispatch({
        type: actionTypes.SET_MEDIA_QUERY_ID,
        mediaQueryId: 'medium'
      });
    } else if (width >= 1024) {
      // big
      dispatch({
        type: actionTypes.SET_MEDIA_QUERY_ID,
        mediaQueryId: 'big'
      });
    }
  };
}

export function setDomReady() {
  return {
    type: actionTypes.SET_DOM_READY
  };
}
