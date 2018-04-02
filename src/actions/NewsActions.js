import { apiCall } from '../utils';

import * as actionTypes from '../constants/NewsConstants';

/**
 *  get Article onLoad page
 */
export function fetchArticle(newsId, callback = () => {}) {
  return function (dispatch) {
    return apiCall({
      method: 'GET',
      host: 'http://148.251.153.226:4787',
      path: `/news/${ newsId }`
    }).then((response) => {
      callback();
      
      dispatch({
        type: actionTypes.GET_ARTICLE,
        isFetched: true,
        articleArray: response.data.response,
      });
    }).catch(error => {
      console.error(error);
    });
  };
}

export function unmountArticle() {
  return {
    type: actionTypes.UNMOUNT_ARTICLE,
    isFetched: false,
    articleArray: []
  };
}
