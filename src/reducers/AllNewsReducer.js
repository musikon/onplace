import * as actionTypes from '../constants/AllNewsConstants';

/* eslint-disable max-len */
const initialState = {
  isFetched: false,
  newsBlockArrayRu: [],
  newsBlockArrayEn: [],
  totalCount: null
};

export default function AllNewsReducer(state = initialState, action) {
  const {
    type,
    newsBlockArray,
    newsBlockLang,
    isFetched,
    totalCount
  } = action;

  switch (type) {
    case actionTypes.GET_NEWS: {
      const langPostfix = newsBlockLang === 'ru' ? 'Ru' : 'En';
      const currentNewsBlockName = `newsBlockArray${ langPostfix }`;
      const currentNewsBlockArray = state[currentNewsBlockName];

      return {
        ...state,
        isFetched,
        totalCount,
        [currentNewsBlockName]: currentNewsBlockArray.concat(newsBlockArray)
      };
    }

    default:
      return state;
  }
}
