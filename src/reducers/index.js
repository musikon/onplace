/* eslint-disable no-multi-spaces */
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import GlobalReducer      from './GlobalReducer';
import AllNewsReducer        from './AllNewsReducer';
import ProjectReducer       from './ProjectReducer';
import NewsReducer     from './NewsReducer';

const rootReducer = combineReducers({
  GlobalReducer,
  AllNewsReducer,
  ProjectReducer,
  NewsReducer,
  routing: routerReducer
});

export default rootReducer;
