import { apiCall } from '../utils';

import * as actionTypes from '../constants/AllNewsConstants';

/**
 *  get News onLoad page
 */
export function fetchNews(numberOfNews, lang, skip = 0) {
  return function (dispatch) {
    return apiCall({
      method: 'GET',
      host: 'http://148.251.153.226:4787',
      path: '/news',
      query: {
        skip,
        limit: numberOfNews,
        lang
      }
    }).then(response => {
      dispatch({
        type: actionTypes.GET_NEWS,
        isFetched: true,
        newsBlockLang: lang,
        newsBlockArray: response.data.response,
        totalCount: response.data.totalCount
      });
    });
  };
}
