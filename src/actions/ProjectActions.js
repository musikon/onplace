import { apiCall } from '../utils';

import * as actionTypes from '../constants/ProjectConstants';

/**
 *  get About onLoad page
 */
export function fetchProject(projectId, host, lang = 'ru') {
  return function (dispatch) {
    const path = `/images/projects-data/${ lang }/${ projectId }.json`;

    return apiCall({
      method: 'GET',
      host: `http://${ host }`,
      path
    }).then((response) => {
      dispatch({
        type: actionTypes.GET_PROJECT,
        isFetched: true,
        projectArray: response.data,
      });
    });
  };
}

export function unmountProject() {
  return {
    type: actionTypes.UNMOUNT_PROJECT,
    isFetched: false,
    projectArray: []
  };
}

export function switchActiveTab(indexTab) {
  return {
    type: actionTypes.SET_INDEX_TAB,
    indexTab
  };
}
