import qs               from 'query-string';
import request          from 'axios';

export default (params) => {
  const method = params.method;
  const apiHost = 'http://148.251.153.226:4787';

  const query = params.query ? `?${ qs.stringify(params.query) }` : '';

  const url = `${ params.host || apiHost }${ params.path }${ query }`;
  const responseType = 'json';

  const headers = {
    'Content-Type': 'application/json'
  };

  if (params.auth) Object.assign(headers, params.auth);
  const requestParams = { method, url, responseType, headers };

  if (params.data) requestParams.data = params.data;

  return request(requestParams);
};
