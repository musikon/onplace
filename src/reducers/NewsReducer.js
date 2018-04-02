import * as actionTypes from '../constants/NewsConstants';

/* eslint-disable max-len */

const initialState = {
  isFetched: false,
  articleArray: []
};

export default function NewsReducer(state = initialState, action) {
  const {
    type,
    articleArray,
    isFetched
  } = action;

  switch (type) {
    case actionTypes.GET_ARTICLE: {
      return {
        ...state,
        articleArray,
        isFetched
      };
    }

    case actionTypes.UNMOUNT_ARTICLE: {
      return {
        ...state,
        isFetched: false,
        articleArray: []
      };
    }

    default:
      return state;
  }
}
