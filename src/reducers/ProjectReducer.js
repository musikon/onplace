import * as actionTypes from '../constants/ProjectConstants';

/* eslint-disable max-len */

const initialState = {
  indexTab: 0,
  isFetched: false,
  projectArray: []
};

export default function ProjectReducer(state = initialState, action) {
  const {
    type,
    projectArray,
    indexTab,
    isFetched
  } = action;

  switch (type) {
    case actionTypes.GET_PROJECT: {
      return {
        ...state,
        projectArray,
        isFetched
      };
    }

    case actionTypes.SET_INDEX_TAB: {
      return {
        ...state,
        indexTab
      };
    }

    case actionTypes.UNMOUNT_PROJECT: {
      return {
        ...state,
        projectArray,
        isFetched
      };
    }

    default:
      return state;
  }
}
