/* eslint-disable */

import express from 'express';
import path from 'path';

import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match as matcher, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import _find from 'lodash/find';

import { encode } from '../src/utils/base64';

import routes from '../src/routes';
import store from '../src/store/configureStore';

let webpackConfig = null;

const NODE_ENV = require('../envConfig').NODE_ENV;
const PORT = require('../envConfig').PORT;

if (NODE_ENV === 'production') {
  webpackConfig = require('../webpack.prod.config.js')
} else {
  webpackConfig = require('../webpack.dev.config.js')
}

const PUBLIC_PATH = webpackConfig.PUBLIC_PATH;
const compiler = webpack(webpackConfig);

console.log(`>>> LAUNCHED MODE: ${ NODE_ENV }`);

let app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

if (NODE_ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/',
    hot: true,
    compress: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static(PUBLIC_PATH));

  compiler.run((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('build created <<<');
    }
  });
}

app.use((req, res) => {
  let __store = store({});
  let __routes = routes(__store);

  if (req.url === '/') {
    res.redirect(301, '/ru')
  }

  matcher(
    {routes: __routes, location: req.url},
    (err, redirect, props) => {
      let html = '';

      if (err) {
        res
        .status(500)
        .render('error', err);
        return;
      }

      if (props) {
        const { host } = req.headers;
        const { location, params } = props;
        
        const ContainerComponent = _find(props.components, 'initialFetchData');

        let fetchDataPromise = [() => Promise.resolve()];
        
        if (ContainerComponent && ContainerComponent.initialFetchData.length) {
          fetchDataPromise = ContainerComponent.initialFetchData;
        }

        let cb = () => {
          html = {
            NODE_ENV: NODE_ENV,
            content: renderToString(
              <Provider store={__store}>
                <RouterContext {...props} />
              </Provider>
            )
          };

          let state = __store.getState();

          html['state'] = encode(JSON.stringify(state));

          res
          .status(200)
          .render('layout', html);
        };

        Promise
        .all(fetchDataPromise.map(promise => promise({
          store: __store,
          location,
          host,
          params
        })))
        .then(cb)
        .catch((err) => {
          console.error('Error in react server side rendering', err);

          res
          .status(500)
          .render('error', { errorText: err });
        });
      } else {
        console.error(err);

        res
        .status(500)
        .render('error', { errorText: err });
      }
    });
});

app.listen(PORT, () => {
  console.info(`==> Listening on port ${ PORT }.
    Open up http://${webpackConfig.localIp || 'localhost'}:${ PORT }/ in your browser.`)
});
