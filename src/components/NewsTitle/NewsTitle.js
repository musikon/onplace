if (global.IS_BROWSER) {
  require('./NewsTitle.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  // PropTypes as Type,
} from 'react';

export default class NewsTitle extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    title: React.PropTypes.string
  };

  /**
   * Renders 'NewsTitle' component
   */
  render() {
    const {
     title
    } = this.props;
    return (
      <div className="c-news-title">
        <h1 className="news-title-title">
          {title}
        </h1>
      </div>
    );
  }
}
