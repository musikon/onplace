if (global.IS_BROWSER) {
  require('./App.styl'); // eslint-disable-line global-require
}

import React, { Component, PropTypes as Type } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProjectRawTheme from '../../theme/material_ui_raw_theme';
import { getMuiTheme } from 'material-ui/styles';

class App extends Component {
  static propTypes = {
    children: Type.object
  };

  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(ProjectRawTheme, { userAgent: 'all' }) };
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

// REDUX STUFF
// Which props do we want to inject, given the global state?
const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);
