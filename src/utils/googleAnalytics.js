import ReactGA from 'react-ga';

export default (googleAObj) => {
  ReactGA.event(googleAObj);
};
