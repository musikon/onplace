import React                  from 'react';

import { Route, IndexRoute, IndexRedirect }  from 'react-router';

/* eslint-disable */
// Import the containers used as pages
import {
  App,
  MainPageContainer,
  NewsPageContainer,
  ProjectPageContainer,
  AllNewsPageContainer,
  StaticPageContainer,
  PageNotFound,
  AdminPageContainer
} from './containers';

// didMount - set lang  ru | en
// change text - on flag click
//   1. set redux state lang
//   2. from lang fetch different path - projectN | enprojectN

function userRedirect(nextState, replace) {
  var defaultLanguage = 'ru';
  var redirectPath = `/${ defaultLanguage }${ nextState.location.pathname }`;

  replace({
    pathname: redirectPath,
  });
};

var innerRoutes = (
  <Route>
    <IndexRoute component={MainPageContainer} />
    <Route path="news" component={AllNewsPageContainer} />
    <Route path="news/:newsId" component={NewsPageContainer} />
    <Route path="project/:projectId" component={ProjectPageContainer} />
    <Route path="pages/:pageId" component={StaticPageContainer} />
    <Route path="demo" component={AdminPageContainer} />
  </Route>
);
//indexRedirect crashes
// <IndexRedirect to="ru"/>

export default () => (
  <Route path="/" component={App}>
    <IndexRedirect to="ru"/>

    <Route path="ru" >
      {innerRoutes}
      <Route path="*" component={PageNotFound} />
    </Route>
    <Route path="en" >
      {innerRoutes}
      <Route path="*" component={PageNotFound} />
    </Route>
    <Route path="*" component={PageNotFound} />
  </Route>
);
