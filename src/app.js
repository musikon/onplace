import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import Perf from 'react-addons-perf';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { decode } from './utils/base64';
import routes from './routes';
import configureStore from './store/configureStore';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-90415438-1');

const isProd = process.env.NODE_ENV === 'production';

injectTapEventPlugin();

// Needed for React Developer Tools
if (!isProd) {
  window.React = React;
  window.Perf = Perf;
}

const initialState = window.__INITIAL_STATE__ ? JSON.parse(decode(window.__INITIAL_STATE__)) : {};
const catchedStore = configureStore(initialState);

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

render((
  <Provider store={catchedStore}>
    <Router
      history={browserHistory}
      routes={routes(catchedStore)}
      onUpdate={() => {
        logPageView();
        !((/\/(ru|en)\/?$/).test(document.location.pathname)) && window.scrollTo(0, 0);
      }}
    />
  </Provider>
), document.getElementById('app'));
